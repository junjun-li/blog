# vue自定义组件

## 开发插件

[vue-开发插件](https://cn.vuejs.org/v2/guide/plugins.html#%E5%BC%80%E5%8F%91%E6%8F%92%E4%BB%B6)

```vue
<template>
  <div v-if="isShow">
    <div class="alert">
      <div class="flex">{{ msg }}</div>
      <div v-if="type === 'alert'">
        <div
          class="btnCommon success"
          @click="successAlert()">确定
        </div>
      </div>
      <div
        v-else
        class="space-round">
        <div
          class="btnCommon cancel"
          @click="cancelEvent()">取消
        </div>
        <div
          class="btnCommon success"
          @click="successEvent()">确定
        </div>
      </div>
    </div>
    <div
      class="mask"
      @click="closeMask()"></div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    // 规定是alert组件或者是confirm组件
    type: {
      type: String,
      default: 'alert'
    },
    success: {
      type: Function,
      default: () => {
        // console.log('点击了success')
      }
    },
    cancel: {
      type: Function,
      default: () => {
        // console.log('点击了cancel')
      }
    }
  },
  methods: {
    close () {
      // eslint-disable-next-line vue/no-mutating-props
      this.isShow = false
    },
    successAlert () {
      this.close()
      this.success()
    },
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    cancelEvent () {
      this.cancel()
      this.close()
    },
    successEvent () {
      this.success()
      this.close()
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);

.alert {
  width: 300px;
  height: 150px;
  position: fixed;
  background: #fff;
  border-radius: 6px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  z-index: 3000;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.flex {
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
}

.space-round {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}

.btnCommon {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  cursor: pointer;
  &.success {
    background: $btn-main;
    color: #fff;

    &:hover {
      background: $btn-dark;
    }
  }

  &.cancel {
    background: #ededed;
    color: #333;
  }
}

.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2000;
}
</style>

```

```js
import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = (Vue) => {
  // 把alert组件绑定到全局的vue实例上面去
  const AlertConstructor = Vue.extend(AlertComponent)
  // 实例化组件alert
  const instance = new AlertConstructor()
  // 绑定到一个div上面
  instance.$mount(document.createElement('div'))
  // 把这个组件动态的添加到上面去
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg, success) => {
    // 逻辑...
    instance.msg = msg
    instance.isShow = true
    instance.type = 'alert'
    if (typeof success !== 'undefined') {
      instance.success = success
    }
  }
  Vue.prototype.$confirm = (msg, success, cancel) => {
    // 逻辑...
    instance.msg = msg
    instance.isShow = true
    instance.type = 'confirm'
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert

```