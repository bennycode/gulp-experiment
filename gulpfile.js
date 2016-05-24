var gulp = require('gulp');
var path = require('path');
var plugins = require('gulp-load-plugins')({pattern: '*'});
var tsProject = plugins.typescript.createProject('tsconfig.json');
var browserSync = plugins.browserSync.create();

gulp.task('default', function () {
  browserSync.init({
    server: {baseDir: './'},
    port: 3636,
    startPath: '/dest/Greeter/index.html'
  });

  gulp.watch('src/**/*.ts').on('change', function (file) {
    var pathObject = path.parse(file.path);
    plugins.util.log('Compiling', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'...');

    gulp.src(file.path, {base: 'src'})
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.', {includeContent: false, sourceRoot: '/src'}))
      .pipe(gulp.dest('dest'));

    plugins.util.log('Compiled', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'');
    browserSync.reload();
  });
});