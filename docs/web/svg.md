# svg

svg 是一种基于 XML 的图像文件格式, 它的英文全称为 Scalable Vector Graphics, 医师为可缩放的矢量图形

## svg 案例-入门

::: details

```html
<!DOCTYPE html>
<header>
  <style>
    /* * {
      margin: 0;
      padding: 0
    } */
  </style>
</header>
<html lang="en">
  <body>
    <!--创建一个800*800的svg画布-->
    <svg height="800" width="800">
      <!-- 使用rect绘制矩形的svg图形 -->
      <rect width="50" height="50" style="fill: red"></rect>
      <!-- 
        绘制规则
        1. 先绘制x1 => x2的线段
        2. 在绘制y1 => y2的线段
       -->
      <line
        x1="100"
        y1="100"
        x2="250"
        y2="75"
        stroke="blue"
        stroke-width="10"
      />
      <line x1="100" x2="250" stroke="green" stroke-width="10" />
      <line
        x1="500"
        x2="750"
        y1="300"
        y2="400"
        stroke="red"
        stroke-width="10"
      />

      <!-- 
        使用 circle 来绘制圆形
        cx 圆心的位置
        r 圆的半径
        stroke 圆的半径
        stroke-width 圆的边框大小
       -->
      <circle
        cx="200"
        cy="200"
        r="50"
        stroke="green"
        stroke-width="2"
        fill="red"
      />
    </svg>
  </body>
</html>
```

:::

## SVG 进阶

为了实现 svg 的图标自适应, 出现了两个概念 `viewport`和`viewBox`

- viewport 是 svg 图像可见的区域(视口的概念), 就是 svg 标签中的 width 和 height 属性

> 离开可视区(viewport)的内容, 不会被 svg 标签渲染

- viewBox 是用于画布上绘制 svg 图形的坐标系统

> 如果不指定 viewBox, viewBox 和视口宽高一致(viewport)

```html
<!-- 
  width / viewBox的宽度 = 10
  内部的rect放大十倍
-->
<svg
  width="500"
  height="200"
  viewBox="0 0 50 20"
  style="border: 1px solid #000000"
>
  <rect
    x="20"
    y="10"
    width="10"
    height="5"
    style="stroke: #000000; fill:none;"
  />
</svg>
```

上述案例中, 如果不写 viewBox 的话, 如果想保持一致的效果,就需要将内部元素所有乘 10

```html
<svg
  width="500"
  height="200"
  style="border: 1px solid #000000"
>
  <rect
    x="200"
    y="100"
    width="100"
    height="50"
    stroke-width="10"
    style="stroke: #000000; fill:none;"
  />
</svg>
```

## 深入剖析 svg 的 preserveAspectRatio

为了方便我们根据父盒子适配svg,我们引入`preserveAspectRatio`(保持长宽比)的概念

svg 实际绘图的时候,会根据 viewBox 的尺寸来进行绘制,如果 viewBox 和 viewport 的尺寸或者比例不一致的时候,需要指定一下绘图策略

preserveAspectRatio 相当于在 viewport 内部绘制了一个虚拟内框

它的默认值是`xMidYMid meet`

```html
<svg
  width="500"
  height="200"
  viewBox="0 0 200 200"
  style="border: 1px solid #000000"
  preserveAspectRatio="xMidYMid meet"
>
  <rect
    x="100"
    y="100"
    width="100"
    height="50"
    stroke-width="10"
    style="stroke: #000000; fill:none;"
  />
</svg>
<!-- 
  500 / 200 = 2.5
  200 / 200 = 1 (svg将采用较小的作为最终压缩比, 见下图)
  然后内部的rect元素 x,y,width,height,stroke-width各乘以1, 然后如下图所示绘制
 -->
```

