(function ($) {
  "use strict";

  var _width = $(window).width();
  $('body').attr('data-resolution', _width + 'px');
  $('body').attr('data-touch', Modernizr.touchevents);

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

  function foundation() {
  	$(document).foundation();
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

  function init() {
    foundation(),
    menu_animation();
  }

  init();

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