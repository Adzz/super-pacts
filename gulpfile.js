'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task('sass', () => {
  return gulp.src('./assets/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/main.scss', ['sass']);
});
