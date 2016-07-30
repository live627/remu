/*!
* meanMenu v2.0.8
* @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
* @Copyright (C) 2015-2016 John Rayes (http://live627.github.io/meanMenu/demo.html)
*/

(function () {
    "use strict";

    window.MeanMenu = function (options) {
        var extend = function(out) {
            out = out || {};

            for (var i = 1; i < arguments.length; i++) {
                if (!arguments[i])
                    continue;

                for (var key in arguments[i]) {
                    if (arguments[i].hasOwnProperty(key))
                        out[key] = arguments[i][key];
                }
            }

            return out;
        };

        options = extend({
                meanMenuTarget: 'header nav', // Target the current HTML markup you wish to replace
                meanMenuContainer: 'body', // Choose where meanmenu will be placed within the HTML
                meanMenuClose: "X", // single character you want to represent the close menu button
                meanMenuOpen: "<span></span><span></span><span></span>", // text/markup you want when menu is closed
                meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
                meanExpand: "+", // single character you want to represent the expand for ULs
                meanContract: "-", // single character you want to represent the contract for ULs
                meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
                singlePage: false, // set to true for one page sites
                meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
        }, options);

        var meanMenu = document.querySelector(options.meanMenuTarget);
        var meanContainer = document.querySelector(options.meanMenuContainer);
        var meanMenuClose = options.meanMenuClose;
        var meanMenuOpen = options.meanMenuOpen;
        var meanScreenWidth = options.meanScreenWidth;
        var meanRevealClass = ".navicon";
        var meanExpand = options.meanExpand;
        var meanContract = options.meanContract;
        var meanRemoveAttrs = options.meanRemoveAttrs;
        var singlePage = options.singlePage;
        var meanDisplay = options.meanDisplay;
        var meanMenuExist = false;
        var nav = [];

        var meanInner = function() {
            if (nav[1].classList.contains("meanclose")) {
                nav[1].innerHTML = meanMenuClose;
            } else {
                nav[1].innerHTML = meanMenuOpen;
            }
        };

        // re-instate original nav (and call this on window.width functions)
        var meanOriginal = function() {
            if (!meanMenuExist) {
                return;
            }

            meanContainer.removeChild(meanContainer.querySelector('.mean-bar'));
            meanContainer.classList.remove("mean-container");
            meanMenu.style.display = meanDisplay;
            meanMenuExist = false;
        };

        // navigation reveal
        var showMeanMenu = function() {
            if (meanMenuExist) {
                return;
            }

            meanMenuExist = true;
            // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
            meanContainer.classList.add("mean-container");
            meanContainer.insertAdjacentHTML('afterbegin', '<div class="mean-bar"><a href="#nav" class="navicon">Show Navigation</a><nav class="mean-nav"></nav></div>');

            //push meanMenu navigation into .mean-nav
            var meanMenuContents = meanMenu.innerHTML;
            meanContainer.querySelector('.mean-nav').innerHTML = meanMenuContents;

            // remove all classes from EVERYTHING inside meanmenu nav
            if(meanRemoveAttrs) {
                Array.prototype.slice.call(document.querySelectorAll('.mean-nav ul, .mean-nav ul *')).forEach((el) => {
                    el.removeAttribute("class");
                    el.removeAttribute("id");
                });
            }
            nav = meanContainer.querySelector('.mean-nav ul');
            nav.classList.add('animated');
            meanMenu.style.display = 'none';
            nav[1] = document.querySelector(meanRevealClass);
            nav[1].innerHTML = meanMenuOpen;
            nav[1].style.display = '';

            var list = meanContainer.querySelectorAll( '.mean-nav ul ul' );
            for (var item of list) {
                if(item.childElementCount){
                    item.parentNode.insertAdjacentHTML('beforeend', '<a class="mean-expand" href="#">'+ meanExpand +'</a>');
                }
                item.classList.add('animated');
            }

            var list = meanContainer.querySelectorAll('.mean-expand');
            for (var item of list) {
                item.addEventListener("click",function(e){
                    e.preventDefault();
                    if (this.classList.contains("mean-clicked")) {
                        this.textContent = meanExpand;
                        this.previousElementSibling.classList.remove('slideInDown');
                    } else {
                        this.textContent = meanContract;
                        this.previousElementSibling.classList.add('slideInDown');
                    }
                    this.classList.toggle("mean-clicked");
                }, false);
            }

            nav[1].classList.remove("meanclose");
            nav[1].addEventListener("click",function(e){
                e.preventDefault();
                nav.classList.toggle('slideInDown');
                nav[1].classList.toggle("meanclose");
            }, false);

            // for one page websites, reset all variables...
            if ( singlePage ) {
                var list = meanContainer.querySelectorAll('.mean-nav ul > li > a:first-child');
                for (var item of list) {
                    item.addEventListener("click",function(e){
                        e.preventDefault();
                        Array.prototype.slice.call(document.querySelectorAll('.mean-nav ul')).forEach((el) => {
                            el.classList.remove('slideInDown');
                        });
                        nav[1].classList.remove("meanclose");
                        nav[1].innerHTML = meanMenuOpen;
                    });
                }
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
})();
