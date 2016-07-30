/*!
* Remu v1.0
* @Copyright (C) 2012-2014 Chris Wharton @ remuThemes (https://github.com/remuthemes/remu)
* @Copyright (C) 2015-2016 John Rayes (http://live627.github.io/remu/demo.html)
*/

(function () {
    "use strict";

    window.Remu = function (options) {
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
                remuTarget: 'header nav', // Target the current HTML markup you wish to replace
                remuContainer: 'body', // Choose where remu will be placed within the HTML
                remuClose: "X", // single character you want to represent the close menu button
                remuOpen: "<span></span><span></span><span></span>", // text/markup you want when menu is closed
                remuScreenWidth: "480", // set the screen width you want remu to kick in at
                remuExpand: "+", // single character you want to represent the expand for ULs
                remuContract: "-", // single character you want to represent the contract for ULs
                remuRemoveAttrs: false, // true to remove classes and IDs, false to keep them
                singlePage: false, // set to true for one page sites
                remuDisplay: "block", // override display method for table cell based layouts e.g. table-cell
        }, options);

        var remu = document.querySelector(options.remuTarget);
        var remuContainer = document.querySelector(options.remuContainer);
        var remuClose = options.remuClose;
        var remuOpen = options.remuOpen;
        var remuScreenWidth = options.remuScreenWidth;
        var remuRevealClass = ".navicon";
        var remuExpand = options.remuExpand;
        var remuContract = options.remuContract;
        var remuRemoveAttrs = options.remuRemoveAttrs;
        var singlePage = options.singlePage;
        var remuDisplay = options.remuDisplay;
        var remuExist = false;
        var nav = [];

        var remuInner = function() {
            if (nav[1].classList.contains("remuclose")) {
                nav[1].innerHTML = remuClose;
            } else {
                nav[1].innerHTML = remuOpen;
            }
        };

        // re-instate original nav (and call this on window.width functions)
        var remuOriginal = function() {
            if (!remuExist) {
                return;
            }

            remuContainer.removeChild(remuContainer.querySelector('.remu-bar'));
            remuContainer.classList.remove("remu");
            remu.style.display = remuDisplay;
            remuExist = false;
        };

        // navigation reveal
        var showremu = function() {
            if (remuExist) {
                return;
            }

            remuExist = true;
            // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.remu'
            remuContainer.classList.add("remu");
            remuContainer.insertAdjacentHTML('afterbegin', '<div class="remu-bar"><a href="#nav" class="navicon">Show Navigation</a><nav class="remu-nav"></nav></div>');

            //push remu navigation into .remu-nav
            var remuContents = remu.innerHTML;
            remuContainer.querySelector('.remu-nav').innerHTML = remuContents;

            // remove all classes from EVERYTHING inside remu nav
            if(remuRemoveAttrs) {
                Array.prototype.slice.call(document.querySelectorAll('.remu-nav ul, .remu-nav ul *')).forEach((el) => {
                    el.removeAttribute("class");
                    el.removeAttribute("id");
                });
            }
            nav = remuContainer.querySelector('.remu-nav ul');
            nav.classList.add('animated');
            remu.style.display = 'none';
            nav[1] = document.querySelector(remuRevealClass);
            nav[1].innerHTML = remuOpen;
            nav[1].style.display = '';

            var list = remuContainer.querySelectorAll( '.remu-nav ul ul' );
            for (var item of list) {
                if(item.childElementCount){
                    item.parentNode.insertAdjacentHTML('beforeend', '<a class="remu-expand" href="#">'+ remuExpand +'</a>');
                }
                item.classList.add('animated');
            }

            var list = remuContainer.querySelectorAll('.remu-expand');
            for (var item of list) {
                item.addEventListener("click",function(e){
                    e.preventDefault();
                    if (this.classList.contains("remu-clicked")) {
                        this.textContent = remuExpand;
                        this.previousElementSibling.classList.remove('slideInDown');
                    } else {
                        this.textContent = remuContract;
                        this.previousElementSibling.classList.add('slideInDown');
                    }
                    this.classList.toggle("remu-clicked");
                }, false);
            }

            nav[1].classList.remove("remuclose");
            nav[1].addEventListener("click",function(e){
                e.preventDefault();
                nav.classList.toggle('slideInDown');
                nav[1].classList.toggle("remuclose");
            }, false);

            // for one page websites, reset all variables...
            if ( singlePage ) {
                var list = remuContainer.querySelectorAll('.remu-nav ul > li > a:first-child');
                for (var item of list) {
                    item.addEventListener("click",function(e){
                        e.preventDefault();
                        Array.prototype.slice.call(document.querySelectorAll('.remu-nav ul')).forEach((el) => {
                            el.classList.remove('slideInDown');
                        });
                        nav[1].classList.remove("remuclose");
                        nav[1].innerHTML = remuOpen;
                    });
                }
            }
        };

        var refresh = function() {
            // get browser width
            var currentWidth = window.innerWidth || document.documentElement.clientWidth;

            if (currentWidth <= remuScreenWidth) {
                showremu();
            } else {
                remuOriginal();
            }
        }

        window.addEventListener("resize", refresh, false);

        // run main menuMenu function on load
        refresh();
    };
})();
