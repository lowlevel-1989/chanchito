//Dependencias
var concatCSS   = require('gulp-concat-css');
var concatJS    = require('gulp-concat');
var del         = require('del');
var gulp        = require('gulp');
var minifyCSS   = require('gulp-minify-css');
var minifyHTML  = require('gulp-minify-html');
var minifyJS    = require('gulp-uglify');
var rename      = require('gulp-rename');
var stylus      = require('gulp-stylus');

//Archivos a copiar a dist

var _PROYECTOJS = 'assets/js/**/*';

//Solo las dependencias
var _CSS = [
  	'dependencies/bootstrap/dist/css/*.min.*'
];

var _HTML = [
    'partials/**/*.html', 
    'views/**/*.html'
];

//Solo las dependencias
var _JAVASCRIPT = [
	'dependencies/angular/*.min.*',
	'dependencies/angular-route/*.min.*'
];

//Todas las fuentes tanto tuyas como de dependencias
var _FONTS = [
  	'dependencies/bootstrap/dist/fonts/*'
];

//Todas las imagenes tanto tuyas como de dependencias
var _IMGS = [
  	'assets/img/*'
];

var _BASE = [
	'index.html'
];


//Tareas
gulp.task('minify-css', function () {
    gulp.src('assets/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(concatCSS('style.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('minify-js', function () {
    gulp.src(_PROYECTOJS)
    .pipe(concatJS('main.min.js'))
    .pipe(minifyJS())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('minify-html', function () {
    gulp.src(_HTML)
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/templates'));
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
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('copyFonts', function(){
	gulp.src(_FONTS)
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('watch', function() {
    // Cambios principales
    gulp.watch(_PROYECTOJS, ['minify-js']);
    gulp.watch(['assets/stylus/**/*.styl'], ['minify-css']);
    gulp.watch([_HTML], ['minify-html']);

    gulp.watch(_BASE,  ['copyBase']);
    gulp.watch(_IMGS,  ['copyImgs']);
    gulp.watch(_FONTS, ['copyFonts']);
});

//Tarea por defecto
gulp.task('default', ['clean'], function() {
    gulp.start('copyBase', 'copyCss', 'copyJs', 'copyImgs', 'copyFonts', 'minify-css', 'minify-html', 'minify-js', 'watch');
});


