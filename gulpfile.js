let gulp = require('gulp');
let concat = require('gulp-concat');

const jsFiles = 'build/static/**/*.js',
  jsDest = 'voomsway-filter',
  cssFiles = 'build/static/**/*.css',
  cssDest = 'voomsway-filter';

gulp.task('merge-js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('voomsway-filter.js'))
    .pipe(gulp.dest(jsDest));
});

gulp.task('merge-css', function() {
  return gulp.src(cssFiles)
    .pipe(concat('voomsway-filter.css'))
    .pipe(gulp.dest(cssDest));
});

// gulp.task('default', ['merge-js', 'merge-css']);
gulp.task('merge-all', gulp.parallel('merge-js', 'merge-css'));
