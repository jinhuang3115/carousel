'use strict';

var plugins = {
  plumber: require('gulp-plumber'),
  jade: require('gulp-jade'),
  watch: require('gulp-watch')
}

module.exports = function (gulp, param) {
  gulp.task('jade:build', function() {
    gulp.src(param.rootFile)
      .pipe(plugins.plumber())
      .pipe(plugins.jade({
        pretty: gulp.isProduction ? false : true
      }))
      .pipe(gulp.dest(param.output))
  })

  gulp.task('jade:watch', ['jade:build'], function() {
    plugins.watch(param.watch, function () {
      gulp.start('jade:build')
    })
  })
}
