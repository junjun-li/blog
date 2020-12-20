# vue3+tsx 打造组件

## Vue3中要使用 PropType 给Props定义类型

```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Config {
  name: string;
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String as PropType<string>
    },
    config: {
      type: Object as PropType<Config>,
      required: true
    }
  },
  mounted () {
    console.log(this.config.name)
  }
})
</script>
```

## 如何提取props(bug)

```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue'

const propsType = {
  age: Number,
  name: {
    required: true,
    type: String
  }
} // as const
// 增加一个 as const 就可以解决以下问题

export default defineComponent({
  name: 'HelloWorld',
  props: propsType,
  mounted () {
    console.log(this.age)
    console.log(this.name)
  }
})
</script>
```
> 但是这样提取会有一个问题, 如下图所示, 就算name属性增加了required, name还可能会是一个undefined

[![D4Ya26.png](https://s3.ax1x.com/2020/12/02/D4Ya26.png)](https://imgchr.com/i/D4Ya26)

解决办法: 增加`as const`

[![D4Y2Gt.png](https://s3.ax1x.com/2020/12/02/D4Y2Gt.png)](https://imgchr.com/i/D4Y2Gt)

就是说, vue团队, 在这个声明的地方, 告诉ts, PropsOptions是一个Readonly属性, 是一个只读的
然后ts会把这个{ required: true }, 把这个属性 认为是一个必须的
[![D4tVsO.png](https://s3.ax1x.com/2020/12/02/D4tVsO.png)](https://imgchr.com/i/D4tVsO)

## .vue文件运行的原理

> 先说结论, 写模板, 其实就是在写vue中 h 函数的调用 
>
> h函数只是createVNode的简单封装, 让我们开发者方便的调用

要理解.vue文件的编译原理, 我们需要知道vue中的h函数

[vue官网"h"函数](https://v3.vuejs.org/api/global-api.html#h)

```ts
import { createApp, h, defineComponen } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const img = require('./assets/logo.png') // eslint-disable-line
// h函数接收三个参数
//  1. type html标记名称
//  2. props 属性
//  3. children 子元素
const App = defineComponent({
  render () {
    return h('div', { id: 'app' }, [
      h('img', { alt: 'Vue logo', src: img }),
      h('h1', null, 'hello vue'),
      h(HelloWorld)
    ])
  }
})
createApp(App).mount('#app')
```

[github上h函数的源码](https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/h.ts)

h函数其实就是一个VNode的封装, 让我们开发者使用h函数的时候, 可以随意传入对象或者数组

```ts
// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}
```

## watchEffect

当响应式name的值变化的时候, 会触发这个函数, age变化的时候, 不会触发

```ts
const age = ref(20)
const name = ref('小明')
watchEffect(() => {
  console.log(name.value)
})
```