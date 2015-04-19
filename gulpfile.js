var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

gulp.task('stylus', function () {
  return gulp.src('./src/stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('./dist/css/index.css'));
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
        port: 9000,
        livereload: true
    }));
});

gulp.task('watch', function() {
  watch('./src/stylus/*.stylus', function () {
    gulp.start(['stylus']);
  });
});

gulp.task('serve', [
  'stylus',
  'webserver',
  'watch'
]);