# mongoose 使用简介

## 核心概念

[![rLkFKI.png](https://s3.ax1x.com/2020/12/30/rLkFKI.png)](https://imgchr.com/i/rLkFKI)

## 基本使用

```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://test:123456@121.37.183.14:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const User = mongoose.model('users', {
  name: String,
  age: Number,
  email: String
})

const junjun = new User({
  name: 'lijunjun',
  age: 24,
  email: '981311431@qq.com'
})

junjun.save().then(() => console.log('save ok'))
```

执行 app.js

```shell
node app.js
Warning: no saslprep library specified. Passwords will not be sanitized
save ok
```

:::tip 提醒
虽然执行成功了 但是有一个警告, 我们装一个包来解决它
:::

```shell
npm i saslprep
# 装了包在执行, 可以看见警告已经消失了
node app.js
```

使用 robo 3T 查看

[![rLUYTK.png](https://s3.ax1x.com/2020/12/30/rLUYTK.png)](https://imgchr.com/i/rLUYTK)
