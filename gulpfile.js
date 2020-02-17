const gulp = require('gulp');
const { src, dest } = require('gulp'); 
const sass = require('gulp-sass'); 
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');


function css() {
    return src('./sass/**/*.scss') // 1. Location of source files (.scss)
    .pipe(sass()) // 2. Compile the SCSS to CSS
    .pipe(minifyCSS()) // 3. Minify the CSS
    .pipe(dest('./dist/css')) // 4. Write the CSS file out to a specific destination }
   
}

function watch(){
    browserSync.init({
      server: {
        baseDir: './',
      }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('./*.html').on('change', browserSync.reload)
  }
  
function imageminify(){
    gulp.src('./images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
}

function html(){
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./'));
}

exports.watch = watch;
exports.imageminify = imageminify;
exports.css = css;
exports.html = html;
