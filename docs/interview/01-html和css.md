# html和css

## rem

- px, 绝对长度单位, 最常用

- em, 相对长度单位, 相对于父元素, 不常用

- rem, 相对长度单位, 相对于根元素, 常用于响应式布局

```html
<!-- rem是基于html的font-size进行设置的 -->
<style>
html {
  font-size: 100px;
}
div {
  /* 相当于10px */
  font-size: 0.1rem; 
}
p {
  /* 相当于16px */
  font-size: 0.16rem;
}
</style>
```

## vw, vh

- window.screen.height // 屏幕高度

- window.innerHeight // 网页视口高度

- document.body.clientHeight // body的高度

## 如何理解html语义化

- 让人更容易读懂(增加代码可读性)

- 让搜索引擎更容易读懂(SEO)

## BFC

- 一块独立渲染的区域, 内部元素的渲染不会影响边界以外的元素