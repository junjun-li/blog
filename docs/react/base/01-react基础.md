# 学习目标

+ 能够说出react是什么
+ 能够说出react的特点
+ 能够掌握react的基本用法
+ 能够使用react脚手架

# react的概述

![](imgs/react-logo.png)

## 什么是react

> react是一个用于构建用户**界面**的 JavaScript 库
>
> react官网(<https://reactjs.org/>)
>
> react中文网(<https://react.docschina.org/>)

+ 用户界面：对于前端来说HTML就是页面
+ React主要就是用来写HTML页面的，也就是**构建Web应用**
+ 如果从mvc的角度来看，React仅仅是视图层（V）的解决方案。也就是只负责视图的渲染，并非提供了完整了M和C的功能
+ react/react-router/redux: 框架
+ React起源与Faceboook的内部项目，后来用来架设Insagram的网站，并且在2013年5月开源

## react特点

### 声明式

你只需要描述UI（HTML）看起来是什么样的，就跟写HTML一样

```js
const jsx = <div className="app">
    <h1>Hello React! 动态数据变化:{count}</h1>
</div>
```

### 组件化

+ 组件是react中**最重要**的内容
+ 组件用于表示页面中的部分内容
+ 组合、复用多个组件，就可以实现完整的页面功能

![](imgs/组件.png)

### 学习一次，随处使用

+ 使用react可以开发Web应用
+ 使用react可以开发移动端原生应用（react-native）  RN
+ 使用react可以开发VR（虚拟现实）应用（react360）

![](imgs/react-use.png)

# react的基本使用

## react安装

+ 安装命令`yarn add react react-dom`

+ `react`包是核心，提供创建元素，组件等功能，只要是react开发，就必须导入
+ `react-dom`包提供DOM相关的功能，只有在`web开发`中才需要 导入

## react基本步骤

```
- 引入react和react-dom两个js文件
- 创建React元素
- 渲染React元素到页面中
```

+ 引入react和react-dom两个js文件

```html
<script src="node_modules/react/umd/react.development.js"></script>
<script src="node_modules/react-dom/umd/react-dom.development.js"></script>
```

+ 创建React元素

```js
// 2. 创建React元素
// 参数1：创建的元素名
// 参数2：元素的属性，如果没有，可以为null
// 参数3：元素的子节点
// 返回值：React元素
const title = React.createElement('h1', null, 'Hello React')
```

+ 渲染React元素到页面中

```js
// 参数1：要渲染的react元素
// 参数2：挂载点，需要加react元素渲染到哪儿
ReactDOM.render(title, document.getElementById('#root'))
```

+ 页面中准备html结构

```html
<div id="root"></div>
```

## react练习

- 生成结构1

```html
<p id="box">这是react的一个小练习</p>`
```

- 生成结构2

```
<ul id="list">
	<li>香蕉</li>
	<li>橘子</li>
	<li>苹果</li>
</ul>
```



# react脚手架

## react脚手架的意义

+ 脚手架是开发**现代web应用**的必备
+ 充分利用`webpack`，`babel`，`eslint`等工具辅助项目开发
+ 开箱即用，零配置，无序手动配置繁琐的工具即可使用

## react脚手架使用

### 通过yarn命令初始化

初始化命令

```bash
# 全局安装 create-react-app命令
yarn global add create-react-app       npm i create-react-app -g
# 初始化项目
create-react-app my-app
```

启动项目（项目根目录下）

```bash
yarn start
```

### 通过npx命令初始化

+ npx是`npm v5.2.0`版本引入的一条命令
+ 目的：提升包内提供的命令行工具的使用体验
+ 原先：需要全局安装脚手架命令，才能使用脚手架命令初始化项目
+ 现在: **无需安装脚手架命令**，通过npx可以直接使用该命令，不用担心版本升级的问题。

初始化命令

```bash
npx create-react-app my-app
```

启动项目

```bash
npm start
```

## react脚手架-使用react

```
- 基本结构说明（删除不需要的文件）
- 导入react和react-dom
- 创建react元素
- 渲染react元素到页面中
```

+ 导入react和react-dom

```js
// 导入react和react-dom
import React from 'react'
import ReactDOM from 'react-dom'
```

+ 创建react元素

```js
// 创建元素
const title = React.createElement('h1', null, 'hello react')
```

+ 渲染react元素到页面

```js
// 渲染react元素
ReactDOM.render(title, document.getElementById('root'))
```

