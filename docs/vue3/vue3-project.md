# Vue3 知乎项目

## 安装 bootstapr

使用`@next`可以安装 alpha 版本的代码

```shell
npm install bootstrap@next
```

## css 选择器及禁用子元素所有事件

```css
/*  
*选中所有子元素
pointer-events: none; 禁用子元素所有事件
 */
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
```

## scoped 注意事项

> 在如下组件中, 不能加入 scroped
> 因为`.dropdown-option.is-disabled *`这个样式, 要用于传入的 slot 内部, 如果加了 scroped 那么这个样式将只在这个组件内部使用, slot 传入的不会使用

```vue
<template>
  <li :class="{ 'is-disabled': disabled }" class="dropdown-option">
    <slot />
  </li>
</template>

<script type="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
```

## vue3 中获取 dom 节点

在 vue3 中, 获取一个 dom 节点比 vue2 更加简单明了

```vue
<template>
  <div ref="testRef"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    // 使用泛型定义dom节点, null类型或者html类型
    const dropdownRef = ref<null | HTMLElement>(null)
    onMounted(() => {
      // dropdownRef.value拿到的直接就是dom节点
      console.log(dropdownRef.value)
    })
  }
})
</script>
```

## contains 判断一个元素是否是另一个元素的子节点

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

## 数组的 every

> every 方法用于测试一个数组中所有元素是否满足条件, 返回布尔值

```js
const array = [1, 30, 39, 29, 10, 13]

console.log(array1.every(currentValue => currentValue < 40))
// expected output: true
```

## 自定义组件中的 v-model

在 vue2 中组件的 v-model, 有很多缺陷, 例如, 新手很容易搞混 input 和 change 需要用哪一个, 再比如, 只允许绑定一个 v-mode

```html
<body>
  <div id="app">
    <p>{{ val }}</p>
    <h1>{{ checked }}</h1>
    <my-component v-model="val"></my-component>
    <base-component v-model="checked"></base-component>
  </div>
</body>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
<script>
  let MyComponent = Vue.component('my-component', {
    template: `
      <input type="text"
             :value="value"
             @input="updateInput">
    `,
    props: {
      value: String
    },
    methods: {
      updateInput(e) {
        this.$emit('input', e.target.value)
      }
    }
  })
  // 针对这种非同寻常的组件, vue2提供了另一种解决方案
  let BaseComponent = Vue.component('base-component', {
    template: `
      <input type="checkbox"
             :checked="checked"
             @change="updateInput">
    `,
    props: {
      checked: Boolean
    },
    // 添加一个model字段
    model: {
      prop: 'checked', // 代表了需要绑定的属性
      event: 'change' // 代表了需要触发事件的名称
    },
    methods: {
      updateInput(e) {
        this.$emit('change', e.target.checked)
      }
    }
  })
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        checked: false,
        val: ''
      }
    },
    components: {
      MyComponent,
      BaseComponent
    }
  })

  console.log(vm)
</script>
```

但是在 vue3 中, 解决了上诉的问题

[vue 文档, 在 components 中使用 v-model](https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components)

```
1.直接在子组件定义一个props `modelValue: String`,
2.子组件通过 context.emit('update:modelValue', targetValue) 这个方法向父组件的v-model传参
```

直接上代码

- APP.vue

```vue
<template>
  <div class="app">
    <my-component v-model="myVal" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import MyComponent from '@/components/MyComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    MyComponent
  },
  setup() {
    const myVal = ref('')
    return {
      myVal
    }
  }
})
</script>
```

- my-component.vue

```vue
<template>
  <div class="my-component">
    <input :value="val" type="text" @input="updateVal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  props: {
    modelValue: String
  },
  setup(props, context) {
    const val = ref<undefined | string>(undefined)
    const updateVal = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      val.value = targetValue
      context.emit('update:modelValue', targetValue)
    }
    return {
      val,
      updateVal
    }
  }
})
</script>
```

### 使用计算属性的方式来改写他

> 计算属性可以省去我们对 input 的绑定的事件

- demo.vue

```vue
<template>
  <div class="demo">
    <!--@input="$emit('update:modelValue', $event.target.value)"-->
    <!--@input="updateInput"-->
    <!--
    <input
      :model-value="modelValue"
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    -->
    <!--省去给input注册事件-->
    <input type="text" v-model="value" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'demo',
  props: ['modelValue'],
  setup(props, context) {
    // vue3中的写法, 骚操作啊
    const value = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    })
    const updateInput = e => {
      console.log(e)
    }
    return {
      updateInput,
      value
    }
  }
})
</script>
```

