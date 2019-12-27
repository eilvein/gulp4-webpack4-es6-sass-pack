/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-06 11:13:36
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-06 11:26:53
 * @Descripttion:
 */
'use strict'
module.exports = (gulp, Plugin, config) => {
    const { task, src, dest } = gulp
    function minifyFont(text, cb) {
        src(config.src.fonts)
            .pipe(
                Plugin.fontmin({
                    text: text
                })
            )
            .pipe(dest(config.output + 'fonts'))
            .on('end', cb)
    }

    task('fonts', (cb) => {
        let buffers = []
        src('src/*.html')
            .on('data', (file) => {
                buffers.push(file.contents)
            })
            .on('end', () => {
                var text = Buffer.concat(buffers).toString('utf-8')
                minifyFont(text, cb)
            })
    })
    task('fonts').description = '字体处理'
}
