var gulp     = require('gulp');
var rigger   = require('gulp-rigger');
var data     = require('gulp-data');
var nunjucks = require('gulp-nunjucks-render');
var cssprettify = require('gulp-jsbeautifier');
var prettify = require('gulp-prettify');
var sass     = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var gcmq     = require('gulp-group-css-media-queries');
var notify   = require('gulp-notify');
var plumber  = require('gulp-plumber');
var gaze     = require('gaze');

var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};

var paths = {
    src: {
        html: './src/*.html',
        js: './src/assets/js/*',
        sass: './src/assets/sass/*.scss',
        img: './src/assets/img/*',
        fonts: './src/assets/fonts/**/*',
        templates: './src/templates/'
    },
    dest: {
        html: './build/',
        js: './build/assets/js/',
        css: './build/assets/css/',
        img: './build/assets/img/',
        fonts: './build/assets/fonts/'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/assets/js/**',
        css: './src/assets/sass/**/*',
        img: './src/assets/img/*',
        fonts: './src/assets/fonts/**/*'
    }
};

gulp.task('html', function () {
    // HTML pages
    gulp.src(paths.src.html, { base: './src' })
        .pipe(plumber(plumberErrorHandler))
        .pipe(rigger())
        .pipe(data(function() {
            return require('./data.json')
        }))
        .pipe(nunjucks({
            path: paths.src.templates
        }))
        .pipe(prettify({
            indent_inner_html: false,
            unformatted: [],
            extra_liners: [],
            indent_size: 4
        }))
        .pipe(gulp.dest(paths.dest.html))
});

gulp.task('css', function () {
    // Main styles
    gulp.src(paths.src.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(prefixer(['ie >= 9', '> 5%']))
        .pipe(gcmq())
        .pipe(cssprettify({
            indent_level: 4,
            eol: "\r\n"
        }))
        .pipe(gulp.dest(paths.dest.css));
});

gulp.task('js', function () {
    // Main scripts
    gulp.src(paths.src.js)
        .pipe(plumber(plumberErrorHandler))
        .pipe(rigger())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('img', function () {
    // Main images
    gulp.src(paths.src.img)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(paths.dest.img))
});

gulp.task('fonts', function () {
    // Main fonts
    gulp.src(paths.src.fonts)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(paths.dest.fonts))
});


gaze(paths.watch.html, function () {
    this.on('all', function () {
        gulp.start('html')
    });
});

gaze(paths.watch.js, function () {
    this.on('all', function () {
        gulp.start('js')
    });
});

gaze(paths.watch.css, function () {
    this.on('all', function () {
        gulp.start('css')
    });
});

gaze(paths.watch.img, function () {
    this.on('all', function () {
        gulp.start('img')
    });
});

gaze(paths.watch.fonts, function () {
    this.on('all', function () {
        gulp.start('fonts')
    });
});

gulp.task('default', ['html', 'js', 'css', 'img', 'fonts']);