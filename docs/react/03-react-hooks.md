# React-Hooks

## [useState](https://zh-hans.reactjs.org/docs/hooks-overview.html#state-hook)

1. `useState`必须按照固定的顺序和次数进行调用, 不能多也不能少(非常严格), 可以传入一个参数当做默认值

```js
function StateHooksDemo(props) {
  // const [count, setCount] = useState(0)
  // 也可以传入一个函数
  const [count, setCount] = useState(() => {
    console.log('init')
    return props.defaultCount || 0
  })
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click {count}
      </button>
    </div>
  )
}
```

2. 不能在条件语句中使用`useState`, 原理同 1

```js
function App(props) {
  // 禁止这样子书写
  let count, setCount
  if (id > 0) {
    ;[count, setCount] = useState(0)
  }
  return (
    <div>
      <button>Click {count}</button>
    </div>
  )
}
```

3. 为了安全也不要在 for 循环中使用

## [useEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)

使用类语法, 会产生很多副作用, 例如 绑定事件, 网络请求, 访问 DOM

该 Hook 接收一个包含命令式、且可能有副作用代码的函数。

`useEffect`就是一个 Effect Hook，给函数组件增加了操作副作用的能力

```js
function EffectHooks(props) {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }

  // 相比于类组件实现的, hooks不在关心 componentDidMount 或是 componentDidUpdate
  // 使用useEffect统一在渲染之后调用
  // 默认情况下，它在第一次渲染之后和每次更新之后都会执行。
  useEffect(() => {
    document.title = count.toString()
  })

  useEffect(() => {
    console.log(`count: ${count}`)
  }, [count])

  // 如果不传, 意味着每次渲染, 都执行useEffect
  // [](可选数组) 只有数组的每一项都不变, 才会阻止useEffect重新执行
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  useEffect(() => {
    document.getElementById('size').addEventListener('click', onClick, false)
    return () => {
      document
        .getElementById('size')
        .removeEventListener('click', onClick, false)
    }
  })

  const onClick = () => {
    console.log('click')
  }

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click {count}
      </button>
      {count % 2 ? (
        <span id="size">
          size:{size.width}x{size.height}{' '}
        </span>
      ) : (
        <div id="size">
          <h1>width: {size.width}</h1>
          <h1>height: {size.height}</h1>
        </div>
      )}
    </div>
  )
}
```

## [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)

可以跨组件传递数据

```js
import React, { Component, useState, createContext, useContext } from 'react'

const CountContext = createContext(undefined)

// 示例1
class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>{count => <h1>{count}</h1>}</CountContext.Consumer>
    )
  }
}

// 示例2
class Bar extends Component {
  static contextType = CountContext
  render() {
    const count = this.context
    return <h1>{count}</h1>
  }
}

// hooks写法
const CountContext = createContext(10);

function Counter() {
  const count = useContext(CountContext);
  return <h1>{count}</h1>;
}

function Middle() {
  return (
    <div>
      <div>middle</div>
      <Counter />
    </div>
  );
}

function ContextHooks() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click {count}
      </button>
      <CountContext.Provider value={count}>
        <Middle></Middle>
      </CountContext.Provider>
    </div>
  );
}

export default ContextHooks
```

## [useMemo 和 useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

> 使用 Memo 不会导致逻辑发生改变，它只作为性能优化使用

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

> 总结：useMemo可以根据指定的依赖，来决定一段函数是否被重新执行，从而优化性能

```js
import React, { Component, useState, useMemo, memo, useCallback } from 'react'

const Counter = memo(function Counter(props) {
  console.log('Counter render')
  return <h1 onClick={props.onClick}>{props.count}</h1>
})

function MemoHooks() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  // useMemo可以依赖于另一个useMemo
  // const half = useMemo(() => {
  //   return double / 4
  // }, [double])

  // useMemo 优化性能
  // 如果useMemo返回的是一个函数, 可以使用useCallback省略顶层函数
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log("Click")
  //   }
  // }, [])

  // 使用 useCallback
  // const onClick = useCallback(() => {
  //   console.log('Click')
  // }, [])

  const onClick = useCallback(() => {
    console.log('CLick')
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click {count} double: {double}
      </button>
      {/*
        onClick 是一个函数，每次 render 执行的时候，onClick 都是一个新的句柄
        使用 useMemo 把这个 onClick 函数包裹起来，
        每次 render 更新的时候，返回的都是同一个句柄
      */}
      <Counter count={double} onClick={onClick} />
    </div>
  )
}

export default MemoHooks
```

## [useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref)

作用：

1. 获取子组件或 DOM 节点的句柄

```js
// 1. 获取子组件或DOM节点的句柄
function TextInputWithFocusButton() {
  const inputEl = useRef(null)
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    console.log(inputEl.current)
    inputEl.current.focus()
  }
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

2. 渲染周期之间共享数据的存储

```js
import React, { useRef, useState, useEffect } from 'react'

function Counter(props) {
  return <h1>{props.count}</h1>
}

function RefHooks() {
  const [count, setCount] = useState(0)
  const id = useRef()
  // 如果需要访问上一次render的状态, 就把状态放进ref中,
  // 下一次渲染也可以拿到上一次的状态
  useEffect(() => {
    id.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])
  useEffect(() => {
    if (count >= 10) {
      // 页面渲染, 这个id会重置
      clearInterval(id.current)
    }
  })
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Click
      </button>
    </div>
  )
}

export default RefHooks
```

## 自定义 Hooks

```js
import React, { Component, useState, useEffect, useCallback } from 'react'

// 编写自定义hooks
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  return [count, setCount]
}

// function Counter (props) {
//   return (
//     <h1>{props.count}</h1>
//   )
// }

// 编写一个返回jsx的hook
function useCounter(count) {
  return <h1>{count}</h1>
}

// 示例2
function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  // 使用 useCallback
  // const onResize = useCallback(() => {
  //   setSize({
  //     width: document.documentElement.clientWidth,
  //     height: document.documentElement.clientHeight
  //   })
  // }, [])
  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  }
  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <div>
      <h1 style={{ color: 'green' }}>width: {size.width}</h1>
      <h1 style={{ color: 'green' }}>height: {size.height}</h1>
    </div>
  )
}

function CustomHooks() {
  // const [count, setCount] = useState(0)
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        CLick
      </button>
      {/*<Counter count={count}/>*/}
      {Counter}
      {size}
    </div>
  )
}

export default CustomHooks
```

## Hooks 使用法则

[Hook 规则](https://zh-hans.reactjs.org/docs/hooks-rules.html)

1. 只在最顶层使用 Hook

不能在 if 语句, for 循环语句等使用 Hook

2. 只在 React 函数中调用 Hook

不要在其他普通函数调用 Hook, Hook 函数的调用, 要清晰可辨, 这是为了防止在条件语句等地方使用 Hook
