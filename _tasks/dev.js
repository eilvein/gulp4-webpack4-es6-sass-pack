/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-04 15:22:44
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-05 17:51:23
 * @Descripttion:
 */
'use strict'
module.exports = function(gulp, Plugin, config) {
    const { watch, series, task, parallel, src, dest } = gulp
    // dev html编译
    task('devhtml', () => {
        let htmlSrc = config.src.html
        let htmlDst = config.output
        return (
            src(htmlSrc)
                // .pipe(Plugin.changed(htmlDst))
                .pipe(
                    Plugin.fileinclude({
                        prefix: '@@',
                        basepath: '@file'
                    })
                )
                //.pipe(Plugin.useref())
                .pipe(dest(htmlDst))
        )
        // .pipe(Plugin.notify({ message: 'Htmls task complete' }));
    })
    // const devhtml = task('devhtml')

    // // dev less 编译
    task('devless', () => {
        let lessSrc = config.src.less
        let lessDst = config.output + 'css'
        return (
            src(lessSrc)
                // .pipe(Plugin.changed(lessDst))
                .pipe(Plugin.plumber({ errorHandler: Plugin.notify.onError('Error: <%= error.message %>') }))
                .pipe(Plugin.sourcemaps.init())
                .pipe(Plugin.less())
                .pipe(Plugin.sourcemaps.write('./maps'))
                .pipe(dest(lessDst))
        )
    })

    // dev sass 编译
    task('devsass', () => {
        let sassSrc = config.src.sass
        let sassDst = config.output + 'css'
        return src(sassSrc)
            .pipe(Plugin.plumber({ errorHandler: Plugin.notify.onError('Error: <%= error.message %>') }))
            .pipe(Plugin.sourcemaps.init())
            .pipe(Plugin.sass().on('error', Plugin.sass.logError))
            .pipe(Plugin.sourcemaps.write('./maps'))
            .pipe(dest(sassDst))
    })

    // dev css 编译
    task('devcss', () => {
        let cssSrc = config.src.css
        let cssDst = config.output + 'css'
        return src(cssSrc).pipe(dest(cssDst))
    })

    // webapack js
    task('dev:webpack', () => {
        let jsSrc = config.src.js
        let jsDst = config.output + 'js'
        return src(jsSrc)
            .pipe(Plugin.plumber({ errorHandler: Plugin.notify.onError('Error: <%= error.message %>') }))
            .pipe(Plugin.webpackStream(Plugin.webpackDevConfig, Plugin.webpack))
            .pipe(dest(jsDst))
    })

    // dev js 编译
    task('devjs', () => {
        let jsSrc = config.src.js
        let jsDst = config.output + 'js'

        return (
            src(jsSrc)
                .pipe(Plugin.changed(jsDst))
                .pipe(Plugin.plumber({ errorHandler: Plugin.notify.onError('Error: <%= error.message %>') }))

                // 语法检查
                // .pipe(Plugin.jshint('../.jshintrc'))
                // .pipe(Plugin.jshint.reporter('default'))

                // es6
                .pipe(Plugin.sourcemaps.init())
                .pipe(Plugin.babel())
                .pipe(Plugin.sourcemaps.write('./maps'))
                .pipe(dest(jsDst))
        )
    })

    // dev img 编译
    task('devimg', () => {
        let imgSrc = config.src.img
        let imgDst = config.output + 'img'
        return src(imgSrc)
            .pipe(Plugin.changed(imgDst))
            .pipe(dest(imgDst))
    })

    // dev video 编译
    task('video', () => {
        let videoSrc = config.src.video
        let videoDst = config.output + 'video'
        return src(videoSrc).pipe(dest(videoDst))
    })

    // dev font 编译
    task('font', () => {
        let fontsSrc = config.src.fonts
        let fontsDst = config.output + 'fonts'
        return src(fontsSrc).pipe(dest(fontsDst))
    })

    // dev data 编译
    task('data', () => {
        let dataSrc = config.src.data
        let dataDst = config.output + 'data'
        return src(dataSrc).pipe(dest(dataDst))
    })

    // 雪碧图
    task('sprite', () => {
        let imgSrc = config.src.img
        let imgDst = config.output + 'img'
        let spriteData = src(config.root + '/src/img/sprite/*.png').pipe(
            Plugin.spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            })
        )
        return spriteData.pipe(dest(imgDst))
    })

    // 清空编译后的文件
    task('clean', (cb) => {
        let distFile = config.output + '*'
        return Plugin.del(distFile, cb)
    })
    task('clean:rev', (cb) => {
        let revFile = config.root + '/rev/**/*'
        return Plugin.del(revFile, cb)
    })
    task('clean:zip', (cb) => {
        let revFile = config.root + '/release/*'
        return Plugin.del(revFile, cb)
    })

    // 初始化全部任务
    task('init:old', series('clean', parallel('devhtml', 'devsass', 'devcss', 'devless', 'devjs', 'devimg', 'font', 'data')))
    task('init', series('clean', parallel('devhtml', 'devsass', 'devcss', 'devless', 'dev:webpack', 'devimg', 'font', 'data')))

    // dev watch
    task('watch:old', (cb) => {
        watch(config.src.html, series('devhtml'))
        watch(config.src.allless, series('devless'))
        watch(config.src.allsass, series('devsass'))
        watch(config.src.css, series('devcss'))
        watch(config.src.js, series('devjs'))
        watch(config.src.img, series('devimg'))
        watch(config.src.fonts, series('font'))
        watch(config.src.data, series('data'))
        cb()
    })

    //dev webpack watch
    task('watch:webpack', () => {
        watch(config.src.html, series('devhtml'))
        watch(config.src.allless, series('devless'))
        watch(config.src.allsass, series('devsass'))
        watch(config.src.css, series('devcss'))
        watch(config.src.js, series('dev:webpack'))
        watch(config.src.img, series('devimg'))
        watch(config.src.fonts, series('font'))
        watch(config.src.data, series('data'))
    })
}
