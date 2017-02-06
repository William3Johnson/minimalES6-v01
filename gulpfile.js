var gulp = require("gulp");
var uglifycss = require("gulp-uglifycss");
var sass = require("gulp-concat");
 
gulp.task('scss', function (){
	// what files do i want to look for
	gulp.src("src/scss/app.scss")
	.pipe(sass())
	.pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    .pipe(gulp.dest('.dist/css')) 
    }))
	// where should i put the renamed file(s)
	.pipe(gulp.dest('./dist/'));


	
});

gulp.task ('default', function(){
 console.log('hello');
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['scss']);
});

	// Default Task

