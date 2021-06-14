# 虚拟 DOM（Virtual DOM）

- vdom 是实现 Vue 和 React 的重要基石

- diff 算法是 vdom 中最核心最关键的部分

- vdom 是一个热门话题，也是面试中的热门问题

## vdom 背景

- DOM 操作非常消耗性能

- 以前 jQuery，可以自行控制 DOM 操作时机，那时候会问如何优化 DOM 操作？

- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作

## 解决方案 - vdom

- 有了一定复杂度，想减少计算次数比较难

- 能不能把计算，更多转化为 js 计算，因为 js 执行速度很快

- vdom - 用 js 模拟 DOM 结构，计算最小的变更，操作 DOM

## 用 js 模拟 DOM 结构

[![2Wewy4.png](https://z3.ax1x.com/2021/06/11/2Wewy4.png)](https://imgtu.com/i/2Wewy4)

## 通过 snabbdom 学习 vdom

- 简洁强大的 vdom 库，易学易用

- Vue 参考它实现的 vdom 和 diff

- https://github.com/snabbdom/snabbdom

- vue3.0 重写了 vdom，优化了性能，和 snabbdom 有所区别

- 但是 vdom 的基本理念不变
