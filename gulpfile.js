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
    return src(`app/js/app.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

// Include Stylelint
const lintCSS = () => {
    return src(`app/css/style.css`)
        .pipe(
            stylelint({
                reporters: [{ formatter: `string`, console: true }],
            })
        );
};

//JavaScript to ES5
const transpileJSForProd = () => {
    return src(`app/js/app.js`)
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: [`@babel/preset-env`],
            })
        )
        .pipe(sourcemaps.write(`.`))
        .pipe(dest(`prod/app/js`));
};

// Compress JavaScript
const compressJS = () => {
    return src(`app/js/app.js`)
        .pipe(
            babel({
                presets: [`@babel/preset-env`],
            })
        )
        .pipe(uglify())
        .pipe(dest(`prod/app/js`));
};

// Compress CSS
const compressCSS = () => {
    return src(`app/css/style.css`)
        .pipe(cleanCSS())
        .pipe(dest(`prod/app/css`));
};

// Copy index.html to prod
const copyHTML = () => {
    return src(`app/html/index.html`).pipe(dest(`prod`));
};

// Create Serve
const serve = () => {
    browserSync.init({
        server: {
            baseDir: [ `./app`,
                `./app/html`,
            ]
        },
    });
    watch(`app/js/*.js`, series(lintJS, transpileJSForProd)).on(`change`, browserSync.reload);
    watch(`app/css/*.css`, lintCSS).on(`change`, browserSync.reload);
    watch(`app/html/*.html`).on(`change`, browserSync.reload);
};

// Export serve
exports.serve = series(parallel(lintJS, lintCSS), transpileJSForProd, serve);

// Set prod build as default
exports.default = series(
    parallel(lintJS, lintCSS),
    parallel(compressJS, compressCSS, copyHTML)
);
