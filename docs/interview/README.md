# 面试题

## vue 组件传值

### 父传子

1. 在父组件的模版中，给子组件增加一个自定义的属性。

2. 子组件通过 `props` 属性进行接收

```html
<div id="app">
  <!-- 1. 给子组件增加自定义属性 -->
  <son :getNumber="number" :car="car"></son>
</div>
```

```js
Vue.component('son', {
  template: `
        <div>
          <div>我是子组件</div>
          <div>我需要使用父组件的数据 ---{{getNumber}}---{{car}}</div>
        </div>
      `,
  // props类似于 data 与 computed, 也是给当前组件提供数据的
  // props的数据不是自己的，来自于父组件的
  props: ['getNumber', 'car']
})
var vm = new Vue({
  el: '#app',
  data: {
    car: 'mobile',
    money: 100
  }
})
```

### 子传父

1. 父组件给子组件注册一个自定义事件
2. 子组件触发这个自定义事件,触发事件时把数据传递给父组件

```html
<div id="app">
  <!-- 2. 将事件传递给子组件 -->
  <son @get="getMsg"></son>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
```

```js
Vue.component('son', {
  template: `
        <div class="son">
          <h3>这是子组件</h3>
          <input type="text" v-model="msg">
          <button @click="send">添加</button>
        </div>
      `,
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    // 点击子组件的时候，需要把值传递给父组件
    // 3. 使用$emit方法触发事件,传递参数给父组件
    send: function() {
      this.$emit('get', this.msg)
    }
  }
})
var vm = new Vue({
  el: '#app',
  data: {
    list: ['剁椒鱼头', '蚂蚁上树']
  },
  methods: {
    // 1. 父组件定义一个事件
    getMsg: function(msg) {
      console.log('我是父组件的方法')
      this.list.push(msg)
    }
  }
})
```

### 兄弟传兄弟

- 这个等我给你讲

## 你以前公司开发流程,人员配置是怎么样的?

- `需求`产品经理定制 就是这个产品 需要有哪些功能 每个页面有哪些数据 哪些结构

- `交互稿`产品经理制定交互稿 产品的草图 大概布局 点击之后产生哪一些效果

- `ui设计图`ui 画出的漂亮图片 页面上标注有 盒子的大小 颜色 边距等

- `前端`根据 ui 设计图 写出静态页面 和后端工程师 进行接口调试以及数据渲染

- `后端`设计数据库表 以及接口的调试 数据的返回

- `测试`测试 bug

## vue-router 路由实现的方式有哪两种

1. **hash** 即地址栏 URL 中的 # 符号 例如:localhost:8080/#/login

2. **history** 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

## http 协议相关内容(超级重要的呆瓜)

- http 协议规定了 浏览器到服务器(请求 Request) 和 服务器到浏览器(响应 Response)进行了约束和规范

- 即 HTTP 协议主要有 **请求(Request)** 和 **响应(Response)** 构成

### 请求报文 (request)

1. **请求行**

   内部包含了请求路径和请求参数

2. **请求头**

   内部包含浏览器的信息(浏览器的版本,浏览器可以接受的数据类型等)

3. **请求主体**

   内部包含了请求参数 (get 请求没有请求体，因为要传递的数据已经拼接到了请求头中)


    get请求的请求参数 在请求行中 (locahhost:8080/login?username=hucc&password=123456)

### 响应报文 (response)

1. **状态行(响应行)**

   内部有状态码

   200->成功

   302->重定向

   404->找不到资源

   500->服务器错误

2) **响应头**

   内部包含了服务器的信息(例如服务器响应的时间,服务器给浏览器返回的数据类型,服务器的版本信息)

3) **响应主体**

   内部包含了服务器给我们的数据

### 呆瓜 你把这些记着就好 能说出大概(最好能说出来 请求头里面 大概有什么东西就好)

- HTTP 协议主要有 **请求(Request)** 和 **响应(Response)** 构成
- 请求报文有 `请求头`,`请求行`,`请求主体`
- 响应报文有 `状态行(响应行)`,`响应头`,`响应主体`

## 浏览器本地存储的方式

- cookie

  **注意点:**

  1. cookie 存储容量小，约 4kb
  2. cookie 中的数据有效期，不设置即浏览器关闭，会话结束，数据销毁

- sessionStorage

  **注意点:**

  1. 刷新页面 依然存在
  2. 关闭浏览器页面 数据丢失和 cookie 类似 但是储存容量比 cookie 大

- localStorage

  **注意点:**

  1. 除非被清除，否则永久保存(永久存储,可手动清除)

## ES6 常用的你会哪一些

## h5 新增的特性

- 语义化标签 `<header>`页面头部、`<section>`章节、

- 音频`audio标签`,视频`video标签`

- localStorage 本地存储

- canvas

## http 和 hppts 和 webSocket 的区别

## 输入 url 发生了什么

## 移动端适配

## rem 布局原理

## 闭包

## 同步,异步 

## vue原理 Object.defineProperty()
