var winWidth=0;
var winHeight=0;
function findDimensions()
{
  if(window.innerWidth)
    winWidth=window.innerWidth;
  else if((document.body)&&(document.body.clientWidth))
    winWidth=document.body.clientWidth;
  if(window.innerHeight)
    winHeight=window.innerHeight;
  else if((document.body)&&(document.body.clientHeight))
    winHeight=document.body.clientHeight;
  if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
    winHeight=document.documentElement.clientHeight;
    winWidth=document.documentElement.clientWidth;
    }
}
findDimensions();
window.onresize=findDimensions;

/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

    });

}(jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


$(document).ready(function(){
  $(".post-image img").each(function(){
    var postimg = $(this).attr('src');
    $(this).after('<div class="post-real-image" style="background:url('+postimg+') center center"></div>');
    $(this).parents(".post-content").addClass("post-photo");
    $(this).remove();
  });

});
/*
function showHeadBlock(){
    $(".blog-title").addClass("blog-title-active");
    $(".site-block").animate({right:'0'},'fast');
    $(".more").removeClass("icon-arrow-down");
    $(".more").addClass("icon-cross");
}
function hideHeadBlock(){
    $(".blog-title").removeClass("blog-title-active");
    $(".site-block").animate({right:'-300px'},'fast');
}

$(document).ready(function(){
  $('.site-head-content').click(function(){
    showHeadBlock();
  }); 
});
*/