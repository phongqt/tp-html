jQuery.noConflict();
jQuery(document).ready(function($) {
    "use strict";
    var currentWidth = window.innerWidth || document.documentElement.clientWidth;
    if ($("#header-wrapper .apply-sticky-header").length > 0) {
        $("#header-wrapper  .apply-sticky-header").sticky({
            topSpacing: 0
        })
    }
    if ($('li.has-mega-menu').length > 0 && $('.dt-no-header-builder-content').length == 0) {
        jQuery.fn.liCenter = function() {
            var w = $('#header .container').width()
              , a = $(window).width()
              , c = $('.dt-header-menu').parents('.wpb_column')
              , ol = c.offset().left;
            $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul > li.menu-item-object-dt_mega_menus').css("width", w + "px");
            this.css("width", a + "px");
            this.css("left", ol * -1 + "px");
            return this
        }
        ;
        $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul').liCenter();
        $(window).on('resize', function() {
            $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul').liCenter()
        })
    }
    $('.alignfull').each(function() {
        if ($(this).parents('#primary').hasClass('content-full-width')) {
            if ($(this).parents('body').hasClass('layout-boxed')) {
                if ($('body').hasClass('single-post') && $(this).parents('.blog-entry').hasClass('post-left-date')) {
                    var containerWidth = $('.layout-boxed .wrapper').width();
                    $(this).css('width', containerWidth);
                    var mainLeft = $('#main').offset().left;
                    var primaryLeft = $('#primary').offset().left;
                    var $containerPadding = $(this).parents('.blog-entry.post-left-date').css('padding-left');
                    $containerPadding = $containerPadding.replace('px', '');
                    var sectionMargin = parseInt(primaryLeft, 10) - parseInt(mainLeft, 10) + parseInt($containerPadding, 10);
                    var offset = 0 - sectionMargin;
                    $(this).css('left', offset)
                } else {
                    var containerWidth = $('.layout-boxed .wrapper').width();
                    $(this).css('width', containerWidth);
                    var mainLeft = $('#main').offset().left;
                    var primaryLeft = $('#primary').offset().left;
                    var sectionMargin = parseInt(primaryLeft, 10) - parseInt(mainLeft, 10);
                    var offset = 0 - sectionMargin;
                    $(this).css('left', offset)
                }
            } else {
                if ($('body').hasClass('single-post') && $(this).parents('.blog-entry').hasClass('post-left-date')) {
                    var windowWidth = $(window).width();
                    $(this).css('width', windowWidth);
                    var $container = '';
                    $container = $(this).parents('.blog-entry');
                    if (!$container.length) {
                        $container = $(this).parents('.type-page')
                    }
                    var $containerPadding = $(this).parents('.blog-entry.post-left-date').css('padding-left');
                    $containerPadding = $containerPadding.replace('px', '');
                    var offset = 0 - $container.offset().left - $containerPadding;
                    $(this).css('left', offset)
                } else {
                    var windowWidth = $(window).width();
                    $(this).css('width', windowWidth);
                    var $container = '';
                    $container = $(this).parents('.blog-entry');
                    if (!$container.length) {
                        $container = $(this).parents('.type-page')
                    }
                    var offset = 0 - $container.offset().left;
                    $(this).css('left', offset)
                }
            }
        }
    });
    if ($('.wp-block-categories-list').length) {
        loopCategories($('.wp-block-categories-list'));
        function loopCategories(item) {
            item.find('li').each(function() {
                var span_text = $(this).find('span').html();
                $(this).find('span').remove()
                $('<span>' + span_text + '</span>').insertAfter($(this).find('a'));
                if ($(this).find('ul.children').length) {
                    loopCategories($(this).find('ul.children'))
                }
            })
        }
    }
    $("div.dt-header-menu").each(function() {
        var d = $(this).data('menu')
          , c = $(this).find('ul[data-menu="' + d + '"]').clone()
          , m = $('body').find('.mobile-menu[data-menu="' + d + '"]');
        c.prependTo(m)
    });
    $('.menu-trigger').on('click', function(event) {
        $(this).next('.mobile-menu').toggleClass('nav-is-visible');
        $(this).parent('.mobile-nav-container').find('.overlay').toggleClass('is-visible');
        $('body').toggleClass('nav-is-visible')
    });
    function closeMobNav() {
        $('body').removeClass('nav-is-visible');
        $('.overlay').removeClass('is-visible');
        $('.mobile-menu').removeClass('nav-is-visible');
        $('.menu-item-has-children a').removeClass('selected');
        $('.menu-item-has-children ul.sub-menu').addClass('is-hidden')
    }
    $('li.close-nav').on('click', function(event) {
        closeMobNav()
    });
    $('.mobile-nav-container > .overlay').on('click', function(event) {
        closeMobNav()
    });
    $('.menu-item-has-children > a, .page_item_has_children > a').on('click', function(event) {
        if ($('body').hasClass('nav-is-visible')) {
            event.preventDefault();
            var a = $(this).clone();
            $(this).next('.sub-menu').find('.see-all').html(a)
        }
        var selected = $(this);
        if (selected.next('ul').hasClass('is-hidden')) {
            selected.addClass('selected').next('ul.sub-menu').removeClass('is-hidden')
        } else {
            selected.removeClass('selected').next('ul.sub-menu').addClass('is-hidden')
        }
    });
    $('.go-back').on('click', function() {
        $(this).parent('ul:not(.menu)').addClass('is-hidden')
    });
    if ($('ul.visual-nav').length > 0) {
        $('ul.visual-nav').visualNav({
            selectedClass: 'current_page_item',
            externalLinks: 'external',
            useHash: !1,
        })
    }
    if (currentWidth > 767) {
        if ($('#primary').hasClass('with-both-sidebar')) {
            if (($('#secondary-left > div').is(':empty') && $('#secondary-right div').is(':empty'))) {
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-both-sidebar")
            } else if ($('#secondary-left > div').is(':empty')) {
                $('#primary').addClass("with-right-sidebar").removeClass("with-both-sidebar")
            } else if ($('#secondary-right > div').is(':empty')) {
                $('#primary').addClass("with-left-sidebar").removeClass("with-both-sidebar")
            }
        } else if ($('#primary').hasClass('with-left-sidebar')) {
            if ($('#secondary-left > div').is(':empty')) {
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-left-sidebar")
            }
        } else if ($('#primary').hasClass('with-right-sidebar')) {
            if ($('#secondary-right > div').is(':empty')) {
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-right-sidebar")
            }
        }
    }
    $('#main .sidebar-as-sticky').theiaStickySidebar({
        additionalMarginTop: 70,
        containerSelector: $('#primary').parent('.container')
    });
    if ($('.sidenav-sticky').length) {
        $('.sidenav-sticky .side-navigation').theiaStickySidebar({
            additionalMarginTop: 90,
            containerSelector: $('#primary')
        })
    }
    $("select").each(function() {
        if ($(this).css('display') != 'none') {
            $(this).wrap('<div class="selection-box"></div>')
        }
    });
    $('.activity-type-tabs > ul >li:first').addClass('selected');
    $('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');
    $('.downcount').each(function() {
        var el = $(this);
        el.downCount({
            date: el.attr('data-date'),
            offset: el.attr('data-offset')
        })
    });
    $('p:empty').each(function() {
        $(this).next('br').remove();
        $(this).remove()
    });
    $('.dt-sc-contact-details-on-map a.map-switch-icon').on("click", function() {
        $(this).parents('.dt-sc-contact-details-on-map').toggleClass('hide-overlay');
        $('.dt-sc-map-overlay').toggleClick();
        return !1
    });
    $('.dt-sc-contact-details-on-map a.switch-icon').on("click", function() {
        $(this).parents('.dt-sc-contact-details-on-map').addClass('hide-overlay');
        $('.dt-sc-map-overlay').toggleClick();
        $('.back-to-contact').toggleClick();
        return !1
    });
    $('.dt-sc-contact-details-on-map a.back-to-contact').on("click", function() {
        $(this).parents('.dt-sc-contact-details-on-map').removeClass('hide-overlay');
        $('.dt-sc-map-overlay').toggleClick();
        $(this).toggleClick();
        return !1
    });
    $("body").on("click", ".reviews_tab a", function() {
        setTimeout(function() {
            $("html, body").getNiceScroll().resize()
        }, 100)
    });
    $(window).on("resize", function() {
        if ($(".apply-isotope").length) {
            $(".apply-isotope").isotope({
                itemSelector: '.column',
                transformsEnabled: !1,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            })
        }
    });
    $(window).on("load", function() {
        if ($(".apply-isotope").length) {
            $(".apply-isotope").isotope({
                itemSelector: '.column',
                transformsEnabled: !1,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            })
        }
        if (($("ul.entry-gallery-post-slider").length) && ($("ul.entry-gallery-post-slider li").length > 1)) {
            $("ul.entry-gallery-post-slider").bxSlider({
                auto: !1,
                video: !0,
                useCSS: !1,
                pager: '',
                autoHover: !0,
                adaptiveHeight: !0
            })
        }
    });
    $('input, textarea').placeholder();
    $().UItoTop({
        easingType: 'easeOutQuart'
    });
    if ($('.dt-sc-icon-box-type9').length) {
        setTimeout(function() {
            $('.dt-sc-icon-box-type9').each(function() {
                $(this).find('.icon-wrapper').css('height', $(this).find('.icon-content').outerHeight(!0))
            })
        }, 1000)
    }
    if ($('ul.dt-sc-tabs-vertical-frame').length) {
        $('ul.dt-sc-tabs-vertical-frame').each(function() {
            $(this).css('min-height', $(this).height())
        })
    }
    if ($('ul.dt-sc-tabs-vertical').length) {
        $('ul.dt-sc-tabs-vertical').each(function() {
            $(this).css('min-height', $(this).height())
        })
    }
    if ($(".dt-sc-subtitle-parallax").length) {
        $('.dt-sc-subtitle-parallax').each(function() {
            $(this).find('.main-title-section-bg').on('inview', function(event, visible) {
                if (visible === !0) {
                    $(this).parallax("50%", 0.3)
                }
            })
        })
    }
    // Scroll to element
    $('li.menu-item-object-page a').click(function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
});
