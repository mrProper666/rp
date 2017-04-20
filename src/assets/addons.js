(function ($) {
  "use strict";

  var _width = $(window).width();
  $('body').attr('data-resolution', _width + 'px');
  $('body').attr('data-touch', Modernizr.touchevents);
  $('body').animate({opacity:1},{duration:600, always:function(){$('body').css({'opacity':1})}});

  // SVG to PNG fallback
  if(!Modernizr.svg) {
      $('img[src*="svg"]').attr('src', function() {
          return $(this).attr('src').replace('.svg', '.png');
      });
  } else {
    /*  Replace all SVG images with inline SVG */
    $('img.svg').each(function(){
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
         //Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');
         //Add replaced image\'s ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
         //Add replaced image\'s classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
         //Remove any invalid XML tags as per http:validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
         //Replace image with new SVG
        $img.replaceWith($svg);
      });
    });
  }
  function menu_animation() {
    var $button = $('.menu-icon');

    $button.click(function() {
      set_links($('.mobile-menu').is(':visible') ? true : false);
    });
  }

  function set_links(show) {
    var $panel = $('.menu-item');
    $.each($panel, function(idx, elm){
      if(show) {
        $(elm).addClass('mui-enter');
      } else {
        $(elm).removeClass('mui-enter');
      }
    });
  }

  function set_carousels() {
    $('.slideshow.owl-carousel').owlCarousel({
      items: 1,
      loop: true,

      autoplay: false,
      autoplayTimeout: 8000,
      autoplayHoverPause: true,
      smartSpeed: 1500,

      nav: true,
      dots: true,
      navText: ['',''],
      dotsEach: true,

      responsive: {
        0:{
          nav: false,
          dots: false
        },
        567:{
          nav: false,
          dots: false
        },
        1199:{
          nav: true,
          loop: true
        }
      },
      responsiveRefreshRate: 200,
      responsiveBaseElement: window,
    });
    $('.project-gallery .owl-carousel').owlCarousel({
      items: 3,
      loop: true,

      autoplay:false,
      smartSpeed: 500,

      nav: true,
      dots: true,
      navText: ['',''],
      dotsEach: true,

      responsive: {
        0:{
          items: 1,
          nav: false,
          dots: false
        },
        567:{
          items: 1,
          nav: false,
          dots: false
        },
        1199:{
          nav: true,
          loop: true
        }
      },
      responsiveRefreshRate: 200,
      responsiveBaseElement: window,
    });
    $('.service-portfolio-slideshow .owl-carousel').owlCarousel({
      items : 3,
      pagination: false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1]
    });
    $('.interior .owl-carousel').owlCarousel({
      items: 3,
      loop: true,

      autoplay:false,
      smartSpeed: 500,

      nav: true,
      dots: true,
      navText: ['',''],
      dotsEach: true,
      video:true,
      lazyLoad:true,

      responsive: {
        0:{
          items: 1,
          nav: false,
          dots: false
        },
        567:{
          items: 1,
          nav: false,
          dots: false
        },
        1199:{
          nav: true,
          loop: true
        }
      },
      responsiveRefreshRate: 200,
      responsiveBaseElement: window,
    });
    $('.object-gallery .owl-carousel').owlCarousel({
      items : 3,
      pagination: false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1]
    });
    $('.certificates .owl-carousel').owlCarousel({
      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1]
    });
    $('.short-portfolio .offers-carousel.owl-carousel').owlCarousel({
      // Most important owl features
      items : 3,
      pagination: false,
      navigation: true,
      navigationText: ['<img class="svg" src="assets/img/prev-portfolio.svg" />','<img class="svg" src="assets/img/next-portfolio.svg" />'],
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsTabletSmall: false,
      itemsMobile : [479,1]
    });
    $('.more-estates .offers-carousel.owl-carousel').owlCarousel({
      items: 3,
      loop: false,

      autoplay: false,
      smartSpeed: 1500,

      nav: true,
      dots: true,
      dotsEach: true,
      navText: ['',''],

      responsive: {
        0:{
          items: 1,
          dots: true,
          nav: false
        },
        567:{
          items: 2,
          dots: true,
          nav: false
        },
        1199:{
          dots: false,
          nav: true
        }
      },
    });
    $('.offers-carousel.owl-carousel').owlCarousel({
      items: 3,
      loop: true,

      autoplay: false,
      smartSpeed: 1500,

      nav: true,
      dots: false,
      navText: ['',''],

      responsive: {
        0:{
          items: 1,
          nav: false
        },
        567:{
          items: 2,
          nav: false
        },
        1199:{
          nav: true
        }
      },
    });
  }

  function set_zoom() {
    //$("#floorplan-2").elevateZoom();
    $("#floorplan-2").elevateZoom({
      zoomType: "lens",
      lensShape: "round",
      containLensZoom : true,
      lensSize: 200
    });
  }

  function set_search_form() {
    if (_width < 768) return;
    var form = $('.HomePage .search-form .callout');
    var form_height = $(form).find('.collapsable').outerHeight();
    form.height(form_height/2 - 15);
    $('.collapse-search a').on('click', function(e){
      e.stopPropagation();
      $(form.parents('form')).toggleClass('collapsed');
      return false;
    });
  }

  function init() {
    menu_animation();
    set_carousels();
    //set_zoom();
    set_search_form();
  }

  init();

  
  /*  FAVOURITES  */
  var estateexists = '<h3>Estate exists</h3><p>This estate already exists in your favorites list.</p>',
      REALTYP = {};
  REALTYP.AddToFavs = function(id) {
    //alert('adding estate with ID='+id+' to favorites');
    var cExist = false;
    var cook = readCookie('realtypfavs');
    if (cook) {
      //console.log('cookie: '+cook);
      var ids = cook.split('|');
      //console.log(ids);
      for (var i=0; i<ids.length; i++) {
        if (parseInt(ids[i]) == parseInt(id)) {
          //alert(estateexists);
          $.fancybox.open(estateexists);
          return false;
        } else {
          newcook = "realtypfavs=" + cook + '|' + id + "; path=/";
          cExist = true;
        }
      }
    } else {
      newcook = "realtypfavs=" + id + "; path=/";
      cExist = true;
    }
    if (cExist) {
      /*infowindow.close();
      $('.articles-list').append('<li></li>');
      $('.articles-list li').last().load(document.location + 'getEstate', {id: id});*/
      document.cookie = newcook;
    }
    //console.log('end: '+cook);
    return false;
  }

  REALTYP.RemoveFav = function(id) {
    //var div = document.getElementById(id);
    //var ul = div.parentNode;
    //div.parentNode.removeChild(div);
    $('#' + id).parent().remove();
    var cook = readCookie('realtypfavs');
    if (cook) {
      var ids = cook.split('|');
      if (ids.length == 1) {
        newcook = "";
      } else {
        for (var i=0; i<ids.length; i++) {
          if (parseInt(ids[i]) == parseInt(id)) {
            ids.splice(i, 1);
            break;
          }
        }
        var newcook = '';
        for (var i=0; i<ids.length; i++) {
          newcook = ids[i] + '|';
        }
        newcook = newcook.slice(0, -1);
      }
      document.cookie = "realtypfavs=" + newcook + "; path=/";
    }
  }
  /*  end FAVOURITES  */

  $(window).on('resize', function(){
    //set_search_form();
  }).resize();

})(jQuery);

var OS = {
  isWindows: function(){ return navigator.appVersion.indexOf("Win")!=-1 },
  isMac: function(){ return navigator.appVersion.indexOf("Mac")!=-1 },
  isUnix: function(){ return navigator.appVersion.indexOf("X11")!=-1 },
  isLinux: function(){ return navigator.appVersion.indexOf("Linux")!=-1 },
  name: function(){
    var name = '';
    if (OS.isWindows()) name = "windows";
    else if (OS.isMac()) name = "macosx";
    else if (OS.isUnix()) name = "unix";
    else if (OS.isLinux()) name = "linux";
    return name;
  }
};

navigator.sayswho = (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();