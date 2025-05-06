const { src, dest, series, parallel, watch } = require(`gulp`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const cleanCSS = require(`gulp-clean-css`);
const eslint = require(`gulp-eslint`);
const stylelint = require(`gulp-stylelint`);
const browserSync = require(`browser-sync`).create();
const sourcemaps = require(`gulp-sourcemaps`);

// Include ESLint
const validateJS = () => {
    return src(`app/js/app.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

// Include Stylelint
const validateCSS = () => {
    return src(`app/css/style.css`)
        .pipe(
            stylelint({
                reporters: [{ formatter: `string`, console: true }],
            })
        );
};

// JavaScript to ES5
const transpileJSForProd = () => {
    return src(`app/js/app.js`)
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: [`@babel/preset-env`],
            })
        )
        .pipe(sourcemaps.write(`.`))
        .pipe(dest(`prod/js`));
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
        .pipe(dest(`prod/js`));
};

// Compress CSS
const compressCSS = () => {
    return src(`app/css/style.css`)
        .pipe(cleanCSS())
        .pipe(dest(`prod/css`));
};

// Validate HTML
const validateHTML = () => {
    const htmlhint = require(`gulp-htmlhint`);
    return src(`app/html/*.html`)
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failAfterError());
};

// Compress HTML
const compressHTML = () => {
    const htmlmin = require(`gulp-htmlmin`);
    return src(`app/html/index.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(`prod`));
};

// JavaScript to ES5 for Dev
const transpileJSForDev = () => {
    return src(`app/js/app.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: [`@babel/preset-env`] }))
        .pipe(sourcemaps.write(`.`))
        .pipe(dest(`app/js`));
};

// Create Serve
const serve = () => {
    browserSync.init({
        server: {
            baseDir: [
                `./app`,
                `./app/html`,
            ]
        },
    });
    watch(`app/js/*.js`, series(validateJS, transpileJSForProd)).on(`change`, browserSync.reload);
    watch(`app/css/*.css`, validateCSS).on(`change`, browserSync.reload);
    watch(`app/html/*.html`).on(`change`, browserSync.reload);
};

// Export serve
exports.serve = series(
    parallel(validateJS, validateCSS),
    transpileJSForProd,
    serve
);

// Set prod build as default
exports.default = series(
    parallel(validateJS, validateCSS),
    parallel(compressJS, compressCSS, compressHTML)
);

exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.transpileJSForDev  = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
