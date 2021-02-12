# React新特性

## Context 实现跨层级的组件数据传递

context 提供了一种方式, 能够让数据在组件树中传递而不必一级级手动传递

不应该大规模使用, 因为影响组件独立性

[![yYwMbn.png](https://s3.ax1x.com/2021/02/06/yYwMbn.png)](https://imgchr.com/i/yYwMbn)

### 基础使用

```js
import { Component, createContext } from 'react'

class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {battery => <h1>battery: {battery}</h1>}
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class ContextDemo extends Component {
  state = {
    battery: 60
  }
  render() {
    const { battery } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <button
          type="button"
          onClick={() => this.setState({ battery: battery - 1 })}
        >
          点击修改battery
        </button>
        <Middle />
      </BatteryContext.Provider>
    )
  }
}
```

### 多个数据的写法(嵌套顺序不影响)

```js
import { Component, createContext } from 'react'
// 消费者, 生产者
// 如果Consumer找不到Provider, 90这个默认参数, 就是battery的默认值
const BatteryContext = createContext(90)
const OnlineContext = createContext()

class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {battery => (
          <OnlineContext.Consumer>
            {online => (
              <h1>
                battery: {battery}
                online: {String(online)}
              </h1>
            )}
          </OnlineContext.Consumer>
        )}
      </BatteryContext.Consumer>
    )
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class ContextDemo extends Component {
  state = {
    battery: 60,
    online: false
  }

  render() {
    const { battery, online } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            点击修改battery
          </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            点击修改Online
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    )
  }
}
export default ContextDemo
```

### 进阶写法(最简单的)

```js
// context提供了一种方式, 能够让数据在组件树中传递而不必一级级手动传递
// 不应该大规模使用
// 影响组件独立性
import { Component, createContext } from 'react'
// 消费者, 生产者
// 如果Consumer找不到Provider, 90这个默认参数, 就是battery的默认值
const BatteryContext = createContext(90)

class Leaf extends Component {
  // 注入一个静态方法
  //
  static contextType = BatteryContext
  render() {
    const battery = this.context
    // 直接使用, 不用写Consumer了
    return <h1>battery: {battery}</h1>
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class ContextDemo extends Component {
  state = {
    battery: 60
  }

  render() {
    const { battery, online } = this.state
    return (
      <BatteryContext.Provider value={battery}>
        <button
          type="button"
          onClick={() => this.setState({ battery: battery - 1 })}
        >
          点击修改battery
        </button>
        <Middle />
      </BatteryContext.Provider>
    )
  }
}

export default ContextDemo
```

## Lazy 与 Suspense 实现延迟加载

```js
import React, { Component, lazy, Suspense } from 'react'

// 这样子引入, 网络请求的文件名, 就会变成 http://localhost:8080/static/js/about.chunk.js
// 注意加上双引号
const About = lazy(() => import(/*webpackChunkName: "about"*/ './About.jsx'))

const Loading = () => <div>loading</div>

// React中有一个概念叫错误边界(ErrorBoundary)
// 就是一个可以捕获后台错误边界的一个组件, 原理是用了react的生命周期方法
// componentDidCatch

class LazyDemo extends Component {
  state = {
    hasError: false
  }
  // 捕获错误方式1
  // componentDidCatch作为ErrorBoundary的构成，只能捕获子组件的渲染错误。
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   })
  //   console.log(this.state.hasError)
  // }

  // 捕获错误方式2
  static getDerivedStateFromError() {
    return {
      hasError: true
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Network Error</div>
    }
    return (
      <div>
        {/*
         如果传入jsx模板, 要按照下列示例写
         <Suspense fallback={<<div>loading</div>/>}>
         */}
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      </div>
    )
  }
}

export default LazyDemo
```

## memo 优化性能

[react-memo](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo)

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```js
import React, { Component, PureComponent, memo } from 'react'

// PureComponent: react提供了简单的对比算法 如果传入的属性值不变, 就不会触发render函数重新渲染

// class Foo extends PureComponent {
//   // 这个函数返回true, 就会执行render函数, 否则不执行
//   // shouldComponentUpdate (nextProps, nextState, nextContext) {
//   //   if (nextProps.name === this.props.name) {
//   //     return false
//   //   }
//   //   return true
//   // }
//
//   render () {
//     console.log('Foo render')
//     return null
//   }
// }

// 不更新
const Foo = memo(function Foo(props) {
  console.log(props)
  return (
    <div>
      <div>{props.person.age}</div>
      <div>{props.count}</div>
    </div>
  )
})

// 更新
// function Foo(props) {
//   return <div>{props.person.age}</div>
// }

class Memo extends Component {
  state = {
    count: 0,
    person: {
      name: 'zs',
      age: 18
    }
  }

  render() {
    const person = this.state.person
    const count = this.state.count
    return (
      <div>
        <button
          onClick={() => {
            person.age++
            this.setState({
              count: this.state.count + 1,
              person: this.state.person
            })
          }}
        >
          点击修改
        </button>
        <Foo person={person} count={count} />
      </div>
    )
  }
}

export default Memo
```
