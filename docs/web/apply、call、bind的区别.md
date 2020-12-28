## apply、call、bind 的区别

### apply、call

[Function.prototype.call](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/global_objects/function/call)

[Function.prototype.apply](https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/global_objects/function/apply)

在 js 中, `call`和`apply`都是为了改变某个函数运行时的上下文(context)而存在的, 简单的来说就是为了改变函数内部的 this 指向

先来一个 🌰:

```js
// 坑1
// 是用var声明的变量, 会挂载到window上面, 可以使用window.xxx来访问
// 但是使用let声明的变量, 就不在window上面的
var name = '张三'
var age = 18

let obj = {
  name: '李四',
  objAge: this.age,
  myFunc: function (from, sex) {
    console.log(
      `我的名字叫${this.name}, 我今年${this.age}岁, 我来自${from}, 性别${sex}`
    )
  }
}
var ww = {
  name: '王五',
  age: 99
}
obj.myFunc.call(ww, '上海', '男') // 我的名字叫王五, 我今年99岁, 我来自上海, 性别男
obj.myFunc.apply(ww, ['上海', '男']) // 我的名字叫王五, 我今年99岁, 我来自上海, 性别男
obj.myFunc.bind(ww, '上海', '男') // 我的名字叫王五, 我今年99岁, 我来自上海, 性别男
obj.myFunc.bind(ww, ['上海', '男']) // 我的名字叫王五, 我今年99岁, 我来自上海,男, 性别 undefined
```

### apply、call 的区别

> 注意：call()方法的作用和 apply() 方法类似，区别就是 call()方法接受的是参数列表，而 apply()方法接受的是一个参数数组。
> call 需要把参数`按顺序传递`进去，而 apply 则是`把参数放在数组里`。

为了加深记忆，举例一些常用用法

- 经典面试题, for 循环中一秒打印一个下标

```js
for (var i = 0; i < 10; i++) {
  setTimeout(console.log.bind(console, i), i * 1000)
}
```

- 数组之间追加

```js
var array1 = [12 , "foo" , {name "Joe"} , -2458]
var array2 = ["Doe" , 555 , 100]
Array.prototype.push.apply(array1, array2)
// array1 值为 [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100]
```

- 获取数组中的最大值和最小值

> number 本身没有 max 方法, 但是 Math 有, 我们就可以借助 call 或者 apply 使用其方法

```js
var numbers = [5, 458, 120, -215]
var maxNumber = Math.max.apply(Math, numbers) // 458
var maxNumber = Math.max.call(Math, 5, 458, 120, -215) // 458
```

- 验证是否是数组, 是否是时间类型的 date

> 前提是 toString()方法没有被重写过

```js
function isDate(val) {
  // console.log(Object.prototype.toString(new Date())) => '[object Object]'
  // console.log(Object.prototype.toString.call([])) => '[object Array]'
  return Object.prototype.toString.call(val) === '[object Date]'
}
```

- 伪数组使用数组的方法

> 这样 domNodes 就可以使用 Array 下的所有方法了

```js
let domNodes = Array.prototype.slice.call(document.getElementsByTagName('*'))
```

### 深入理解运用 apply、call

下面就借用一道面试题, 深入理解 apply 和 call

定义一个 log 方法, 来代理 console.log 方法, 常用的解决方法是:

```js
function log(msg) {
  console.log(msg)
}
log(1) //1
log(1, 2) //1
```

上面方法可以解决最基本的需求，但是当传入参数的个数是不确定的时候，上面的方法就失效了，这个时候就可以考虑使用 apply 或者 call，注意这里传入多少个参数是不确定的，所以使用 apply 是最好的，方法如下：

```js
function log() {
  console.log.apply(console, arguments)
}
log(1) //1
log(1, 2) //1 2
```

接下来的要求是给每一个 log 消息添加"(app)"的前缀, 例如:

```js
log('hellow world') // (app)hellow world
```

该怎么做比较优雅呢?这个时候需要想到 arguments 参数是个伪数组, 通过 Array.prototype.slice.call 转化为标准数组, 再使用数组方法 unshift, 像这样：

```js
function log() {
  var args = Array.prototype.slice.call(arguments)
}
```

### bind 详解

[Function.prototype.bind()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

> bind() 方法与 apply 和 call 很相似，也是可以改变函数体内 this 的指向
> MDN 的解释是: bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

有时候我们会使用\_this,that 等方法保存 this, 这样我们就可以在改变了 this 指向的时候还能继续引用他, 如下

```js
let foo = {
  bar: 1,
  eventBind: function () {
    let that = this
    $('#app').on('click', function (e) {
      console.log(that.bar) // 1
    })
  }
}
```

上述代码, 可以使用 bind()优雅的解决

```js
let foo = {
  bar: 1,
  eventBind: function () {
    $('#app')
      .on('click', function (e) {
        console.log(this.bar) // 1
      })
      .bind(this)
  }
}
```

在上述代码里, bind()创建了一个函数, 当这个 click 事件绑定在被调用的时候, 它的 this 关键词会被设置成传入的值(这里指的是调用 bind()时传入的参数)
因此, 这里我们传入的 this 指的是 foo, 所以当函数被执行调用的时候, this 指向了 foo

再来一个 🌰

```js
let bar = function () {
  console.log(this.x)
}
var foo = {
  x: 3
}
bar() // undefined

bar.bind(foo)() // 3
// let func = bar.bind(foo)
// func() // 3
```

### 多次 bind

有个有趣的问题，如果连续 bind() 两次，亦或者是连续 bind() 三次那么输出的值是什么呢？像这样：

```js
let bar = function () {
  console.log(this.x)
}
let foo = {
  x: 3
}
let sed = {
  x: 4
}
let func = bar.bind(foo).bind(sed)
func() //?

let fiv = {
  x: 5
}
let func = bar.bind(foo).bind(sed).bind(fiv)
func() //?
```

答案是，两次都仍将输出 3 ，而非期待中的 4 和 5 。原因是，在 Javascript 中，多次 bind() 是无效的。更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

### apply、call、bind 比较

那么 apply、call、bind 三者相比较, 之间又有什么异同呢? 何时使用 apply、call, 何时使用 bind 呢? 我们再来个 🌰

```js
let obj = {
  x: 81
}

let foo = {
  getX: function () {
    return this.x
  }
}

console.log(foo.getX.bind(obj)()) //81
console.log(foo.getX.call(obj)) //81
console.log(foo.getX.apply(obj)) //81
```

三个输出的都是 81，但是注意看使用 bind() 方法的，他后面多了对括号。

也就是说，区别是，当你希望改变上下文环境之后并非立即执行，而是回调执行的时候，使用 bind() 方法。而 apply/call 则会立即执行函数。

最后:

1. apply, call, bind 三者都是用来改变函数的 this 对象的指向的；
2. apply, call, bind 三者第一个参数都是 this 要指向的对象，也就是想指定的上下文；
3. apply, call, bind 三者都可以利用后续参数传参；
4. bind 是返回对应函数，便于稍后调用；apply, call 则是立即调用 。
