# Vue3知乎项目

## 安装bootstapr

使用`@next`可以安装alpha版本的代码

```shell
npm install bootstrap@next
```

## css选择器及禁用子元素所有事件

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

## scoped注意事项

> 在如下组件中, 不能加入scroped
> 因为`.dropdown-option.is-disabled *`这个样式, 要用于传入的slot内部, 如果加了scroped那么这个样式将只在这个组件内部使用, slot传入的不会使用

```vue
<template>
  <li :class="{'is-disabled': disabled}"
      class="dropdown-option">
    <slot/>
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

## vue3中获取dom节点

在vue3中, 获取一个dom节点比vue2更加简单明了

```vue
<template>
  <div ref="testRef">
  </div>
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

## contains判断一个元素是否是另一个元素的子节点

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

## 数组的every

> every方法用于测试一个数组中所有元素是否满足条件, 返回布尔值

```js
const array = [1, 30, 39, 29, 10, 13];

console.log(array1.every((currentValue) => currentValue < 40));
// expected output: true
```

## 自定义组件中的v-model

在vue2中组件的v-model, 有很多缺陷, 例如, 新手很容易搞混input和change需要用哪一个, 再比如, 只允许绑定一个v-mode

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
      updateInput (e) {
        this.$emit('input', e.target.value)
      }
    }
  })
  // 针对这种非同寻常的组件, vue2提供了另一种解决方案
  let BaseComponent = Vue.component('my-component', {
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
      updateInput (e) {
        this.$emit('change', e.target.checked)
      }
    }
  })
  let vm = new Vue({
    el: '#app',
    data () {
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

但是在vue3中, 解决了上诉的问题

```
1.直接在子组件定义一个props `modelValue: String`,
2.子组件通过 context.emit('update:modelValue', targetValue) 这个方法向父组件的v-model传参
```

直接上代码

- APP.vue

```vue
<template>
  <div class="app">
    <my-component v-model="myVal"/>
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
  setup () {
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
    <input :value="val"
           type="text"
           @input="updateVal">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  props: {
    modelValue: String
  },
  setup (props, context) {
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



## vue非Prop的Attribute的原理及$attrsd的用法 

禁止组件根元素继承 attribute

[vue非 Prop 的 Attribute](https://cn.vuejs.org/v2/guide/components-props.html#%E7%A6%81%E7%94%A8-Attribute-%E7%BB%A7%E6%89%BF)

如果在一个组件中, 使用props中没有定义的属性, 这个属性会挂载到根节点上面

```vue
<template>
<ValidateInput v-model="emailVal"
                :rules="emailRules"
                placeholder="haha" type="text">
</ValidateInput>
</template>
```

在子组件 在标签上面增加 v-bind="$attrs" 则父组件传递过来的, props没有匹配到的属性就会挂载到上面去

```vue
<template>
  <div class="validate-input-container">
    <input v-bind="$attrs">
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, reactive } from 'vue'
export default defineComponent({
  // 如果你不希望组件的根元素继承 attribute，你可以在组件的选项中设置 如下属性
  inheritAttrs: false,
})
</script>
```