(function() {
  'use strict';
  //Animates the accordion using css animation;
  var cssAnimation = function() {
    if (!document.getElementById('accordion-style')) $('head').append('<style type="text/css" id="accordion-style"></style>');
    $('#accordion-style').html(createKeyframes());
    toggleAccordion.content.attr('style', callAnimation());
    toggleAccordion.t = setTimeout(toggleClass, toggleAccordion.sec * 1000);
  };

  //Animates the accordion using js animation;
  var jsAnimation = function() {
    var value = toggleAccordion.state ? {
      'height': 0
    } : {
      'height': toggleAccordion.content.children('.content').outerHeight() + 'px'
    };
    toggleAccordion.content.animate(
      value,
      toggleAccordion.sec * 1000,
      function() {
        toggleAccordion.state ? toggleAccordion.content.removeClass('show') : toggleAccordion.content.addClass('show');
      }
    );
  };

  //function to toggle "show" class and remove htmls attributes only created for this script
  var toggleClass = function() {
    toggleAccordion.state ? toggleAccordion.content.removeClass('show') : toggleAccordion.content.addClass('show');
    toggleAccordion.content.removeAttr('style');
    $('#accordion-style').html('');
  };

  //Creates the keyframes to expand or contract the accordion element
  var createKeyframes = function() {
    var keyframes = '',
      show = 'height: ' + toggleAccordion.content.children('.content').outerHeight() + 'px',
      hide = 'height: 0',
      _b = toggleAccordion.state ? '{ from {' + show + '} to { ' + hide + ' }  }' : '{ from {' + hide + '} to { ' + show + ' }  }';
    for (var i = 0; i < toggleAccordion.prefixes.length; i++) {
      keyframes += '@' + toggleAccordion.prefixes[i] + 'keyframes accordion_animation ' + _b + ';';
    }
    return keyframes;
  };

  //Creates the style attribute to call the accordion animation
  var callAnimation = function() {
    var animation = '';
    for (var i = 0; i < toggleAccordion.prefixes.length; i++) {
      animation += toggleAccordion.prefixes[i] + 'animation: accordion_animation ' + toggleAccordion.sec + 's cubic-bezier(.6,.2,.4,.8);';
    }
    return animation;
  };

  //Simple object to set the animation
  var toggleAccordion = {
    init: function(e, sec) {
      this.content = $(e.target).next();
      this.sec = sec ? sec : 500;
      this.prefixes = ['-webkit-', '-moz-', '-o-', ''];
      this.state = this.content.hasClass('show');
      this.animate();
    },
    animate: function() {
      if (!toggleAccordion.content.attr('style')) {
        cssAnimation();
      }
    },
    fallback: function() {
      this.animate = function() {
        jsAnimation();
      };
      return this;
    }
  };
  $('.accordion .portfolio').click(function(event) {
      event.preventDefault();
      //Check if browser have support for css animation, to use it or not.
      $('html').hasClass('cssanimations') ? toggleAccordion.init(event, .5) : toggleAccordion.fallback().init(event, .5);
  });
})();