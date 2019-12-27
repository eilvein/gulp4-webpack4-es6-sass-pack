/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-06 11:27:10
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-10 14:16:20
 * @Descripttion:
 */
'use strict'
module.exports = (gulp, Plugin, config) => {
    const { watch, series, task, parallel, src, dest } = gulp
    // release img
    task('relimg', () => {
        let imgSrc = config.src.img
        let imgDst = config.output + 'img'
        return src(imgSrc)
            .pipe(
                Plugin.imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [Plugin.pngquant()]
                })
            )
            .pipe(dest(imgDst))
    })

    //release less
    task('relless', () => {
        let lessSrc = config.src.less
        let lessDst = config.output + 'css'
        return (
            src(lessSrc)
                //.pipe(Plugin.sourcemaps.init())
                .pipe(Plugin.less())

                .pipe(
                    Plugin.cleanCSS({ debug: true }, function(details) {
                        console.log(details.name + ': ' + details.stats.originalSize)
                        console.log(details.name + '.min: ' + details.stats.minifiedSize)
                    })
                )
                //.pipe(Plugin.sourcemaps.write('./maps'))
                .pipe(Plugin.rev())
                .pipe(dest(lessDst))
                .pipe(Plugin.rev.manifest())
                .pipe(dest(config.root + '/rev/less'))
        )
    })

    //release sass
    task('relsass', () => {
        let sassSrc = config.src.sass
        let sassDst = config.output + 'css'

        return (
            src(sassSrc)
                //.pipe(Plugin.sourcemaps.init())
                .pipe(Plugin.sass().on('error', Plugin.sass.logError))
                //.pipe(Plugin.sourcemaps.write('./maps'))
                .pipe(Plugin.rev())
                //.pipe(Plugin.minifycss())
                .pipe(dest(sassDst))
                .pipe(Plugin.rev.manifest())
                .pipe(dest(config.root + '/rev/sass'))
        )
    })

    //release html
    task('relhtml', () => {
        let htmlSrc = config.src.relhtml
        let htmlDst = config.output
        return src(htmlSrc)
            .pipe(
                Plugin.fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                })
            )
            .pipe(Plugin.revCollector())
            .pipe(dest(htmlDst))
    })

    //release css
    task('relcss', () => {
        let cssSrc = config.src.css
        let cssDst = config.output + 'css'
        return (
            src(cssSrc)
                //.pipe(Plugin.concat('all.css'))
                // .pipe(dest(cssDst))
                // .pipe(Plugin.rename({ suffix: '.min' }))
                .pipe(Plugin.cleanCSS())
                .pipe(Plugin.rev())
                .pipe(dest(cssDst))
                .pipe(Plugin.rev.manifest())
                .pipe(dest(config.root + '/rev/css'))
        )
    })

    // webapack js
    task('rel:webpack', () => {
        let jsSrc = config.src.js
        let jsDst = config.output + 'js'
        return src(jsSrc)
            .pipe(
                Plugin.plumber({
                    errorHandler: Plugin.notify.onError('Error: <%= error.message %>')
                })
            )
            .pipe(Plugin.webpackStream(Plugin.webpackProdConfig, Plugin.webpack))
            .pipe(Plugin.stripDebug())
            .pipe(Plugin.uglify())
            .pipe(Plugin.rev())
            .pipe(dest(jsDst))
            .pipe(Plugin.rev.manifest())
            .pipe(dest(config.root + '/rev/js'))
    })

    //relese js
    task('reljs', function(cb) {
        let jsSrc = config.src.js
        let jsDst = config.output + 'js'

        Plugin.pump(
            [
                src(jsSrc),
                // 语法检查
                // Plugin.jshint('../.jshintrc'),
                // Plugin.jshint.reporter('default'),
                Plugin.babel(),
                // 去掉console和debugger
                Plugin.stripDebug(),
                // Plugin.rename({ suffix: '.min' }),
                Plugin.uglify(),
                Plugin.rev(),
                dest(jsDst),
                Plugin.rev.manifest(),
                dest(config.root + '/rev/js')
            ],
            cb
        )
    })
}
