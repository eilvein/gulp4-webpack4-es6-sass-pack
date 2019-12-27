'use strict'
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBaseConf = require('../../webpack.config')
console.log(path.resolve(__dirname, '../src/js/util/'))
module.exports = webpackMerge(webpackBaseConf, {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, '../src/js/main'),
        pxtorem: path.resolve(__dirname, '../src/js/components/pxtorem')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src/'),
            Utilities: path.resolve(__dirname, '../src/js/util/')
        }
    }
})
