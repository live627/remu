'use strict';

let gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    gutil      = require('gulp-util'),
    buffer     = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    babelify   = require('babelify'),
    file       = 'src/remu.js';

let sass = require('gulp-sass');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');

gulp.task('javascript', () => {
    return browserify(file,{debug:true}).transform(babelify, {presets: ["es2015"],sourceMaps:true})
    .bundle()
    .pipe(source('remu.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['javascript', 'css']);

gulp.task('css', () => {
  return gulp.src('src/remu.sass')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('./src/*', ['build']);
});
gulp.task('default', ['watch']);
