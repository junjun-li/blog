# React+React-router

## React 注册事件 注意事项

1.  在 react 中注册事件与给 DOM 注册事件基本是一样的， onclick onmouseenter onblur onkeyup
2.  在 react 中注册事件，采用驼峰命名法， onClick onMouseEnter onBlur
3.  在 react 中注册事件，通过{}传入的是一个函数, 而不是一个字符串
4.  在 react 中，如果想要组件浏览器的默认行为，不要使用 return false，使用 `e.preventDefault()`

## React 脚手架的使用

- 创建项目

该命令会自动下载 `react`, `react-dom`, and `react-scripts`

然后使用`yarn start`启动项目

```yarn
create-react-app my-app
```

## React-Router 的使用

- 安装

```yarn
yarn add react-router-dom
```

## React-Router 组件的介绍

### BrowserRouter,HashRouter 路由容器

整个应用,应该包裹在 `BrowserRouter` 或者 `HashRouter`容器中

- BrowserRouter 是不带 # 号的

- HashRouter 是带 # 号的路由

### Link 和 NavLink

- Link: to 属性，表示的点击这个 Link，跳转到的路由， Link 最终渲染成 a 标签

- NavLink: 可以指定样式 activeClassName="now" 激活时会加 now 的类

### Redirect

- 路由重定向 `<Redirect exact from="/" to="/home" />`

- exact 表示精确匹配

- path="/" 只要是/xxx 的路由都匹配上 exact 表示精确匹配

### Route

- 表示一条路由规则

- 使用示例 `<Route path="/home" component={Home} />`

## 路由传参

```js
<Link to='/news/:id'>新闻1</Link>
// 组件内部 使用props.match就可以拿到参数
render() {
  let { match } = this.props
  console.log(match)
  // 获取到路由的参数  /news/1  /news/2
  return <div>这是News组件</div>
}
```

## 路由跳转

```jsx
import React from 'react'
// 1. 导入 withRouter 方法
import { withRouter } from 'react-router-dom'
class Login extends React.Component {
  render() {
    console.log(this.props.history)
    // history对象
    let { history } = this.props
    return (
      <div>
        这是Login组件 {/* 方式1 */}
        <button onClick={() => history.push('/home')}>点击登录1</button>
        {/* 方式2 */}
        <button onClick={this.clickFn}>点击登录2</button>
      </div>
    )
  }
  clickFn = () => {
    // 3. 通过 history 对象就可以实现js跳转路由
    this.props.history.push('/home')
  }
}
// 2. 需要使用 withRouter 包裹导出的组件
export default withRouter(Login)
```

## 项目修改端口号

```json
"scripts": {
    "start": "cross-env PORT=8889 react-scripts start",
  },
```
