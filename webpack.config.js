/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-03 16:31:58
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-05 18:19:08
 * @Descripttion:
 */
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        vendors: ['jquery']
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            name: 'vendors',
            minChunks: 1
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
}
