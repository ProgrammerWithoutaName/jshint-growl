# jshint-growl

npm install jshint-growl

gives growl notifications on JSHint errors and warnings.

to use:
gulp.src([jsFiles])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-growl'));
