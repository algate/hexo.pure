'use strict'

var gulp = require('gulp'),
    webpack = require('webpack'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var config = require('./webpack.config');

/** 
 *  执行webpack打包
 */
gulp.task('webpack', function(cb) {
    webpack(config, cb)
});
/** 
 *  压缩js
 */
gulp.task('script',function(){
    gulp.src('./assets/src/dist/js/*.js')
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});
/** 
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('./assets/src/dist/css/*.css')
    //.pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});
/**
 *  监听器
 */
gulp.task("watch",function(cb){
    gulp.watch('assets/src/js/**/*.js', ['webpack']);
    gulp.watch('assets/src/dist/js/*.js', ['script']);
    gulp.watch('assets/src/dist/css/*.css', ['style']);
})

gulp.task('default', ['webpack'] ,function() {
    gulp.start('script','watch','style')
})
