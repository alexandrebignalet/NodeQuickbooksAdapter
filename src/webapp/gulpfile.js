'use strict'

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel')

gulp.task('webserver', () => {
    connect.server({
        livereload: true,
        port: 80
    });
})

gulp.task('babel', () =>
    gulp.src('scripts/*.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest('dist'))
)

gulp.task('watch', function() {
    gulp.watch('scripts/*.js', ['babel'])
})

gulp.task('dev', ['babel', 'webserver', 'watch'])
gulp.task('prod', ['babel', 'webserver'])