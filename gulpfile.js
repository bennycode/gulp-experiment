var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('default', function () {
  gulp.watch('src/**/*.ts').on('change', function (file) {
    var currentDirectory = path.dirname(file.path);
    var sourceDirectory = 'src';
    var index = currentDirectory.indexOf(sourceDirectory);
    var relativeDirectory = currentDirectory.slice(index + sourceDirectory.length + 1);

    console.log(relativeDirectory);

    gulp.src(file.path)
      .pipe(plugins.typescript(tsProject))
      .pipe(gulp.dest('dest/' + relativeDirectory));
  });
});