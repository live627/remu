# remuMenu v2.0.8

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight script to convert a standard navigation into a mobile/tablet navigation.**


[Live Demo](http://live627.github.io/remuMenu/demo.html)

## Usage

    <script src="remumenu.js"></script>
    <link rel="stylesheet" href="remumenu.css" media="screen" />

    document.addEventListener("DOMContentLoaded", function () {
        new remuMenu();
    }, false);

### Options

`remuMenuContainer: 'body'` Choose where remumenu will be placed within the HTML<br>
`remuMenuClose: "X"` Single character you want to represent the close menu button<br>
`remuMenuOpen: "<span /><span /><span />"` Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans<br>
`remuScreenWidth: "480"` Set the screen width you want remumenu to kick in at<br>
`remuExpand: "+"` single character you want to represent the expand for ULs<br>
`remuContract: "-"` single character you want to represent the contract for ULs<br>
`remuRemoveAttrs: false` true to remove classes and IDs, false to keep them<br>
`singlePage: false` set to true for single page sites, the navigation will close back up on itself on click<br>
`remuDisplay: "block"` by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.<br>

## Changes from remuMenu
- Removed the following properties in favor of CSS:
 - `remuRevealPosition`
 - `remuRevealPositionDistance`
 - `remuRevealColour`
 - `remuMenuCloseSize`
 - `removeElements`
 - `remuNavPush`
 - `remuShowChildren`
 - `remuExpandableChildren`
 - `.remu-last` is no more as it was not being used and can be reinstated by a pseudo-selector
 - Also removed `.remu-remove` as it seemed redundant. To expand uupon the example given: if you had a search box called `.search`, use `.remu .search`
 - `onePage` was renamed to `singlePage`
