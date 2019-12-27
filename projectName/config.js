/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-03 16:33:55
 * @LastEditors  : ROOBO FE
 * @LastEditTime : 2019-12-26 17:02:50
 * @Descripttion: config.js
 */
'use strict'

var path = require('path')
var ROOT_PATH = path.resolve(process.cwd())

module.exports = function() {
    var config = {
        src: {
            html: ['src/*.html', 'src/templates*/*.html', 'src/favicon.png'],
            relhtml: ['rev/**/*.json', 'src/*.html', 'src/favicon.png'],
            less: ['src/less/*.less'],
            allless: ['src/less/**/*.less'],
            sass: ['src/sass/*.scss'],
            allsass: ['src/sass/**/*.scss'],
            css: ['src/css/**/*.css'],
            js: ['src/js/**/*.js'],
            img: ['src/img/**/*'],
            fonts: ['src/fonts/**/*'],
            data: ['src/data/**/*']
        },
        output: 'dist/',
        input: 'src/',
        root: ROOT_PATH,
        release: '../release/'
    }

    return config
}
