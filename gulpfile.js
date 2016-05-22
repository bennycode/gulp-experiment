var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();

gulp.task('default', function () {
  gulp.watch('src/**/*.ts').on('change', function (file) {
    gulp.src(file.path)
      .pipe(plugins.typescript({noImplicitAny: true}))
      .pipe(gulp.dest('dest/scripts'));
  });
});

gulp.task('ts', function () {
  // http://www.typescriptlang.org/docs/handbook/tsconfig-json.html
  var tsProject = plugins.typescript.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(plugins.typescript(tsProject))
    .pipe(gulp.dest('dest/scripts'));
});