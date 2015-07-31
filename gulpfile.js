var gulp = require('gulp');
var SRC = './src/';
var DIST = './build/';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src(DIST + '**/*.js', {read: false})
            .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    return gulp.src(SRC + '**/*.js')
            .pipe(concat('simplean.js'))
            .pipe(gulp.dest(DIST))
            .pipe(uglify())
            .pipe(gulp.dest(DIST + 'simplean.min.js'));
});