var gulp = require('gulp');
var coffee = require('gulp-coffee');
var flatten = require('gulp-flatten');

gulp.task('default', ['coffee'], function() { 
});

gulp.task('coffee', function() {
    gulp.src('api/*.coffee')
        .pipe(flatten())
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('js/'));
});

gulp.task('build', function() {
    gulp.src('js/*.js')
        .pipe(gulp.dest('dist/app.min.js'));
})