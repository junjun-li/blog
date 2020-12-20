# 前端打包神器-webpack

[webpack](https://webpack.docschina.org/concepts/)

## 安装

- 全局安装
  ::: warning 注意
  如果你只是想做一个 Webpack 的 Demo 案例，那么全局安装方法可能会比较适合你。如果你是在实际生产开发中使用，那么推荐你使用本地安装方法。
  :::
- 全局安装命令
  :::tip 参数说明
  `webpack4.0+`的版本，必须安装`webpack-cli`，`-g`命令代表全局安装的意思
  :::

```sh
$ npm install webpack webpack-cli -g
```

- 本地安装(推荐)
  ::: tip 参数说明
  本地安装的`Webpack`意思是，只在你当前项目下有效，而通过全局安装的`Webpack`，如果两个项目的`Webpack`主版本不一致，则可能会造成其中一个项目无法正常打包。本地安装方式也是实际开发中推荐的一种`Webpack`安装方式。
  :::

```sh
$ npm install webpack webpack-cli -D
# 等价于
$ npm install webpack webpack-cli --save-dev
```

- 版本号安装
  ::: tip 参数说明
  如果你对`Webpack`的具体版本有严格要求，那么可以先去 Github 的`Webpack`仓库查看历史版本记录或者使用`npm view webpack versions`查看`Webpack`的`npm`包历史版本记录
  :::

```sh
# 查看webpack的历史版本记录
$ npm view webpack versions

# 按版本号安装
$ npm install webpack@4.25.0 -D
```

## 卸载

::: tip 参数说明
通过`npm install`安装的模块，对应的可通过`npm uninstall`进行卸载
:::

```sh
$ npm uninstall webpack webpack-cli -g
```

## 起步

现在我们来创建基本的项目结构，它可能是下面这样

```sh
|-- webpack-demo
|   |   | src
|   |   |-- index.js
|   |-- package.json
```

代码如下图

[![rUKJ5q.png](https://s3.ax1x.com/2020/12/19/rUKJ5q.png)](https://imgchr.com/i/rUKJ5q)

::: tip 解释

1. `entry`配置项说明了`webpack`打包的入口文件。
2. `output`配置项说明了`webpack`输出配置：`filename`配置了打包后的文件叫`main.js`
3. `path`配置了打包后的输出目录为`dist`文件夹下
4. 最后运行`npx webpack`进行打包, 可以看见 dist 下有一个文件了
   :::

## loader 介绍

[webpack-loader](https://webpack.docschina.org/concepts/loaders/)

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

```shell
# 现在安装 css-loader style-loader, 让我们的项目支持css
npm i css-loader style-loader sass-loader node-sass -D
```

改写 webpack 配置文件：

::: warning 警告
loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。
:::

```js
const path = require('path')

module.exports = {
  // 入口
  entry: './src/index.js', // 输出
  output: {
    // 输出名字
    filename: 'bundle.js', // 输出地址
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

然后如下图所示, 增加代码, 然后我们打开`index.html`, 页面就变成了绿色

[![rUNWb6.png](https://s3.ax1x.com/2020/12/19/rUNWb6.png)](https://imgchr.com/i/rUNWb6)

## plugins 介绍

### [HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin/)

```shell
npm i -D html-webpack-plugin
```

:::tip 提醒
由于安装 node-sass, 我已经讲 css 预编译换成了 less
:::

HtmlWebpackPlugin 使用方式如下图, 我们可以使用自己创建的一个模板, 插件会自动帮我们引入打包好的 js 文件

[![rUTi4S.png](https://s3.ax1x.com/2020/12/20/rUTi4S.png)](https://imgchr.com/i/rUTi4S)

### 热模块替换 - 使浏览器能够自动刷新

[webpack-dev-server](https://github.com/webpack/webpack-dev-server)

[模块热替换](https://www.webpackjs.com/guides/hot-module-replacement/#%E5%90%AF%E7%94%A8-hmr)

```shell
npm i webpack-dev-server -D
```

修改 webpack.config.js

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // 入口
  entry: './src/index.js', // 输出
  output: {
    // 输出名字
    filename: 'bundle.js', // 输出地址
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
```

package.json 增加一条命令

::: warning 警告
好像 webpack4 以前, 使用 webpack-dev-server 来运行脚本, 更新了 5 之后, 使用`webpack serve`来运行
我们以官方文档为准
:::

```json
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack serve"
  },
```

然后修改了代码 打开 http://localhost:8080/ 就可以看见新修改的代码了, 如下图

[![rUHhcQ.png](https://s3.ax1x.com/2020/12/20/rUHhcQ.png)](https://imgchr.com/i/rUHhcQ)

### clean-webpack-plugin copy-webpack-plugin的使用

> 具体使用方式请参考文档, 和上方插件使用类似

[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
[copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)


## babel 的配置

[babel](https://www.babeljs.cn/docs/babel-preset-env)

让我们的 webpack 支持 es6 的一些新特性

```shell
npm i babel-loader @babel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime -D
```

新建一个文件`.babelrc`

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

修改`package.json`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // 入口
  entry: './src/index.js', // 输出
  output: {
    // 输出名字
    filename: 'bundle.js', // 输出地址
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
}
```

然后我们的项目就可以使用es6的新语法特性了

[![rUOBPP.png](https://s3.ax1x.com/2020/12/20/rUOBPP.png)](https://imgchr.com/i/rUOBPP)

## 解决 webstorm 不识别 require 的问题

如图:

[![rUmQKJ.png](https://s3.ax1x.com/2020/12/19/rUmQKJ.png)](https://imgchr.com/i/rUmQKJ)

解决:

1. 添加 node_modules 库

[![rUmrVI.png](https://s3.ax1x.com/2020/12/19/rUmrVI.png)](https://imgchr.com/i/rUmrVI)

2. 选择本地 node 版本

[![rUnVLd.png](https://s3.ax1x.com/2020/12/19/rUnVLd.png)](https://imgchr.com/i/rUnVLd)

[![rUnsOJ.png](https://s3.ax1x.com/2020/12/19/rUnsOJ.png)](https://imgchr.com/i/rUnsOJ)

[![rUnbTI.png](https://s3.ax1x.com/2020/12/19/rUnbTI.png)](https://imgchr.com/i/rUnbTI)

[![rUnvp8.png](https://s3.ax1x.com/2020/12/19/rUnvp8.png)](https://imgchr.com/i/rUnvp8)

3. 最后我们的 webstorm 可以识别 require 啦

[![rUumX4.png](https://s3.ax1x.com/2020/12/19/rUumX4.png)](https://imgchr.com/i/rUumX4)
