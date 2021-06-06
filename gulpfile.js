// Importar los modulos y plugins que se usarán. Cada uno se importa con require('modulo')

// npm install --seve-dev para instalar las dependencias!

// Aqui importamos las dependencias necesarias!
// const gulp = require('gulp'),
const sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

const { watch, series, src, dest } = require('gulp');

// function pugToHTML(cb) {
// 	src('./pug/*.pug')
// 	.pipe(pug({
// 		pretty: true //boolean false por defecto modo comprimido
// 	}))
// 	.pipe(dest('./')) //esta es guardada en la carpeta ./dist/ en este mismo directorio
//   cb();
// }

function scss(cb) {
    src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: true
        }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
  cb();
}

exports.default = function() {
	browserSync.init({
		server: './'
	});
	// You can use a single task
	// Or a composed task
	// watch('pug/*.pug', series(pugToHTML));
	watch('src/scss/*.scss', series(scss));
	watch('./*.html').on('change',browserSync.reload);
	watch('./css/*.css').on('change',browserSync.reload);
};