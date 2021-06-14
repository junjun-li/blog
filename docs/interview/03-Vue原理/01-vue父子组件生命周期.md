# vue 父子组件生命周期

- 挂载阶段

- 更新阶段

- 销毁阶段

## created 和 mounted 的区别

- created 只是初始化了 vue 的实例

- mounted 是真正的 dom 渲染完了

## beforeDestroy 要做什么

- 解除绑定

- 删除定时器

- 删除自定义事件

## 生命周期（父子组件）

[![2W3HtH.png](https://z3.ax1x.com/2021/06/11/2W3HtH.png)](https://imgtu.com/i/2W3HtH)

```js
// 从外到内创建
// index created
// list created

// 从内到外渲染
// list mounted
// index mounted

// 更新操作
// index before update(父组件的数据修改)
// list before update(子组件的数据也修改)
// list updated(子组件先渲染完)
// index updated(父组件才能渲染完)


// beforeDestroy，destroyed在vue3中已废弃
// index beforeUnmount(父组件先卸载)
// list beforeUnmount(子组件在卸载)
// list unmounted(子组件卸载完了)
// index unmounted(父组件才卸载完了)
```