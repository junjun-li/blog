# update

Vue的`_update`是一个私有方法，在`首次渲染`和`数据更新`的时候调用

```js
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  // ...
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  // ...
}
```

其核心就是调用`vm.__patch__`方法

```js
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

在服务端渲染中，没有DOM，`noop`是一个空函数；在浏览器中，指向了`patch`这个方法

```js
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
```