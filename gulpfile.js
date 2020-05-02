const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const rimraf = require('rimraf');
 
const libPathBase = './lib';
const examplesPathBase = './examples';

const donePlaceholder = () => {};

exports['clean:examples'] = function(done = donePlaceholder) {
    clean([`${examplesPathBase}/dist`], done);
    done();
}
exports['build:examples'] = gulp.series(exports['clean:examples'], buildExamples);

exports['clean'] = function(done = donePlaceholder) {
    clean([`dist`], done);
    done();
}

exports['build'] = gulp.series(exports['clean'], build);

exports['clean:all'] = gulp.series(exports['clean'], exports['clean:examples']);

function clean(paths, done) {
    paths.forEach(path => {rimraf(path, done)});
    done();
}

function build(done = donePlaceholder) {
    const tsConf = './tsconfig-examples.json';
    const libRes = tsResult(ts.createProject(tsConf, {declarationFiles: true}), `${libPathBase}/**/*.ts`);
    const libDest = `dist/`;

    libRes.pipe(dest(libDest));
    done();
}

function buildExamples(done = donePlaceholder) {
    const tsConf = './tsconfig-examples.json';

    const libRes = tsResult(ts.createProject(tsConf), `${libPathBase}/**/*.ts`);
    const examplesRes = tsResult(ts.createProject(tsConf), `${examplesPathBase}/**/*.ts`);

    const libDest = `${examplesPathBase}/dist/lib/`;
    const examplesDest = `${examplesPathBase}/dist/examples/`;

    combine(
            libRes.pipe(dest(libDest)),
            examplesRes.pipe(dest(examplesDest)),
            move(`${examplesPathBase}/**/*.html`, examplesDest),
            move(`${examplesPathBase}/**/*.css`, examplesDest),
        );
    done();
}

function tsResult(tsProject, srcPath) {
    return src(srcPath).pipe(tsProject());
}

function move(from, to) {
    return src(from).pipe(dest(to));
}

function src(path) {    
    return gulp.src(path);
}

function dest(path) {
    return gulp.dest(path);
}

function combine(...streams) {
    return merge(streams);
}