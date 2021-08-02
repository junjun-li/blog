# Lerna 源码解析

## WebStorm 调试技巧

1. 添加 node 配置文件
   [![W442M8.png](https://z3.ax1x.com/2021/07/27/W442M8.png)](https://imgtu.com/i/W442M8)

2. 找到`core/lerna/cli.js`lerna 的主入口即可开始调试

3. 启动 webstorm 编码辅助

[![W45pJ1.png](https://z3.ax1x.com/2021/07/27/W45pJ1.png)](https://imgtu.com/i/W45pJ1)

4. 断点允许进入库文件调试

[![W45VdH.png](https://z3.ax1x.com/2021/07/27/W45VdH.png)](https://imgtu.com/i/W45VdH)

## Lerna 初始化过程

1. 找到 package.json 入口文件，说明入口文件在`"core/lerna/cli.js"`中

```json
{
  "bin": {
    "lerna": "core/lerna/cli.js"
  }
}
```

2. 打开 cli.js

```js
#!/usr/bin/env node

'use strict'

/* eslint-disable import/no-dynamic-require, global-require */
const importLocal = require('import-local')

if (importLocal(__filename)) {
  require('npmlog').info('cli', 'using local version of lerna')
} else {
  // require(".")指的是导入index.js文件
  require('.')(process.argv.slice(2))
}
```

3. 打开 index.js

```js
// 这个模块，把各各项目以对象的方式导入
// 每个对象都有一个handler属性，上面挂载了各自的入口方法
const addCmd = require('@lerna/add/command')
const bootstrapCmd = require('@lerna/bootstrap/command')
const changedCmd = require('@lerna/changed/command')
// ...
```

## import-local 分析

> 当我们本地存在一个脚手架命令和全局存在脚手架命令的时候，优先本地 node_modules 的命令

1. 先找到全局的lerna

2. node在运行的时候，在require的时候，会注入全局变量

```js
// __filename: 文件的名称以及完整路径
// module, 
// require方法
// __dirname
// exports
'use strict';
const path = require('path');
const resolveCwd = require('resolve-cwd');
const pkgDir = require('pkg-dir');

module.exports = filename => {
	const globalDir = pkgDir.sync(path.dirname(filename));
	const relativePath = path.relative(globalDir, filename);
	const pkg = require(path.join(globalDir, 'package.json'));
	const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));

	// Use `path.relative()` to detect local package installation,
	// because __filename's case is inconsistent on Windows
	// Can use `===` when targeting Node.js 8
	// See https://github.com/nodejs/node/issues/6624
	return localFile && path.relative(localFile, filename) !== '' ? require(localFile) : null;
};
```