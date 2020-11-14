# Next

**学习目标**

- **了解Next.js的作用**
- **掌握Next.js中的路由**
- **掌握Next.js中布局组件的创建**
- **掌握Next.js中的静态文件服务**
- **掌握Next.js中获取页面数据的方法**
- **掌握Next.js中组件样式的书写**
- **使用Next.js完成豆瓣电影案例**
- **能够自定义头部元素head**

## 2.1 什么是Next.js?

[Next.js官网](https://nextjs.org/)

Next.js是一个基于React的一个服务端渲染简约框架。它使用React语法，可以很好的实现代码的模块化，有利于代码的开发和维护。

Next.js带来了很多好的特性：

- 默认服务端渲染模式，以文件系统为基础的客户端路由
- 代码自动分割使页面加载更快
- 以webpack的热替换（HMR）为基础的开发环境
- 使用React的JSX和ES6的module，模块化和维护更方便
- 可以运行在Express和其他Node.js的HTTP 服务器上
- 可以定制化专属的babel和webpack配置

使用服务器端渲染好处：

- 对SEO友好
- 提升在手机及低功耗设备上的性能
- 快速显示首页

## 2.2 Next.js初体验

```bash
mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages
```

配置package.json中的scripts属性

```js
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

此时`npm run dev` 会得到一个404页面

创建一个pages/index.js

```js
const Index = () => (
  <div>
    <p>Hello Next.js</p>
  </div>
)

export default Index
```

创建一个pages/next-route/teacher.js页面

```js
const Teacher = () => (
  <div>
    <p>教师页面</p>
  </div>
)

export default Teacher
```

## 2.3 页面导航

### 2.3.1 路由跳转

1. Link组件

  - Link组件内不能直接写文字，必须使用标签包裹，标签可以是任何标签，但是必须只能保证Link组件内只有一个子元素；
  - 给Link组件设置样式不会生效，因为Link组件是一个HOC（高阶组件），但是可以给它里面的子元素设置样式；

```js
import Link from 'next/link'
<Link href="/teachers">
  <a>教师页面</a>
</Link>
```

组件`<Link>`可接收 URL 对象，而且它会自动格式化生成 URL 字符串。例如： 

```js
<Link href={{pathname: '/teachers', query: {id: 1}}}>
  <a>教师页面</a>
</Link>
```

2.  命名式路由

```javascript
import Router from 'next/router'

export default () => (<div><span onClick={() => Router.push('/teacher')}>教师</span></div>)
```

URL对象语法：

```js
Router.push({pathname: '/teacher', query: {id: 1}})
```

注意：如果没有匹配到的话，默认会去找`_error.js`中定义的组件； 路由跳转不会向服务器发送请求页面的请求。

### 2.3.2 创建组件

1. 普通组件

   组件的创建可以在任何的文件夹下面，但是不要放在pages下面，因为组件并不需要url

2. 布局组件

   利用this.props.children

3. 全局布局组件， 创建_app.js，模板入下：

   ```js
   import React from 'react'
   import App, {Container} from 'next/app'
   
   class Layout extends React.Component {
     render () {
       const {children} = this.props
       return <div className='layout'>
         {children}
       </div>
     }
   }
   
   export default class MyApp extends App {
     render () {
       const {Component, pageProps} = this.props
       return <Container>
         <Layout>
           <Component {...pageProps} />
         </Layout>
       </Container>
     }
   }
   ```


### 2.3.3 query strings

1. 创建一个带query的链接
2. 如果你想应用里每个组件都处理路由对象，你可以使用`withRouter`高阶组件。从next/router中引入withRouter，注入路由对象到Next.js中的组件作为组件属性，从而获取query对象
3. 组件使用props.router.query.xxx获取query strings

### 2.3.4 Clean URLs with Route Masking

通过as属性，给browser history来个路由掩饰，但是按刷新按钮路由就找不到了，因为服务器回去重新找/p/xxxx页面，但是实际上此时并不存在xxxx页面

```html
    // /post?title=xxxx 会变成 /p/xxxx
	<Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
```

### 2.3.5 服务器端支持Clean URLs

[创建自定义服务](https://nextjs.org/learn/basics/server-side-support-for-clean-urls/create-a-custom-server)

1. 安装express `npm install --save express`
2. 创建server.js，添加如下内容

```js
    const express = require('express')
    const next = require('next')

    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })
    const handle = app.getRequestHandler()

    app.prepare()
    .then(() => {
      const server = express()

      server.get('*', (req, res) => {
        return handle(req, res)
      })

      server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
      })
    })
    .catch((ex) => {
      console.error(ex.stack)
      process.exit(1)
    })
```
3. 修改package.json文件中scripts字段

```js
 "scripts": {
   "dev": "node server.js",
   "build": "next build",
   "start": "NODE_ENV=production node server.js"
 }
