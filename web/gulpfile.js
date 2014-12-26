//Dependencias
var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');
var minifyJS   = require('gulp-uglify');
var rename     = require('gulp-rename');
var del        = require('del');

//Archivos a copiar a dist

var _PROYECTOJS = 'assets/js/chanchito.js';

var _CSS = [
  	'dependencies/bootstrap/dist/css/*'
];

var _JAVASCRIPT = [
	'dependencies/jquery/dist/*',
	'dependencies/bootstrap/dist/js/*',
	'dependencies/angular/*',
	'dependencies/angular-route/*'
];

var _FONTS = [
  	'dependencies/bootstrap/dist/fonts/*'
];

var _IMGS = [
  	'assets/imgs/*'
];

var _BASE = [
	'index.html'
];


//Tareas
gulp.task('minify-css', function () {
    gulp.src('assets/css/**/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
});


gulp.task('minify-js', function () {
    gulp.src(_PROYECTOJS)
    .pipe(rename('main.min.js'))
    .pipe(browserify())
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/assets/js'))
});


gulp.task('minify-html', function () {
    gulp.src('templates/**/*.html')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/templates'))
});


gulp.task('copyBase', function(){
	gulp.src(_BASE)
    .pipe(gulp.dest('dist'));
});


gulp.task('copyCss', function(){
	gulp.src(_CSS)
    .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('copyJs', function(){
	gulp.src(_JAVASCRIPT)
    .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('copyImgs', function(){
	gulp.src(_IMGS)
    .pipe(gulp.dest('dist/assets/imgs'));
});

gulp.task('copyFonts', function(){
	gulp.src(_FONTS)
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});


//Tarea por defecto
gulp.task('default', ['clean'], function() {
    gulp.start('copyBase', 'copyCss', 'copyJs', 'copyImgs', 'copyFonts', 'minify-css', 'minify-js', 'minify-html');
});

