'use strict'
const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBaseConf = require('../../webpack.config')
module.exports = webpackMerge(webpackBaseConf, {
    mode: 'production',
    devtool: 'none',
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
