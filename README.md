# Remu v1.0

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight script to convert a standard navigation into a mobile/tablet navigation.**


[Live Demo](http://live627.github.io/remu/demo.html)

## Usage

    <script src="remu.js"></script>
    <link rel="stylesheet" href="remu.css" media="screen" />

    document.addEventListener("DOMContentLoaded", function () {
        new remu();
    }, false);

### Options

- `remuContainer: 'body'` Choose where Remu will be placed within the HTML
- `remuClose: "X"` Single character you want to represent the close menu button
- `remuOpen: "<span /><span /><span />"` Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans
- `remuScreenWidth: "480"` Set the screen width you want Remu to kick in at
- `remuExpand: "+"` single character you want to represent the expand for ULs
- `remuContract: "-"` single character you want to represent the contract for ULs
- `remuRemoveAttrs: false` true to remove classes and IDs, false to keep them
- `singlePage: false` set to true for single page sites, the navigation will close back up on itself on click
- `remuDisplay: "block"` by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.
