/**
 * Created by jin on 16/7/22.
 */
var gulp = require('gulp');
var jade = require('gulp-jade');
var webpackConfig = require('./webpack.config');
var webpackProduct = require('./webpack-product');
var webpackStream = require('webpack-stream');
var revReplace = require('gulp-rev-replace');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
var concat = require('gulp-concat');
var through = require('through2');

gulp.task('clean', function () {
    return gulp.src('./dist')
        .pipe(clean());
});
gulp.task('templatesDev', function () {
    return gulp.src(['./template/**'])
        .pipe(watch(['./template/**']))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('jquery', function () {
    return gulp.src(['./js/lib/jquery.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('es5', function () {
    return gulp.src(['./js/lib/es5-shim.min.js', './js/lib/es5-sham.min.js'])
        .pipe(concat('ie.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('streamDev', function () {
    return gulp.src(['./js/components/**', './js/page/**', './styles/**'])
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist'));
});

gulp.task('stream', function () {
    return gulp.src(['./js/components/**', './js/page/**', './styles/**'])
        .pipe(webpackStream(webpackProduct))
        .pipe(gulp.dest('dist'))
        .pipe(filter())
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest({base: 'dist', merge: true}))
        .pipe(gulp.dest('dist'));
});


gulp.task('templates', function () {
    var manifest = gulp.src('./rev-manifest.json');
    return gulp.src(['./template/**'])
        .pipe(jade({
            pretty: true
        }))
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest('dist'));
});

function filter() {
    return through.obj(function (chunk, enc, cb) {
        var file = chunk.history[0];
        if (file.indexOf('.jpg') === -1) {
            this.push(chunk);
        }
        cb();
    })
}


gulp.task('product', function () {
    runSequence('clean', 'es5', 'jquery', 'stream', 'templates');
});

gulp.task('dev', ['templatesDev', 'streamDev', 'es5', 'jquery']);