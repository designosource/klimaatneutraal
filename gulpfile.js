/**
 * Basic GULP setup
 */

'use strict';

/**
 * Define source and build path, devserver ip
 */
var sourceDir = 'source/',
    jsDir = '',
    sassDir = '',
    bowerDir = 'source/bower_components',
    buildDir = 'build/',
    serverIp = '0.0.0.0', // 0.0.0.0 binds to localhost and your local ip
    serverPort = '8001';

/**
 * Load dependencies
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'), // development
    stylish = require('jshint-stylish'), // development -> jshint
    sass = require('gulp-sass'), // development & production
    autoprefixer = require('gulp-autoprefixer'), // development & production
    notify = require('gulp-notify'), // development & production
    webserver = require('gulp-webserver'), // development
    wiredep = require('wiredep').stream, // development
    apidoc = require('gulp-apidoc'), // development
    nodemon = require('gulp-nodemon'), // development
    del = require('del'), // production
    runSequence = require('run-sequence'), // production --> force gulp to run sync
    imagemin = require('gulp-imagemin'), // production
    concat = require('gulp-concat'), // Production
    mainBowerFiles = require('main-bower-files'), // Production
    uglify  = require('gulp-uglify'), // Production
    inject = require('gulp-inject'), // Production and development
    sourcemaps = require('gulp-sourcemaps'); // Production

/**
 * DEV SERVER: development
 */
gulp.task('webserver', function() {
    gulp.src(sourceDir)
        .pipe(webserver({
            host: serverIp,
            port: serverPort,
            livereload: true,
            directoryListing: false,
            open: false
        })
    );
});

/**
 * PRODUCTION SERVER: production
 */
gulp.task('webserver-prod', function() {
    gulp.src(buildDir)
        .pipe(webserver({
            host: serverIp,
            port: serverPort,
            livereload: true,
            directoryListing: false,
            open: 'http://localhost:' + serverPort,
            fallback: 'index.html'
        })
    );
});

/**
 * SASS COMPILING: development
 */
gulp.task('sass', function() {
    gulp.src(sourceDir + 'scss/**/*.scss')
        .pipe(sass({
            'outputStyle': 'expanded',
            'sourceComments': true,
            'lineNumbers': true
        }).on('error', function(err) {
            console.error('Sass error: ', err.message);
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest(sourceDir + 'css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

/**
 * JS LINTING: development
 */
gulp.task('jshint', function() {
    console.log('jshint');
    // All options: http://jshint.com/docs/options/
    var options = {
        'node': true,
        'strict': true,
        'undef': true,
        'unused': 'vars',
        'noempty': true,
        'latedef': true,
        'freeze': true,
        'forin': true,
        'curly': true,
        'eqeqeq': true,
        'bitwise': true,
        'sub': true,
        'predef': ['it', 'describe', 'before', 'beforeEach', 'after', 'afterEach']
    };

    gulp.src(sourceDir + 'js/**/*.js')
        .pipe(jshint(options))
        .pipe(jshint.reporter(stylish)) // print errors
});

/**
 * BOWER INJECTING: development
 */
gulp.task('bower', function () {
    gulp.src(sourceDir + '/**/*.html')
        .pipe(wiredep({
            directory: bowerDir,
            exclude: [

            ],
        }))
        .pipe(gulp.dest(sourceDir));
});

/**
 * APIDOC: development
 */
gulp.task('apidoc',function(){
    apidoc.exec({
        src: sourceDir,
        dest: 'apidoc/',
        //template: "template/",
        debug: true,
        //includeFilters: [ ".*\\.js$" ]
    });
});

/**
 * NODEMON: development | Bug: task Jshint runs twice
 */
gulp.task('nodemon', function () {
    nodemon({
        script: sourceDir + 'js/app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' },
        tasks: ['jshint'] // runs twice :-(
    });
});

/**
 * RESET BUILD DIR: production | cleans buildDir
 */
gulp.task('resetBuild', function(callback) {
    return del([buildDir], function () {
        callback()
    });
});

/**
 * COPY TO BUILD: production
 */
gulp.task('copyToBuild', function() {
    // Exclude css --> let sassBuild handle this
    // Exclude scss --> don't need these files
    // Exclude js --> let jsBuild handle this
    // Exclude bower_components --> let bowerBuild handle this
    return gulp.src(['src/**', '!src/{css,css/**}', '!src/{scss,scss/**}', '!src/{js,js/**}', '!src/{bower_components,bower_components/**}'])
        .pipe(gulp.dest('build'));
});

/**
 * SASS COMPILING: production
 */
gulp.task('sassBuild', function() {
    return gulp.src(sourceDir + 'scss/**/*.scss')
        .pipe(sass({
            'outputStyle': 'compressed',
            'sourceComments': false
        }).on('error', function(err) {
            console.error('Sass error: ', err.message);
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest(buildDir + 'css'));
});

/**
 * IMAGE MINIFICATION: production
 */
gulp.task('imagemin', function () {
    return gulp.src([sourceDir + 'images/**/*.png'])
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 6,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            use: []
        }))
        .pipe(gulp.dest(buildDir + 'images'));
});

/**
 * BUILD BOWER: production | Copy all main files to build dir --> use bower.json to override main files
 */
gulp.task('bowerBuild', function() {

    var options = {
        debugging: true,
        checkExistence: true
    }

    return gulp.src(bowerDir)
        .pipe(mainBowerFiles())
        .pipe(gulp.dest(buildDir + 'bower_components'));
        // Concat to vendor.js is posible
})

/**
 * JS BUILD: production
 */
gulp.task('jsBuild', function() {

    var date = (new Date()).getTime();

    return gulp.src(sourceDir + 'js/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat(date + '.js', {newLine: '\r\n'}))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir + 'js/'));
});

/**
 * Inject concat js to index.html
 */
gulp.task('injectBuild', function () {

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([buildDir + 'js/scripts.js', buildDir + 'css/**.css'], {read: false});

    return gulp.src(buildDir + 'index.html').pipe(inject(sources,{

            // Do not add a root slash to the beginning of the path
            addRootSlash: false,

            // Remove the `public` from the path when doing the injection
            ignorePath: buildDir
        }))
        .pipe(gulp.dest(buildDir));
});

/**
 * Watch for changes | Executes sass and jshint
 */
gulp.task('watch', function(){

    // Watch for sass changes
    gulp.watch(sourceDir + 'scss/**/*.scss', ['sass']);

    // Watch for js changes
    gulp.watch(sourceDir + 'js/**/*.js', ['jshint']);
});


gulp.task('dev', ['webserver', 'watch', 'bower']);

//gulp.task('buildTest', ['resetBuild', 'copyToBuild', 'sassBuild', 'jsBuild', /*'imagemin',*/ 'bowerBuild', 'injectBuild']);

gulp.task('build', function(callback) {
    runSequence('resetBuild', 'copyToBuild', 'sassBuild', 'jsBuild', /*'imagemin',*/ 'bowerBuild', 'injectBuild', /*'webserver-prod',*/ callback);
});