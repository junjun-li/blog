# JS

## yarn 的使用

- 初始化一个新项目

```yarn
yarn init

yarn init -y // 使用默认配置
```

- 添加依赖包

```yarn
yarn add 包名 // 添加生产环境的依赖

yarn add 包名 -D // 添加开发环境的依赖
```

- 升级依赖包

```yarn
yarn upgrade 包名
```

- 移除依赖包

```yarn
yarn remove 包名
```

- 安装全部依赖

```yarn
yarn

yarn install
```

## Chicken Music

- encodeURIComponent()
  函数可把字符串作为 URI 组件进行编码。

```js
var uri = 'http://w3cschool.cc/my test.php?name=ståle&car=saab'
document.write(encodeURIComponent(uri))
// http%3A%2F%2Fw3cschool.cc%2Fmy%20test.php%3Fname%3Dst%C3%A5le%26car%3Dsaab
```
