# 异步-Promise 进阶

## event loop 的机制(事件轮询/时间循环)

- JS 是单线程的

- 异步要基于回调来实现

- event loop 就是异步回调的实现原理

## event loop 的执行过程

1. 同步代码，一行行放在 Call Stack(调用栈)执行

2. 遇到异步，会先记录下，等待时机(定时任务、网络请求)

3. 时机到了，就会移动到 Callback Queue

4. 如果 Call Stack 为空(即同步代码执行完毕)`EventLoop`开始工作

5. 轮询查找 Callback Queue(回调队列)，如有则移动到 Call Stack 执行

6. 然后继续轮训查找(永动机一样)

[![2H0qiD.png](https://z3.ax1x.com/2021/06/15/2H0qiD.png)](https://imgtu.com/i/2H0qiD)

## Promise 的三种状态

- pending(等待) resolved(成功) rejected(失败)

- pending => resolved 或者 pending => rejected

- 变化不可逆, 没发把成功变成失败

```js
// 刚定义时，状态默认为 pending
const p1 = new Promise((resolve, reject) => {})

// 执行 resolve() 后，状态变成 resolved
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  })
})

// 执行 reject() 后，状态变成 rejected
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  })
})
```

### 状态的表现和变化

1. `pending` 状态, 不会触发 then 和 catch

2. `resolve` 状态, 会触发后续的 then 回调函数

3. `rejected` 状态, 会触发后续的 catch 回调函数

```js
// `resolve` 状态, 会触发后续的 then 回调函数
const p1 = Promise.resolve(100)
// console.log('p1', p1);

p1.then(data => {
  console.log('data', data)
}).catch(err => {
  console.log(err)
})

// `rejected` 状态, 会触发后续的 catch 回调函数
const p2 = Promise.reject('err')
// console.log('p2', p2);

p2.then(data => {
  console.log('data', data)
}).catch(err => {
  console.log(err)
})
```

## then 和 catch 对状态的影响

### `then` 正常返回 resolved, 里面有报错则返回 rejected

```js
// `then` 正常返回 resolved, 里面有报错则返回 rejected
const p1 = Promise.resolve().then(() => {
  return 100
})
console.log('p1', p1)
p1.then(() => {
  console.log(123)
})

const p2 = Promise.resolve().then(() => {
  throw new Error('then error')
})
console.log('p2', p2)
p2.then(() => {
  console.log(456)
}).catch(() => {
  console.log(789)
})
```

### `catch` 正常返回 resolved, 里面有报错则返回 rejected

```js
const p3 = Promise.reject('error').catch(err => {
  console.log(err)
})
console.log('p3', p3) // resolved 注意！
// resolved会触发then
p3.then(() => {
  console.log('p3 then')
})

const p4 = Promise.reject('error').catch(err => {
  throw new Error('then error')
})
console.log('p4', p4) // reject 注意！

// reject要走catch
p4.then(() => {
  console.log('p4 then')
}).catch(err => {
  console.log('p4: ' + err)
  console.log('p4 catch')
})
```

> 题目演示

[![cvTChF.png](https://z3.ax1x.com/2021/04/25/cvTChF.png)](https://imgtu.com/i/cvTChF)

```js
// 打印 1，3
Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .catch(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })

// 打印 1，2，3
Promise.resolve()
  .then(() => {
    console.log(1)
    throw new Error('err')
  })
  .catch(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })

// 打印 1，2
Promise.resolve()
  .then(() => {
    console.log(1)
    throw new Error('err')
  })
  .catch(() => {
    console.log(2)
  })
  .catch(() => {
    console.log(3)
  })
```

## async/await

- 异步回调地域(场景)

- Promise, then, catch 是链式调用, 但也是基于回调函数

- async/await 是同步语法, 彻底消灭回调函数

- 基本示例

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      const err = new Error(`图片加载失败：${url}`)
      reject(err)
    }
    img.src = url
  })
}
const url1 = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
const url2 = 'https://img3.mukewang.com/5a9fc8070001a82402060220-100-100.jpg'
;(async function() {
  // await可以追加Promise函数，也可以追加async包裹了的函数直接执行
  const img1 = await loadImg(url1)
  console.log(img1.width)
  console.log(img1.height)

  const img2 = await loadImg(url2)
  console.log(img2.width)
  console.log(img2.height)
})()
```

## async/await 和 Promise 的关系

### 执行`async`函数, 返回的是`Promise`对象

:::tip 提示
如果直接返回一个值，会自动封装成 Promise 对象
:::

```js
async function fn() {
  // return 100
  return Promise.resolve(100)
}
const res = fn() // res是Promise对象
// console.log(res)

// resolve可以触发then回调
res.then(data => {
  console.log(data)
})
```

### await 相当于 Promise 的 then

- await 的几种用法

```js
async function fn() {
  // return 100
  return Promise.resolve(100)
}
// await 相当于 Promise 的 then
;(async function() {
  const p1 = Promise.resolve(200)
  const data1 = await p1 // 相当于 Promise.resolve(200).then()
  console.log('data1', data1)
})()
;(async function() {
  const data2 = await 300 // 相当于 Promise.resolve(300).then()
  console.log('data2', data2)
})()
;(async function() {
  const data3 = await fn()
  console.log('data3', data3)
})()
```

- 特殊情况

如果 Promise 的状态是 reject， 使用 await 的话，会抛出异常，需要使用 try...catch 捕获

```js
;(async function() {
  const p = Promise.reject('err')
  // 报错：Uncaught (in promise) err
  const res = await p
  console.log(res)
})()
```

### try...catch 可以捕获异常, 代替了 Promise 的 catch

```js
;(async function() {
  const p = Promise.reject('err')
  try {
    const res = await p
    console.log(res)
  } catch (error) {
    console.log(error) // err
  }
})()
```

## 异步的本质

- async/await 是消灭异步回调的终极武器

- JS 还是单线程的，还是得有异步，还得是基于 event loop

- async/await 只是一个语法糖(真香)，但是无法改变异步的本质

- 示例 1：

```js
async function async1() {
  console.log('async1 开始') // 2
  await async2()
  // 坑：await后面的代码，都可以看做是callback里面的内容，即异步
  // 类似于event loop，setTimeout(cb1)
  // 之后的代码需要放入回调队列中，等待同步代码执行完毕，才能执行
  console.log('async1 结束') // 5
}
async function async2() {
  console.log('async2 开始') // 3
}
console.log('script 开始') // 1
async1()
console.log('script 结束') // 4
```

- 示例 2：

```js
async function async1() {
  console.log('async1 开始') // 2
  await async2()
  // 下面的代码都是callback，是异步，丢异步队列中，先执行同步
  // 所以先走4
  console.log('async1 结束(1)') // 5
  await async3()
  console.log('async1 结束(2)') // 7
}
async function async2() {
  console.log('async2 开始') // 3
}
async function async3() {
  console.log('async3 开始') // 6
}
console.log('script 开始') // 1
async1()
console.log('script 结束') // 4
```

## for...of

- for...in 是常规的同步遍历

- for...of 常用语异步遍历，会一个个执行

```js
function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}
const nums = [1, 2, 3]
// 这里会一瞬间执行，不满足我们的需求
// nums.forEach(async (item) => {
//   const res = await muti(item)
//   console.log(res)
// })
;(async function() {
  for (const item of nums) {
    const res = await muti(item)
    console.log(res)
  }
})()
```
