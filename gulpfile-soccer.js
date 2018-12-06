// ====================================
// gulp file
// ====================================

/*
* TABLE OF CONTENTS
*
* require gulp
* define paths of folder, project name
* add error text debug
* javascripts
* styles
* copy
* image
* delete build folder
* make aboveTheFold (full version)
* taskrunner
*/


// > require gulp
var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject-string'),
    imagemin = require('imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    removeCode = require('gulp-remove-code'),
    cssbeautify = require('gulp-cssbeautify'),
    rmLines = require('gulp-rm-lines');

// > define paths of folder, project name
var paths = {
    project_name: "news",
    source_folder: "./source",
    build_folder: "./build",
    js_dev: './source/js',
    js: './build/Jscripts',
    scss_dev: './source/scss',
    css: './build/styles/css',
    html_dev: "./source/demo-html",
    html: "./build/demo-html",
    fonts_dev: "./source/fonts",
    fonts: "./build/styles/fonts",
    img_dev: "./source/img",
    img: "./build/styles/img",
    figImg_dev: "./source/fig-images",
    figImg: "./build/demo-html/fig-images"
};

// > add error text debug
    // note : for soccer - style
    var reportErrorSoccer = function(error) {
        var text = error.toString();
        text = text.replace(/\n/gm, " \\A ");
        text = text.replace(/('|")/gm, " ");
        gulp.src(paths.css + '/d-soccer-styles.css')
            .pipe(inject.append("body:before{content : '" + text + "';white-space: pre;padding: 50px;display: block;}"))
            .pipe(gulp.dest(paths.css))
            .pipe(browserSync.stream({ once: true }));
    };


// > styles 
// Mobile, soccer widget , soccer
    // widget desktop style
    gulp.task('widget-styles', function() {
        gulp.src(paths.scss_dev + '/pages/soccer/d-widget.scss')
            .pipe(sass())
            .pipe(gulp.dest(paths.css)) // make normal css for debug
            .pipe(browserSync.stream({ once: true }));
    });

    // soccer page
    gulp.task('soccer-styles', function() {
        gulp.src(paths.scss_dev + '/d-soccer-styles.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', reportErrorSoccer))
            .pipe(gulp.dest(paths.css)) // make normal css for debug
            .pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest(paths.css))
            .pipe(browserSync.stream({ once: true }));
    });

// > copy 
// copy sftp, ui.js, js, copyJs, copyFigImg, copyFonts
    // copy only ui.js file
    gulp.task('copyJs-UI', function() {
        gulp.src(paths.js_dev + '/ui-local.js')
            .pipe(gulp.dest(paths.js)).pipe(browserSync.stream({ once: true }));

    });

    gulp.task('copyJs', function() {
        gulp.src(paths.js_dev + '/**/*')
            .pipe(gulp.dest(paths.js));

    });

    gulp.task('copyHtml', function() {
        gulp.src(paths.html_dev + '/**/*')
            .pipe(gulp.dest(paths.html));
    });

    gulp.task('copyFigImg', function() {
        gulp.src(paths.figImg_dev + '/**/*')
            .pipe(gulp.dest(paths.figImg));
        gulp.src(paths.img_dev + '/*.gif')
            .pipe(gulp.dest(paths.img));
    });

    gulp.task('copyFonts', function() {
        gulp.src(paths.fonts_dev + '/**/*')
            .pipe(gulp.dest(paths.fonts));
    });

    gulp.task('copy', ['copyHtml', 'copyFigImg', 'copyFonts']);

// > image
// note : compress image
    gulp.task('soccer-normal', () =>
        imagemin([paths.img_dev + '/soccer/*.png'], paths.img + '/soccer', {
            use: [imageminPngquant({speed: '1',})]
        })
        .then(() => {
            console.log('soccer-normal image optimized');
        })
    );

// note : compress image
    gulp.task('soccer-theme', () =>
        imagemin([paths.img_dev + '/soccer/affCup/*.png'], paths.img + '/soccer/affCup', {
            use: [imageminPngquant({speed: '1',})]
        })
        .then(() => {
            console.log('soccer-theme image optimized');
        })
    );

// > delete build folder
gulp.task('delete', function() {
    del.sync(paths.build_folder);
});

gulp.task('widget-abf', function() {
    gulp.src(paths.css + '/d-widget.css')
        .pipe(rename({
            basename: 'd-widget-abf'
        }))
        .pipe(cssmin())
        .pipe(inject.replace('../fonts', 'https://baomoi-static.zadn.vn/soccer/style/fonts'))
        .pipe(inject.replace('../img', 'https://baomoi-static.zadn.vn/soccer/style/img'))
        .pipe(gulp.dest(paths.css));
});

// > taskrunner
// note : for soccer task
gulp.task('soccer', ['copy', 'soccer-normal', 'soccer-theme', 'soccer-styles', 'widget-styles'],
    function() {
        browserSync.init({
            server: {
                baseDir: "./"
            },
            open: false,
            ghostMode: {
                // scroll: true
            }
        });
        gulp.watch(paths.scss_dev + '/**/*.scss', ['soccer-styles', 'widget-abf']);
        gulp.watch(paths.js_dev + '/**/*.js', function(obj) {
            if (obj.type === 'changed') {
                gulp.src(obj.path, { "base": paths.js_dev})
                    .pipe(gulp.dest(paths.js));
            }
        }).on('change', browserSync.reload);
        gulp.watch(paths.html_dev + '/**/*.html', function(obj) {
            if (obj.type === 'changed') {
                gulp.src(obj.path, { "base": paths.html_dev})
                    .pipe(gulp.dest(paths.html));
            }
        }).on('change', browserSync.reload);
    }
);

