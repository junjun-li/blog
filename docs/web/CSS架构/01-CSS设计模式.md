# CSS 设计模式

## OOCSS

`OO`指的是面向对象

```html
<style>
  .menu {
    color: green;
    font-size: 14px;
  }
  /* 不修改原有的对象，新增对象，就叫 OOCSS */
  .fix {
    color: red;
    font-size: 14px;
  }
</style>
<div class="menu fix"></div>
<div class="menu"></div>
<div class="menu"></div>
```

- 原则一：容器与内容分离

- 原则二：结构（基础对象）与皮肤分离

## BEM

块（Block）、元素（ELement__）、修饰符（Modifier--）