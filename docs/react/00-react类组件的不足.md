# React 中类组件的不足

## 1. 状态逻辑难以复用

在没有 hooks 之前，只能使用高阶函数和渲染属性复用逻辑，但是会导致 dom 层级冗余

### 假如需要复用以下代码

```js
import React, { Component } from 'react'
class ClassDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: [window.innerWidth, window.innerHeight]
    }
  }
  onResize = () => {
    this.setState({
      size: [window.innerWidth, window.innerHeight]
    })
  }
  // 页面初始化
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.size.join('x')
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  render() {
    const { size } = this.state
    return (
      <div>
        <h1>{size[0]}</h1>
        <h1>{size[1]}</h1>
      </div>
    )
  }
}
export default ClassDemo
```

### 渲染属性

```js
import React, { useState, useEffect, Component } from 'react'
// 用一个函数属性的执行结果, 来当做自己的渲染结果
// 相当于父组件, 进入了Resizable组件内部, 拿到了内部变量size, 有一种闭包的感觉
// 高阶组件的做法与其类似
class Resizable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      size: [window.innerWidth, window.innerHeight]
    }
  }
  onResize = () => {
    this.setState({
      size: [window.innerWidth, window.innerHeight]
    })
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  render() {
    return this.props.render(this.state.size)
  }
}

class Foo extends Component {
  render() {
    const size = this.props.size
    return (
      <div>
        <h1>Foo</h1>
        <h1>{size[0]}</h1>
        <h1>{size[1]}</h1>
      </div>
    )
  }
}
class Bar extends Component {
  render() {
    const size = this.props.size
    return (
      <div>
        <h1>Bar</h1>
        <h1>{size[0]}</h1>
        <h1>{size[1]}</h1>
      </div>
    )
  }
}
const App = () => {
  return (
    <>
      <Resizable render={size => <Foo size={size} />} />
      <Resizable render={size => <Bar size={size} />} />
    </>
  )
}
export default App
```

### 高阶组件

```js
import React, { useState, useEffect, Component } from 'react'

const resizable = Child => {
  // 动态创建一个包装类组件
  // 任务1: 维护size变量
  // 任务2: 渲染Child组件
  return class Wrapper extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        size: [window.innerWidth, window.innerHeight]
      }
    }
    onResize = () => {
      this.setState({
        size: [window.innerWidth, window.innerHeight]
      })
    }
    componentDidMount() {
      window.addEventListener('resize', this.onResize)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize)
    }
    render() {
      const size = this.state.size
      return <Child size={size} />
    }
  }
}
class Foo extends Component {
  render() {
    // 父组件, 只管从props中拿到值
    const size = this.props.size
    return (
      <div>
        <h1>高阶组件</h1>
        <h1>{size[0]}</h1>
        <h1>{size[1]}</h1>
      </div>
    )
  }
}

// 和渲染属性相比, 高阶组件是调用方便
// 直接将包装后的组件, 当做是原组件的代理就好了
const Bar = resizable(Foo)

export default Bar
```

## 2. 趋向复杂难以维护(生命周期与状态混乱导致难以复用逻辑)

### 生命周期函数混杂不相干的逻辑

### 相干逻辑分散在不同生命周期之中

## 3. this 指向困扰(this 指向非常复杂)

### 内联函数过度创建新句柄

```js
class demo extends React.Component {
  render() {
    return (
      // 这样叫做新的句柄
      <button onClick={() => {}}>点我</button>
    )
  }
}

class demo extends React.Component {
  fn = () => {}
  render() {
    return (
      // 需要这样子优化
      <button onClick={this.fn}>点我</button>
    )
  }
}
```

### 类成员属性不能保证 this 的指向

## Hooks 的写法（优雅，高级）

```js
import React, { useState, useEffect } from 'react'
const HooksDemo = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  useEffect(() => {
    document.title = size.join('x')
  })
  const onResize = () => {
    setSize([window.innerWidth, window.innerHeight])
  }
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <div>
      <h1>{size[0]}</h1>
      <h1>{size[1]}</h1>
    </div>
  )
}
export default HooksDemo
```
