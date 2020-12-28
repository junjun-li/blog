# 下一代 web 引擎 koa

## koa 配置开发热加载

- 安装各种依赖

```shell
# webpack
npm i -D webpack webpack-cli
# webpack的插件
# clean-webpack-plugin 用于清理 dist 目录下面的文件
# webpack-node-externals 让webpack不处理node_modules里面的文件
npm i -D clean-webpack-plugin webpack-node-externals
# babel的插件
# @babel/core babel的核心
# @babel/node 后面调试的时候需要
# @babel/preset-env 可以支持一些很新的特性
# babel-loader webpack使用的loader
# cross-env 设置环境变量
npm i -D @babel/core @babel/node @babel/preset-env babel-loader cross-env
```

## webpack.config.js 的配置

```js
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackConfig = {
  target: 'node',
  mode: 'development',
  entry: {
    server: path.join(__dirname, 'app.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
        // exclude: [
        //   path.resolve(__dirname, 'node_modules')
        // ] // 把node_modules排除在外
      }
    ]
  },
  externals: [webpackNodeExternals()],
  plugins: [new CleanWebpackPlugin()],
  node: {
    // console: true,
    global: true,
    // process: true,
    // Buffer: true,
    __filename: true,
    __dirname: true
    // setImmediate: true,
    // path: true
  }
}

module.exports = webpackConfig
```

最后在 package.json 中加入以下代码, 就可以开启热更新和使用 es6 的方式书写代码

```json
"scripts": {
  "dev": "nodemon --exec babel-node app.js"
},
```

## 调试 webpack

打开终端, 输入如下指令

```shell
# --config 可以添加webpack目录的位置
# --inline
# --progress
npx node --inspect-brk ./node_modules/.bin/webpack
```

