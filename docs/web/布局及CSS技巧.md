# 布局及 CSS 技巧

## 巧用 padding-bottom: 100% 使盒子有高

```html
<style>
  * {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .remd_songs {
    width: 300px;
    background: pink;
  }

  .remd_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .remd_li {
    width: 30%;
    border: 1px solid;
  }

  .remd_img {
    padding-bottom: 100%;
    position: relative;
  }
  .remd_img img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
</style>
<div id="app" class="remd_songs">
  <ul class="remd_ul">
    <li class="remd_li" v-for="item in 9">
      <div class="remd_img">
        <!--
          这个盒子的高度, 需要一张图片撑开
          但是如果图片加载不出来(网慢), 盒子就会没有高度, 导致整体样式崩塌
          在父盒子添加padding-bottom: 100%;
        -->
        <img src="./img.jpg" />
      </div>
      <div class="remd_text">推荐{{item}}</div>
    </li>
  </ul>
</div>
```