上述配置的原理如下图:
![d0VDbt.png](https://s1.ax1x.com/2020/08/23/d0VDbt.png)

preserveAspectRatio 第二个参数如下:

- meet: 固定宽高比并将 viewBox 缩放为适合 viewport 的大小

  > meet 模式下,svg 将优先采纳较小的作为最终压缩比,meet 是默认参数(见上图)

preserveAspectRatio 第一个参数决定 viewBox 在 viewPort 中的位置

- Min, Mid, Max 分别表示最左方, 中间, 最右边
  > 如果视口宽高和 viewBox

如果改成 xMax viewBox 将往最右边移动
由于 viewBox 和 height 的比值为 1 比 1 所以 viewBox 的 y 轴位置不变

```html
<svg
  width="500"
  height="200"
  viewBox="0 0 200 200"
  style="border: 1px solid #000000"
  preserveAspectRatio="xMaxYMin meet"
>
  <rect
    x="100"
    y="100"
    width="100"
    height="50"
    stroke-width="10"
    style="stroke: #000000; fill:none;"
  />
</svg>
```

上述配置原理如下图:
[![d0MfYt.png](https://s1.ax1x.com/2020/08/23/d0MfYt.png)](https://imgchr.com/i/d0MfYt)

preserveAspectRatio 第二个参数`slice`

- slice: 保持宽高比并将所有不在 viewport 中的 viewBox 裁减掉(slice 模式下，svg 将优先采纳压缩比较大的作为最终压缩比)

```html
<!-- 
  500 / 200 = 2.5 (slice 模式下，svg 将优先采纳压缩比较大的作为最终压缩比)
  200 / 200 = 1
  所以viewBox讲变为 0 0 200*2.5 200*2.5
  因为设置了yMax,所以viewBox会跑到最上方 (yMax表示viewPort最大的值和ViewBox最大的值进行重叠)
  然后内部的rect,压缩比全部乘以2.5
 -->
<svg
  width="500"
  height="200"
  viewBox="0 0 200 200"
  style="border: 1px solid #000000"
  preserveAspectRatio="xMidYMax slice"
>
  <rect
    x="100"
    y="100"
    width="100"
    height="50"
    stroke-width="10"
    style="stroke: #000000; fill:none;"
  />
</svg>
```

[![d01jfI.png](https://s1.ax1x.com/2020/08/23/d01jfI.png)](https://imgchr.com/i/d01jfI)

> 上图设置了 xMidYMax slice

> slice 模式下, 会保证宽高比, 但是 svg 采用压缩比较大的最为最终压缩比

> 因为设置了 yMax,所以 viewBox 会跑到最上方 (yMax 表示 viewPort 最大的值和 ViewBox 最大的值进行重叠)

> 又因为使用了 slice 模式, 所以超出的 viewBox 会被切割隐藏

```html
<!-- 
  YMid: (yMax 表示 viewPort 中间值和 ViewBox 中间值进行重叠)

 -->
<svg
  width="500"
  height="200"
  viewBox="0 0 200 200"
  style="border: 1px solid #000000"
  preserveAspectRatio="xMaxYMid slice"
>
  <rect
    x="100"
    y="100"
    width="100"
    height="50"
    stroke-width="10"
    style="stroke: #000000; fill:none;"
  />
</svg>
```

上诉代码原理如下图:

[![d0JkAe.png](https://s1.ax1x.com/2020/08/23/d0JkAe.png)](https://imgchr.com/i/d0JkAe)

- none 属性, 分别计算viewBox的宽高比 一一对应的计算 画出来的图形会变形

示例代码以及注释详解

```html
  <!--  stroke-width线的粗细  -->
  <!--
    currentColor: 继承父盒子的color颜色
  -->
  <div>
    <svg height="200"
         style="border: 1px solid #000000"
         viewBox="0 0 50 20"
         width="500">
      <rect height="5"
            style="stroke: #000000; fill:none;"
            width="10"
            x="20"
            y="10"/>
    </svg>
    <svg height="200"
         style="border: 1px solid #000000"
         width="500">
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="200"
            y="100"/>
    </svg>
    <!--
      来看看第二个参数 slice 如果设置了 将采用较大的压缩比
      1. 500 / 200 = 2.5
         200 / 200 = 1
      2. viewBox 各乘以2.5 viewBox = 500 * 500
      3. 根据YMax,view的Y轴的最大将和viewport的Y轴最大重合
      4. 再根据viewBox的位置,把rect绘制出来
         内部的rect每一个属性都要乘以2.5, 最终会绘制出一个250*125的矩形
         width="100 * 2.5"
         height="50 * 2.5"
         x="100 * 2.5" 距离viewBox X轴的 250位置绘制
         y="100 * 2.5" 距离viewBox Y轴的 250位置绘制
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMax slice"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="0"
            y1="0"
            y2="200"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="200"
            y1="200"
            y2="200"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="200"
            x2="200"
            y1="0"
            y2="200"></line>
      <rect height="50"
            style="stroke: #000000; fill:none;stroke-width:1"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <!--
      示例代码原理
      1. viewBox的宽高是200*200
      2. 缩放比例 因为是meet模式,所以使用1为缩放比例
        500 / 200 = 2.5
        200 / 200 = 1
      3. 内部的所有元素 根据viewBox的位置,乘以缩放比例1显示
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMid meet"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <line style="stroke:blue;stroke-width:20"
            x1="0"
            x2="250"></line>
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <!--
      现在反过来看看 可以试着修改 YMin YMid YMax 查看变化
      1. viewBox的宽高是 500*100, 先确定viewBox的位置,大小
      2. 缩放比例 因为是meet模式,取小的缩放比例 1
        500 / 500 = 1
        200 / 100 = 2
      3. 内部所有的元素,先定好viewBox的距离,乘以缩放比例1
    -->
    <svg height="200"
         preserveAspectRatio="xMidYMin meet"
         style="border: 1px solid #000000"
         viewBox="0 0 500 100"
         width="500">
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="0"
            y1="0"
            y2="100"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="0"
            x2="500"
            y1="100"
            y2="100"></line>
      <line style="stroke:blue;stroke-width:1"
            x1="500"
            x2="500"
            y1="0"
            y2="100"></line>
      <rect height="50"
            stroke-width="1"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
    <svg height="200"
         preserveAspectRatio="none"
         style="border: 1px solid #000000"
         viewBox="0 0 200 200"
         width="500">
      <rect height="50"
            stroke-width="10"
            style="stroke: #000000; fill:none;"
            width="100"
            x="100"
            y="100"/>
    </svg>
  </div>
```

## svg 组件库