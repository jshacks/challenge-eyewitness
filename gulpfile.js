var gulp = require('gulp');

var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var mainBowerFiles = require('main-bower-files');

var libsDir = './client/app/libs/';

gulp.task('fetchLibs', () => {
    var mainFiles = mainBowerFiles();

    gulp.src(libsDir + '*', {read: false})
        .pipe(plugins.clean());

    console.log(mainFiles);
    gulp.src(mainFiles)
        .pipe(gulp.dest(libsDir));
});

gulp.task('inject', () => {
    var target = gulp.src('./client/index.html');

    var jsLibs = gulp.src([
        libsDir + 'underscore.js',
        libsDir + 'angular.js',
        libsDir + 'angular-ui-router.js',
        libsDir + 'ng-map.js',
        libsDir + 'angular-modal-service.js'
    ]);

    var app = gulp.src([
        './client/app/*.js',
        './client/app/**/*.js'
    ]);

    return target.pipe(plugins.inject(jsLibs, {
        relative: true,
        starttag: '<!-- inject:libs:js -->'
    })).pipe(plugins.inject(app, {
        relative: true,
        starttag: '<!-- inject:app:{{ext}} -->'
    })).pipe(gulp.dest('client'));

});
