var createCanvas = function() {
    var canvas = document.getElementById('blurheader-canvas');
    rasterizeHTML.drawHTML($('#main, .body-footer').html(),
        canvas).then(function success(renderResult) {
        stackBlurCanvasRGB(
            'blurheader-canvas',
            0,
            0,
            $("#blurheader-canvas").width(),
            $("#blurheader-canvas").height(),
            20);
    }, function error(e) {
        console.error(e);
    });
}
$(document).ready(function() {
    $('.body-header').after(
        '<div class="blurheader">' +
        '<canvas id="blurheader-canvas"></canvas>' +
        '</div>'
    );
    createCanvas();
});
$(window).scroll(function() {
    $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});

window.onresize = function() {
    $('canvas').width($(window).width());
    if ($('canvas').height() !== $(window).height()) {
        //Recreate canvas for media queries 
        $('canvas').remove();
        createCanvas();
    }
};

$(document).bind('touchmove', function() {
    $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});

$(document).bind('touchend', function() {
    $('canvas').css(
        '-webkit-transform',
        'translatey(-' + $(window).scrollTop() + 'px)');
});