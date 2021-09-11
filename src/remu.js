/*!
* Remu v1.0
* @Copyright (C) 2012-2014 Chris Wharton @ remuThemes (https://github.com/remuthemes/remu)
* @Copyright (C) 2015-2016 John Rayes (http://live627.github.io/remu/demo.html)
*/

import extend from 'xtend';

export default window.Remu = function (options) {
    options = extend({
            remuTarget: 'header nav', // Target the current HTML markup you wish to replace
            remuContainer: 'body', // Choose where remu will be placed within the HTML
            remuScreenWidth: "480", // set the screen width you want remu to kick in at
            remuRemoveAttrs: false, // true to remove classes and IDs, false to keep them
            singlePage: false, // set to true for one page sites
            remuDisplay: "block", // override display method for table cell based layouts e.g. table-cell
    }, options);

    let remu = document.querySelector(options.remuTarget);
    let remuContainer = document.querySelector(options.remuContainer);
    let remuScreenWidth = options.remuScreenWidth;
    let remuRevealClass = ".navicon";
    let remuRemoveAttrs = options.remuRemoveAttrs;
    let singlePage = options.singlePage;
    let remuDisplay = options.remuDisplay;
    let remuExist = false;
    let nav = [];

    // re-instate original nav (and call this on window.width functions)
    let remuOriginal = () => {
        if (!remuExist) {
            return;
        }

        remuContainer.removeChild(remuContainer.querySelector('.remu-bar'));
        remuContainer.classList.remove("remu");
        remu.style.display = remuDisplay;
        remuExist = false;
    };

    // navigation reveal
    let showremu = () => {
        if (remuExist) {
            return;
        }

        remuExist = true;
        // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.remu'
        remuContainer.classList.add("remu");
        remuContainer.insertAdjacentHTML('afterbegin', '<div class="remu-bar"><a href="#nav" class="navicon"></a><nav class="remu-nav"></nav></div>');

        //push remu navigation into .remu-nav
        let remuContents = remu.innerHTML;
        remuContainer.querySelector('.remu-nav').innerHTML = remuContents;

        // remove all classes from EVERYTHING inside remu nav
        if(remuRemoveAttrs) {
            Array.from(document.querySelectorAll('.remu-nav ul, .remu-nav ul *')).forEach(el => {
                el.removeAttribute("class");
                el.removeAttribute("id");
            });
        }
        nav = remuContainer.querySelector('.remu-nav');
        remu.style.display = 'none';
        nav[1] = document.querySelector(remuRevealClass);

        Array.from(nav.querySelectorAll('ul')).forEach(({childElementCount, parentNode, classList}) => {
            if(childElementCount){
                parentNode.insertAdjacentHTML('beforeend', '<a class="remu-expand" href="#"></a>');
            }
            classList.add('animated');
        });

        Array.from(nav.querySelectorAll('.remu-expand')).forEach(el => {
            el.addEventListener("click",function(e){
                e.preventDefault();
                if (this.classList.contains("remu-clicked")) {
                    this.previousElementSibling.classList.remove('slideInDown');
                } else {
                    this.previousElementSibling.classList.add('slideInDown');
                }
                this.classList.toggle("remu-clicked");
            }, false);
        });

        nav[1].classList.remove("remuclose");
        nav[1].addEventListener("click", e => {
            e.preventDefault();
            nav.firstElementChild.classList.toggle('slideInDown');
            nav[1].classList.toggle("remuclose");
        }, false);

        // for one page websites, reset all variables...
        if ( singlePage ) {
             Array.from(nav.querySelectorAll('li > a:first-child')).forEach(elm => {
                elm.addEventListener("click", e => {
                    e.preventDefault();
                    Array.from(nav.querySelectorAll('ul')).forEach(({classList, firstElementChild}) => {
                        classList.remove('slideInDown');
                        if (firstElementChild.children[2]) {
                            firstElementChild.children[2].classList.remove('remu-clicked');
                        }
                    });
                    nav[1].classList.remove("remuclose");
                });
            });
        }
    };

    let refresh = () => {
        // get browser width
        let currentWidth = window.innerWidth || document.documentElement.clientWidth;

        if (currentWidth <= remuScreenWidth) {
            showremu();
        } else {
            remuOriginal();
        }
    }

    window.addEventListener("resize", refresh, false);

    // run main menuMenu function on load
    refresh();

    // Expose methods
    this.show = showremu;
    this.hide = remuOriginal;
};
