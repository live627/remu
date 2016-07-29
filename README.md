# MeanMenu v2.0.8

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight script to convert a standard navigation into a mobile/tablet navigation.**


[Live Demo](http://live627.github.io/meanMenu/demo.html)

## Usage

    <script src="meanmenu.js"></script>
    <link rel="stylesheet" href="meanmenu.css" media="screen" />

    document.addEventListener("DOMContentLoaded", function () {
        new MeanMenu();
    }, false);

### Options

`meanMenuContainer: 'body'` Choose where meanmenu will be placed within the HTML<br>
`meanMenuClose: "X"` Single character you want to represent the close menu button<br>
`meanMenuOpen: "<span /><span /><span />"` Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans<br>
`meanScreenWidth: "480"` Set the screen width you want meanmenu to kick in at<br>
`meanExpand: "+"` single character you want to represent the expand for ULs<br>
`meanContract: "-"` single character you want to represent the contract for ULs<br>
`meanRemoveAttrs: false` true to remove classes and IDs, false to keep them<br>
`singlePage: false` set to true for single page sites, the navigation will close back up on itself on click<br>
`meanDisplay: "block"` by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.<br>

## Changes from MeanMenu
- Removed the following properties in favor of CSS:
 - `meanRevealPosition`
 - `meanRevealPositionDistance`
 - `meanRevealColour`
 - `meanMenuCloseSize`
 - `removeElements`
 - `meanNavPush`
 - `meanShowChildren`
 - `meanExpandableChildren`
 - `.mean-last` is no more as it was not being used and can be reinstated by a pseudo-selector
 - Also removed `.mean-remove` as it seemed redundant. To expand uupon the example given: if you had a search box called `.search`, use `.mean-container .search`
 - `onePage` was renamed to `singlePage`
