# MeanMenu v2.0.8

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

**Please note: This is not a menu system replacement. It is simply a lightweight piece of jQuery to convert a standard navigation into a mobile/tablet navigation.**


Live Demo:
<a href="http://www.meanthemes.com/demo/meanmenu/demo.html">http://www.meanthemes.com/demo/meanmenu/demo.html</a>

## Usage

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="assets/js/plugins/jquery.meanmenu.js"></script>
	<link rel="stylesheet" href="meanmenu.css" media="all" />

	document.addEventListener("DOMContentLoaded", function () {
		new MeanMenu();
	}, false);

### Options

`meanMenuContainer: 'body'` Choose where meanmenu will be placed within the HTML<br>
`meanMenuClose: "X"` Single character you want to represent the close menu button<br>
`meanMenuOpen: "<span /><span /><span />"` Text/markup you want when menu is closed, styling in CSS provides 3 bars with these spans<br>
`meanScreenWidth: "480"` Set the screen width you want meanmenu to kick in at<br>
`meanNavPush: ""` Set a height here in px, em or % if you want to budge your layout now the navigation is missing.<br>
`meanShowChildren: true` true to show children in the menu, false to hide them<br>
`meanExpandableChildren: true` true to allow expand/collapse children<br>
`meanExpand: "+"` single character you want to represent the expand for ULs<br>
`meanContract: "-"` single character you want to represent the contract for ULs<br>
`meanRemoveAttrs: false` true to remove classes and IDs, false to keep them<br>
`onePage: false` set to true for one page sites, the navigation will close back up on itself on click<br>
`meanDisplay: "block"` by default this is block, sometimes you may want to switch this to table or table-cell or inline-block etc. so now you can.<br>

## Changes from MeanMenu
- Removed the following properties in favor of CSS:
```
meanRevealPosition
eanRevealPositionDistance
meanRevealColour
meanMenuCloseSize
removeElements
```
- `.mean-last` is no more as it was not being used and can be reinstated by a pseudo-selector
- Also removed `.mean-remove` as it seemed redundant. To expand uupon the example given: if you had a search box called `.search`, use `.mean-container .search`
