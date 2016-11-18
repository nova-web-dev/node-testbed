/*
  This will install all the npm packages recursively!
*/
var gulp = require("gulp");
var install = require("gulp-install");

  gulp.task('default', function() {
    // place code for your default task here
    gulp.src(['./bower.json', './package.json', './carl-packages/*/*package.json', '*package.json'])
      .pipe(install());
  });
