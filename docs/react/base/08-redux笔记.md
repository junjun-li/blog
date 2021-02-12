# Redux

![redux logo](./images/redux.png)

- [react-redux 流程与实现分析](http://www.jianshu.com/p/507d9da0afe7)
- [《看漫画，学 Redux》 —— A cartoon intro to Redux](https://github.com/jasonslyvia/a-cartoon-intro-to-redux-cn)
- [Redux 中文网](http://www.redux.org.cn/docs/basics/ExampleTodoList.html)
- [React 实践心得：react-redux 之 connect 方法详解](http://taobaofed.org/blog/2016/08/18/react-redux-connect/)
- [解读 redux 工作原理](http://zhenhua-lee.github.io/react/redux.html)

## 基本介绍

> 概念

Redux 是 react 中最流行的状态管理工具。

> 起源

React 只是 DOM 的一个抽象层（UI 库），并不是 Web 应用的完整解决方案。有两个方面，它没涉及
1 代码结构
2 组件之间的通信

- 对于大型的复杂应用来说，这两方面恰恰是最关键的。因此，只用 React，写大型应用比较吃力。
- 2014 年 Facebook 提出了 Flux 架构的概念，引发了很多的实现。
- 2015 年，Redux 出现，将 Flux 与函数式编程（reducer）结合一起，很短时间内就成为了最热门的前端架构。 
- Flux 是最早的状态管理 工具，它提供了状态管理的思想，也提供对应的实现
- 除了 Flux、Redux 之外，还有：Mobx 等状态管理工具

> 什么时候使用 redux

- 如果你不知道是否需要 Redux，那就是不需要它。
- 只有遇到 React 实在解决不了的问题，你才需要 Redux

> 为什么需要 redux

集中的方式统一管理所有的共享数据

> react 技术栈

- react 核心
- react-router（react-router-dom）
- 状态管理： mobx（简单）/ redux（复杂）  ----中间件： redux-thunk  redux-saga
- dva：集成了 react/react-router/redux 让 react 开发大型项目变的更加简单
  - [dva](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)

## redux基本使用

- 安装：`npm i -S redux`

### 理解三个核心概念

- 核心概念：`store`、`action`、`reducer`
  - `store`：仓库，存储了数据，管理者，管理 action 和 reducer
  - `action`：“专家”，只提想法不干活
  - `reducer`：劳动者，搬砖的人

```js
store: redux的仓库
	1. 提供了state与操作state的方法
	2. 一个redux项目中，只有一个store
    3. 是整个redux应用的管理者，指挥action和reducer干活的
action: 表示一个动作（添加内容，删除内容等）
	1. action描述了需要做一件什么样的事情（不执行）
    2. "专家": 只提想法，不干活
reducer: 劳动者
	1. 根据action来完成这个动作
    2. 实际干活的人
    3. reducer不会主动完成action，需要store控制
```

## Action

### action基本使用

- action 是任务的抽象，视图中的每个用户交互都是一个 action
  - 比如：添加任务、删除任务、登录、加入购物车 等

```html
1. action是一个js对象
2. action必须提供type属性，表示动作的类型
3. type属性的值是一个字符串，采用全大写字母表示，多个单词使用_连接
{
	type: "INCREMENT"
}
4. action中除了type，还可以指定动作需要的其他数据
{
	type: "ADD_TODO",
	todoName: '学习redux'
}
5. 将来要完成的所有功能，都抽象成了一个个的动作
```

### actionCreator创建action

```js
1. 直接使用对象来创建action不灵活，参数写死了。一般会使用函数来创建action，我们把创建action的函数叫做actionCreator
const increment = {
    type: 'INCREMENT'
}
const increment = () => {
    return {
        type: 'INCREMENT'
    }
}
const increment = () => ({
    type: 'INCREMENT'
})

// 使用action创建函数：（添加任务）
const addTodo = {
    type: 'ADD_TODO',
    text: '加班'
}

const addTodo = (text) => ({
  type: 'ADD_TODO',
  text
})
addTodo('加班') // {type: '', text: ''}
addTodo('下课')
```

## reducer

### 基本使用

- reducer 是行为响应的抽象，也就是：根据 action，执行相应的逻辑操作，返回最新的 state
- 根据应用现有状态和触发的 action 返回`新状态`的函数称为 reducer

```js
1. reducer需要是一个纯函数
2. reducer不能修改传入进来的参数（state），应该根据传入的参数返回新的数据（state)
3. 伪代码语法： (prevState, action) => newState   根据传入的状态和action，完成对应的动作，返回新的状态

注意：
	1. 在reducer中不能修改传入的state状态，保证数据的不可变性（immutability）
    2. 如果有reducer处理不了的任务，需要返回默认的state
```



```js
// 处理ADD_TODO动作的reducer：
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // 返回新的state
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
  }
  default:
    return state
}
```

### reducer 纯函数的说明

- 特点：只要是固定的输入，必定得到固定的输出
- 原则：（一定要遵守！！！）
  - 不得改写参数
  - 不能调用 Date.now()或者 Math.random()等不纯的方法，因为每次会得到不一样的结果
  - 不能使用全局变量
- 1 reducer 必须是一个纯函数
- 2 纯函数主要的含义就是它不可以修改影响输入值
- 3 没有副作用，副作用指的是例如函数中一些异步调用或者会影响函数作用域之外的变量一类的操作

```js
let num = 1
// 不要进行以下操作：
function todos() {
  // 1 不要调用以下方法：
  // Date.now()
  // Math.random()
  //
  // 2 ajax 请求之类的操作
  //
  // 3 不要尝试修改作用域外的数据
  // num = 3
}
```

## store

- 一个应用应该只有一个 store
- store 负责将 action 和 reducer 关联在一起
- store 的作用：1 维持应用的 state   2 提供操作 state 的方法

### store基本使用

```js
// 1. 安装包  yarn add redux
// 2. 导入createStore函数用于创建store
import { createStore } from 'redux'

// 3. 创建一个store, 参数：需要一个reducer作为参数
const store = createStore(counter)

// 4. 创建一个 计数器 的 reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'SUB':
      return state - 1
    default:
      return state
  }
}
```



### getState方法

> store.getState()用于获取到store中的状态

```js
let result = store.getState()
console.log(result)
```

原理

```js
1. 创建store的时候，counter这个reducer会自动执行一次，并且会自动传入一个随机无法识别的action
2. state就会有一个默认值 0

当调用getState()的时候，就会返回 store中的state的值。
```



### dispatch方法

> store.dispatch()用于分发一个action，即出发一个action

```js
store.dispatch({ type: 'ADD' })
console.log('最新的值', store.getState()) //1

store.dispatch({ type: 'ADD' })
console.log('最新的值', store.getState()) //2

store.dispatch({ type: 'ADD' })
console.log('最新的值', store.getState()) //3
```



### subscribe方法

> store.subscribe()方法可以订阅state的改变，当state放生改变的时候，回调函数就会执行

```js
// 返回值是一个函数,用于取消订阅
const unsubscripbe = store.subscribe(() => {
  console.log('最新的值', store.getState())
})

// 取消订阅，取消订阅后，状态再次发生改变就不会触发回调函数
unsubscripbe()
```



## redux中的数据流

![](images\redux1.png)





## react结合redux使用

```js
// 导入createStore函数用于创建store
import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

// 创建一个store
const store = createStore(increment)

// 创建一个 计数器 的 reducer
function increment(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'SUB':
      return state - 1
    default:
      return state
  }
}

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    // 如果组件卸载，取消订阅
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>当前点击次数：{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: 'ADD' })}>+1</button>
        <button onClick={() => store.dispatch({ type: 'SUB' })}>-1</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

```

## react-redux

> react-redux包可以将react与redux关联起来使用。 react负责UI的渲染，redux负责数据的处理。
>
> 解决了两个问题：
>
>  	1. react组件如何dispatch一个action
>  	2. redux中的数据改变后，如何渲染到组件中





