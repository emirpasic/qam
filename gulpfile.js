const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cssAutoPrefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const less = require('gulp-less');
const logger = require('./util/logger');
const mold = require('mold-source-map');
const nodemon = require('gulp-nodemon');
const path = require('path');
const config = require('./config/config');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['dev']);

gulp.task('dev', (cb) => {
    let started = false;
    return nodemon({
        script: 'app.js',
        ext: 'js,jsx,less,ejs',
        tasks: (changedFiles) => {
            const tasks = new Set();
            changedFiles.forEach((file) => {
                logger.info(`Changed ${file}`);
                if (path.extname(file) === '.less')
                    tasks.add('less:compile');
                if (path.extname(file) === '.jsx')
                    tasks.add('jsx:compile');
            });
            return [...tasks];
        }
    }).on('start', () => {
        if (!started) { // Avoid nodemon being started multiple times
            cb();
            started = true;
        }
    });
});

gulp.task('less:compile', () => {
    return gulp.src('assets/less/main.less')
        .pipe(less())
        .on('error', (err) => {
            logger.error(`compiling LESS\n\tFile: ${err.filename}\n\tLine: ${err.line}\n\tType: ${err.type}\n\tMessage: ${err.message}`);
            return this;
        })
        .pipe(cssAutoPrefixer({
            browsers: ['> 1%', 'Safari 7.1'],
            cascade: false
        }))
        .pipe(rename(`main.css`))
        .pipe(gulp.dest('public/css'));
});

gulp.task('jsx:compile', () => {
    return browserify({ entries: 'assets/jsx/main.jsx', extensions: ['.js', '.jsx'], debug: true })
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .on('error', (err) => {
            logger.error(`compiling JSX\n\tFile: ${err.filename}\n\tMessage: ${err.message}`);
        })
        .pipe(mold.transformSourcesRelativeTo('./'))
        .pipe(source('main.jsx'))
        .pipe(buffer())
        .pipe(rename('main.js'))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});

