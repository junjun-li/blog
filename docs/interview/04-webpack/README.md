# webpack 和 babel

webpack 是前端必备工具，面试必考内容，特别是性能优化。本章讲解 webpack 常用配置，详细的性能优化手段，已经 babel 。最后会给出常考面试题，做面试真题演练。

## 内容

- webpack 基本使用

- webpack 高级特性

- webpack 性能优化

- babel 使用和配置

## 面试题

- 前端代码为何要进行构建和打包

  - 体积更小(Tree-Shaking、压缩、合并)，加载速度更快

  - 编译高级语言或者语法(TS，ES6，模块化，SCSS)

  - 兼容性和错误检查(Polyfill，postcss，eslint)

  - 统一、高效的开发环境

  - 统一的构建流程和产出标准

  - 继承公司构建规范

- module chunk bundle 分别什么意思，有何区别?

- loader 和 plugin 的区别

- webpack 如何实现懒加载

- webpack 常见的性能优化

```js
/*
开发环境的优化：
1. 热更新
2. babel-loader只监听src下的文件夹
3. DllPlugin

生产环境的优化：
1. IgnorePlugin忽略moment的其他语言包
2. 多进程打包增加打包速度
3. noParse忽略大型的library可以提高构建性能

优化产出代码：
1. 小图片使用base64编码(url-loader)
2. bundle加上hash值，使用缓存
3. 懒加载
4. 提取公共代码(splitChunks)
5. 使用CDN加速
6. IgnorePlugin忽略moment的其他语言包
7. 使用production模式打包(可以触发Tree-Shaking、代码压缩)
8. Scope Hosting 多个函数合并成一个函数
*/
```

- babel-runtime 和 babel-polyfill-的区别
