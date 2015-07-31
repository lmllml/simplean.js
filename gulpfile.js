var gulp = require('gulp');
var SRC = './src/';
var DIST = './build/';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src(SRC + '**/*.js')
            .pipe(concat('simplean.js'))
            .pipe(gulp.dest(DIST))
            .pipe(uglify('simplean.min.js'))
            .pipe(gulp.dest(DIST));
});