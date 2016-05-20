var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function () {
  gutil.log(gutil.colors.magenta('Hello'), 'World!');
});