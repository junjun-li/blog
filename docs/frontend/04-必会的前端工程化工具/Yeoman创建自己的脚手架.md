# Yeoman 创建自己的脚手架

> 如果每做一个项目, 都要配置一大堆东西, 安装各种依赖, 写 webpack, 或者 gulp 配置, 那简直要疯掉, 我们使用 Yeoman 创建自己的脚手架, 一条命令, 轻松生成项目结构以及各种配置文件

[Yeoman 官网](https://yeoman.io/)

## 步骤

1. 执行 `yo generator`

```shell
yo generator
```

[![raG1vq.png](https://s3.ax1x.com/2020/12/20/raG1vq.png)](https://imgchr.com/i/raG1vq)

2. 然后会在我们的工程目录, 形成一个新的`generator-junjun-gulp`文件

[![raG4xI.png](https://s3.ax1x.com/2020/12/20/raG4xI.png)](https://imgchr.com/i/raG4xI)

3. 把之前写好的 gulp 放置在 templates 目录下

4. 然后修改 index.js, 并且执行`npm link`命令

::: warning 警告
可能会报错, 可以使用 `sudo npm link`
:::

[![raJPdU.png](https://s3.ax1x.com/2020/12/20/raJPdU.png)](https://imgchr.com/i/raJPdU)

5. 然后创建一个新的目录 `generator-test`, 运行`yo junjun-gulp`, 就会自动在 generator-test 文件中, 创建我们刚刚配置的 gulp 以及其他文件

::: warning 警告
因为`bower`这个包管理工具, 官方已经不推荐了, 我们使用下图方式来关闭掉
:::

[![raYln0.png](https://s3.ax1x.com/2020/12/20/raYln0.png)](https://imgchr.com/i/raYln0)

配置好之后, 如下图, 可以使用了

[![raYJNF.png](https://s3.ax1x.com/2020/12/20/raYJNF.png)](https://imgchr.com/i/raYJNF)

## npm 发布我们自己的脚手架

因为我们要推送到 npm 官方源上面, 我们大部分小伙伴, 使用了淘宝源, 所以我们要切换一下

使用`nrm`管理我们的地址源

[nrm](https://www.npmjs.com/package/nrm)

```shell
# 安装
npm install -g nrm
# 查看所有源
➜  ~ nrm ls
* npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
# 切换源 
nrm use npm

# 或者使用如下方式切换源
npm config ser registry https://registry.npmjs.org/
# 查看是否切换成功
npm config list
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.14.9 node/v14.15.3 darwin x64"

; node bin location = /usr/local/bin/node
; cwd = /Users/lijunjun
; HOME = /Users/lijunjun
; "npm config ls -l" to show all defaults.
```

切换好之后, 我们之间登录npm

```shell
➜  ~ npm login
Username: junjun-li
Password: 
Email: (this IS public) 11776174@qq.com
Logged in as junjun-li on https://registry.npmjs.org/.
```

使用`npm publish`发布我们的包

::: danger 注意
package.json中的 `version` 必须要写成 0.0.0 以上的版本
:::

[![rawN9O.png](https://s3.ax1x.com/2020/12/20/rawN9O.png)](https://imgchr.com/i/rawN9O)

在任何地方, 都可以方便的下载我自己的gulp配置

[我的npm包](https://www.npmjs.com/package/generator-junjun-gulp)

## 总结

[![rawjKJ.png](https://s3.ax1x.com/2020/12/20/rawjKJ.png)](https://imgchr.com/i/rawjKJ)