# Remu v1.0

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight script to convert a standard navigation into a mobile/tablet navigation.**

[Live Demo](http://live627.github.io/remu/demo.html)

## Features

- Lightweight
- CSS3 animations
- Webkit/Browserify support
- Single-page-application support

## Installation

Install from npm:

```sh
npm install remu
```

## Usage
CommonJS:
```js
var Remu = require('remu');
```
Remu is also expposed globally.
    <link rel="stylesheet" href="remu.css" />
    <script src="remu.min.js"></script>
    <script>
        var Remu = new Remu({
            singlePage: true
        });
        document.getElementById('show').addEventListener('click', Remu.show);
        document.getElementById('hide').addEventListener('click', Remu.hide);
    </script>
### Options
- `remuContainer: 'body'` Choose where Remu will be placed within the HTML
- `remuScreenWidth: "480"` Set the screen width you want Remu to kick in at
- `remuRemoveAttrs: false` true to remove classes and IDs, false to keep them
- `singlePage: false` set to true for single page sites, the navigation will close back up on itself on click
- `remuDisplay: "block"` by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.

### Methods
- `show` Shows Remu. Screen width is not taken into consideration, so it will work regardless of the viewport.
- `hide` Will hide Remu and restore the original menu.
