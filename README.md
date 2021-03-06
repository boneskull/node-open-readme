# open-readme

Open the `README` of an installed NPM module in its default application.  

> This script conflicts with the [readme](https://www.npmjs.org/package/readme) module, as they use the same script name.  The difference is that this script will open the default application.

## Viewers

Most `README` files are written in [Markdown](http://en.wikipedia.org/wiki/Markdown). 

If on OS X, I recommend [Marked](http://marked2app.com/).

There are also many [Markdown viewers](https://chrome.google.com/webstore/search/markdown) available in the Chrome Web Store.

## Installation

This is a command-line application and should be installed globally.

```shell
npm install -g readme
```

## Usage

```
Open the README of an installed NPM module in its default application.
If no MODULE_NAME specified, tries to open the first README it can find.

readme [-d|--deep] [-s|--shallow] [-v|--verbose] [-g|--global] [MODULE_NAME]

Options:
  -d, --deep     Dig into dependencies of dependencies            [default: true]
  -s, --shallow  Look only in the current project's dependencies
  -v, --verbose  Enable useless information                     
  -h, --help     You're reading it.                             
  -g, --global   Search global modules                          
```

If a `README` is found in a format *other* than Markdown, the default application for its extension (or lack thereof) will be opened.  

> `--global`, `--deep` and `--shallow` do nothing if no `MODULE_NAME` is given.

## License

MIT

## Author

[Christopher Hiller](http://boneskull.github.io)
