'use strict';

// npm init -y - инициализируем npm с настройками проекта

// c https://www.npmjs.com/ все следующие команды
// npm install --save-dev gulp
// npm install --save-dev gulp-scss
// npm install --save-dev gulp-cssmin
// npm install --save-dev gulp-concat-css
// npm install --save-dev gulp-watch

// const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const scss = require('gulp-scss');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

function defaultTask() {
    return src('./src/styles/*.scss')
        .pipe(scss())
        .pipe(concatCss("style.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/styles'));
}

exports.default = defaultTask;

function copyFonts() {
    return src('./src/fonts/*')
        .pipe(dest('./dist/fonts'));
}

exports.copyFonts = copyFonts;

function copyImages() {
    return src('./src/images/*')
        .pipe(dest('./dist/images'));
}

exports.copyImages = copyImages;

// выполняем gulp (чтобы создать файл style.min.css) и gulp copy (чтобы скопировать шрифты)

exports.watch = function () {
    watch('./src/styles/*.scss', series('default', 'copyFonts', 'copyImages'));
};

// выполняем gulp watch (чтобы отслеживать изменения)
