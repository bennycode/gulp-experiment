var gulp = require('gulp');
var path = require('path');
var paths = require('./config/paths');
var plugins = require('gulp-load-plugins')({pattern: '*'});

var tsProject = plugins.typescript.createProject('tsconfig.json');
var browserSync = plugins.browserSync.create();
var TestRunner = plugins.karma.Server;

var actions = {
  compileTypeScript: function(inputStream) {
    return inputStream
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject))
      .pipe(plugins.uglify())
      .pipe(plugins.sourcemaps.write('.', {includeContent: false, sourceRoot: '/' + paths.input}));
  },
  startServer: function() {
    browserSync.init({
      port: 3636,
      server: {baseDir: './'},
      startPath: '/' + paths.dest_main
    });
  }
};

actions.watchTypeScript = function(file) {
  var pathObject = path.parse(file.path);
  plugins.util.log('Compiling', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'...');

  var stream = gulp.src(file.path, {base: paths.input}).pipe(gulp.dest(paths.dest_main));

  stream.on('end', function() {
    plugins.util.log('Compiled', '\'' + plugins.util.colors.yellow(pathObject.base) + '\'');
    browserSync.reload();
  });

  actions.compileTypeScript(stream);
};

gulp.task('default', ['init'], function() {
  actions.startServer();
  gulp.watch(paths.input + '/**/*.ts').on('change', actions.watchTypeScript);
  gulp.watch(paths.dest_main + '/**/*.html').on('change', browserSync.reload);
});

gulp.task('init', function() {
  plugins.util.log('Pre-compiling files...');
  return actions.compileTypeScript(gulp.src(paths.input + '/**/*.ts')).pipe(gulp.dest(paths.dest_main));
});

gulp.task('test', ['init'], function(done) {
  new TestRunner({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('bower', ['bower-install'], function() {
  return gulp.src(plugins.mainBowerFiles(), {
    base: 'bower_components'
  }).pipe(gulp.dest(paths.dest_lib));
});

gulp.task('bower-install', function() {
  return plugins.bower();
});