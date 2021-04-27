# 使用 PropType  给 Props 定义类型

```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Config {
  name: string
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      // String是一个类, 当做一个变量在使用, 并不是ts的定义
      // 加上了as之后, 变成ts的一种定义
      type: String as PropType<string>
    },
    config: {
      type: Object as PropType<Config>,
      required: true
    }
  },
  mounted() {
    console.log(this.config.name)
  }
})
</script>
```

## 如何提取 props(bug)

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
  mounted() {
    console.log(this.age)
    console.log(this.name)
  }
})
</script>
```

> 但是这样提取会有一个问题, 如下图所示, 就算 name 属性增加了 required, name 还可能会是一个 undefined

[![D4Ya26.png](https://s3.ax1x.com/2020/12/02/D4Ya26.png)](https://imgchr.com/i/D4Ya26)

解决办法: 增加`as const`

[![D4Y2Gt.png](https://s3.ax1x.com/2020/12/02/D4Y2Gt.png)](https://imgchr.com/i/D4Y2Gt)

就是说, vue 团队, 在这个声明的地方, 告诉 ts, PropsOptions 是一个 Readonly 属性, 是一个只读的
然后 ts 会把这个{ required: true }, 把这个属性 认为是一个必须的
[![D4tVsO.png](https://s3.ax1x.com/2020/12/02/D4tVsO.png)](https://imgchr.com/i/D4tVsO)
