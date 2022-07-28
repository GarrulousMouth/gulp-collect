const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

const path = {
    styles: {
        src: 'src/sass/**/*.+(scss|sass)',
        dist: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dist: 'dist/js'
    },
    images: {
        src: 'src/img/**/*',
        dist: 'dist/img/'
    },
    fonts: {
        src: 'src/fonts/**/*',
        dist: 'dist/fonts/'
    },
    icons: {
        src: 'src/icons/**/*',
        dist: 'dist/icons/'
    },
}

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
        }
    });
    gulp.watch('src/*.html').on('change', browserSync.reload)
});

gulp.task('styles', function() {
    return gulp.src(path.styles.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(path.styles.dist))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('images', function() {
    return gulp.src(path.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(path.images.dist))
})

gulp.task('fonts', function () {
    return gulp.src(path.fonts.src)
        .pipe(gulp.dest(path.fonts.dist));
});

gulp.task('scripts', function () {
    return gulp.src(path.scripts.src)
        .pipe(gulp.dest(path.scripts.dist));
});

gulp.task('icons', function () {
    return gulp.src(path.icons.src)
        .pipe(gulp.dest(path.icons.dist));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));