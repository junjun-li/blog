# 初始 vue3: 新特性

[Vue3.0 官网](https://v3.vuejs.org/)

## Ref 语法

> 创建一个响应式的数据

[setup 方法](https://v3.vuejs.org/guide/composition-api-introduction.html#setup-component-option)

[ref 函数](https://v3.vuejs.org/guide/reactivity-fundamentals.html#creating-standalone-reactive-values-as-refs)

```vue
<template>
  <div>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <button @click="increase">+1</button>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })
    const increase = () => {
      count.value++
    }
    return {
      count,
      double,
      increase
    }
  }
}
</script>
```

## Reactive 函数

> 创建一个响应式的对象

[Reactive 函数](https://v3.vuejs.org/guide/reactivity-fundamentals.html#declaring-reactive-state)

```vue
<script lang="ts">
import { ref, computed, reactive, toRefs } from 'vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

export default {
  name: 'App',
  setup () {
    // 如果使用了ts, 这个data会出现一个类型错误
    // TS7022: 'data' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
    // 因为在computed的回调中, 使用data.count, 会造成一个类型推论的循环, 由于ts的局限性, vue3暂时无法解决该问题, 它会自动把data设置为any类型, 如果把double注释掉, 即可解决该问题
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++
      },
      double: computed(() => data.count * 2)
    })
    const refData = toRefs(data)
    return {
      ...refData
    }
  }
}
</script>

<style>
```

使用 ref 还是 reactive 可以选择这样的准则

- 第一，就像刚才的原生 javascript 的代码一样，像你平常写普通的 js 代码选择原始类型和对象类型一样来选择是使用 ref 还是 reactive。

- 第二，所有场景都使用 reactive，但是要记得使用 toRefs 保证 reactive 对象属性保持响应性。

## vue2 响应式的原理 vs vue3 响应式的原理

[vue2 中响应式注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)

在 vue2 中, 响应式的原理是通过 Object.defineProperty 来实现响应式, 但是对于数组和对象, vue2 中无法检测到 property 的添加或者移除

但到了 vue3, 这些苦恼都成为了过去式, vue3 采用了 es6 的语法`proxy`来实现响应式

[![BgDkoF.png](https://s1.ax1x.com/2020/11/04/BgDkoF.png)](https://imgchr.com/i/BgDkoF)

## Vue3 生命周期

[![BgrtNF.png](https://s1.ax1x.com/2020/11/04/BgrtNF.png)](https://imgchr.com/i/BgrtNF)

```vue
<script lang="ts">
import { onRenderTracked, onUpdated } from 'vue'
export default {
  setup() {
    onUpdated(() => {
      console.log('数据更新了')
    })
    // 数据发生变更后, 输出变更的值和变更的对象
    onRenderTracked(e => {
      console.log(e)
    })
  }
}
</script>
```

## watch

直接上代码

```js
// watch 简单应用
watch(data, () => {
  document.title = 'updated ' + data.count
})
// watch 的两个参数，代表新的值和旧的值
watch(refData.count, (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated ' + data.count
})

// watch 多个值，newValue 多个值的数组
watch([greetings, data], (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated' + greetings.value + data.count
})

// 使用 getter 的写法 watch reactive 对象中的一项
// 如果要监听对象, 需要 () => data.count 这样子写
watch([greetings, () => data.count], (newValue, oldValue) => {
  console.log('old', oldValue)
  console.log('new', newValue)
  document.title = 'updated' + greetings.value + data.count
})
```

## hooks

使用 hooks 轻松的复用一段逻辑

- 例如: 一段鼠标点击, 获取鼠标点击位置的代码, 使用 hooks 轻松复用

```vue
<template>
  <div>
    <h1>{{ x }}</h1>
    <h1>{{ y }}</h1>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import useMousePosition from '@/hooks/useMousePosition'

export default {
  name: 'App',
  setup() {
    const { x, y } = useMousePosition()
    return {
      x,
      y
    }
  }
}
</script>
```

```js
import { onMounted, onUnmounted, ref } from 'vue'

export default function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })
  return {
    x,
    y
  }
}
```

- 在体会一波, hooks 的妙用

  例: 封装 axios 请求

```vue
<template>
  <div>
    <h1 v-if="loading">loading中</h1>
    <img v-if="loaded" :src="result.message" />
  </div>
</template>

<script lang="ts">
import useURLLoader from '@/hooks/useURLLoader'
export default {
  name: 'App',
  setup() {
    const { result, loaded, loading } = useURLLoader(
      'https://dog.ceo/api/breeds/image/random'
    )
    return {
      result,
      loaded,
      loading
    }
  }
}
</script>
```

```js
import { ref } from 'vue'
import axios from 'axios'

export default function useURLLoader(url: string) {
  const result = ref(null)
  const loading = ref(true) // 加载中
  const loaded = ref(false) // 已加载
  const error = ref(null)
  axios
    .get(url)
    .then(res => {
      loading.value = false
      loaded.value = true
      result.value = res.data
    })
    .catch(e => {
      error.value = e
      loading.value = false
    })
  return {
    result,
    loading,
    loaded,
    error
  }
}
```

## Teleport组件

> vue3 新添加了一个默认的组件就叫 Teleport，我们可以拿过来直接使用，它上面有一个 to 的属性，它接受一个css query selector 作为参数，这就是代表要把这个组件渲染到哪个 dom 元素中

[Teleport文档地址](https://v3.vuejs.org/guide/teleport.html)


```vue
<template>
  <!--这个组件将要挂载在id为modal的节点上面, 可以在public/index.html上面定义这个id为modal的盒子-->
  <teleport to="#modal">
    <div v-if="isOpen"
         id="center">
      <h2>
        <slot>this is a modal</slot>
      </h2>
      <button @click="buttonClick">close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    isOpen: Boolean
  },
  // 可以验证传递给父亲的参数是否正确
  // 更加明确的显示传递给父组件的自定义事件有哪些
  emits: {
    // 'close-modal': (payload: string) => {
    //   return payload.type === 'close'
    // }
    'close-modal': null
  },
  setup(props, context) {
    const buttonClick = () => {
      // context.emit('close-modal', {
      //   type: 'close'
      // })
      context.emit('close-modal')
    }
    return {
      buttonClick
    }
  }
})
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>

```

```vue
<template>
  <div>
    <button @click="openModal">openModal</button>
    <h1>App</h1>
    <Modal :is-open="modalIsOpen"
           @close-modal="closeModal"></Modal>
  </div>
</template>

<script lang="ts">
import Modal from '@/components/Modal.vue'
import { ref } from 'vue'

export default {
  components: {
    Modal
  },
  setup() {
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const closeModal = () => {
      modalIsOpen.value = false
    }
    return {
      modalIsOpen,
      openModal,
      closeModal
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```


## suspense异步组件

> 可以显示一个加载之前和加载结果的组件

直接看🌰

先定义一个异步组件, 这个组件需要返回promise

```vue
<template>
  <div>{{ msg }}</div>
</template>

<script type="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AsyncShow',
  setup() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          code: 200,
          msg: 'result is success'
        })
      }, 3000)
    })
  }
})
</script>
```

在app中使用 suspense 组件可以传入两个插槽

default显示加载之后的组件, fallback显示加载之前的组件

```vue
<template>
  <div>
    <suspense>
      <template #default>
        <AsyncShow />
      </template>
      <template #fallback>
        Loading...!
      </template>
    </suspense>
  </div>
</template>
```