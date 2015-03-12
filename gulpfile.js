/**
 * This is the gulp file for the "planet-goa" project
 * Author:Nisheed Jagadish
 * email:nisheed2016@gmail.com
 */

//Wire up all the plugins need to run gulp tasks
var gulp = require('gulp'),
  //Path Util
  path = require('path'),
  //Console colors
  colors = require('colors/safe'),
  //Test for errors in JS files
  jshint = require('gulp-jshint'),
  //compress the JS files
  uglify = require('gulp-uglify'),
  //Compile less files to css
  less = require('gulp-less'),
  //Minify CSS
  minify = require('gulp-minify-css'),
  //include HTML files
  jade = require('gulp-jade'),
  //Keep gulp running even on errors
  plumber = require('gulp-plumber'),
  //Clean the folders before build
  clean = require('gulp-clean'),
  //Concatinate files
  concat = require('gulp-concat'),
  //Rename files or folder structures
  rename = require('gulp-rename'),
  //Use live reload extension
  livereload = require('gulp-livereload');

// Folder paths
var paths = {
  html: {
    src: ['client/templates/views/*.jade'],
    dest: 'client/pages',
    watch: ['client/templates/**/*.jade']
  },
  css: {
    src: ['client/less/*.less'],
    dest: ['client/css', '!client/css'],
    watch: ['client/less/**/*.less'],
    clean: ['client/css/**', 'client/less/bootstrap', '!client/css']
  },
  js: {
    src: ['client/js/*.js'],
    dest: 'client/js/build',
    watch: ['client/js/**/*.js'],
    clean: ['client/js/vendor']
  },
  fonts: {
    clean: ['client/fonts/bootstrap']
  }
};

//Clean HTML task
gulp.task('clean-html', function() {
  return gulp.src(paths.html.dest, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

//Clean CSS task
gulp.task('clean-css-first', function() {
  return gulp.src(paths.css.clean, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

//Clean CSS task
gulp.task('clean-css', function() {
  return gulp.src(paths.css.dest, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

//Clean CSS task
gulp.task('clean-fonts', function() {
  return gulp.src(paths.fonts.clean, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

//Clean JS task
gulp.task('clean-js', function() {
  return gulp.src(paths.js.clean, {
      read: false
    })
    .pipe(plumber())
    .pipe(clean());
});

//Copy JS assets
gulp.task('copyJsAssets', ['clean-js'], function() {
  return gulp.src([
      'bower_components/jquery/dist/*.*',
      'bower_components/bootstrap/dist/js/*.js',
      'bower_components/requirejs/*.js',
      'bower_components/underscore/underscore*.js',
    ])
    .pipe(plumber())
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest('client/js/vendor'));
});

//Copy Bootstrap CSS assets
gulp.task('copyCssAssets', ['clean-css-first'], function() {
  return gulp.src([
      'bower_components/bootstrap/less/**/*.less',
    ], {
      base: path.join(__dirname, 'bower_components', 'bootstrap', 'less')
    })
    .pipe(plumber())
    .pipe(gulp.dest('client/less/bootstrap'));
});

//Copy Bootstrap Font assets
gulp.task('copyFontAssets', ['clean-fonts'], function() {
  return gulp.src([
      'bower_components/bootstrap/fonts/*.*',
    ], {
      base: path.join(__dirname, 'bower_components', 'bootstrap', 'fonts')
    })
    .pipe(plumber())
    .pipe(gulp.dest('client/fonts/bootstrap'));
});



//The default gulp task
gulp.task('default', function() {
  //Hello message
  console.log(colors.green.bold('seed gulp tasks!'));
  console.log(colors.cyan('Please use one of the following tasks:'));
  //Tasks go here
  console.log(colors.yellow('`gulp firstrun` to copy the assets for the first time.'));
  console.log(colors.yellow('`gulp less` for copiling less to css.'));
  console.log(colors.yellow('`gulp templates` for compiling jade to html templates.'));
  console.log(colors.yellow('`gulp watch` to continuously check for changes.'));
  //System beep
  console.log("\007");
});

// First run task
gulp.task('firstrun', ['copyCssAssets', 'copyFontAssets', 'copyJsAssets']);

//Compile jade templates
gulp.task('templates', ['clean-html'], function() {
  gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(jade({
      pretty: true,
      locals: {
        environment: 'development'
      }
    }))
    .pipe(gulp.dest(paths.html.dest));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.html.watch, ['templates']);
  gulp.watch(paths.css.watch, ['less']);
});

// Compile less to css debug
gulp.task('lessDebug', function() {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest(paths.css.dest[0]));
});

// Compile less to css build
gulp.task('lessBuild', function() {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(less())
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.css.dest[0]));
});

//Compile less to css
gulp.task('less', ['clean-css', 'lessDebug', 'lessBuild']);