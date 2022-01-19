# 06-Lerna 源码解析

## WebStorm 调试技巧

1. 添加 node 配置文件

[![W442M8.png](https://z3.ax1x.com/2021/07/27/W442M8.png)](https://imgtu.com/i/W442M8)

2. 找到`core/lerna/cli.js`lerna 的主入口即可开始调试

3. 启动 WebStorm 编码辅助

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

'use strict';

/* eslint-disable import/no-dynamic-require, global-require */
const importLocal = require('import-local');

if (importLocal(__filename)) {
  require('npmlog').info('cli', 'using local version of lerna');
} else {
  // require(".")指的是导入index.js文件
  require('.')(process.argv.slice(2));
}
```

3. 打开 index.js

```js
// 这个模块，把各各项目以对象的方式导入
// 每个对象都有一个handler属性，上面挂载了各自的入口方法
const addCmd = require('@lerna/add/command');
const bootstrapCmd = require('@lerna/bootstrap/command');
const changedCmd = require('@lerna/changed/command');
// ...
```

## import-local 原理

> 当我们全局和本地都存在一个 lerna 项目的时候，优先使用本地的脚手架

```js
// node运行的时候，会往 global 注入这些变量：__filename，__dirname，module，require，exports 
'use strict';
const path = require('path');
const resolveCwd = require('resolve-cwd');
// 给定一个目录，获取包含 package.json 的上级目录
const pkgDir = require('pkg-dir');

module.exports = filename => {
  const globalDir = pkgDir.sync(path.dirname(filename));
  const relativePath = path.relative(globalDir, filename);
  const pkg = require(path.join(globalDir, 'package.json'));
  const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
  const localNodeModules = path.join(process.cwd(), 'node_modules');

  const filenameInLocalNodeModules =
    !path.relative(localNodeModules, filename).startsWith('..') &&
    // On Windows, if `localNodeModules` and `filename` are on different partitions, `path.relative()` returns the value of `filename`, resulting in `filenameInLocalNodeModules` incorrectly becoming `true`.
    path.parse(localNodeModules).root === path.parse(filename).root;

  // Use `path.relative()` to detect local package installation,
  // because __filename's case is inconsistent on Windows
  // Can use `===` when targeting Node.js 8
  // See https://github.com/nodejs/node/issues/6624
  return (
    !filenameInLocalNodeModules &&
    localFile &&
    path.relative(localFile, filename) !== '' &&
    require(localFile)
  );
};
```

## path.resolve()用法

> resolve 在合并的过程中，相当于一个`cd`的过程

1. 不带参数时

`path.resolve()` 返回的是当前的文件的绝对路径`/Users/xxxx/`

2. 带不是/开头的参数

`path.resolve('a')` 返回的是当前绝对路径拼接现在的参数`/Users/xxxx/a`
`path.resolve('a'，'b')` 返回的是当前绝对路径拼接现在的参数`/Users/xxxx/a/b`

3. 带./开头的参数

`path.resolve('./a')` 返回的是当前绝对路径拼接现在的参数`/Users/xxxx/a`
`path.resolve('./a','./b')` 返回的是当前绝对路径拼接现在的参数`/Users/xxxx/a/b`

4、带/开头的参数 返回的是 /+‘最后一个前面加/的文件文件名’+‘剩下文件夹

`path.resolve('/a')` 返回的是当前绝对路径拼接现在的参数`/a`
`path.resolve('/a'，'/b')` 返回的是当前绝对路径拼接现在的参数`/b`
`path.resolve('/a'，'/b', 'c')`返回的是当前绝对路径拼接现在的参数`/b/c`
`path.resolve('/user'，'/lijunjun', '..')`返回的是当前绝对路径拼接现在的参数`/`
