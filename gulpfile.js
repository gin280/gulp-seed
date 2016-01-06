//引入插件
var gulp = require('gulp');


var minifyHTML = require('gulp-minify-html');
var	compass = require('gulp-for-compass');
//var	autoprefixer = require('gulp-autoprefixer');
var	minifycss = require('gulp-minify-css');
var	jshint = require('gulp-jshint');
var	uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var	rename = require('gulp-rename');
var	concat = require('gulp-concat');
var	notify = require('gulp-notify');
var	cache = require('gulp-cache');
var	livereload = require('gulp-livereload');
var	del = require('del');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
// var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var serve = require('gulp-serve');
var pngquant = require('imagemin-pngquant');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var babel = require("gulp-babel");
var react = require('gulp-react');
//var bowerFiles = require('main-bower-files');

//postcss

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');
var color_rgba_fallback = require('postcss-color-rgba-fallback');
var opacity = require('postcss-opacity');
var pseudoelements = require('postcss-pseudoelements');
var vmin = require('postcss-vmin');
var pixrem = require('pixrem');
var will_change = require('postcss-will-change');
var atImport = require('postcss-import');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var bem = require('postcss-bem');
var alias = require('postcss-alias');
var crip = require('postcss-crip');
var magician = require('postcss-font-magician');
var triangle = require('postcss-triangle');
var circle = require('postcss-circle');
var linkColors = require('postcss-all-link-colors');
var center = require('postcss-center');
var clearfix = require('postcss-clearfix');
var position = require('postcss-position');
var size = require('postcss-size');
var verthorz = require('postcss-verthorz');
var colorShort = require('postcss-color-short');


//sass编译
// gulp.task( 'compass', function(){
//     gulp.src('app/sass/*.scss')
//         .pipe(compass({
//             sassDir: 'app/sass',
//             cssDir: 'app/css',
//             force: true
//         })).pipe(livereload());
   
// });

//postcss编译
gulp.task('postcss', function () {
  var processors = [
      will_change,
      autoprefixer,
      cssnext,
      precss,
      bem,
      color_rgba_fallback,
      opacity,
      pseudoelements,
      vmin,
      pixrem,
      atImport,
        mqpacker,
         alias,
    crip,
    magician,
    triangle,
    circle,
    linkColors,
    center,
    clearfix,
    position,
    size,
    verthorz,
    colorShort
        // cssnano
  ];
  return gulp.src('./app/postcss/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./app/css/')).pipe(livereload());
});

//css压缩
gulp.task( 'minifycss', function(){
    gulp.src('app/css/*.css')
        // .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

//html压缩
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./app/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('build/'));
});



//es6编译
// gulp.task("coffee", function () {
//   return gulp.src("app/src/*.js")
//     .pipe(babel())
//     .pipe(sourcemaps.write('./maps'))
//     .pipe(gulp.dest('./app/js')).pipe(livereload());
// });

//jsx

gulp.task('jsx',function() {
  gulp.src("app/src/*.jsx")
  .pipe(react())
  .pipe(gulp.dest('./app/js')).pipe(livereload());
});

//js验证压缩
// gulp.task('scripts', function() {
// 	gulp.src('app/js/**/*.js')
// 		// .pipe(jshint())
// 		// .pipe(jshint.reporter('default'))
// 		// .pipe(concat('main.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./build/js'))
// 		.pipe(notify({ message: 'Scripts task complete' }));
// });

//压缩图片
gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

//清除文件

gulp.task('clean', function(cb) {
	del(['bulid/img/', 'build/js/', 'build/css/', 'build/'], cb)
});

//默认任务

gulp.task('default', ['clean'], function() {
	gulp.run('images','minifycss', 'scripts','minify-html');
});

//reload
gulp.task('reload', ['clean'], function() {
  gulp.run('connect','watch', 'html');
});

//监听文件
gulp.task('watch', function() {
  livereload.listen();
	// Watch .scss files
	gulp.watch('app/postcss/**/*.css', ['postcss']);
	// Watch .js files
	gulp.watch('app/src/**/*.jsx', ['jsx']);
	// Watch image files
	gulp.watch('app/img/**/*', ['images']);
// Watch html files
 gulp.watch(['./app/*.html'], ['html']);
	});

//serve
gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'app',
    livereload: true
  });
});
gulp.task('html', function () {
  gulp.src(['./app/*.html','./app/postcss/*.scss','./app/src/*.jsx'])
   .pipe(livereload());
});