[![r3klJP.png](https://s3.ax1x.com/2020/12/17/r3klJP.png)](https://imgchr.com/i/r3klJP)

打开浏览器 访问 `chrome://inspect/#devices`

[![r3kYLQ.png](https://s3.ax1x.com/2020/12/17/r3kYLQ.png)](https://imgchr.com/i/r3kYLQ)

点击 configure, 输入刚刚终端运行的端口, 保存

[![r3kBWV.png](https://s3.ax1x.com/2020/12/17/r3kBWV.png)](https://imgchr.com/i/r3kBWV)

然后就可以愉快的调试 webpack 了

[![r3kzSf.png](https://s3.ax1x.com/2020/12/17/r3kzSf.png)](https://imgchr.com/i/r3kzSf)

## vscode 调试 koa 应用

### 前言

> node 项目使用 console.log 调试非常不便于学习, 我们可以使用 vscode 来打断点调试程序

### 编写 launch

> 一个新项目, 默认是没有配置的, 在 vscode 中, 点击`运行` => `添加配置`, vscode 会在我们的工程目录创建`.vscode`目录以及`launch.json`文件

[![r8pqEt.png](https://s3.ax1x.com/2020/12/17/r8pqEt.png)](https://imgchr.com/i/r8pqEt)

以下是我的运行脚本

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "nodemon",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/nodemon",
      "program": "${workspaceFolder}/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "runtimeArgs": ["--exec", "babel-node"]
    }
  ]
}
```

- runtimeExecutable: 指的是用什么命令来运行脚本

我这个项目安装了 nodemon, `${workspaceFolder}` 指的是当前目录, 使用当前目录下的 nodemon 来执行 app.js

- program: 入口文件

我这个项目的入口文件是`app.js`

- restart: 在终止 Node.js 后重启会话

- console: 启动调试目标的位置，这里选择在 vscode 的集成终端输出信息

- runtimeArgs: 运行时参数

我这个项目使用了 es6 的 import 语法, node 是不支持这种语法的, 需要使用 babel-node 来编译我们的代码

### 调试

> 按照下图操作, 我们就可以愉快的调试 koa 代码啦 👻

[![r8CdlF.png](https://s3.ax1x.com/2020/12/17/r8CdlF.png)](https://imgchr.com/i/r8CdlF)

## webstorm 调试 koa 应用

[jetbrains 官方文档-webstorm 调试 koa](https://www.jetbrains.com/help/objc/running-and-debugging-node-js.html)

如下图所示, 往下翻一翻, 可以找到 webstorm 使用 nodemon 调试 koa 的文档

[![r0zm9J.png](https://s3.ax1x.com/2020/12/21/r0zm9J.png)](https://imgchr.com/i/r0zm9J)

### 兼容 es6 语法

可能我们的项目, 是使用的 es6 语法, import 导入的模块, 我们需要使用 babel 来编译我们的代码

[@babel/node](https://babeljs.io/docs/en/babel-node.html)

.babelrc 配置如下

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

::: warning 警告
如果按照以上步骤配置不生效, 或者显示`9229`端口占用, 建议使用重启大发, 解决 99%的问题
:::

[![rB9GNT.png](https://s3.ax1x.com/2020/12/21/rB9GNT.png)](https://imgchr.com/i/rB9GNT)

## 优化 webpack 配置

::: tip 提醒
之前配置的 koa, 还存在几个问题, 无法达到我们生产的依赖, 例如以下几个问题:

1. 无法处理 post 请求, body 的数据无法拿到
2. 只是配置了开发环境的 webpack, 没有配置生产环境的代码配置
3. 没有打包命令
   :::

### 区分生产环境和开发环境的 webpack 配置

先创建如下几个文件

```sh
├── config
│   │── utils.js
│   └── webpack.config.base.js
│   └── webpack.config.dev.js
│   └── webpack.config.prod.js
```

utils.js

```js
const path = require('path')

exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

exports.APP_PATH = exports.resolve('src')
exports.DIST_PATH = exports.resolve('dist')
```

webpack.config.base.js

```js
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const utils = require('./utils')
const webpackConfig = {
  target: 'node',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
        // exclude: [
        //   path.resolve(__dirname, 'node_modules')
        // ] // 把node_modules排除在外
      }
    ]
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    // webpack.DefinePlugin 配置指南
    // https://webpack.docschina.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:
          process.env.NODE_ENV === 'production' ||
          process.env.NODE_ENV === 'prod'
            ? "'production'"
            : 'development'
      }
    })
  ],
  // 从 webpack 5 开始，你只能在 node 选项下配置 global、__filename 或 __dirname。如果需要在 webpack 5 下的 Node.js 中填充 fs，请查阅 resolve.fallback 获取相关帮助。
  node: {
    // console: true,
    global: true,
    // process: true,
    // Buffer: true,
    __filename: true,
    __dirname: true
    // setImmediate: true,
    // path: true
  }
}

module.exports = webpackConfig
```

webpack.config.dev.js

[webpack-merge](https://www.npmjs.com/package/webpack-merge)
:::warning 警告
webpack5 之后 `webpack-merge` 需要按照如下方式加载
:::

```js
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const webpack = require('webpack')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  // https://webpack.docschina.org/configuration/stats/
  stats: {
    // 告知 stats 是否添加关于子模块的信息。
    children: false
  }
})

module.exports = webpackConfig
```

webpack.config.prod.js

```js
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: {
    children: false,
    warnings: false
  },
  optimization: {
    // minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        // https://github.com/terser-js/terser#minify-options
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            // 是否注释console.log
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          output: {
            comments: false,
            beautify: false
          },
          mangle: true
        },
        // https://webpack.docschina.org/plugins/terser-webpack-plugin/#parallel
        parallel: true
        // sourceMap: false // 老师的这个属性会报错
      })
    ]
    // https://webpack.docschina.org/plugins/split-chunks-plugin/#split-chunks-example-1
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       name: 'commons',
    //       chunks: 'initial',
    //       minChunks: 3,
    //       // 强制执行
    //       enforce: true
    //     }
    //   }
    // }
  }
})

module.exports = webpackConfig
```

package.json, 我们增加了几条命令

```json
{
  "scripts": {
    "webpack:debug": "npx node --inspect-brk ./node_modules/.bin/webpack",
    // 需要安装 cross-env 
    // cross-env 能保证跨平台下环境变量正确设置
    "build": "cross-env NODE_ENV=prod webpack --config config/webpack.config.prod.js",
    "build:dev": "cross-env NODE_ENV=dev webpack --config config/webpack.config.dev.js",
    "dev": "cross-env NODE_ENV=dev nodemon --exec babel-node --inspect src/index.js",
    // 需要安装 rimraf 包
    "clean": "rimraf dist"
  },
}
```

## [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)

可以一键更新我们项目中的依赖包

```shell
npm i npm-check-updates -G

# 显示当前目录中可以更新的依赖包
ncu
# 更新package.json 然后需要 npm i 更新我们本地的依赖
ncu -u
```
