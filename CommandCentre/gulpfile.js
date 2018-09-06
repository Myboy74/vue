var gulp     = require('gulp'),
    concat   = require('gulp-concat'),//- 多个文件合并为一个；
    cleanCSS = require('gulp-clean-css'),//- 压缩CSS为一行；
    ugLify   = require('gulp-uglify'),//压缩js
    imageMin = require('gulp-imagemin'),//压缩图片
    pngquant = require('imagemin-pngquant'), // 深度压缩
    htmlMin  = require('gulp-htmlmin'),//压缩html
    changed  = require('gulp-changed'),//检查改变状态
    less     = require('gulp-less')//压缩合并less
    sass     = require('gulp-sass')//压缩合并sass
    del      = require('del')
    babel    = require("gulp-babel");

    browserSync = require("browser-sync").create();//浏览器实时刷新

//删除dist下的所有文件
gulp.task('delete',function(cb){
    return del(['dist/*','!dist/images'],cb);
})

//压缩html
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(changed('dist', {hasChanged: changed.compareSha1Digest}))
        // .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}));
});

//实时编译less
gulp.task('less', function () {
    gulp.src(['./css/*.less']) //多个文件以数组形式传入
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
        .pipe(less())//编译less文件
        .pipe(concat('main.css'))//合并之后生成main.css
        .pipe(cleanCSS())//压缩新生成的css
        .pipe(gulp.dest('dist/css'))//将会在css下生成main.css
        .pipe(browserSync.reload({stream:true}));
});
// 实时编译sass
gulp.task('sass', function () {
    gulp.src(['./css/*.scss']) //多个文件以数组形式传入
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
        .pipe(sass())//编译less文件
        .pipe(concat('main2.css'))//合并之后生成main.css
        .pipe(cleanCSS())//压缩新生成的css
        .pipe(gulp.dest('dist/css'))//将会在css下生成main2.css
        .pipe(browserSync.reload({stream:true}));
});
// 压缩css
gulp.task('css', function () {
    gulp.src(['./css/*.css']) //多个文件以数组形式传入
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
        .pipe(concat('style.css'))//合并之后生成main.css
        .pipe(cleanCSS())//压缩新生成的css
        .pipe(gulp.dest('dist/css'))//将会在css下生成main2.css
        .pipe(browserSync.reload({stream:true}));
});
//压缩js
gulp.task("script",function(){
    gulp.src(['./js1/*.js'])
        .pipe(changed('dist/js', {hasChanged: changed.compareSha1Digest}))
        // .pipe(concat('index.js'))
        // .pipe(ugLify())  
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}));
});

// 压缩图片
gulp.task('images', function () {
    gulp.src('./img/*.*')
        .pipe(changed('dist/images', {hasChanged: changed.compareSha1Digest}))
        .pipe(imageMin({
            progressive: true,// 无损压缩JPG图片
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
            // use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}));
});
  // 转换es5
gulp.task("es6", function () {
    return gulp.src("js/*.js")// ES6 源码存放的路径
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(changed('dist/js', {hasChanged: changed.compareSha1Digest}))
        .pipe(concat('main.js'))
        .pipe(ugLify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}));

});
//启动热更新
gulp.task('serve', ['delete'], function() {
    gulp.start('script','es6','css','less','sass','html');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('js1/*.js', ['script']);         //监控文件变化，自动更新
    gulp.watch('css/*.less', ['less']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('css/*.css', ['css']);
    gulp.watch('*.html', ['html']);
    gulp.watch('img/*.*', ['images']);
    gulp.watch('js/*.js', ['es6']);
});

gulp.task('default',['serve']);
