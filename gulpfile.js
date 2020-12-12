const gulp = require('gulp');
const browserify = require('browserify'); 
const source = require("vinyl-source-stream");
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();

const { src, dest, watch, parallel, series} = require('gulp');

const paths = {
  scripts: {
    src: './src',
    dest: './dist'
  }
};

// Reload Server
async function reload() {
  server.reload();
}

const jsPath = 'src/index.js'
const cssPath = 'src/style.css'

function copyHtml(){
    return src('src/*.html').pipe(gulp.dest('dist'));
}

function jsTask(){
    return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

function cssTask(){
    return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
}

gulp.task('browserify', function () {
    return browserify()  
    .bundle()    
    .pipe(source('./src/index.js'))
      .pipe(gulp.dest('bundle'));
  });

  gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['browserify']);    
  });
  

function watchTask(){
    watch([cssPath, jsPath], { interval:1000}, parallel(cssTask, jsTask));
}

exports.jsTask = jsTask;
exports.copyHtml = copyHtml;
exports.cssTask = cssTask;

exports.default = series(parallel(copyHtml, jsTask, cssTask ), watchTask)

server.init({
    server: {
      baseDir: paths.scripts.dest
    }
  });