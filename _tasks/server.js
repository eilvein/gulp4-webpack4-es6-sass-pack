/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-04 14:57:04
 * @LastEditors  : ROOBO FE
 * @LastEditTime : 2019-12-26 16:27:33
 * @Descripttion: server.js
 */
'use strict'
module.exports = (gulp, Plugin, config) => {
    const { task } = gulp
    // 静态服务器
    function browserSync(cb) {
        Plugin.browserSync.init(
            {
                files: config.output + '**',
                //proxy: "yourlocal.com",
                server: {
                    baseDir: config.output
                }
            },
            cb
        )
    }
    browserSync.displayName = 'server'
    browserSync.description = '静态服务器'
    task(browserSync)
}
