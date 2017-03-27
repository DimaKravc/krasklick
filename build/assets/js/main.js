jQuery(document).ready(function ($) {
    'use strict';

    /**
     *  Application Init
     *  Init Application widgets and components.
     */

    Application.init({
        homeSlider: function () {
            $(window).on('load', function () {
                $('.css3-spinner').fadeOut(1000);
            });
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                effect: 'fade',
                autoplay: 5000,
                speed: 1000,
                onInit: function (a) {
                    $(".swiper-slide-active [data-caption-animate]").each(function () {
                        var t = $(this),
                            a = t.attr("data-caption-delay"),
                            i = 0;
                        if (i = a ? Number(a) + 750 : 750, !t.hasClass("animated")) {
                            t.addClass("not-animated");
                            var s = t.attr("data-caption-animate");
                            setTimeout(function () {
                                t.removeClass("not-animated").addClass(s + " animated")
                            }, i)
                        }
                    });
                    $("[data-caption-animate]").each(function () {
                        var t = $(this),
                            a = t.attr("data-caption-animate");
                        return t.parents(".swiper-slide").hasClass("swiper-slide-active") ? !0 :
                            void t.removeClass("animated").removeClass(a).addClass("not-animated")
                    });
                },
                onSlideChangeStart: function (a) {
                    a.length > 0 && (1 == n ? d.html(Number(t.find(".swiper-slide.swiper-slide-active").attr("data-swiper-slide-index")) + 1) : d.html(L.activeIndex + 1)),
                        $("[data-caption-animate]").each(function () {
                            var t = $(this), a = t.attr("data-caption-animate");
                            return t.parents(".swiper-slide").hasClass("swiper-slide-active") ? !0 : void t.removeClass("animated").removeClass(a).addClass("not-animated")
                        });
                },
                onSlideChangeEnd: function (a) {
                    $(".swiper-slide.swiper-slide-active [data-caption-animate]").each(function () {
                        var t = $(this),
                            a = t.attr("data-caption-delay"),
                            i = 0;
                        if (i = a ? Number(a) + 300 : 300, !t.hasClass("animated")) {
                            t.addClass("not-animated");
                            var s = t.attr("data-caption-animate");
                            setTimeout(function () {
                                t.removeClass("not-animated").addClass(s + " animated")
                            }, i)
                        }
                    })
                }
            })
        },
        logoSlider: function () {
            $('[data-js="logoCarousel"]').owlCarousel({
                items: 3,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true
            });
        },
        inputFile: function () {
            function readURL(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $(input).addClass('uploaded');
                        $(input).next()
                            .css('background-image', 'url("' + e.target.result + '")');
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }

            $(".input-file").on('click', function (e) {
                if ($(this).hasClass('uploaded')) {
                    e.preventDefault();

                    $(this).next().css('background-image', '');
                    $(this).removeClass('uploaded');
                }

                this.value = null;
            });
            $(".input-file").on('change', function (e) {
                readURL(this);
            });
        },
        rangeSlider: function () {
            $(".range-slider").slider({
                range: true,
                min: 0,
                max: 10000,
                values: [50, 10000],
                slide: function (event, ui) {
                    $("#amount").val(ui.values[0] + " р" + " - " + ui.values[1] + " p");
                }
            });
            $("#amount").val($(".range-slider").slider("values", 0) + " р" +
                " - " + $(".range-slider").slider("values", 1) + " p");
        },
        serView: function () {
            var $toggle = $("[data-js='ser-toggle']");
            var $view = $("[data-js='ser-view']");

            $toggle.on('click', function (e) {
                e.preventDefault();

                if (!$(this).hasClass('active')) {
                    $view.toggleClass('view-grid');
                    $toggle.removeClass('active');
                    $(this).addClass('active');
                }
            })
        },
        select2: function () {
            $('[data-js="customSelect"]').select2();
        }
    });
});