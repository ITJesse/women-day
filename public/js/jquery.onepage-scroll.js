/* ===========================================================
 * jquery-onepage-scroll.js v1.3
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

! function($) {

    var defaults = {
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        keyboard: true,
        beforeMove: null,
        afterMove: null,
        loop: true,
        responsiveFallback: false,
        direction: 'vertical'
    };


    $.fn.onepage_scroll = function(options) {
        var settings = $.extend({}, defaults, options),
            el = $(this),
            sections = $(settings.sectionContainer)
        total = sections.length,
            status = "off",
            topPos = 0,
            leftPos = 0,
            lastAnimation = 0,
            quietPeriod = 500,
            paginationList = "";

        $.fn.transformPage = function(settings, pos, index) {
            if (typeof settings.beforeMove == 'function') settings.beforeMove(index);
            $(this).css({
                "-webkit-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-moz-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-ms-transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "transform": (settings.direction == 'horizontal') ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "transition": "all " + settings.animationTime + "ms " + settings.easing
            });
            $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                if (typeof settings.afterMove == 'function') settings.afterMove(index);
            });
        }

        $.fn.moveDown = function() {
            var el = $(this)
            index = $(settings.sectionContainer + ".active").data("index");
            current = $(settings.sectionContainer + "[data-index='" + index + "']");
            next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
            if (next.length < 1) {
                if (settings.loop == true) {
                    pos = 0;
                    next = $(settings.sectionContainer + "[data-index='1']");
                } else {
                    return
                }

            } else {
                pos = (index * 100) * -1;
            }
            if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
            current.removeClass("active")
            next.addClass("active");
            if (settings.pagination == true) {
                $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
                $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
            }

            $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("body").addClass("viewing-page-" + next.data("index"))

            if (history.replaceState && settings.updateURL == true) {
                var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index + 1);
                history.pushState({}, document.title, href);
            }
            el.transformPage(settings, pos, next.data("index"));
        }

        $.fn.moveUp = function() {
            var el = $(this)
            index = $(settings.sectionContainer + ".active").data("index");
            current = $(settings.sectionContainer + "[data-index='" + index + "']");
            next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

            if (next.length < 1) {
                if (settings.loop == true) {
                    pos = ((total - 1) * 100) * -1;
                    next = $(settings.sectionContainer + "[data-index='" + total + "']");
                } else {
                    return
                }
            } else {
                pos = ((next.data("index") - 1) * 100) * -1;
            }
            if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
            current.removeClass("active")
            next.addClass("active")
            if (settings.pagination == true) {
                $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
                $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
            }
            $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("body").addClass("viewing-page-" + next.data("index"))

            if (history.replaceState && settings.updateURL == true) {
                var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index - 1);
                history.pushState({}, document.title, href);
            }
            el.transformPage(settings, pos, next.data("index"));
        }

        $.fn.moveTo = function(page_index) {
            current = $(settings.sectionContainer + ".active")
            next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");
            if (next.length > 0) {
                if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
                current.removeClass("active")
                next.addClass("active")
                $(".onepage-pagination li a" + ".active").removeClass("active");
                $(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
                $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
                $("body").addClass("viewing-page-" + next.data("index"))

                pos = ((page_index - 1) * 100) * -1;

                if (history.replaceState && settings.updateURL == true) {
                    var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (page_index - 1);
                    history.pushState({}, document.title, href);
                }
                el.transformPage(settings, pos, page_index);
            }
        }

        function responsive() {
            //start modification
            var valForTest = false;
            var typeOfRF = typeof settings.responsiveFallback

            if (typeOfRF == "number") {
                valForTest = $(window).width() < settings.responsiveFallback;
            }
            if (typeOfRF == "boolean") {
                valForTest = settings.responsiveFallback;
            }
            if (typeOfRF == "function") {
                valFunction = settings.responsiveFallback();
                valForTest = valFunction;
                typeOFv = typeof valForTest;
                if (typeOFv == "number") {
                    valForTest = $(window).width() < valFunction;
                }
            }

            //end modification
            if (valForTest) {
                $("body").addClass("disabled-onepage-scroll");
                $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
                $(settings.sectionContainer).unbind("swipedown swipeup");
            } else {
                if ($("body").hasClass("disabled-onepage-scroll")) {
                    $("body").removeClass("disabled-onepage-scroll");
                    $("html, body, .wrapper").animate({
                        scrollTop: 0
                    }, "fast");
                }

            }
        }

        // Prepare everything before binding wheel scroll

        el.addClass("onepage-wrapper").css("position", "relative");
        $.each(sections, function(i) {
            $(this).css({
                position: "absolute",
                top: topPos + "%"
            }).addClass("section").attr("data-index", i + 1);


            $(this).css({
                position: "absolute",
                left: (settings.direction == 'horizontal') ? leftPos + "%" : 0,
                top: (settings.direction == 'vertical' || settings.direction != 'horizontal') ? topPos + "%" : 0
            });

            if (settings.direction == 'horizontal')
                leftPos = leftPos + 100;
            else
                topPos = topPos + 100;


            if (settings.pagination == true) {
                paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>"
            }
        });

        // Create Pagination and Display Them
        if (settings.pagination == true) {
            if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

            if (settings.direction == 'horizontal') {
                posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
                el.find(".onepage-pagination").css("margin-left", posLeft);
            } else {
                posTop = (el.find(".onepage-pagination").height() / 2) * -1;
                el.find(".onepage-pagination").css("margin-top", posTop);
            }
            $('ul.onepage-pagination').html(paginationList);
        }

        if (window.location.hash != "" && window.location.hash != "#1") {
            init_index = window.location.hash.replace("#", "")

            if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
                $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active")
                $("body").addClass("viewing-page-" + init_index)
                if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

                next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
                if (next) {
                    next.addClass("active")
                    if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
                    $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
                    $("body").addClass("viewing-page-" + next.data("index"))
                    if (history.replaceState && settings.updateURL == true) {
                        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (init_index);
                        history.pushState({}, document.title, href);
                    }
                }
                pos = ((init_index - 1) * 100) * -1;
                el.transformPage(settings, pos, init_index);
            } else {
                $(settings.sectionContainer + "[data-index='1']").addClass("active")
                $("body").addClass("viewing-page-1")
                if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
            }
        } else {
            $(settings.sectionContainer + "[data-index='1']").addClass("active")
            $("body").addClass("viewing-page-1")
            if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
        }

        if (settings.pagination == true) {
            $(".onepage-pagination li a").click(function() {
                var page_index = $(this).data("index");
                el.moveTo(page_index);
            });
            $("[class^=btn]").click(function() {
                var page_index = $(this).data("index");
                el.moveTo(page_index);
            });
        }


        if (settings.responsiveFallback != false) {
            $(window).resize(function() {
                responsive();
            });

            responsive();
        }


        return false;
    }


}(window.jQuery);
