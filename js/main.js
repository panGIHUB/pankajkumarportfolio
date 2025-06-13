AOS.init({
  duration: 800,
  easing: 'slide'
});

(function($) {
  "use strict";

  // Initialize Stellar.js (parallax)
  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });

  // Full height elements
  var fullHeight = function() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function() {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // Loader
  var loader = function() {
    setTimeout(function() {
      if ($('#ftco-loader').length > 0) {
        $('#ftco-loader').removeClass('show');
      }
    }, 1);
  };
  loader();

  // Initialize Scrollax
  $.Scrollax();

  // Burger Menu
  var burgerMenu = function() {
    $('body').on('click', '.js-fh5co-nav-toggle', function(event) {
      event.preventDefault();
      $('#ftco-nav').toggleClass('active');
      $(this).toggleClass('active');
    });
  };
  burgerMenu();

  // Smooth scroll for internal links only (FIXED)
  var onePageClick = function() {
    $(document).on('click', '#ftco-nav a[href^="#"]', function(event) {
      if (this.hostname && this.hostname !== window.location.hostname) {
        return;
      }
     
      var hash = this.hash;
      if (hash) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $(hash).offset().top - 70
        }, 500);
      }
    });
  };
  onePageClick();

  // Carousel
  var carousel = function() {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: false,
      autoplayHoverPause: false,
      items: 1,
      navText: ["<span class='ion-md-arrow-back'></span>", "<span class='ion-chevron-right'></span>"],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 }
      }
    });
  };
  carousel();

  // Dropdown hover
  $('nav .dropdown').hover(function() {
    var $this = $(this);
    $this.addClass('show');
    $this.find('> a').attr('aria-expanded', true);
    $this.find('.dropdown-menu').addClass('show');
  }, function() {
    var $this = $(this);
    $this.removeClass('show');
    $this.find('> a').attr('aria-expanded', false);
    $this.find('.dropdown-menu').removeClass('show');
  });

  // Scroll effects
  var scrollWindow = function() {
    $(window).scroll(function() {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $('.ftco_navbar'),
        sd = $('.js-scroll-wrap');

      if (st > 150) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 150) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 350) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }
        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 350) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  // Counter animation
  var counter = function() {
    $('#section-counter, .hero-wrap, .ftco-counter, .ftco-about').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
        $('.number').each(function() {
          var $this = $(this),
            num = $this.data('number');
          $this.animateNumber({
            number: num,
            numberStep: comma_separator_number_step
          }, 7000);
        });
      }
    }, { offset: '95%' });
  };
  counter();

  // Animate on scroll
  var contentWayPoint = function() {
    var i = 0;
    $('.ftco-animate').waypoint(function(direction) {
      if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
        i++;
        $(this.element).addClass('item-animate');
        setTimeout(function() {
          $('body .ftco-animate.item-animate').each(function(k) {
            var el = $(this);
            setTimeout(function() {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn ftco-animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft ftco-animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight ftco-animated');
              } else {
                el.addClass('fadeInUp ftco-animated');
              }
              el.removeClass('item-animate');
            }, k * 50);
          });
        }, 100);
      }
    }, { offset: '95%' });
  };
  contentWayPoint();

  // Magnific Popup for images
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });

  // Magnific Popup for iframes
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  // Swiper slider initialization
  var swiper = new Swiper('.testimonials-slider', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });

  // Make sure external links open normally
  $(document).on('click', 'a[href^="http"]', function(e) {
    if (this.hostname !== window.location.hostname) {
      e.stopPropagation();
    }
  });

  /************************************
   * Enhanced Certificate & Badges Section *
   ************************************/
  var certSwiper, badgesSwiper;

  var initCertificateCarousel = function() {
    if ($('.certificates-swiper').length) {
      certSwiper = new Swiper('.certificates-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        loopAdditionalSlides: 2,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.certificates-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.certificates-swiper .swiper-button-next',
          prevEl: '.certificates-swiper .swiper-button-prev',
        },
        breakpoints: {
          768: {
            coverflowEffect: {
              rotate: 10,
              stretch: -50,
              depth: 150,
            }
          },
          480: {
            coverflowEffect: {
              rotate: 5,
              stretch: -100,
              depth: 100,
            }
          }
        }
      });

      certSwiper.on('slideChange', function() {
        $('.certificates-swiper .swiper-slide').removeClass('animate__animated animate__pulse');
        $('.certificates-swiper .swiper-slide-active').addClass('animate__animated animate__pulse');
      });
    }

    // Initialize Badges Swiper
    if ($('.badges-swiper').length) {
      badgesSwiper = new Swiper('.badges-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        loopAdditionalSlides: 2,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        coverflowEffect: {
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.badges-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.badges-swiper .swiper-button-next',
          prevEl: '.badges-swiper .swiper-button-prev',
        },
        breakpoints: {
          768: {
            coverflowEffect: {
              rotate: 10,
              stretch: -50,
              depth: 150,
            }
          },
          480: {
            coverflowEffect: {
              rotate: 5,
              stretch: -100,
              depth: 100,
            }
          }
        }
      });

      badgesSwiper.on('slideChange', function() {
        $('.badges-swiper .swiper-slide').removeClass('animate__animated animate__pulse');
        $('.badges-swiper .swiper-slide-active').addClass('animate__animated animate__pulse');
      });
    }
  };

  var initCertificateFilters = function() {
    $('.certificate-filter-btn').on('click', function() {
      var filter = $(this).data('filter');
      $('.certificate-filter-btn').removeClass('active');
      $(this).addClass('active');
     
      if (filter === 'all') {
        $('.certificate-item').show();
      } else {
        $('.certificate-item').hide();
        $('.certificate-item[data-category="' + filter + '"]').show();
      }
     
      if (typeof certSwiper !== 'undefined') {
        setTimeout(function() {
          certSwiper.update();
        }, 100);
      }
    });
  };

  var initCertificateSearch = function() {
    $('#certificate-search').on('keyup', function() {
      var value = $(this).val().toLowerCase();
      $('.certificate-item').each(function() {
        var text = $(this).text().toLowerCase();
        $(this).toggle(text.indexOf(value) > -1);
      });
    });
  };

  var initCertificateModal = function() {
    $('.certificate-view-btn').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });

    $('.badge-view-btn').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  };

  var initCertificateDownloads = function() {
    $('.certificate-download-btn').on('click', function(e) {
      e.preventDefault();
      var certId = $(this).data('cert-id');
      var downloadUrl = $(this).attr('href');
      console.log('Downloading certificate ID:', certId);
      window.location.href = downloadUrl;
    });
  };

  var initCertificateToggle = function() {
    $('.certificate-toggle-btn').on('click', function(e) {
      e.preventDefault();
      var target = $(this).data('target');
      
      // Update active button
      $('.certificate-toggle-btn').removeClass('active');
      $(this).addClass('active');
      
      // Toggle content visibility
      if (target === 'certificates') {
        $('.certificates-content').addClass('active').show();
        $('.badges-content').removeClass('active').hide();
        
        if (typeof certSwiper !== 'undefined') {
          setTimeout(function() {
            certSwiper.update();
            certSwiper.slideTo(0, 0);
          }, 10);
        }
      } else {
        $('.certificates-content').removeClass('active').hide();
        $('.badges-content').addClass('active').show();
        
        if (typeof badgesSwiper !== 'undefined') {
          setTimeout(function() {
            badgesSwiper.update();
            badgesSwiper.slideTo(0, 0);
          }, 10);
        }
      }
    });
  };

  var initCertificateSection = function() {
    if ($('#certificate-section').length) {
      initCertificateCarousel();
      initCertificateFilters();
      initCertificateSearch();
      initCertificateModal();
      initCertificateDownloads();
      initCertificateToggle();
     
      // Set initial state
      $('.certificates-content').addClass('active').show();
      $('.badges-content').removeClass('active').hide();
      $('.certificate-toggle-btn[data-target="certificates"]').addClass('active');
     
      $('#certificate-section').waypoint(function(direction) {
        if (direction === 'down') {
          $('.certificate-item, .badge-item').addClass('animate__animated animate__fadeInUp');
        }
      }, { offset: '75%' });
    }
  };

  // Initialize certificate section
  $(document).ready(function() {
    initCertificateSection();
  });

})(jQuery);
