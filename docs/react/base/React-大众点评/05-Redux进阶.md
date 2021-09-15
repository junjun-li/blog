# Redux 进阶

## 项目结构组件方式

- 按照类型

[![hzJWn0.png](https://z3.ax1x.com/2021/09/11/hzJWn0.png)](https://imgtu.com/i/hzJWn0)

- 按照功能模块

[![hzYC3d.png](https://z3.ax1x.com/2021/09/11/hzYC3d.png)](https://imgtu.com/i/hzYC3d)

- Ducks-鸭子 (推荐)

[![hzY1uq.png](https://z3.ax1x.com/2021/09/11/hzY1uq.png)](https://imgtu.com/i/hzY1uq)

## State 设计原则

常见错误：

1. 以 API 为设计 State 的依据

2. 以页面 UI 为设计 State 的依据

> 像设计数据库一样设计 State

### 设计数据库基本原则

1. 数据按照领域(Domain)分类，存储在不同的表中，不同的表中存储的列数据不能重复

2. 表中每一列的数据都依赖于这张表的主键

3. 表中除了以主键以外的其他列，互相之间不能有直接依赖关系

### 设计 State 原则

1. 数据按照领域把整个应用的状态按照领域(Domain)分成若干子 State，子 State 之间不能保存重复的数据

2. 表中 State 以键值对的结构存储数据，以记录的 key、id 作为记录索引，记录中的其他字段都依赖于索引

3. State 中不能保存可以通过已有数据计算而来的数据，即 State 中的字段不能相互依赖

4. State 应该尽量扁平化(避免嵌套层级过深)

5. UI State：具有松散性特点

## selector 函数

将 component 代表的 view 层和 redux 代表的状态层

它们是独立的两个层级，这两个层级的交互应该通过`接口`进行通讯的

例如`getText(state)`，而不是通过 state 的数据结构形式(例如`state.text`)通讯的

[![hzwm5V.png](https://z3.ax1x.com/2021/09/11/hzwm5V.png)](https://imgtu.com/i/hzwm5V)

## Middleware(中间件)

> 中间件主要用于增加 store dispatch 的能力

[![4Snyng.png](https://z3.ax1x.com/2021/09/11/4Snyng.png)](https://imgtu.com/i/4Snyng)

### logger 中间件的封装

```js
const logger = ({ getState, dispatch }) => next => action => {
  console.group(action.type)
  console.log('dispatching: ', action)
  // 通过next函数传递给下一个中间件,并把结果返回到res
  const res = next(action)
  console.log('next state', getState())
  console.groupEnd()
  return res
}

export default logger
```

## store enhancer

- 增强 redux store 的功能

- createStore(reducer, [preloadedState], [enhancer])

- middleware 是 store enhancer 的一种
