# Web-Api

## ajax

- 自行封装 ajax

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        } else if (xhr.status === 404 || xhr.status === 500) {
          reject(new Error('404 not found'))
        }
      }
    }
    xhr.send(null)
  })
  return p
}

const url = '/data/test.json'
ajax(url)
  .then(res => console.log(res))
  .catch(err => console.error(err))
```

- 跨域

```js
// 什么叫同源策略
// 协议、域名、端口三者一致才叫同源

// 加载css js可以无视同源策略
// <img src="跨域图片的地址">
// <link href="跨域css的地址">
// <script src="跨域js的地址">
```

## 如何理解 cookie

- 本身用于浏览器和 server 通讯

- 被“借用”到本地存储来

缺陷：

1. 存储大小，最大为 4kb

2. http 请求时需要发送到服务端，增加请求数据量

3. 只能用`document.cookie="..."`来设置，过于简陋

## localStorage SessionStorage 和 cookie 的区别

1. HTML5 专门为存储而设计的，最大存储 5M

2. API 简单医用，setItem getItem

3. 不会随着 http 请求被发送出去

4. localStorage 数据会永久存储，除非代码或者手动删除

5. SessionStorage 数据只存在于当前会话，浏览器关闭则清空
