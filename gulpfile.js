"use strict";

var gulp = require("gulp"),
    gutil = require("gulp-util"),
    clean = require('gulp-clean'),
    cleanhtml = require('gulp-cleanhtml'),
    source = require("vinyl-source-stream"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    watchify = require("watchify"),
    babelify = require("babelify"),
    streamify = require("gulp-streamify"),
    uglify = require("gulp-uglify"),
    minifycss = require('gulp-minify-css'),
    es = require("event-stream"),
    fs = require('fs'),
    _ = require("underscore");

var SRC_DIR = "./code";
var BUILD_DIR = "./build";

// Define input files to bundle

var FILES = [
    "js/content.js",
    "js/bg/background.js",
    "js/page_action/popup.js"
];

// Grab all the js files from module folders (if you add a new folder to the file system you must add it here too)
var moduleFolders = [
    'js/modules/Common',
    'js/modules/ItemPage',
    'js/modules/ShelfPage'
];

_.each(moduleFolders, function(folder) {
    var files = fs.readdirSync('code/'+folder);

    for (var i = 0; i < files.length; i++) {
        FILES.push(folder + "/" + files[i]);
    }
});

function bundle(bundler, entry, destDir, minify) {
    gutil.log(gutil.colors.yellow("Updating bundle..."));

    return bundler
        .transform(babelify, {presets: ["es2015"]})
        .bundle()
        .on("error", gutil.log)
        .pipe(source(entry))
        .pipe(minify ? streamify(uglify()) : gutil.noop())
        //.pipe(rename({
        //    extname: ".bundle.js"
        //}))
        .pipe(gulp.dest(destDir));
}

function build(watch, minify) {
    var destDir = watch ? SRC_DIR : BUILD_DIR;

    // Map them to our stream function
    var tasks = FILES.map(function (entry) {
        //gutil.log('modules ========== ' , modules)
        var options = {entries: [entry], basedir: SRC_DIR, debug: watch};
        var bundler = watch ? watchify(browserify(_.extend({
            cache: {},
            packageCache: {},
            fullPaths: true
        }, options))) : browserify(options);
        var rebundle = _.partial(bundle, bundler, entry, destDir, minify);

        bundler.on("update", rebundle);

        return rebundle();
    });

    // create a merged stream
    return es.merge.apply(null, tasks);
}

gulp.task('copy', function() {
	gulp.src('code/fonts/**')
		.pipe(gulp.dest('build/fonts'));
	gulp.src('code/icons/**')
		.pipe(gulp.dest('build/icons'));
	gulp.src('code/_locales/**')
		.pipe(gulp.dest('build/_locales'));
    gulp.src('code/templates/**')
		.pipe(gulp.dest('build/templates'));
    gulp.src('code/css/**')
		.pipe(gulp.dest('build/css'));
    gulp.src('code/js/libs/**')
		.pipe(gulp.dest('build/js/libs'));
    gulp.src('code/js/page_action/popup.html')
		.pipe(gulp.dest('build/js/page_action'));
	return gulp.src('code/manifest.json')
		.pipe(gulp.dest('build'));
});

//copy and compress HTML files
gulp.task('html', function() {
	return gulp.src(['code/html/*.html'])
		.pipe(cleanhtml())
		.pipe(gulp.dest('build/html'));
});

gulp.task('clean', function() {
	return gulp.src('build/*', {read: false})
		.pipe(clean());
});

gulp.task("build", function () {
    return build(false, true);
});

//gulp.task("watch", function () {
//    return build(true, false);
//});

gulp.task("default", ['copy', 'html', 'build']);
