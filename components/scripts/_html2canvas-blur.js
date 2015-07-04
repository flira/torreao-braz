(function() {
    'use strict';
    var headerBlur = {
        init: function() {
            this.mqState = $('.body-header').height();
            this.createCanvas();
            this.adjustScroll();
        },
        adjustScroll: function() {
            var v = 'translatey(-' + window.scrollY + 'px)';
            $('#canvas').css({
                '-webkit-transform': v,
                '-moz-transform': v,
                'transform': v
            });
        },
        createCanvas: function() {
            $('.shapes blockquote').addClass('hidden');
            html2canvas($('#main, .body-footer'), {
                onrendered: function(canvas) {
                    $('.blurheader').append(canvas);
                    $('canvas').attr('id', 'canvas');
                    stackBlurCanvasRGB(
                        'canvas',
                        0,
                        0,
                        $('#canvas').width(),
                        $('#canvas').height(),
                        20);
                    $('.shapes blockquote').removeClass('hidden');
                    $('.body-header').addClass('blurred');
                    headerBlur.adjustScroll();
                }
            });
        }
    };
    $(document).ready(function() {
        !window.location.href.toString().split('#')[1] && headerBlur.init();
    });
    window.onresize = function() {
        $('#canvas').width($(window).width());
        if (headerBlur.mqState !== $('.body-header').height()) {
            //Recreate canvas for media queries 
            $('#canvas').remove();
            headerBlur.init();
        }
    };
    $(window).scroll(function() {
        headerBlur.adjustScroll();
    });
    $(document).bind('touchmove', function() {
        headerBlur.adjustScroll();
    });
    $(document).bind('touchend', function() {
        headerBlur.adjustScroll();
    });
})();