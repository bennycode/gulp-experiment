var gulp = require('gulp');
var path = require('path');
var paths = require('./config/paths');
var plugins = require('gulp-load-plugins')({pattern: '*'});

var tsProject = plugins.typescript.createProject('tsconfig.json');
var browserSync = plugins.browserSync.create();

gulp.task('default', function () {
  browserSync.init({
    port: 3636,
    server: {baseDir: './'},
    startPath: '/' + paths.output
  });

  // HTML
  gulp.watch(paths.output + '/**/*.html').on('change', browserSync.reload);

  // TypeScript
  gulp.watch(paths.input + '/**/*.ts').on('change', function (file) {
    var pathObject = path.parse(file.path);
    plugins.util.log('Compiling', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'...');

    gulp.src(file.path, {base: paths.input})
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.', {includeContent: false, sourceRoot: '/' + paths.input}))
      .pipe(gulp.dest(paths.output));

    plugins.util.log('Compiled', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'');
    browserSync.reload();
  });
});