const gulp = require("gulp");
const { exec } = require("./scripts/exec");

const build = () => exec(process.execPath, [require.resolve("typescript/lib/tsc.js"), "-b", "tsconfig.json"]);
const clean = () => exec(process.execPath, [require.resolve("typescript/lib/tsc.js"), "-b", "--clean", "tsconfig.json"]);

gulp.task("clean", clean);
gulp.task("build", build);
gulp.task("default", build);