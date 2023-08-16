(function($) {
    "use strict";

    /* ================ Revolution Slider. ================ */
  if($('.tp-banner').length > 0){
    $('.tp-banner').show().revolution({
      delay:6000,
          startheight: 850,
          startwidth: 1170,
          hideThumbs: 1000,
          navigationType: 'bullet',
          touchenabled: 'on',
          onHoverStop: 'on',
          navOffsetHorizontal: 0,
          navOffsetVertical: 0,
          dottedOverlay: 'none',
          fullWidth: 'on'
    });
  }
  if($('.tp-banner-full').length > 0){
    $('.tp-banner-full').show().revolution({
      delay:6000,
          hideThumbs: 1000,
          navigationType: 'bullet',
          touchenabled: 'on',
          onHoverStop: 'on',
          navOffsetHorizontal: 0,
          navOffsetVertical: 0,
          dottedOverlay: 'none',
          fullScreen: 'on'
    });
  }


     /* ================ Sortable Masonary with Filters ================ */
    function enableMasonry() {
        if ($('.sortable-masonry').length) {
            var winDow = $(window);
            // Needed variables
            var $container = $('.sortable-masonry .items-container');
            var $filter = $('.filter-btns');
            $container.isotope({
                filter: '*',
                masonry: {
                    columnWidth: 0
                },
                animationOptions: {
                    duration: 1000,
                    easing: 'linear'
                }
            });
             /* ================ Isotope Filter ================ */
            $filter.find('li').on('click', function() {
                var selector = $(this).attr('data-filter');

                try {
                    $container.isotope({
                        filter: selector,
                        animationOptions: {
                            duration: 1000,
                            easing: 'linear',
                            queue: false
                        }
                    });
                } catch (err) {

                }
                return false;
            });

            winDow.bind('resize', function() {
                var selector = $filter.find('li.active').attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 1000,
                        easing: 'linear',
                        queue: false
                    }
                });
            });

            var filterItemA = $('.filter-btns li');
            filterItemA.on('click', function() {
                var $this = $(this);
                if (!$this.hasClass('active')) {
                    filterItemA.removeClass('active');
                    $this.addClass('active');
                }
            });
        }
    }
 enableMasonry();

     //navbar
    $('[data-toggle="offcanvas"]').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
    });

    //header
  $(window).scroll(function() {
    if ($(window).scrollTop() >= 250) {
      $('header').addClass('fixed-header');
    } else {
      $('header').removeClass('fixed-header');
    }
  });


// Services Slides
  $('.review-slides').owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoHeight: true,
    smartSpeed: 500,
    margin: 30,
    autoplayHoverPause: true,
    autoplay: true,
    navText: [
      "<i class='ri-arrow-left-line'></i>",
      "<i class='ri-arrow-right-line'></i>"
    ],

    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      990: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  });

 
 /* ================ plans_scroll ================ */
    $(document).ready(function() {
        $(".plans_scroll").owlCarousel({
            loop: true,
            rewind: true,
            margin: 30,
            nav: false,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                700: {
                    items: 2,
                    nav: false
                },
                900: {
                    items: 2,
                    nav: false
                },
                1200: {
                    items: 3,
                    nav: false
                },
                1400: {
                    items: 3,
                    nav: false
                }
            }
        });
    });


    /* ================ masonry-filter ================ */
    $(document).ready(function() {
        $(".masonry-filter").owlCarousel({
            loop: true,
            rewind: true,
            margin: 30,
            nav: false,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: true
                },
                700: {
                    items: 2,
                    nav: false
                },
                900: {
                    items: 3,
                    nav: false
                },
                1170: {
                    items: 3,
                    nav: true
                }
            }
        });
    });


})(jQuery);