## vue 非 Prop 的 Attribute 的原理及 inheritAttrs,$attrsd 的用法

禁止组件根元素继承 attribute

[vue 非 Prop 的 Attribute](https://cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8-Attribute-%E7%BB%A7%E6%89%BF)

如果在一个组件中, 使用 props 中没有定义的属性, 这个属性会挂载到根节点上面

```vue
<template>
  <ValidateInput
    v-model="emailVal"
    :rules="emailRules"
    placeholder="haha"
    type="text"
  >
  </ValidateInput>
</template>
```

在子组件 在标签上面增加 v-bind="$attrs" 则父组件传递过来的, props 没有匹配到的属性就会挂载到上面去

```vue
<template>
  <div class="validate-input-container">
    <input v-bind="$attrs" />
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, reactive } from 'vue'
export default defineComponent({
  // 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 如下属性
  inheritAttrs: false
})
</script>
```

## URL 的介绍

[URL strings and URL objects](https://nodejs.org/api/url.html)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
(All spaces in the "" line should be ignored. They are purely for formatting.)
```

## vue3 中, 集成 vue-router

### 注册路由

```ts
import { createApp } from 'vue'
import App from './App.vue'
// 1. 引入vue-router的方法
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ColumnList from '@/components/ColumnList.vue'

const routerHistory = createWebHistory()
// 2. 创建路由
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

const app = createApp(App)
// 3. 挂载,使用路由
app.use(router)
app.mount('#app')
```

### 组件中拿到路由对象

1. 从 vue-router 中导入 useRoute
2. 调用 useRoute 即可拿到当前路由对象, 获取 params 或者 query 的值

```vue
<template>
  <div class="test">
    <pre>{{ route }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = ref(useRoute())
    console.log(route.value)
    console.log(route.value.params)
    return {
      route
    }
  }
})
</script>
```

### 使用 router.push 等各种方法

1. 从 vue-router 中导入`useRouter`
   > 注意: useRoute 和 useRouter 的区别, 前者是获取路由的各种信息, 后者是可以调用路由的各种方法
2. 调用 useRouter 函数
3. 直接和 vue2 使用即可

```vue
<script lang="ts">
import {} from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Test',
  setup() {
    const router = useRouter()
    const goToLogin = () => {
      router.push('login')
    }
    return {
      goToLogin
    }
  }
})
</script>
```

## vue3 中, 集成 vuex

```vue
<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Test',
  setup() {
    const store = useStore()
    const list = computed(() => store.state.test)
    return {
      list
    }
  }
})
</script>
```

## CSS object-fit 的介绍

[MDN-`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

> object-fit CSS 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。

## Array.reduce()

[MDN-`reduce`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

> reduce 方法对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行, 将其结果汇总为单个返回值)
> 说人话就是, 把数组中的每一项相加, 返回总和

```js
// reducer 函数接收4个参数:
// callback
//   Accumulator (acc) (累计器)
//   Current Value (cur) (当前值)
//   Current Index (idx) (当前索引)
//   Source Array (src) (源数组)
// initialValue 初始值 如果有这个参数, 先计算初始值, 在计算传入的数组
const array1 = [1, 2, 3, 4, 'a']
const array2 = [1, 2, 3, 4, [1, 2, 3]]
const array3 = [1, 2, 3, 4, { name: '小明', age: 20 }]
const reducer = (accumulator, currentValue) => accumulator + currentValue

console.log(array1.reduce(reducer, 10)) // '10a', 先算 1-4的和, 因为最后一个是字符串, 所以字符串拼接, 返回 '10a'
console.log(array2.reduce(reducer)) // "101,2,3" 先算 1-4的和, 再把最后的数组拆出来, 拼接字符串
console.log(array3.reduce(reducer)) // "10[object Object]"
```

## Ts 泛型的妙用

把一个数组, 打平, 转换成为对象

```ts
interface TestProps {
  _id: string;
  name: string;
}

const testData1: TestProps[] = [
  { _id: '1', name: '小明' },
  { _id: '2', name: '小红' }
]
// 需求: 数组转换成为如下对象

const attToObj = <T extends {_id?: string}> (arr: Array<T>) => {
  return arr.reduce((accumulator, current) => {
    if (current._id) {
      accumulator[current._id] = current
    }
    return accumulator
  }, {} as { [key: string]: T })
}
const result = attToObj(testData1)

console.log(result)

const testData2: { [key: string]: TestProps } = {
  1: { _id: '1', name: '小明' },
  2: { _id: '2', name: '小红' }
}
```