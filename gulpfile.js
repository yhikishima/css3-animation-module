var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

gulp.task('stylus', function () {
  gulp.src([
    'src/stylus/*.styl',
    '!' + 'src/stylus/_*.styl'
    ])
    .pipe(plumber())
    .pipe(stylus({
      use: [autoprefixer()]
    }))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy', function() {
  return gulp.src([
    'src/*.html'
  ])
  .pipe( gulp.dest('dist/'));
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(webserver({
      port: 9000,
      livereload: true
    }));
});

gulp.task('watch', function() {
  watch('src/stylus/*.styl', function () {
    gulp.start(['stylus']);
  });

  watch('src/*.html', function () {
    gulp.start(['copy']);
  });

});

gulp.task('serve', [
  'stylus',
  'webserver',
  'copy',
  'watch'
]);