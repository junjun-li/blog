# 监听 data 变化的核心 API 是什么

## Vue 响应式

- 组件 data 一旦变化，立即触发视图的更新

- 实现数据驱动视图的第一部

- 考察 Vue 原理的第一题

- 核心 API - Object.defineProperty

- Proxy 有兼容性问题（Vue3 中实现响应式的原理）

## 监听简单数据类型

```js
function updateView() {
  console.log('视图更新')
}
function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 设置新值
        // 注意：value 一直存在闭包之中，此处设置完之后，在get也是新值
        value = newValue
        // 触发更新视图
        updateView()
      }
    }
  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是一个对象或者数组
    return target
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zhangsan',
  age: 20
  // 这种情况的话，就需要递归调用，深度监听
  // info: {
  //   address: '上海'
  // }
}

// 给属性添加get和set
observer(data)

data.name = 'lisi' // 然后就能触发视图更新
data.age = 11 // 然后就能触发视图更新
```

## 监听对象和数组

如上代码所示，如果 data 中的属性是一个数组和对象的话，我们就无法为其增加 get 和 set

所以我们需要深度监听，在 ①② 中增加`observer(value)`的调用

```js
function updateView(newValue) {
  console.log('视图更新: ' + newValue)
}

function defineReactive(target, key, value) {
  // ①：深度监听, 这种情况下，需要深度监听
  // info: {
  //   address: '上海'
  // }
  observer(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      // ②：如果设置的新属性的值，是一个复杂数据类型，需要深度监听
      // 注意这里要传入新的值
      observer(newValue)
      if (newValue !== value) {
        // 设置新值
        // 注意：value 一直存在闭包之中，此处设置完之后，在get也是新值
        value = newValue
        // 触发更新视图
        updateView(newValue)
      }
    }
  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    // 不是一个对象或者数组
    return target
  }

  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zhangsan',
  age: 20,
  // 这种情况的话，就需要递归调用，深度监听
  info: {
    address: '上海'
  }
}

// 给属性添加get和set
observer(data)

data.name = 'lisi' // 然后就能触发视图更新
data.age = 11 // 然后就能触发视图更新
data.age = { num: 1 }
data.age.num = 10
```

## Object.defineProperty 的缺点

- 深度监听，需要递归到底，计算量非常大，如果对象足够复杂，会造成页面卡顿

- 如果对 data 新增一个属性，或者删除一个属性，监听不到，无法触发视图更新

- 无法原生监听数组，需要特殊处理

```js
data.x = 100 // 新增属性，监听不到 => 所以有了 Vue.set 的api
delete data.name // 删除属性，监听不到 => 所以有了 Vue.delete 的api
```
