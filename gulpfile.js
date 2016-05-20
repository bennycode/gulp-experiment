var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', function () {
  gulp.watch('src/**/*.ts', ['ts']);
});

gulp.task('ts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(plugins.typescript({
      noImplicitAny: true,
      out: 'output.js'
    }))
    .pipe(gulp.dest('dest/scripts'));
});