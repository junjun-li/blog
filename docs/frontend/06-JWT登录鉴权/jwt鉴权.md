# jwt 鉴权

## 后台项目配置@路径

```json
  "scripts": {
    "webpack:debug": "npx node --inspect-brk ./node_modules/.bin/webpack",
    "build": "cross-env NODE_ENV=prod webpack --config config/webpack.config.prod.js",
    "build:dev": "cross-env NODE_ENV=dev webpack --config config/webpack.config.dev.js",
    "dev-nodemon": "cross-env NODE_ENV=dev nodemon --exec babel-node --inspect=9229 src/index.js",
    "clean": "rimraf dist",
    "watch": "cross-env NODE_ENV=dev webpack --watch --progress --config config/webpack.config.dev.js",
    "serve": "nodemon --inspect ./dist/server.bundle.js",
    "dev": "npm-run-all -p watch serve"
  },
```

1. 装包 `npm-run-all`, 这个包可以一次性帮我们运行多条脚本

2. watch: 使用 webpack 来编译我们的项目, `--progress`、`--config`等指令可以参考如下文档

[webpack 命令行接口（CLI）](https://webpack.docschina.org/api/cli/)

3. 使用 nodemon 来执行我们打包好的`server.bundle.js`

4. 项目根目录创建`alias.config.js`文件(用于给 webstorm 作为指引, 我们可以使用 command+变量名跳转到对应的文件)

```js
// 用于给WebStorm作为指引
const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
```

## node 集成 koa-jwt

[npm koa-jwt](https://www.npmjs.com/package/koa-jwt)

```shell
npm i koa-jwt jsonwebtoken
```

```js
// 生成token
const token = jsonwebtoken.sign({ _id: 'junjun' }, config.jwtSecret)
```
