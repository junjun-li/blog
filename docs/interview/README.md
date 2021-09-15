# 面试题

## var 和 let const 的区别

1. var 是 ES5 的语法，有变量提升；let、const 是 ES6 的语法，没有变量提升

2. var 和 let 是变量，可以修改，const 是常量，不可以修改

3. let、const 有块级作用域，var 没有

## typeof能判断哪些类型

- undefined、string、number、boolean、symbol

- object(注意，typeof null === "object")

- function(这是个特殊情况，fn也算是引用类型)

## 列举强制类型转换和隐式类型转换



## new Object 和 Object.create()的区别

- {}等同于 new Object()，原型是`Object.prototype`

- Object.create(null)没有原型

- Object.create({...})可以指定原型

```js
const obj1 = {
  a: 100,
  b: 200,
  sum() {
    return this.a + this.b
  }
}

// 坑，如果 new Object 传入一个对象的话，他们的内存地址是一样的
// const obj2 = new Object(obj1)
// console.log(obj1 === obj2) // true

const obj2 = new Object({
  a: 100,
  b: 200,
  sum() {
    return this.a + this.b
  }
})

// 新建的对象，没有属性，也没有原型(重要！！！)
const obj3 = Object.create(null)

// 空对象，有Object原型
const obj4 = new Object()

// Object.create是创建一个空对象，把这个对象的原型，指向了传入的对象
const obj5 = Object.create({
  a: 100,
  b: 200,
  sum() {
    return this.a + this.b
  }
})
```
