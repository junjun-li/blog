# ws 鉴权

浏览器的 scoket 只可以传递 url, 所以不能传递 headers 等数据

解决方案:

1. 在 url 上面拼接 token 的数据, 进行 JWT 鉴权

2. 把鉴权的内容, 放到 socket 的 message 中进行鉴权

## 前端

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="https://cdn.staticfile.org/vue/2.6.11/vue.min.js"></script>
  </head>
  <body>
    <div id="app">
      <div v-if="isShow">
        <input type="text" placeholder="请输入昵称" v-model="name" />
        <input type="text" placeholder="请输入房间号" v-model="roomId" />
        <button @click="enter">进入聊天室</button>
      </div>
      <div v-else>
        <h1>当前在线{{num}}</h1>
        <input type="text" v-model="message" />
        <button @click="sendMsg">发送消息</button>
        <button id="closeBtn">关闭连接</button>
        <ul>
          <li v-for="(item,index) in lists" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </body>
</html>
<script>
  let app = new Vue({
    el: '#app',
    data() {
      return {
        message: '',
        name: '',
        lists: [],
        ws: {},
        isShow: true,
        num: 0,
        roomId: ''
      }
    },
    mounted() {
      this.ws = new WebSocket(`ws://127.0.0.1:3000`)
      this.ws.onopen = this.onOpen
      this.ws.onmessage = this.onMessage
      this.ws.onclose = this.onClose
      this.ws.onerror = this.onError
    },
    methods: {
      enter() {
        if (this.name === '') {
          alert('名称不能为空')
          return
        }
        this.isShow = !this.isShow

        // this.ws.send不能直接发送对象
        this.ws.send(
          JSON.stringify({
            event: 'enter',
            message: this.name,
            roomId: this.roomId
          })
        )
      },
      sendMsg() {
        this.lists.push(this.name + '说: ' + this.message)
        this.ws.send(
          JSON.stringify({
            event: 'message',
            message: this.message
          })
        )
        this.message = ''
      },
      onOpen() {
        console.log('open: ' + this.ws.readyState)
        console.log('ws连接成功')
        // 发起鉴权请求, 传递token数据
        this.ws.send(
          JSON.stringify({
            event: 'auth',
            message: 'token传递给后台'
          })
        )
      },
      onMessage(e) {
        // 用户未进入聊天室, 不接受消息
        if (this.isShow) {
          return
        }
        // 接收服务端发送的消息
        let obj = JSON.parse(e.data)
        if (obj.event === 'noAuth') {
          // 跳转登录页
          alert('用户未登录, 即将跳转登录页')
          return
        }
        // 区别打招呼和发消息
        if (obj.event === 'enter') {
          this.lists.push(`欢迎${obj.message}进入聊天室`)
        } else if (obj.event === 'out') {
          this.lists.push(`${obj.name}退出了聊天室`)
        } else {
          // 因为要计算在线人数, 所以服务端去掉了给自己发送消息的逻辑
          // 所以判断一下
          if (obj.name !== this.name) {
            this.lists.push(obj.name + '说: ' + obj.message)
          }
        }
        this.num = obj.num
      },
      onClose() {
        console.log('close:' + this.ws.readyState)
        console.log('关闭webSocket')
      },
      onError() {
        console.log('error:' + this.ws.readyState)
        console.log('连接webSocket错误')
      }
    }
  })
</script>
```

## 服务端

```js
const WebSocket = require('ws')
const jwt = require('jsonwebtoken')
const wss = new WebSocket.Server({ port: 3000 })

let group = {}

// 多聊天室
// roomId => 对应相同的roomId进行广播消息
wss.on('connection', function(ws) {
  console.log('客户端连接成功')
  // ws: 当前收到消息的客户端
  ws.on('message', function(msg) {
    const msgObj = JSON.parse(msg)
    // 鉴权
    if (msgObj.event === 'auth') {
      // msgObj.message: 是token
      jwt.verify(msgObj.message, 'secret', (err, decode) => {
        if (err) {
          console.log('鉴权失败, 发送给前端')
          ws.isAuth = false
        } else {
          // 鉴权通过
          ws.isAuth = true
          console.log(decode)
        }
      })
    }

    // 进入聊天室
    if (msgObj.event === 'enter') {
      // 说明是进入聊天室的消息, 给当前ws对象绑定name属性
      ws.name = msgObj.message
      ws.roomId = msgObj.roomId
      if (typeof group[ws.roomId] === 'undefined') {
        group[ws.roomId] = 1
      } else {
        group[ws.roomId]++
      }
    }

    if (!ws.isAuth) {
      ws.send(
        JSON.stringify({
          event: 'noAuth',
          message: 'token鉴权失败'
        })
      )
      return
    }
    // 广播消息
    // wss.clients获取所有的客户端
    // client.roomId === ws.roomId 实现房间号广播
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
        msgObj.name = ws.name
        // msgObj.num = wss.clients.size
        msgObj.num = group[ws.roomId]
        client.send(JSON.stringify(msgObj))
      }
    })
  })

  // 客户端断开连接
  ws.on('close', function() {
    // 有特定的用户存在, 在减一
    if (ws.name) {
      // num--
      group[ws.roomId]--
    }
    let msgObj = {}
    // 广播消息
    // wss.clients获取所有的客户端
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && client.roomId === ws.roomId) {
        msgObj.name = ws.name
        // msgObj.num = wss.clients.size
        msgObj.num = group[ws.roomId]
        msgObj.event = 'out'
        client.send(JSON.stringify(msgObj))
      }
    })
  })
})
```