```

4. 创建自定义路由

```js
  server.get('/teacher/:id', (req, res) => {
    const actualPage = '/teacher/detail'
    const queryParams = { id: req.params.id } 
    app.render(req, res, actualPage, queryParams)
  })
```

## 2.4 静态文件服务

项目的根目录新建 `static` 文件夹，代码通过 `/static/` 开头的路径来引用此文件夹下的文件，例如：

`export default () => <img src="/static/logo.png" />`

## 2.5 获取页面数据

1. 下载[isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) ： `npm install --save isomorphic-unfetch`
2. 引入 `import fetch from 'isomorphic-unfetch';`

使用异步静态方法`getInitialProps`获取数据，此静态方法能够获取所有的数据，并将其解析成一个 `JavaScript`对象，然后将其作为属性附加到 `props`对象上

当页面初次加载时，`getInitialProps`只会在服务端执行一次。`getInitialProps`只有在路由切换的时候（如`Link`组件跳转或命名式路由跳转）时，客户端的才会被执行。

注意：getInitialProps **不能** 在子组件上使用，只能使用在`pages`页面中。

```js
// Index是一个组件
Index.getInitialProps = async function() {
  const res = await fetch('http://localhost:3301/in_theaters')
  const data = await res.json()
	
	// 这段数据会在服务器端打印，客户端连请求都不会发
  console.log(data)

  return {
    // 组件中通过props.shows可以访问到数据
    movieList: data
  }
}
```

如果你的组件是一个类组件，你需要这样写：

```javascript
export default class extends React.Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:3301/in_theaters')
    const data = await res.json()
    console.log(data);
    return {movieList: data}
  }
  render() {
    return (
      <div>
        {this.props.movieList.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
    )
  }
}
```



`getInitialProps`： 接收的上下文对象包含以下属性：

   - `pathname`： `URL`的 `path`部分
   
   - `query`： `URL`的 `query string`部分，并且其已经被解析成了一个对象
   
   - `asPath`： 在浏览器上展示的实际路径(包括 `query`字符串)
   
   - `req`： `HTTP request` 对象 (只存在于服务器端)
   
   - `res`： `HTTP response` 对象 (只存在于服务器端)
   
   - `jsonPageRes`： 获取的响应数据对象 [Fetch Response](https://link.juejin.im?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FResponse) (只存在于客户端)
   
   - `err`： 渲染时发生错误抛出的错误对象


```js
// 在另外一个组件中，可以使用context参数(即上下文对象)来获取页面中的query
Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`http://localhost:3301/in_theaters/${id}?_embed=details`)
  const data = await res.json()
  console.log(data)

  return {movieDetail: data}
}
```

## 2.6 组件样式

1. css样式文件

2. css in js

3. styled-jsx


- **scoped**

  如果添加了 `jsx`属性，只作用于当前组件，不包括子组件

```js
   <style jsx>{`
     h1, a {
       font-family: "Arial";
     }

     ul {
       padding: 0;
     }

     li {
       list-style: none;
       margin: 5px 0;
     }

     a {
       text-decoration: none;
       color: blue;
     }

     a:hover {
       opacity: 0.6;
     }
   `}</style>

```

- **global**

  作用于当前组件，包括子组件

```css
<style jsx global>{``}</style>
```

## 2.7 豆瓣电影案例

**接口**

获取电影列表：`http://localhost:3301/in_theaters`    （in_theaters可以替换为coming_soon及top250）

获取电影详情：`http://localhost:3301/in_theaters/1?_embed=details`

### 2.7.1 豆瓣电影首页

`MovieHeader`组件样式

```scss
    .movie-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px 0;
      background-color: #1e2736;
      margin: 0;
    }
    li {
      list-style: none;
      line-height: 30px;
      height: 30px;
    }
    li a {
      color: white;
    }
    li a:hover {
      color: red;
    }
```

### 2.7.2 豆瓣电影列表页

```scss
.movie-type {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.movie-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 10px 0;
  width: 40%;
  box-shadow: 0 0 10px #bbb;
  
}
.movie-box:hover {
  box-shadow: rgba(0,0,0,0.3) 0px 19px 60px;
}
```

### 2.7.3 豆瓣电影详情页

```scss
.detail {
  width: 40%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #bbb;
}
.detail-box {
  text-align: center;
}
```



## 2.8 自定义头部元素head

引入next/head

```js
export default () => {
    <div>
    	<Head>
      		<meta name="keywords" content="" key="viewport" />
    	</Head>
    </div>
}
```

注意：在卸载组件时，`<head>`的内容将被清除。请确保每个页面都在其`<head>`定义了所需要的内容，而不是假设其他页面已经加过了

