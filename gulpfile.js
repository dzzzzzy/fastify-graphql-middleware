
const gulp = require("gulp");
const sequence = require("gulp-sequence");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

const packages = {
    "graphql-fastify-middleware": ts.createProject("src/tsconfig.json"),
};

const dist = "package";
const source = "src";

const modules = Object.keys(packages);

gulp.task("default", function () {
    tasks();
});

modules.forEach(module => {
    gulp.task(module, () => {
        return packages[module]
            .src()
            .pipe(tslint({
                formatter: "verbose",
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true,
            }))
            .pipe(sourcemaps.init())
            .pipe(packages[module]())
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(dist));
    });
});

gulp.task("build", function (cb) {
    sequence("graphql-fastify-middleware", modules.filter((module) => module !== "graphql-fastify-middleware"), cb);
});

function tasks() {
    modules.forEach(module => {
        watchTypescript(source, module);
    });
}

function watchTypescript(source, module) {
    gulp.watch(
        [
            `${source}/${module}/**/*.ts`,
            `${source}/${module}/**/*.tsx`,
            `${source}/${module}/*.ts`,
            `${source}/${module}/*.tsx`,
        ],
        [
            module,
        ]
    ).on("change", function (event) {
        console.log("File " + event.path + " was " + event.type + ", running tasks...");
    });
}