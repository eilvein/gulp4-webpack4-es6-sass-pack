/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-12-06 10:48:35
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-06 11:18:30
 * @Descripttion:
 */
'use strict'
module.exports = (gulp, Plugin, config) => {
    const { task, src } = gulp
    // 测试框架
    function testApi() {
        return src(config.src.js, { read: false }).pipe(
            Plugin.mocha({
                reporter: 'nyan'
            })
        )
    }
    testApi.displayName = 'mocha'
    testApi.description = '测试框架'
    task(testApi)
}
