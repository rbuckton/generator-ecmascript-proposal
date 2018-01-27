const gulp = require("gulp");
const tsb = require("gulp-tsb");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

const project = tsb.create("tsconfig.json");

// gulp.task("clean", () => del("docs/**/*"));

gulp.task("build", () => gulp
    .src(["generators/app/**/*.ts"])
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(sourcemaps.write(".", { includeContent: false }))
    .pipe(gulp.dest("generators/app")));

gulp.task("default", ["build"]);