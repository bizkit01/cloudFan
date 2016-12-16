var gulp = require('gulp');

var changed = require('gulp-changed');
var less = require('gulp-less');

gulp.task('sless', function(){
  gulp.src('./less/server/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app_server/stylesheets'));
});

gulp.task('cless', function(){
  gulp.src('./less/client/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app_client/stylesheets'));
});
