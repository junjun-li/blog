# Vue 面试题

## 为何在 v-for 中使用 key

- 必须用 key，且不能是 index 和 random

- diff 算法中通过 tag 和 key 来判断，是否是 sameNode

- 减少渲染次数，提升渲染性能

## 描述 Vue 组件生命周期（父子组件）

- 单组件生命周期

- 父子组件生命周期

## Vue 组件如何通讯

- 父子组件 props 和 this.\$emit

- 自定义事件 event.$on event.$off event.\$emit

- vuex

## 双向数据绑定 v-model 的原理

- input 元素的 value = this.name

- 绑定 input 事件 this.name = \$event.target.value

- data 更新触发 render

## computed 有什么特点

- 缓存，data 不变不会重新计算

- 提高性能

## ajax 请求要放在哪个生命周期

- mounted

- js 是单线程的，ajax 是异步获取的

- 放在 mounted 之前没有用，会让逻辑更加混乱

## 如何将组件的所有 props 传递给子组件

- ￥ props

- <User v-bind="$props" />

## 如何实现 v-model

```js
  <body>
    <div id="app">
      <p>{{msg}}</p>
      <a-input v-model="msg"></a-input>
    </div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>

  const AInput = Vue.component(`a-input`, {
    template: `
      <input
        type="text"
        :value="value"
        @input="updateInput">
    `,
    props: {
      value: String,
      defaultValue: string
    },
    methods: {
      updateInput (e) {
        this.$emit('input', e.target.value)
      }
    }
  })
  let vm = new Vue({
    el: '#app',
    data () {
      return {
        msg: 'hello'
      }
    },
    components: {
      AInput
    },

    methods: {
      onChange (val) {
        console.log(val)
      }
    }
  })
  console.log(vm)
  </script>
```

## 何时使用异步加载组件

- 加载大组件

- 路由异步加载

## 何时使用 keep-alive

- 缓存组件，不需要重复渲染

- 多个静态的 tab 页的切换

- 优化性能

## vue-router 常用的路由模式

- hash 默认

如：http://abc.com/#/user/1

- h5 history

没有 `#` 号

- 两者的区别
