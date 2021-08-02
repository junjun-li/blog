# Lerna 源码解析

## webstorm 调试技巧

1. 添加 node 配置文件
   [![W442M8.png](https://z3.ax1x.com/2021/07/27/W442M8.png)](https://imgtu.com/i/W442M8)

2. 找到`core/lerna/cli.js`lerna 的主入口即可开始调试

3. 启动 webstorm 编码辅助

[![W45pJ1.png](https://z3.ax1x.com/2021/07/27/W45pJ1.png)](https://imgtu.com/i/W45pJ1)

4. 断点允许进入库文件调试

[![W45VdH.png](https://z3.ax1x.com/2021/07/27/W45VdH.png)](https://imgtu.com/i/W45VdH)

## Lerna 初始化过程

1. 找到package.json入口文件，说明入口文件在`"core/lerna/cli.js"`中

```json
{
  "bin": {
    "lerna": "core/lerna/cli.js"
  },
}
```

2. 打开cli.js

```js
#!/usr/bin/env node

"use strict";

/* eslint-disable import/no-dynamic-require, global-require */
const importLocal = require("import-local");

if (importLocal(__filename)) {
  require("npmlog").info("cli", "using local version of lerna");
} else {
  // require(".")指的是导入index.js文件
  require(".")(process.argv.slice(2));
}
```

3. 打开index.js

```js
// 这个模块，把各各项目以对象的方式导入
// 每个对象都有一个handler属性，上面挂载了各自的入口方法
const addCmd = require("@lerna/add/command");
const bootstrapCmd = require("@lerna/bootstrap/command");
const changedCmd = require("@lerna/changed/command");
// ...
```

## 脚手架yargs