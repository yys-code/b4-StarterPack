// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const babel = require('gulp-babel');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const cleanCSS = require('gulp-clean-css');
// const del = require('del');
 
// var paths = {
//   styles: {
//     src: 'src/styles/**/*.sass',
//     dest: 'assets/styles/'
//   },
//   scripts: {
//     src: 'src/scripts/**/*.js',
//     dest: 'assets/scripts/'
//   }
// };
 
// /* Not all tasks need to use streams, a gulpfile is just another node program
//  * and you can use all packages available on npm, but it must return either a
//  * Promise, a Stream or take a callback and call it
//  */
// function clean() {
//   // You can use multiple globbing patterns as you would with `gulp.src`,
//   // for example if you are using del 2.0 or above, return its promise
//   return del([ 'assets' npm ]);
// }
 
// /*
//  * Define our tasks using plain functions
//  */
// function styles() {
//   return gulp.src(paths.styles.src)
//     .pipe(less())
//     .pipe(cleanCSS())
//     // pass in options to the stream
//     .pipe(rename({
//       basename: 'main',
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest(paths.styles.dest));
// }
 
// function scripts() {
//   return gulp.src(paths.scripts.src, { sourcemaps: true })
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(concat('main.min.js'))
//     .pipe(gulp.dest(paths.scripts.dest));
// }
 
// function watch() {
//   gulp.watch(paths.scripts.src, scripts);
//   gulp.watch(paths.styles.src, styles);
// }
 
// /*
//  * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
//  */
// var build = gulp.series(clean, gulp.parallel(styles, scripts));
 
// /*
//  * You can use CommonJS `exports` module notation to declare tasks
//  */
// exports.clean = clean;
// exports.styles = styles;
// exports.scripts = scripts;
// exports.watch = watch;
// exports.build = build;
// /*
//  * Define default task that can be called by just running `gulp` from cli
//  */
// exports.default = build;


const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();

//Compile scss into css
function style() {
  // 1. where is my scss File. 
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/**/*.scss'])
  // 2. Pass that file through sass compiler
  .pipe(sass())
  // 3.Where do I save the compiled CSS?
  .pipe(gulp.dest('./src/css'))
  // 4.Stream changes to all browser
  .pipe(browserSync.stream());
}

//Move JS Files to src/js
function script() {
  // 1. where is my scss File. 
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
  // 3.Where do I save the js?
  .pipe(gulp.dest('./src/js'))
  // 4.Stream changes to all browser
  .pipe(browserSync.stream());
}

//Move Font Awesome css to src/css
function fonts() {
  // 1. where is my scss File. 
  return gulp.src(['./node_modules/font-awesome/fonts/*'])
  // 3.Where do I save the js?c
  .pipe(gulp.dest('./src/fonts'))
}

//Move Font Awesome css to src/css
function fCss() {
  // 1. where is my scss File. 
  return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
  // 3.Where do I save the js?
  .pipe(gulp.dest('./src/css'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change',browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change',browserSync.reload);
}

const build = gulp.series(fonts,fCss, gulp.parallel(style, script))

exports.style = style;
exports.watch = watch;
exports.script = script;
exports.fonts = fonts;
exports.fCss= fCss;
exports.build = build;