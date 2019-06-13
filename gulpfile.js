const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nodemon = require('nodemon');
const logger = require('./util/logger');

// Checks all JavaScript files
gulp.task('eslint', () => {
    return gulp.src(
        [
            '**/*.js',
            '**/*.jsx',
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Compiles SCSS files to CSS (used for development)
gulp.task('sass:compile:development', () => {
    return gulp.src('style/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('public/css'));
});

// Compiles SCSS files to CSS with prefixing for browser compatibility and minificatoin (used for production)
gulp.task('sass:compile:production', () => {
    return gulp.src('style/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('public/css'));
});

// Run nodemon
let nodemonInstance = null;
let nodemonStarted = false;
gulp.task('server', cb => {
    nodemonInstance = nodemon({
        script: 'server.js',
        ignore: ['public/**/*', 'log/*', 'app/*'],
        watch: ['**/*.js'],
        ext: 'js',
        verbose: false,
    }).on('crash', () => {
        logger.error('Server has crashed... restarting in 3 seconds!');
        nodemonInstance.emit('restart', 3);  // restart the server in 3 seconds
    }).on('start', () => {
        if (!nodemonStarted) {
            logger.info('Server started!');
            cb();
            nodemonStarted = true;
        }
    });
});

// Run the development environment
gulp.task('development',
    gulp.series(
        gulp.parallel(
            'sass:compile:development',
            gulp.series(
                'eslint',
                // TODO jsx  compile
            ),
        ),
        'server',
        // TODO 'watch',
    ));

// TODO production

// Run development task as the default
gulp.task('default', gulp.series('development'));
