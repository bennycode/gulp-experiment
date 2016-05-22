var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();

gulp.task('default', function () {
  gulp.watch('src/**/*.ts').on('change', function (file) {

    var pathObject = path.parse(file.path);

    gulp.src(file.path)
      .pipe(plugins.typescript({
        noImplicitAny: true,
        out: pathObject.name + '.js'
      }))
      .pipe(gulp.dest('dest/scripts'));

  });
});

gulp.task('ts', function () {
  return gulp.src('src/**/*.ts')
    .pipe(plugins.typescript({
      noImplicitAny: true,
      out: 'output.js'
    }))
    .pipe(gulp.dest('dest/scripts'));
});