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
        remuDisplay: "block" }, options);

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
    var remuOriginal = function remuOriginal() {
        if (!remuExist) {
            return;
        }

        remuContainer.removeChild(remuContainer.querySelector('.remu-bar'));
        remuContainer.classList.remove("remu");
        remu.style.display = remuDisplay;
        remuExist = false;
    };

    // navigation reveal
    var showremu = function showremu() {
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
        if (remuRemoveAttrs) {
            Array.from(document.querySelectorAll('.remu-nav ul, .remu-nav ul *')).forEach(function (el) {
                el.removeAttribute("class");
                el.removeAttribute("id");
            });
        }
        nav = remuContainer.querySelector('.remu-nav');
        remu.style.display = 'none';
        nav[1] = document.querySelector(remuRevealClass);

        Array.from(nav.querySelectorAll('ul')).forEach(function (el) {
            if (el.childElementCount) {
                el.parentNode.insertAdjacentHTML('beforeend', '<a class="remu-expand" href="#"></a>');
            }
            el.classList.add('animated');
        });

        Array.from(nav.querySelectorAll('.remu-expand')).forEach(function (el) {
            el.addEventListener("click", function (e) {
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
        nav[1].addEventListener("click", function (e) {
            e.preventDefault();
            nav.firstElementChild.classList.toggle('slideInDown');
            nav[1].classList.toggle("remuclose");
        }, false);

        // for one page websites, reset all variables...
        if (singlePage) {
            Array.from(nav.querySelectorAll('li > a:first-child')).forEach(function (elm) {
                elm.addEventListener("click", function (e) {
                    e.preventDefault();
                    Array.from(nav.querySelectorAll('ul')).forEach(function (el) {
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

    var refresh = function refresh() {
        // get browser width
        var currentWidth = window.innerWidth || document.documentElement.clientWidth;

        if (currentWidth <= remuScreenWidth) {
            showremu();
        } else {
            remuOriginal();
        }
    };

    window.addEventListener("resize", refresh, false);

    // run main menuMenu function on load
    refresh();

    // Expose methods
    this.show = showremu;
    this.hide = remuOriginal;
};

},{"xtend":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwic3JjXFxyZW11LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7Ozs7OztBQU1BOztBQUNBLElBQUksU0FBUyxRQUFRLE9BQVIsQ0FBYjtBQUNBLE9BQU8sT0FBUCxHQUFpQixPQUFPLElBQVAsR0FBYyxVQUFVLE9BQVYsRUFBbUI7QUFDOUMsY0FBVSxPQUFPO0FBQ1Qsb0JBQVksWUFESCxFQUNpQjtBQUMxQix1QkFBZSxNQUZOLEVBRWM7QUFDdkIseUJBQWlCLEtBSFIsRUFHZTtBQUN4Qix5QkFBaUIsS0FKUixFQUllO0FBQ3hCLG9CQUFZLEtBTEgsRUFLVTtBQUNuQixxQkFBYSxPQU5KLEVBQVAsRUFPUCxPQVBPLENBQVY7O0FBU0EsUUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixRQUFRLFVBQS9CLENBQVg7QUFDQSxRQUFJLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIsUUFBUSxhQUEvQixDQUFwQjtBQUNBLFFBQUksa0JBQWtCLFFBQVEsZUFBOUI7QUFDQSxRQUFJLGtCQUFrQixVQUF0QjtBQUNBLFFBQUksa0JBQWtCLFFBQVEsZUFBOUI7QUFDQSxRQUFJLGFBQWEsUUFBUSxVQUF6QjtBQUNBLFFBQUksY0FBYyxRQUFRLFdBQTFCO0FBQ0EsUUFBSSxZQUFZLEtBQWhCO0FBQ0EsUUFBSSxNQUFNLEVBQVY7O0FBRUE7QUFDQSxRQUFJLGVBQWUsU0FBZixZQUFlLEdBQU07QUFDckIsWUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDWjtBQUNIOztBQUVELHNCQUFjLFdBQWQsQ0FBMEIsY0FB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LENBQXFCLFFBQXJCLENBQThCLENBQTlCLENBQUosRUFBc0M7QUFDbEMsK0JBQUcsaUJBQUgsQ0FBcUIsUUFBckIsQ0FBOEIsQ0FBOUIsRUFBaUMsU0FBakMsQ0FBMkMsTUFBM0MsQ0FBa0QsY0FBbEQ7QUFDSDtBQUNKLHFCQUxEO0FBTUEsd0JBQUksQ0FBSixFQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsV0FBeEI7QUFDSCxpQkFURDtBQVVILGFBWEE7QUFZSjtBQUNKLEtBbEVEOztBQW9FQSxRQUFJLFVBQVUsU0FBVixPQUFVLEdBQU07QUFDaEI7QUFDQSxZQUFJLGVBQWUsT0FBTyxVQUFQLElBQXFCLFNBQVMsZUFBVCxDQUF5QixXQUFqRTs7QUFFQSxZQUFJLGdCQUFnQixlQUFwQixFQUFxQztBQUNqQztBQUNILFNBRkQsTUFFTztBQUNIO0FBQ0g7QUFDSixLQVREOztBQVdBLFdBQU8sZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsT0FBbEMsRUFBMkMsS0FBM0M7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQUssSUFBTCxHQUFZLFFBQVo7QUFDQSxTQUFLLElBQUwsR0FBWSxZQUFaO0FBQ0gsQ0F4SEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIi8qIVxuKiBSZW11IHYxLjBcbiogQENvcHlyaWdodCAoQykgMjAxMi0yMDE0IENocmlzIFdoYXJ0b24gQCByZW11VGhlbWVzIChodHRwczovL2dpdGh1Yi5jb20vcmVtdXRoZW1lcy9yZW11KVxuKiBAQ29weXJpZ2h0IChDKSAyMDE1LTIwMTYgSm9obiBSYXllcyAoaHR0cDovL2xpdmU2MjcuZ2l0aHViLmlvL3JlbXUvZGVtby5odG1sKVxuKi9cblxuJ3VzZSBzdHJpY3QnO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5SZW11ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgICAgICAgIHJlbXVUYXJnZXQ6ICdoZWFkZXIgbmF2JywgLy8gVGFyZ2V0IHRoZSBjdXJyZW50IEhUTUwgbWFya3VwIHlvdSB3aXNoIHRvIHJlcGxhY2VcbiAgICAgICAgICAgIHJlbXVDb250YWluZXI6ICdib2R5JywgLy8gQ2hvb3NlIHdoZXJlIHJlbXUgd2lsbCBiZSBwbGFjZWQgd2l0aGluIHRoZSBIVE1MXG4gICAgICAgICAgICByZW11U2NyZWVuV2lkdGg6IFwiNDgwXCIsIC8vIHNldCB0aGUgc2NyZWVuIHdpZHRoIHlvdSB3YW50IHJlbXUgdG8ga2ljayBpbiBhdFxuICAgICAgICAgICAgcmVtdVJlbW92ZUF0dHJzOiBmYWxzZSwgLy8gdHJ1ZSB0byByZW1vdmUgY2xhc3NlcyBhbmQgSURzLCBmYWxzZSB0byBrZWVwIHRoZW1cbiAgICAgICAgICAgIHNpbmdsZVBhZ2U6IGZhbHNlLCAvLyBzZXQgdG8gdHJ1ZSBmb3Igb25lIHBhZ2Ugc2l0ZXNcbiAgICAgICAgICAgIHJlbXVEaXNwbGF5OiBcImJsb2NrXCIsIC8vIG92ZXJyaWRlIGRpc3BsYXkgbWV0aG9kIGZvciB0YWJsZSBjZWxsIGJhc2VkIGxheW91dHMgZS5nLiB0YWJsZS1jZWxsXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICBsZXQgcmVtdSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5yZW11VGFyZ2V0KTtcbiAgICBsZXQgcmVtdUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5yZW11Q29udGFpbmVyKTtcbiAgICBsZXQgcmVtdVNjcmVlbldpZHRoID0gb3B0aW9ucy5yZW11U2NyZWVuV2lkdGg7XG4gICAgbGV0IHJlbXVSZXZlYWxDbGFzcyA9IFwiLm5hdmljb25cIjtcbiAgICBsZXQgcmVtdVJlbW92ZUF0dHJzID0gb3B0aW9ucy5yZW11UmVtb3ZlQXR0cnM7XG4gICAgbGV0IHNpbmdsZVBhZ2UgPSBvcHRpb25zLnNpbmdsZVBhZ2U7XG4gICAgbGV0IHJlbXVEaXNwbGF5ID0gb3B0aW9ucy5yZW11RGlzcGxheTtcbiAgICBsZXQgcmVtdUV4aXN0ID0gZmFsc2U7XG4gICAgbGV0IG5hdiA9IFtdO1xuXG4gICAgLy8gcmUtaW5zdGF0ZSBvcmlnaW5hbCBuYXYgKGFuZCBjYWxsIHRoaXMgb24gd2luZG93LndpZHRoIGZ1bmN0aW9ucylcbiAgICBsZXQgcmVtdU9yaWdpbmFsID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXJlbXVFeGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtdUNvbnRhaW5lci5yZW1vdmVDaGlsZChyZW11Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yZW11LWJhcicpKTtcbiAgICAgICAgcmVtdUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwicmVtdVwiKTtcbiAgICAgICAgcmVtdS5zdHlsZS5kaXNwbGF5ID0gcmVtdURpc3BsYXk7XG4gICAgICAgIHJlbXVFeGlzdCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBuYXZpZ2F0aW9uIHJldmVhbFxuICAgIGxldCBzaG93cmVtdSA9ICgpID0+IHtcbiAgICAgICAgaWYgKHJlbXVFeGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtdUV4aXN0ID0gdHJ1ZTtcbiAgICAgICAgLy8gYWRkIGNsYXNzIHRvIGJvZHkgc28gd2UgZG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBtZWRpYSBxdWVyaWVzIGhlcmUsIGFsbCBDU1MgaXMgd3JhcHBlZCBpbiAnLnJlbXUnXG4gICAgICAgIHJlbXVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJlbXVcIik7XG4gICAgICAgIHJlbXVDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxkaXYgY2xhc3M9XCJyZW11LWJhclwiPjxhIGhyZWY9XCIjbmF2XCIgY2xhc3M9XCJuYXZpY29uXCI+PC9hPjxuYXYgY2xhc3M9XCJyZW11LW5hdlwiPjwvbmF2PjwvZGl2PicpO1xuXG4gICAgICAgIC8vcHVzaCByZW11IG5hdmlnYXRpb24gaW50byAucmVtdS1uYXZcbiAgICAgICAgbGV0IHJlbXVDb250ZW50cyA9IHJlbXUuaW5uZXJIVE1MO1xuICAgICAgICByZW11Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5yZW11LW5hdicpLmlubmVySFRNTCA9IHJlbXVDb250ZW50cztcblxuICAgICAgICAvLyByZW1vdmUgYWxsIGNsYXNzZXMgZnJvbSBFVkVSWVRISU5HIGluc2lkZSByZW11IG5hdlxuICAgICAgICBpZihyZW11UmVtb3ZlQXR0cnMpIHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbXUtbmF2IHVsLCAucmVtdS1uYXYgdWwgKicpKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG5hdiA9IHJlbXVDb250YWluZXIucXVlcnlTZWxlY3RvcignLnJlbXUtbmF2Jyk7XG4gICAgICAgIHJlbXUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgbmF2WzFdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyZW11UmV2ZWFsQ2xhc3MpO1xuXG4gICAgICAgIEFycmF5LmZyb20obmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsJykpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgaWYoZWwuY2hpbGRFbGVtZW50Q291bnQpe1xuICAgICAgICAgICAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCAnPGEgY2xhc3M9XCJyZW11LWV4cGFuZFwiIGhyZWY9XCIjXCI+PC9hPicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXJyYXkuZnJvbShuYXYucXVlcnlTZWxlY3RvckFsbCgnLnJlbXUtZXhwYW5kJykpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcInJlbXUtY2xpY2tlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnc2xpZGVJbkRvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwicmVtdS1jbGlja2VkXCIpO1xuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBuYXZbMV0uY2xhc3NMaXN0LnJlbW92ZShcInJlbXVjbG9zZVwiKTtcbiAgICAgICAgbmF2WzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIG5hdi5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QudG9nZ2xlKCdzbGlkZUluRG93bicpO1xuICAgICAgICAgICAgbmF2WzFdLmNsYXNzTGlzdC50b2dnbGUoXCJyZW11Y2xvc2VcIik7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICAvLyBmb3Igb25lIHBhZ2Ugd2Vic2l0ZXMsIHJlc2V0IGFsbCB2YXJpYWJsZXMuLi5cbiAgICAgICAgaWYgKCBzaW5nbGVQYWdlICkge1xuICAgICAgICAgICAgIEFycmF5LmZyb20obmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpID4gYTpmaXJzdC1jaGlsZCcpKS5mb3JFYWNoKGVsbSA9PiB7XG4gICAgICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG5hdi5xdWVyeVNlbGVjdG9yQWxsKCd1bCcpKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlSW5Eb3duJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXS5jbGFzc0xpc3QucmVtb3ZlKCdyZW11LWNsaWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG5hdlsxXS5jbGFzc0xpc3QucmVtb3ZlKFwicmVtdWNsb3NlXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICAgIC8vIGdldCBicm93c2VyIHdpZHRoXG4gICAgICAgIGxldCBjdXJyZW50V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRXaWR0aCA8PSByZW11U2NyZWVuV2lkdGgpIHtcbiAgICAgICAgICAgIHNob3dyZW11KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW11T3JpZ2luYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlZnJlc2gsIGZhbHNlKTtcblxuICAgIC8vIHJ1biBtYWluIG1lbnVNZW51IGZ1bmN0aW9uIG9uIGxvYWRcbiAgICByZWZyZXNoKCk7XG5cbiAgICAvLyBFeHBvc2UgbWV0aG9kc1xuICAgIHRoaXMuc2hvdyA9IHNob3dyZW11O1xuICAgIHRoaXMuaGlkZSA9IHJlbXVPcmlnaW5hbDtcbn1cbiJdfQ==
