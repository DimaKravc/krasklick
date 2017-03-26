jQuery(document).ready(function ($) {
    'use strict';

    /**
     *  Application Init
     *  Init Application widgets and components.
     */

    Application.init({
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
            $( ".range-slider" ).slider({
                range: true,
                min: 0,
                max: 10000,
                values: [ 50, 10000 ],
                slide: function( event, ui ) {
                    $( "#amount" ).val( ui.values[ 0 ] + " р" + " - " + ui.values[ 1 ] + " p" );
                }
            });
            $( "#amount" ).val( $( ".range-slider" ).slider( "values", 0 ) + " р" +
                " - " + $( ".range-slider" ).slider( "values", 1 ) + " p");
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
        logoSlider: function () {
            $('.footer-carousel').owlCarousel({
                items: 3,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true
            });
        }
    });
});
