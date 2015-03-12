/**
 * This is the gulp file for the "planet-goa" project
 * Author:Nisheed Jagadish
 * email:nisheed2016@gmail.com
 */

//Wire up all the plugins need to run gulp tasks
var gulp = require('gulp'),
  //Console colors
  colors = require('colors/safe'),
  //Test for errors in JS files
  jshint = require('gulp-jshint'),
  //compress the JS files
  uglify = require('gulp-uglify'),
  //Compile less files to css
  less = require('gulp-less'),
  //include HTML files
  jade = require('gulp-jade'),
  //Keep gulp running even on errors
  plumber = require('gulp-plumber'),
  //Clean the folders before build
  clean = require('gulp-clean'),
  //Copy files and folders
  copy = require('gulp-copy'),
  //Concatinate files
  concat = require('gulp-concat'),
  //Use live reload extension
  livereload = require('gulp-livereload');


var paths = {
  html: ['client/templates/views/*.jade']
};

//The default gulp task
gulp.task('default', function() {
  //Hello message
  console.log(colors.green.bold('planet-goa gulp tasks!'));
  console.log(colors.cyan('Please use one of the following tasks:'));
  //Tasks go here

  //System beep
  console.log("\007");
});

//Clean html task
gulp.task('clean-html', function() {
  return gulp.src('client/pages', {
      read: false
    })
    .pipe(clean());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('client/templates/**/*.jade', ['templates']);
});

gulp.task('templates', ['clean-html'], function() {
  gulp.src(paths.html)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./client/pages/'));
});