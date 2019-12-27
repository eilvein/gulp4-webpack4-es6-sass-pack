/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-06 11:05:59
 * @LastEditors  : ROOBO FE
 * @LastEditTime : 2019-12-27 16:11:35
 * @Descripttion:
 */
'use strict'
module.exports = (gulp, Plugin, config) => {
    const { watch, series, task, parallel, src, dest } = gulp

    // 部署代码copy到部署库
    task('copy', () => {
        let distFile = config.output + '**/*'
        let releaseFile = config.release
        return src(distFile).pipe(dest(releaseFile))
    })

    // 输出压缩文件
    task('zip', () => {
        let distFile = config.output + '**/*'
        let releaseFile = config.release
        src(distFile)
            .pipe(Plugin.zip('dist.zip'))
            .pipe(dest(releaseFile))
    })
    // 部署配置
    let configSSH = {
        host: 'IP',
        port: 22,
        username: 'root',
        password: 'xxxxxxx'
    }
    let gulpSSH = new Plugin.GulpSSH({
        ignoreErrors: false,
        sshConfig: configSSH
    })
    task('exec', () => {
        return gulpSSH.exec(['uptime', 'ls -a', 'pwd'], { filePath: 'commands.log' }).pipe(dest('logs'))
    })

    task('sftp-read', () => {
        return gulpSSH.sftp('read', '/home/iojs/test/gulp-ssh/index.js', { filePath: 'index.js' }).pipe(dest('logs'))
    })

    task('sftp-write', () => {
        return src('index.js').pipe(gulpSSH.sftp('write', '/home/iojs/test/gulp-ssh/test.js'))
    })

    task('shell', () => {
        return gulpSSH
            .shell(['cd /home/iojs/test/thunks', 'git pull', 'npm install', 'npm update', 'npm test'], { filePath: 'shell.log' })
            .pipe(dest('logs'))
    })

    // 部署到web端
    task('deploy', () => {
        let fileDst = config.output + '**/*'
        return src(fileDst).pipe(gulpSSH.dest('/roobo/webserver/website/ai/'))
    })

    // 部署到移动端
    task('deploy-m', () => {
        let fileDst = config.output + '**/*'
        return src(fileDst).pipe(gulpSSH.dest('/roobo/webserver/website/m/'))
    })
}
