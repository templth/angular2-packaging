'use strict';

const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var addsrc = require('gulp-add-src');

// See this article: http://caveofcode.com/2016/03/gulp-tasks-for-minification-and-concatenation-of-dependencies-in-angularjs/

gulp.task('app-bundle', function () {
  var tsProject = ts.createProject('tsconfig.json', {
	  typescript: require('typescript'),
	  outFile: 'app.js'
  });

  var tsResult = gulp.src([
    'node_modules/angular2/typings/browser.d.ts',
    'typings/main/ambient/firebase/firebase.d.ts',
    'app/**/*.ts'
  ])
	.pipe(ts(tsProject));

  return tsResult.js.pipe(addsrc.append('config-prod.js'))
                    .pipe(concat('app.min.js'))
                    .pipe(uglify())
                    .pipe(gulp.dest('./dist'));
});

gulp.task('vendor-bundle', function() {
	gulp.src([
			'node_modules/es6-shim/es6-shim.min.js',
			'node_modules/systemjs/dist/system-polyfills.js',
			'node_modules/angular2/bundles/angular2-polyfills.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/rxjs/bundles/Rx.js',
			'node_modules/angular2/bundles/angular2.dev.js',
			'node_modules/angular2/bundles/http.dev.js'
		])
		.pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('html-replace',[ 'app-bundle', 'vendor-bundle' ], function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'vendor': 'vendors.min.js',
        'app': 'app.min.js'
    }))
    .pipe(gulp.dest('dist'));
});