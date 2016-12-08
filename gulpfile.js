var gulp = require('gulp');

var changed = require('gulp-changed');
var less = require('gulp-less');

gulp.task('less', function(){
  gulp.src('./app_server/stylesheets/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app_server/stylesheets/dist/'));
});
