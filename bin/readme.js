#!/usr/bin/env node

'use strict';
/**
 * @description
 * @module readme.js
 */

var yargs = require('yargs'),
  path = require('path'),
  basename = path.basename,
  findup = require('findup-sync'),
  Glob = require('glob').Glob,
  open = require('open'),
  Q = require('q'),
  format = require('util').format,

  fatal,
  info,
  logify,
  root,
  argv;

logify = function logify(args) {
  args = Array.prototype.slice.apply(args);
  args.splice(1, 0, argv.$0);
  args[0] = '%s: ' + args[0];
  return args;
};

info = function info() {
  if (argv.verbose) {
    console.info.apply(console, logify(arguments));
  }
};

fatal = function fatal() {
  console.error.apply(console, logify(arguments));
  process.exit(1);
};

argv = yargs
  .usage([
    'Open the README of an installed NPM module in its default application.',
    'If no MODULE_NAME specified, tries to open the first README it can find.',
    '',
    '$0 [-d|--deep] [-s|--shallow] [-v|--verbose] [-g|--global] [MODULE_NAME]'
  ].join('\n'))

  .boolean('d')
  .alias('d', 'deep')
  .describe('d', 'Dig into dependencies of dependencies')
  .default('d', true)

  .boolean('s')
  .alias('s', 'shallow')
  .describe('s', 'Look only in the current project\'s dependencies')

  .boolean('v')
  .alias('v', 'verbose')
  .describe('v', 'Enable useless information')

  .boolean('h')
  .alias('h', 'help')
  .describe('h', 'You\'re reading it.')

  .boolean('g')
  .alias('g', 'global')
  .describe('g', 'Search global modules')

  .argv;

if (argv.help) {
  yargs.showHelp();
  process.exit(0);
}

var configure = function configure() {
  var readme_glob, module_name, promise;
  if (!argv._.length) {
    return Q('README*');
  } else {
    if (argv.global) {
      promise = Q.nfcall(require('npmconf').load)
        .then(function (conf) {
          return path.join(conf.globalPrefix, 'lib', 'node_modules');
        }, function (err) {
          fatal(err);
        });
    }
    else {
      promise = Q(path.dirname(findup('package.json')) ||
        (basename(process.cwd()) === 'node_modules' ? '.' : process.cwd()));
    }
    return promise.then(function (root) {
      module_name = argv._[0];
      if (argv.shallow) {
        readme_glob = format('%s/%s/README*', root, module_name);
      }
      else {
        readme_glob =
          format('%s/{%s,**/node_modules/%s}/README*', root, module_name,
            module_name);
      }
      return readme_glob;
    });
  }
};

configure()
  .then(function (readme_glob) {
    var dfrd = Q.defer();
    info('Matching glob "%s"...', readme_glob);
    Glob(readme_glob)
      .on('match', function (file) {
        this.abort();
        info('Found %s', file);
        dfrd.resolve(file);
      })
      .on('end', function () {
        dfrd.reject('Could not find any README files.  Write one?');
      })
      .on('error', fatal);
    return dfrd.promise;
  })
  .done(function (file) {
    open(file);
  }, function (err) {
    fatal(err);
  });

