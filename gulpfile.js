const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      BrowserSync  = require('browser-sync'),
      htmlmin      = require('gulp-htmlmin'),
      csso         = require('gulp-csso'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify       = require('gulp-uglify-es').default;

gulp.task('sass', ()=>
     gulp.src('app/sass/**/*.+(sass|scss)')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(BrowserSync.reload({stream: true}))
);

gulp.task('sync', ()=>{
    BrowserSync({
        server:{
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['sync', 'sass'], ()=>{
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/**/*.html', BrowserSync.reload);
    gulp.watch('app/css/**/*.css', BrowserSync.reload);
    gulp.watch('app/js/**/*.js', BrowserSync.reload);
});





gulp.task('htmlmin', ()=>
     gulp.src('app/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
);

gulp.task('cssmin', ()=>
     gulp.src('app/css/**/*.css')
    .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
);

gulp.task('jsmin', ()=>
     gulp.src('app/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);

gulp.task('img', ()=>
     gulp.src('app/img/**/*.+(png|jpg|jpeg)')
    .pipe(gulp.dest('dist/img'))
);

gulp.task('fonts', ()=>
     gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
);

gulp.task('build', ['htmlmin', 'cssmin', 'jsmin', 'img', 'fonts']);

gulp.task('default', ['watch']);