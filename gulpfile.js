'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");
const nodemon = require("gulp-nodemon");
const watch = require("gulp-watch");

gulp.task('sass', () => {
  return gulp.src('./assets/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('dev', () => {
  gulp.watch('./assets/sass/*.scss', ['sass']);
  nodemon({
    script: 'index.js'
  })
});
