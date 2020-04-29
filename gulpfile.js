const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const tsExamples = ts.createProject('tsconfig-examples.json');
const merge = require('merge2');

gulp.task('default', function () {
    return compile(tsProject, 'dist');
});

gulp.task('examples', function() {
    return compile(tsExamples, 'examples/dist');
})

function compile(tsconfig, dest) {
    const tsResult = tsconfig.src().pipe(tsconfig());
    return merge([
        tsResult.js.pipe(gulp.dest(dest)),
        tsResult.dts.pipe(gulp.dest(dest))
    ])
}