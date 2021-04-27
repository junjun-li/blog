# 面试题

## vue 组件传值

## vue-router 路由实现的方式有哪两种

1. **hash** 即地址栏 URL 中的 # 符号 例如:localhost:8080/#/login

2. **history** 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

## http 协议相关内容

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

### 请求报文和响应报文的内容

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

## vue 原理 Object.defineProperty()
