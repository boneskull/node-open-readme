'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      source: {
        src: [
          'lib/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          'test/**/*.js'
        ]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      source: {
        files: '<%= jshint.source.src %>',
        tasks: ['jshint:source', 'simplemocha']
      },
      tests: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'simplemocha']
      }
    },
    simplemocha: {
      options: {
        globals: ['expect', 'sinon'],
        ignoreLeaks: false,
        reporter: 'spec',
        timeout: 10000
      },
      all: {
        src: ['test/fixture.js', 'test/**/*.spec.js']
      }
    },
    bump: {
      options: {
        push: false
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task
  grunt.registerTask('default', ['jshint', 'simplemocha']);
  grunt.registerTask('bump-minor', ['bump:minor']);
  grunt.registerTask('bump-major', ['bump:major']);
  grunt.registerTask('test', ['default']);
};

