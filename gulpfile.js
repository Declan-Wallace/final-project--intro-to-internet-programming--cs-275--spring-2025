const { src, dest, series, parallel, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const cleanCSS = require(`gulp-clean-css`);
const eslint = require(`gulp-eslint`);
const stylelint = require(`gulp-stylelint`);
const browserSync = require(`browser-sync`).create();
const sourcemaps = require(`gulp-sourcemaps`);

// Include validateHTML, validateCSS, validateJS, compressHTML, compressCSS, transpileJSForDev

// Include ESLint
const lintJS = () => {
    return src(`scripts/main.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

// Include Stylelint
const lintCSS = () => {
    return src(`styles/main.css`)
        .pipe(
            stylelint({
                reporters: [{ formatter: `string`, console: true }],
            })
        );
};

//JavaScript to ES5
const transpileJSForProd = () => {
    return src(`scripts/main.js`)
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: [`@babel/preset-env`],
            })
        )
        .pipe(sourcemaps.write(`.`))
        .pipe(dest(`prod/scripts`));
};

// Compress JavaScript
const compressJS = () => {
    return src(`scripts/main.js`)
        .pipe(
            babel({
                presets: [`@babel/preset-env`],
            })
        )
        .pipe(uglify())
        .pipe(dest(`prod/scripts`));
};

// Compress CSS
const compressCSS = () => {
    return src(`styles/main.css`)
        .pipe(cleanCSS())
        .pipe(dest(`prod/styles`));
};

// Copy index.html to prod
const copyHTML = () => {
    return src(`index.html`).pipe(dest(`prod`));
};

// Create Serve
const serve = () => {
    browserSync.init({
        server: {
            baseDir: `./`,
        },
    });
    watch(`scripts/main.js`, series(lintJS, transpileJSForProd)).on(`change`, browserSync.reload);
    watch(`styles/main.css`, lintCSS).on(`change`, browserSync.reload);
    watch(`index.html`).on(`change`, browserSync.reload);
};

// Export serve
exports.serve = series(parallel(lintJS, lintCSS), transpileJSForProd, serve);

// Set prod build as default
exports.default = series(
    parallel(lintJS, lintCSS),
    parallel(compressJS, compressCSS, copyHTML)
);
