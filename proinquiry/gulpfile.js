//引入 gulp
var gulp = require("gulp");
//引入组件
// var jshint = require("gulp-jshint");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-minify-css");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

function swallowError(error) {
    // If you want details of the error in the console
    console.error(error.toString())
    this.emit('end')
}

//编译sass 读取 编译 输出到新文件夹中
gulp.task('sass',function(){
    gulp.src('src/assets/scss/*.scss')
        .pipe(sass())
        .on("error",swallowError)
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('watch',function(){
    gulp.watch('src/assets/scss/*.scss',['sass']);
});

gulp.task('default',["sass"]);
/*gulp.task('default',["sass"],function () {
    gulp.watch(["**!/!*.scss"],["sass"]);
})*/

/*
//检查JS脚本
gulp.task('lint',function(){
    gulp.src('app/scripts/!*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//编译sass 读取 编译 输出到新文件夹中
gulp.task('sass',function(){
    gulp.src('src/assets/scss/!*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css'));
});
//合并压缩文件
gulp.task('scripts',function(){
    //读取JS文件，合并，输出到新目录，重新命名，压缩，输出
    gulp.src('app/scripts/!*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'));
    //读取CSS文件，合并，输出到新目录，重新命名，压缩，输出
    gulp.src('app/css/!*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('app/dist'))
        .pipe(rename('all.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('app/dist'));
});
//服务器插件中，监视文件并自动刷新
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
    gulp.watch(['app/scripts/!*.js','app/scss/!*.scss','app/!*.html'],function(){
        gulp.run('lint','sass','scripts');
        browserSync.reload();
    });
});
//默认行为,直接调用服务器
gulp.task('default',function(){
    gulp.run('serve');
});*/
