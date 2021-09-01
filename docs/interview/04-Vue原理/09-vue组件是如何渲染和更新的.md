# Vue 组件是如何渲染和更新的

## 初次渲染的过程

- 解析模板为 render 函数(在开发环境已完成，vue-loader)

- 触发响应式，监听 data 属性 getter setter

- 执行 render 函数，生成 vnode，最后 patch(elem, vnode)

## 更新过程

- 修改 data，触发 setter

- 重新执行 render 函数，生成新的 newVNode

- patch(vnode, newVNode)


## 流程图

[![hAlOqU.png](https://z3.ax1x.com/2021/08/24/hAlOqU.png)](https://imgtu.com/i/hAlOqU)
