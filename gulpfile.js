const gulp         = require('gulp'),
	  sass         = require('gulp-sass'),
	  BrowserSync  = require('browser-sync'),
	  concat       = require('gulp-concat'),
	  htmlmin      = require('gulp-htmlmin'),
	  csso         = require('gulp-csso'),
	  autoprefixer = require('gulp-autoprefixer'),
	  uglify       = require('gulp-uglify-es').default;





//SASS and BrowserSync
gulp.task('sass', ()=>
	 gulp.src('src/sass/**/*.+(sass|scss)')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('src/css'))
	.pipe(BrowserSync.reload({stream: true}))
);

gulp.task('sync', ()=>{
	BrowserSync({
		server:{
			baseDir: 'src'
		},
		notify: false
	});
});

gulp.task('watch', ['sync', 'sass'], ()=>{
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/**/*.html', BrowserSync.reload);
	gulp.watch('src/css/**/*.css', BrowserSync.reload);
	gulp.watch('src/js/**/*.js', BrowserSync.reload);
});





//Libraries
gulp.task('libsjs', ()=>
	gulp.src('src/libraries/**/*.js')
	.pipe(concat('lib.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/libs/js'))
);

gulp.task('libscss', ()=>
	gulp.src('src/libraries/**/*.css')
	.pipe(concat('lib.css'))
	.pipe(csso())
	.pipe(gulp.dest('src/libs/css'))
);

gulp.task('libs', ['libsjs', 'libscss']);





//Build and optimize
gulp.task('htmlmin', ()=>
	 gulp.src('src/**/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'))
);

gulp.task('cssmin', ()=>
	 gulp.src('src/css/**/*.css')
	.pipe(autoprefixer({
			browsers: ['last 15 versions'],
			cascade: false
		}))
	.pipe(csso())
	.pipe(gulp.dest('dist/css'))
);

gulp.task('jsmin', ()=>
	 gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
);

gulp.task('img', ()=>
	 gulp.src('src/img/**/*.+(png|jpg|jpeg)')
	.pipe(gulp.dest('dist/img'))
);

gulp.task('fonts', ()=>
	 gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
);

gulp.task('libsdist', ()=>
	gulp.src('src/libs/**/*.+(css|js)')
	.pipe(gulp.dest('dist/libs'))
);





//Gulp commands
gulp.task('build', ['htmlmin', 'cssmin', 'jsmin', 'img', 'fonts', 'libsdist']);

gulp.task('default', ['watch']);