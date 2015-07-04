'use strict';
/*
    Use "gulp serve" while working and
    "gulp build" to optimize everything for production.
*/

// Include Gulp & Tools We'll Use
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    pagespeed = require('psi'),
    reload = browserSync.reload;

// Lint JavaScript
gulp.task('scripts:jshint', function () {
    return gulp.src('components/scripts/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(reload({stream: true, once: true}));
});

//Concatenates JavaScript
gulp.task('scripts:concat', function() {
  gulp.src('components/scripts/*.js')
    .pipe($.concat('scripts.js'))
    .pipe(gulp.dest('dev/scripts'));
});

// Output Final JS Styles
gulp.task('scripts', ['scripts:jshint', 'scripts:concat']);

// Optimize Images
gulp.task('images', function () {
    return gulp.src('dev/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream: true, once: true}))
        .pipe($.size({title: 'images'}));
});

// Automatically Prefix CSS
gulp.task('styles:css', function () {
    return gulp.src('dev/styles/**/*.css')
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dev/styles'))
        .pipe(reload({stream: true}))
        .pipe($.size({title: 'styles:css'}));
});

// Compile Sass For Style Guide Components (dev/styles/components)
gulp.task('styles:compass', function() {
  gulp.src('components/styles/*.scss')
  .pipe($.compass({
    comments: false,
    config_file: 'config.rb',
    css: 'dev/styles',
    sass: 'components/styles'
  }))
  .pipe(gulp.dest('dev/styles'))
  .pipe(reload({stream: true, once: true}));
});

// Output Final CSS Styles
gulp.task('styles', ['styles:compass', 'styles:css']);

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
    return gulp.src('dev/**/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify()))
        // Concatenate And Minify Styles
        .pipe($.if('*.css', $.csso()))
        // Remove Any Unused CSS
        // Note: If not using the Style Guide, you can delete it from
        // the next line to only include styles your project uses.
        .pipe($.if('*.css', $.uncss({ html: ['dev/index.html','dev/styleguide/index.html'] })))
        .pipe($.useref.restore())
        .pipe($.useref())
        // Update Production Style Guide Paths
        .pipe($.replace('components/components.css', 'components/main.min.css'))
        // Minify Any HTML
        .pipe($.minifyHtml())
        // Output Files
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', function (cb) {
    rimraf('dist', rimraf.bind({}, '.tmp', cb));
});

// Watch Files For Changes & Reload
gulp.task('serve', function () {
    /*browserSync.init(null, {
        server: {
            baseDir: ['app', '.tmp']
        },
        notify: false
    });*/

    //gulp.watch(['dev/**/*.html'], reload);
    gulp.watch(['components/styles/*.{css,scss}'], ['styles']);
    //gulp.watch(['dev/styles/*.css'], reload);
    gulp.watch(['components/scripts/*.js'], ['scripts']);
    gulp.watch(['dev/images/**/*'], ['images']);
});

// Build Production Files
gulp.task('build', function (cb) {
    runSequence('styles', ['jshint', 'html', 'images'], cb);
});

// Default Task
gulp.task('default', ['clean'], function (cb) {
    gulp.start('build', cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://torreao-braz-flira.c9.io/dev/',
    strategy: 'mobile'
}));