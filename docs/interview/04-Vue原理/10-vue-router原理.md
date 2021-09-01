# vue-router 原理

## 如何用 JS 实现 hash 路由


```html
<body>
  <h2>hash demo</h2>
  <button id="btn">修改 hash</button>
</body>
</html>
<script>
// hash变化, 包括:
// 1. JS 修改 url
// 2. 手动修改 url 的 hash
// 3. 浏览器的前进和后退

// 核心api
window.onhashchange = (e) => {
  console.log('old url: ', e.oldURL)
  console.log('new url: ', e.newURL)

  console.log('current url: ', location.hash)
}

// 页面初次加载，获取 hash
document.addEventListener('DOMContentLoaded', () => {
  console.log('hash:', location.hash)
})

document.getElementById('btn').addEventListener('click', () => {
  location.href = '#/user'
})
</script>
```

## 如何用 JS 实现 H5 history 路由
