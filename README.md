# gulp4-webpack-es6-sass-pack

A starter pack for a web template using babel to transpile es5+, utilizing gulp4 & webpack4+ for compilation

> Install once to support multiple projects

### 项目安装

```markdown
# 通过 yarn 安装

yarn install

# 通过 npm 安装

npm install
```

### 编译开发

```markdown
# 开发监听（老程序开发）

cd project
gulp watch 开发环境

# 开发监听（webpack）

cd project
gulp dev 开发环境
```

### 编译生成

```markdown
# 部署编译（老程序生产）

gulp release 静态文件生产
gulp build 模拟生成环境

# 部署编译（webpack 生成）

gulp webpack:release 静态文件生产
gulp build 模拟生成环境
```

### 其他操作

```markdown
# 参数帮助

gulp help

# 测试环境部署

gulp deploy 部署测试服务机器

# 其他常用操作

gulp clean 清除 dist 文件
gulp clean:rev 清除 rev 文件
gulp clean:zip 清除 zip 文件
gulp sprite 雪碧图
gulp mocha 测试框架
gulp zip 输出压缩文件
```

### License

[MIT](License.md)
