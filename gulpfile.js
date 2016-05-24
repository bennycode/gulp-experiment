var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')();
var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('default', function () {
  gulp.watch('src/**/*.ts').on('change', function (file) {
    var pathObject = path.parse(file.path);
    plugins.util.log('Compiling', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'...');

    gulp.src(file.path, {base: 'src'})
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.', {includeContent: true, sourceRoot: ''}))
      .pipe(gulp.dest('dest'));

    plugins.util.log('Compiled', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'');
  });
});
