/*!
* jQuery meanMenu v2.0.8
* @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
*
*/

(function ($) {
	"use strict";

	window.MeanMenu = function (options) {
		options = $.extend({
				meanMenuTarget: 'header nav', // Target the current HTML markup you wish to replace
				meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
				meanMenuClose: "X", // single character you want to represent the close menu button
				meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
				meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
				meanExpand: "+", // single character you want to represent the expand for ULs
				meanContract: "-", // single character you want to represent the contract for ULs
				meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
				onePage: false, // set to true for one page sites
				meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
		}, options);

		var meanMenu = options.meanMenuTarget;
		var meanContainer = options.meanMenuContainer;
		var meanMenuClose = options.meanMenuClose;
		var meanMenuOpen = options.meanMenuOpen;
		var meanScreenWidth = options.meanScreenWidth;
		var meanRevealClass = ".meanmenu-reveal";
		var meanExpand = options.meanExpand;
		var meanContract = options.meanContract;
		var meanRemoveAttrs = options.meanRemoveAttrs;
		var onePage = options.onePage;
		var meanDisplay = options.meanDisplay;
		var meanMenuExist = false;

		// set all styles for mean-reveal
		var $navreveal = "";

		var meanInner = function() {
			// get last class name
			if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
				$navreveal.html(meanMenuClose);
			} else {
				$navreveal.html(meanMenuOpen);
			}
		};

		// re-instate original nav (and call this on window.width functions)
		var meanOriginal = function() {
			if (!meanMenuExist) {
				return;
			}

			jQuery('.mean-bar').remove();
			jQuery(meanContainer).removeClass("mean-container");
			jQuery(meanMenu).css('display', meanDisplay);
			meanMenuExist = false;
		};

		// navigation reveal
		var showMeanMenu = function() {
			if (meanMenuExist) {
				return;
			}

			meanMenuExist = true;
			// add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
			jQuery(meanContainer).addClass("mean-container");
			jQuery(meanContainer).prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal">Show Navigation</a><nav class="mean-nav"></nav></div>');

			//push meanMenu navigation into .mean-nav
			var meanMenuContents = jQuery(meanMenu).html();
			jQuery('.mean-nav').html(meanMenuContents);

			// remove all classes from EVERYTHING inside meanmenu nav
			if(meanRemoveAttrs) {
				jQuery('nav.mean-nav ul, nav.mean-nav ul *').each(function() {
					jQuery(this).removeAttr("class");
					jQuery(this).removeAttr("id");
				});
			}
			document.querySelector('.mean-nav ul').classList.add('animated');

			// hide current navigation and reveal mean nav link
			jQuery(meanMenu).hide();
			jQuery(".meanmenu-reveal").show();

			// turn 'X' on or off
			jQuery(meanRevealClass).html(meanMenuOpen);
			$navreveal = jQuery(meanRevealClass);

			jQuery('.mean-nav ul ul').each(function() {
				if(jQuery(this).children().length){
					jQuery(this,'li:first').parent().append('<a class="mean-expand" href="#">'+ meanExpand +'</a>');
				}
				this.classList.add('animated');
			});

			jQuery('.mean-expand').on("click",function(e){
				e.preventDefault();
				if (this.classList.contains("mean-clicked")) {
					jQuery(this).text(meanExpand);
					this.previousElementSibling.classList.remove('slideInDown');
				} else {
					jQuery(this).text(meanContract);
					this.previousElementSibling.classList.add('slideInDown');
				}
				this.classList.toggle("mean-clicked");
			});

			$navreveal.removeClass("meanclose");
			jQuery($navreveal).click(function(e){
				e.preventDefault();
				$navreveal.toggleClass("meanclose");
				document.querySelector('.mean-nav ul').classList.toggle('slideInDown');
				meanInner();
			});

			// for one page websites, reset all variables...
			if ( onePage ) {
				jQuery('.mean-nav ul > li > a:first-child').on( "click" , function () {
					jQuery('.mean-nav ul:first').slideUp();
					jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
				});
			}
		};

		var refreshMeanMenu = function() {
			// get browser width
			var currentWidth = window.innerWidth || document.documentElement.clientWidth;

			if (currentWidth <= meanScreenWidth) {
				showMeanMenu();
			} else {
				meanOriginal();
			}
		}

		window.addEventListener("resize", refreshMeanMenu, false);

		// run main menuMenu function on load
		refreshMeanMenu();
	};
})(jQuery);
