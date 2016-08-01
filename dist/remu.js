(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],2:[function(require,module,exports){
/*!
* Remu v1.0
* @Copyright (C) 2012-2014 Chris Wharton @ remuThemes (https://github.com/remuthemes/remu)
* @Copyright (C) 2015-2016 John Rayes (http://live627.github.io/remu/demo.html)
*/

'use strict';
var extend = require('xtend');
module.exports = window.Remu = function (options) {
    options = extend({
            remuTarget: 'header nav', // Target the current HTML markup you wish to replace
            remuContainer: 'body', // Choose where remu will be placed within the HTML
            remuScreenWidth: "480", // set the screen width you want remu to kick in at
            remuRemoveAttrs: false, // true to remove classes and IDs, false to keep them
            singlePage: false, // set to true for one page sites
            remuDisplay: "block", // override display method for table cell based layouts e.g. table-cell
    }, options);

    var remu = document.querySelector(options.remuTarget);
    var remuContainer = document.querySelector(options.remuContainer);
    var remuScreenWidth = options.remuScreenWidth;
    var remuRevealClass = ".navicon";
    var remuRemoveAttrs = options.remuRemoveAttrs;
    var singlePage = options.singlePage;
    var remuDisplay = options.remuDisplay;
    var remuExist = false;
    var nav = [];

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
        remuContainer.insertAdjacentHTML('afterbegin', '<div class="remu-bar"><a href="#nav" class="navicon"></a><nav class="remu-nav"></nav></div>');

        //push remu navigation into .remu-nav
        var remuContents = remu.innerHTML;
        remuContainer.querySelector('.remu-nav').innerHTML = remuContents;

        // remove all classes from EVERYTHING inside remu nav
        if(remuRemoveAttrs) {
            //~ Array.prototype.slice.call(document.querySelectorAll('.remu-nav ul, .remu-nav ul *')).forEach((el) => {
            Array.prototype.slice.call(document.querySelectorAll('.remu-nav ul, .remu-nav ul *')).forEach(function(el) {
                el.removeAttribute("class");
                el.removeAttribute("id");
            });
        }
        nav = remuContainer.querySelector('.remu-nav');
        remu.style.display = 'none';
        nav[1] = document.querySelector(remuRevealClass);

        Array.prototype.slice.call(nav.querySelectorAll('ul')).forEach(function(el) {
            if(el.childElementCount){
                el.parentNode.insertAdjacentHTML('beforeend', '<a class="remu-expand" href="#"></a>');
            }
            el.classList.add('animated');
        });

        Array.prototype.slice.call(nav.querySelectorAll('.remu-expand')).forEach(function(el) {
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
        nav[1].addEventListener("click",function(e){
            e.preventDefault();
            nav.firstElementChild.classList.toggle('slideInDown');
            nav[1].classList.toggle("remuclose");
        }, false);

        // for one page websites, reset all variables...
        if ( singlePage ) {
             Array.prototype.slice.call(nav.querySelectorAll('li > a:first-child')).forEach(function(elm) {
                elm.addEventListener("click",function(e){
                    e.preventDefault();
                    Array.prototype.slice.call(nav.querySelectorAll('ul')).forEach(function(el) {
                        el.classList.remove('slideInDown');
                        if (el.firstElementChild.children[2]) {
                            el.firstElementChild.children[2].classList.remove('remu-clicked');
                        }
                    });
                    nav[1].classList.remove("remuclose");
                });
            });
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

    // Expose methods
    this.show = showremu;
    this.hide = remuOriginal;
}

},{"xtend":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwic3JjL3JlbXUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCIvKiFcbiogUmVtdSB2MS4wXG4qIEBDb3B5cmlnaHQgKEMpIDIwMTItMjAxNCBDaHJpcyBXaGFydG9uIEAgcmVtdVRoZW1lcyAoaHR0cHM6Ly9naXRodWIuY29tL3JlbXV0aGVtZXMvcmVtdSlcbiogQENvcHlyaWdodCAoQykgMjAxNS0yMDE2IEpvaG4gUmF5ZXMgKGh0dHA6Ly9saXZlNjI3LmdpdGh1Yi5pby9yZW11L2RlbW8uaHRtbClcbiovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBleHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpO1xubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUmVtdSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICAgICAgICByZW11VGFyZ2V0OiAnaGVhZGVyIG5hdicsIC8vIFRhcmdldCB0aGUgY3VycmVudCBIVE1MIG1hcmt1cCB5b3Ugd2lzaCB0byByZXBsYWNlXG4gICAgICAgICAgICByZW11Q29udGFpbmVyOiAnYm9keScsIC8vIENob29zZSB3aGVyZSByZW11IHdpbGwgYmUgcGxhY2VkIHdpdGhpbiB0aGUgSFRNTFxuICAgICAgICAgICAgcmVtdVNjcmVlbldpZHRoOiBcIjQ4MFwiLCAvLyBzZXQgdGhlIHNjcmVlbiB3aWR0aCB5b3Ugd2FudCByZW11IHRvIGtpY2sgaW4gYXRcbiAgICAgICAgICAgIHJlbXVSZW1vdmVBdHRyczogZmFsc2UsIC8vIHRydWUgdG8gcmVtb3ZlIGNsYXNzZXMgYW5kIElEcywgZmFsc2UgdG8ga2VlcCB0aGVtXG4gICAgICAgICAgICBzaW5nbGVQYWdlOiBmYWxzZSwgLy8gc2V0IHRvIHRydWUgZm9yIG9uZSBwYWdlIHNpdGVzXG4gICAgICAgICAgICByZW11RGlzcGxheTogXCJibG9ja1wiLCAvLyBvdmVycmlkZSBkaXNwbGF5IG1ldGhvZCBmb3IgdGFibGUgY2VsbCBiYXNlZCBsYXlvdXRzIGUuZy4gdGFibGUtY2VsbFxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgdmFyIHJlbXUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMucmVtdVRhcmdldCk7XG4gICAgdmFyIHJlbXVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMucmVtdUNvbnRhaW5lcik7XG4gICAgdmFyIHJlbXVTY3JlZW5XaWR0aCA9IG9wdGlvbnMucmVtdVNjcmVlbldpZHRoO1xuICAgIHZhciByZW11UmV2ZWFsQ2xhc3MgPSBcIi5uYXZpY29uXCI7XG4gICAgdmFyIHJlbXVSZW1vdmVBdHRycyA9IG9wdGlvbnMucmVtdVJlbW92ZUF0dHJzO1xuICAgIHZhciBzaW5nbGVQYWdlID0gb3B0aW9ucy5zaW5nbGVQYWdlO1xuICAgIHZhciByZW11RGlzcGxheSA9IG9wdGlvbnMucmVtdURpc3BsYXk7XG4gICAgdmFyIHJlbXVFeGlzdCA9IGZhbHNlO1xuICAgIHZhciBuYXYgPSBbXTtcblxuICAgIC8vIHJlLWluc3RhdGUgb3JpZ2luYWwgbmF2IChhbmQgY2FsbCB0aGlzIG9uIHdpbmRvdy53aWR0aCBmdW5jdGlvbnMpXG4gICAgdmFyIHJlbXVPcmlnaW5hbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXJlbXVFeGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtdUNvbnRhaW5lci5yZW1vdmVDaGlsZChyZW11Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yZW11LWJhcicpKTtcbiAgICAgICAgcmVtdUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwicmVtdVwiKTtcbiAgICAgICAgcmVtdS5zdHlsZS5kaXNwbGF5ID0gcmVtdURpc3BsYXk7XG4gICAgICAgIHJlbXVFeGlzdCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBuYXZpZ2F0aW9uIHJldmVhbFxuICAgIHZhciBzaG93cmVtdSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVtdUV4aXN0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZW11RXhpc3QgPSB0cnVlO1xuICAgICAgICAvLyBhZGQgY2xhc3MgdG8gYm9keSBzbyB3ZSBkb24ndCBuZWVkIHRvIHdvcnJ5IGFib3V0IG1lZGlhIHF1ZXJpZXMgaGVyZSwgYWxsIENTUyBpcyB3cmFwcGVkIGluICcucmVtdSdcbiAgICAgICAgcmVtdUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVtdVwiKTtcbiAgICAgICAgcmVtdUNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCAnPGRpdiBjbGFzcz1cInJlbXUtYmFyXCI+PGEgaHJlZj1cIiNuYXZcIiBjbGFzcz1cIm5hdmljb25cIj48L2E+PG5hdiBjbGFzcz1cInJlbXUtbmF2XCI+PC9uYXY+PC9kaXY+Jyk7XG5cbiAgICAgICAgLy9wdXNoIHJlbXUgbmF2aWdhdGlvbiBpbnRvIC5yZW11LW5hdlxuICAgICAgICB2YXIgcmVtdUNvbnRlbnRzID0gcmVtdS5pbm5lckhUTUw7XG4gICAgICAgIHJlbXVDb250YWluZXIucXVlcnlTZWxlY3RvcignLnJlbXUtbmF2JykuaW5uZXJIVE1MID0gcmVtdUNvbnRlbnRzO1xuXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgY2xhc3NlcyBmcm9tIEVWRVJZVEhJTkcgaW5zaWRlIHJlbXUgbmF2XG4gICAgICAgIGlmKHJlbXVSZW1vdmVBdHRycykge1xuICAgICAgICAgICAgLy9+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW11LW5hdiB1bCwgLnJlbXUtbmF2IHVsIConKSkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZW11LW5hdiB1bCwgLnJlbXUtbmF2IHVsIConKSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImNsYXNzXCIpO1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbmF2ID0gcmVtdUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcucmVtdS1uYXYnKTtcbiAgICAgICAgcmVtdS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBuYXZbMV0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJlbXVSZXZlYWxDbGFzcyk7XG5cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGlmKGVsLmNoaWxkRWxlbWVudENvdW50KXtcbiAgICAgICAgICAgICAgICBlbC5wYXJlbnROb2RlLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgJzxhIGNsYXNzPVwicmVtdS1leHBhbmRcIiBocmVmPVwiI1wiPjwvYT4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5hdi5xdWVyeVNlbGVjdG9yQWxsKCcucmVtdS1leHBhbmQnKSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcInJlbXUtY2xpY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwicmVtdS1jbGlja2VkXCIpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBuYXZbMV0uY2xhc3NMaXN0LnJlbW92ZShcInJlbXVjbG9zZVwiKTtcbiAgICAgICAgbmF2WzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbmF2LmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC50b2dnbGUoJ3NsaWRlSW5Eb3duJyk7XG4gICAgICAgICAgICBuYXZbMV0uY2xhc3NMaXN0LnRvZ2dsZShcInJlbXVjbG9zZVwiKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIC8vIGZvciBvbmUgcGFnZSB3ZWJzaXRlcywgcmVzZXQgYWxsIHZhcmlhYmxlcy4uLlxuICAgICAgICBpZiAoIHNpbmdsZVBhZ2UgKSB7XG4gICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpID4gYTpmaXJzdC1jaGlsZCcpKS5mb3JFYWNoKGZ1bmN0aW9uKGVsbSkge1xuICAgICAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChuYXYucXVlcnlTZWxlY3RvckFsbCgndWwnKSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzJdLmNsYXNzTGlzdC5yZW1vdmUoJ3JlbXUtY2xpY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbmF2WzFdLmNsYXNzTGlzdC5yZW1vdmUoXCJyZW11Y2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBnZXQgYnJvd3NlciB3aWR0aFxuICAgICAgICB2YXIgY3VycmVudFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgICAgIGlmIChjdXJyZW50V2lkdGggPD0gcmVtdVNjcmVlbldpZHRoKSB7XG4gICAgICAgICAgICBzaG93cmVtdSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtdU9yaWdpbmFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZWZyZXNoLCBmYWxzZSk7XG5cbiAgICAvLyBydW4gbWFpbiBtZW51TWVudSBmdW5jdGlvbiBvbiBsb2FkXG4gICAgcmVmcmVzaCgpO1xuXG4gICAgLy8gRXhwb3NlIG1ldGhvZHNcbiAgICB0aGlzLnNob3cgPSBzaG93cmVtdTtcbiAgICB0aGlzLmhpZGUgPSByZW11T3JpZ2luYWw7XG59XG4iXX0=
