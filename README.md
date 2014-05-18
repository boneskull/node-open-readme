# open-readme

Open the `README` of an installed NPM module in its default application.  

Most `README` files are written in [Markdown](http://en.wikipedia.org/wiki/Markdown).  If there are multiple `README` files found, this script will prefer the `README.md` file, or just pick the first one it finds.  

> This script conflicts with the [readme](https://www.npmjs.org/package/readme) module, as they use the same script name.  The difference is that this script will open the default application.

## Viewers

If on OS X, I recommend [Marked](http://marked2app.com/).

There are also many [Markdown viewers](https://chrome.google.com/webstore/search/markdown) available in the Chrome Web Store.

## Installation

This is a command-line application and should be installed globally.

```shell
npm install -g readme
```

> Note:  

## Usage

```
readme [-d|--deep] [-s|--shallow] [-v|--verbose] <module-name>

Options:
  -d, --deep     Dig into dependencies of dependencies            [default: true]
  -s, --shallow  Look only in the current project's dependencies
  -v, --verbose  Enable useless information                     
  -h, --help     You're reading it.                             
```

## License

MIT

## Author

[Christopher Hiller](http://boneskull.github.io)
