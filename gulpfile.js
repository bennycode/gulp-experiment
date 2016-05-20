var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', function () {
  plugins.util.log(plugins.util.colors.magenta('Hello'), 'World!');
});