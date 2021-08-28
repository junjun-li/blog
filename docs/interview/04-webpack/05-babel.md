# babel

```js
{
  "presets": [
    [
      "@babel/preset-env"
    ]
  ],
  // ES6中，其实有很多语法。都是通过plugins来转换的
  // 比如箭头函数，使用 a plugins，
  // 结构赋值，使用 b plugins

  // 但是引入这么多 plugins 非常麻烦，所以说有了 presets
  // @babel/preset-env 是一堆plugins的集合
  "plugins": []
}
```

## babel-polyfill

例如：老版本的浏览器不识别 Promise，就需要搜索 Promise 的补丁，使用老语法来实现 Promise

- core-js 和 regenerator这两个库，可以转换低版本语法

- babel-polyfill 即上诉两者的集合
