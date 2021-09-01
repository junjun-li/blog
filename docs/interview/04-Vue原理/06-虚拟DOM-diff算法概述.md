# 虚拟 DOM - diff 算法概述

- diff 算法是 vdom 中最核心、最关键的部分

- diff 算法能在日常使用 Vue React 中提现出来(如 key)

- diff 算法是前端的热门话题

## 概述

- diff 即对比，是一个广泛的概念，如 git diff、linux diff 命令等

- 两个 js 对象也可以做 diff，`jiff`这个库就是专门对比两个对象有和差异的

- 两棵树做 diff，如这里的 vdom diff

[![f4OHWn.png](https://z3.ax1x.com/2021/08/17/f4OHWn.png)](https://imgtu.com/i/f4OHWn)

## 树 diff 的时间复杂度 O(n^3)

- 第一，遍历 tree1；第二，遍历 tree2

- 第三，排序

- 1000 个节点，要计算 1 亿次，算法不可用

## 优化时间复杂度 O(n)

- 只比较同一层级，不跨级比较

[![f4Xj1I.png](https://z3.ax1x.com/2021/08/17/f4Xj1I.png)](https://imgtu.com/i/f4Xj1I)

- tag 不同，则直接删掉重建，不再深度比较

[![f4jA9s.png](https://z3.ax1x.com/2021/08/17/f4jA9s.png)](https://imgtu.com/i/f4jA9s)

- tag 和 key，两者都相同，则认为是相同的节点，不再深度比较
