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

> 按照下图操作, 我们就可以愉快的调试koa代码啦👻

[![r8CdlF.png](https://s3.ax1x.com/2020/12/17/r8CdlF.png)](https://imgchr.com/i/r8CdlF)