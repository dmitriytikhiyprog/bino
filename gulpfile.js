const {src, dest, series, watch} = require ('gulp')
const sass = require ('gulp-sass')(require('sass'));
const csso = require ('gulp-csso');
const htmlmin = require ('gulp-htmlmin');
const autoprefixer = require ('gulp-autoprefixer');
const sync = require ('browser-sync').create();
const del = require ('del');


const scss = () => {
    return src('src/assets/scss/style.scss')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(csso())
           .pipe(dest('dist'));
}

const html = () => {
    return src('src/index.html')
        .pipe(htmlmin(
            {collapseWhitespace: true}
        ))
        .pipe(dest('dist'));
}
const img = () => {
    return src('src/assets/img/**/*')
           .pipe(dest('dist/assets/img'));
}

const icons = () => {
    return src('src/assets/icons/**/*')
           .pipe(dest('dist/assets/icons'));
}

const fonts = () => {
    return src('src/assets/fonts/**/*')
           .pipe(dest('dist/assets/fonts'));
}
const clear = () => {
    return del('dist');
}

const serve = () => {
    sync.init({
        server: './dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload);
    watch('src/assets/scss/**.scss', series(scss)).on('change', sync.reload);
}

exports.serve = series(clear, html, scss, img, icons, fonts, serve );


