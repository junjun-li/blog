# 深入 diff 算法源码

## 生成 vnode

- h 函数，生成并返回了一个 js 模拟的 DOM 结构

- Vue3 中也有 h 函数，作用类似

[![fIhHtP.png](https://z3.ax1x.com/2021/08/18/fIhHtP.png)](https://imgtu.com/i/fIhHtP)

## patch函数

- 比较旧节点和新节点的差距

- 相同的vnode进行比较，如果不同直接销毁dom重建

[![fI4RNq.png](https://z3.ax1x.com/2021/08/18/fI4RNq.png)](https://imgtu.com/i/fI4RNq)

## pathVnode函数

## updateChildren函数