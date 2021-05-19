# vue 面试题

## 自定义 v-model

```vue
<template>
  <input :value="inputVal" type="text" @input="input" />
</template>
<script>
export default {
  name: 'InputComponent',
  // 2. 定义model属性
  // prop: 数据  event: 事件
  model: {
    prop: 'inputVal',
    event: 'change'
  },
  // 1. 父组件使用v-model传递过来的数据
  props: {
    inputVal: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 3. 触发事件, 改变父组件传递过来的v-model
    input(e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>
```

## 如何理解 MVVM 模型

数据驱动视图就是 MVVM

[![cziYiF.png](https://z3.ax1x.com/2021/04/25/cziYiF.png)](https://imgtu.com/i/cziYiF)

## Vue 响应式原理

- 组件 data 的数据一旦发生变化, 立即触发视图更新

vue 实现响应式的关键`Object.defineProperty`

```js
const data = {}
const name = 'zhangsan'
Object.defineProperty(data, 'name', {
  get: function() {
    console.log('get函数调用了')
    return name
  },
  set: function(newValue) {
    name = newValue
  }
})
console.log(data.name)
data.name = 'lisi'
```

- 实现数据驱动视图的第一步骤

- 考察 vue 原理的第一题

## 如何深度监听复杂 data 的变化

```js
// 缺点:
// 1. 深度监听, 需要递归到底, 一次性计算量大
// 2. 往对象上面新增一个属性, 或者删除一个属性, 监听不到, 所以有`vue.set`这个api
function updateView() {
  console.log('更新视图')
}

function defineReactive(target, key, value) {
  // 深度监听
  observer(value)

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        // 深度监听: 设置新值的时候也要深度监听
        observer(value)

        // value, 是一直在闭包中的
        // 再次get的时候也是最新的值
        value = newVal
        // 更新视图
        updateView()
      }
    }
  })
}

function observer(target) {
  if (typeof target !== 'object' || target === null) {
    return target
  }

  for (const key in target) {
    defineReactive(target, key, target[key])
  }
}

const data = {
  name: 'zs',
  age: 18,
  info: {
    address: '北京'
  }
}

observer(data)

data.name = 'ls'
data.age = 20

// 深度监听
data.info.address = '上海'
```

## 虚拟dom和diff(vdom)

- DOM非常耗时

- vue和react是数据驱动视图, 如何有效的控制dom操作

解决方案: `vdom`

