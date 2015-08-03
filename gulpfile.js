var gulp = require('gulp');
var SRC = './src/';
var DIST = './build/';

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return gulp.src(DIST + '**/*.js', {read: false})
            .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    return gulp.src([
        'map.js',
        'utility.js',
        'domUtility.js',
        'simplean.js'
    ], {
        base: SRC
    }).pipe(concat('simplean.js'))
    .pipe(gulp.dest(DIST));
});

gulp.task('deploy', ['build'], function () {
   return gulp.src(DIST + 'simplean.js')
    .pipe(uglify())
    .pipe(rename('simplean.min.js'))
    .pipe(gulp.dest(DIST)); 
});

gulp.task('dev', function () {
    return gulp.watch(SRC + '**/*.js', ['build']);
});