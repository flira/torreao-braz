(function() {
  'use strict';
  !b && console.alert('Blur class missing');
  var toggleAccordion = function(el) {
    var opened = $('.accordion .show');
    opened.animate({
      height: 0
    }, 500, 'easeInOutCubic', function() {
      opened.removeClass('show');
      opened.removeAttr('style');
    });

    if (!el.hasClass('show')) {
      el.stop(true).animate({
        height: el.children('.content').outerHeight(true)
      }, 500, 'easeInOutCubic', function() {
        el.removeAttr('style');
      });
      el.addClass('show');
    }
  };
  var adjustScroll = function() {
    window.scroll(0, window.scrollY - 80);
  };
  // Open a CV by ID in the URL
  $(document).ready(function() {
    var currentID = window.location.href.toString().split('#');
    if (currentID[1]) {
      toggleAccordion($('#' + currentID[1]).next());
      window.setTimeout(adjustScroll, 500);
    }
  });
  // Open a CV by click
  $('.accordion .cv').click(function(event) {
    toggleAccordion($(event.target).next());
  });
}());