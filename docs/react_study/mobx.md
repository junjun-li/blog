#    Mobx

<img src="https://raw.githubusercontent.com/mobxjs/mobx/master/docs/mobx.png" width="200">

## 介绍

### 是什么

- Mobx 是一个简单，可扩展的 JavaScript 状态管理库
  - 和 Redux、Vuex 等状态管理类似
- 由 Mendix、Coinbase、Facebook 开源和众多个人赞助商所赞助
- 一般会和 React 结合使用
  - 和 React 结合不是必须，也可以用到 Vue 或者 Angular 中，但是大多数情况都不选择



### 浏览器支持

| MobX version | Actively supported | Supported browsers                                           | GitHub branch    |
| ------------ | ------------------ | ------------------------------------------------------------ | ---------------- |
| 5.*          | Yes                | Any browser that supports [ES6 Proxies](https://kangax.github.io/compat-table/es6/#test-Proxy) (non polyfillable). *NOT:* IE 11 and lower, Node 5 and lower | `master`         |
| 4.*          | Yes (LTS)          | Any ES5 compliant browser                                    | `mobx4-master`   |
| 1-3.*        | No                 | Any ES5 compliant browser                                    | No active branch |



### Mobx 核心思想

> 任何源自应用状态的东西都应该自动地获得

![MobX unidirectional flow](./assets/flow.png)



### 课程内容

- ES6 语法补充
- Mobx 常用 API
- Mobx 的应用
- 最佳实践



### 课程目标

- 理解 mobx 响应式编程的概念
- 掌握使用 mobx 管理应用程序状态



### 相关链接

- https://github.com/mobxjs/mobx
- https://mobx.js.org/
- https://cn.mobx.js.org/





















## 开始

### 初始化

初始化

```bash
create-react-app mobx-study
```

安装改变 `create-react-app` 中 `webpack` 配置插件

```bash
yarn add -D react-app-rewired customize-cra @babel/plugin-proposal-decorators
```

在项目根目录下创建 `config-overrides.js` 并写入以下内容

```javascript
const { override, addDecoratorsLegacy } = require("customize-cra")

module.exports = override(
  addDecoratorsLegacy()
)

```

修改 `package.json` 文件中 `scripts` 脚本

```
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

启动

```
yarn start
```

### Hello World



## 语法补充：类和装饰器

### 类

### 装饰器

> 修饰器是一个对类进行处理的函数。

**基本语法**

```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```



**返回函数为修饰器传参**

```javascript
function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```



**添加实例属性**

```javascript
function testable(target) {
  target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
obj.isTestable // true
```



**实例：mixins**

```javascript
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

// main.js
import { mixins } from './mixins'

const Foo = {
  foo() { console.log('foo') }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
```



**属性的修饰**

```javascript

```



属性修饰器的参数：

- 第一个参数是类的原型对象，上例是`Person.prototype`修饰器的本意是要“修饰”类的实例，但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时`target`参数指的是类本身）
- 第二个参数是所要修饰的属性名
- 第三个参数是该属性的描述对象



`@readonly` 修饰器



`@Noenumerable` 修饰器



**方法的修饰**



## Mobx：observable

**什么是 Observable？**

Observable 是一种让数据的变化可以被观察的方法。

**哪些数据可被观察？**

- 原始类型

- 对象
- 数组
- 。。。



**演示**

- 转换数组
- 转换对象
- 转换简单数据类型
- extendObservable
- 转换 Map
- 在类中使用装饰器



**如何知道被观察的数据发生改变了？**

## Mobx：对可观察的数据做出响应

- computed
- autorun
  - 语法
  - 一上来就执行一次
  - 修改 autorun 中依赖的任意可观察数据都会导致aoturun的自动执行
  - computed 数据也可以被观察
- when
  - 语法：第一个参数是一个函数，改函数返回一个条件布尔值，布尔值为 true，指定第二个函数，布尔值为 false，则不执行，而且保证只执行一次
  - 注意：必须根据可观察数据计算条件
  - 执行机制
- reaction
  - 使用场景：在没有数据之前，不需要写缓存，可以利用 reaction 在数据第一次被填充之后执行写缓存的逻辑

### computed

### autorun

### when

### reaction



## Mobx：改变 observables

### Action

- action
- action.bound
- 配置强制使用 action 更新数据
- 异步 Action
- runInAction





























任何应用都有动作。动作是任何用来修改状态的东西。 使用MobX你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。

应该永远只对**修改**状态的函数使用动作。

应该永远只对**修改**状态的函数使用动作。 只执行查找，过滤器等函数**不**应该被标记为动作，以允许 MobX 跟踪它们的调用。

[“强制动作”](https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#configure) 强制所有状态变更都必须通过动作来完成。在大型、长期的项目中，这是十分有用的最佳实践。

它接收一个函数并返回具有同样签名的函数， 动作会分批处理变化并只在(最外层的)动作完成后通知计算值和反应。 这将确保在动作完成之前，在动作期间生成的中间值或未完成的值对应用的其余部分是不可见的。

建议对任何修改 observables 或具有副作用的函数使用 `(@)action` 。 结合开发者工具的话，动作还能提供非常有用的调试信息。

> 注意：
>
> - 不支持使用 setters 的 `@action` 装饰器，但是，[计算属性的 setters 是自动的动作](https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/computed-decorator.md#setters-for-computed-values)。
>
> - 在将 MobX 配置为需要通过动作来更改状态时，必须使用 `action` ，参见 [`enforceActions`](https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#configure)。



示例：

```javascript
class Ticker {
    @observable tick = 0

    @action.bound
    increment() {
        this.tick++ // 'this' 永远都是正确的
    }
}

const ticker = new Ticker()
setInterval(ticker.increment, 1000)
```

> 注意：
>
> - action.bound 不要和箭头函数一起使用；箭头函数已经是绑定过的并且不能重新绑定。



**runInAction**

`runInAction` 是个简单的工具函数，它接收代码块并在(异步的)动作中执行。这对于即时创建和执行动作非常有用，例如在异步过程中。`runInAction(f)` 是 `action(f)()` 的语法糖。

### async actions & flows

### Object api



## 其它

### 在 cra 中使用 eject 方式启用 decorator

初始化

```bash
create-react-app demo
```

切换弹出模式

```bash
npm run eject
```

安装 babel 语法（类属性，装饰器）解析插件

```bash
yarn add -D @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```

修改 `package.json` 中的 babel 配置项

```
...
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    ["@babel/plugin-proposal-class-properties", {
      "loose": true
    }]
  ]
}
...
```

启动

```
# 或者 npm start
yarn start
```

### 在 cra 中使用非 eject 方式启用 decorator

初始化

```bash
create-react-app mobx-study
```

安装改变 `create-react-app` 中 `webpack` 配置插件

```bash
yarn add -D react-app-rewired customize-cra @babel/plugin-proposal-decorators
```

在项目根目录下创建 `config-overrides.js` 并写入以下内容

```javascript
const { override, addDecoratorsLegacy } = require("customize-cra")

module.exports = override(
  addDecoratorsLegacy()
)

```

修改 `package.json` 文件中 `scripts` 脚本

```
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom"
}
```

启动

```
yarn start
```
