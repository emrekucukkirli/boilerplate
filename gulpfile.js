const gulp = require('gulp');
const { series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
//const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');


function css() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
}

function js() {
    return gulp.src('src/js/**/*.js')
//        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function img() {
    return gulp.src('src/img/**/*')
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch('src/scss/**/*.scss', css);
    gulp.watch('src/**/*.html', html);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/img/**/*', img);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.watch = watch;
exports.default = series(watch, html, css, js, img);
