# web 安全

## XSS 跨站请求攻击

- 一个博客网站，我发送一篇博客，其中嵌入`<script>`脚本

- 这个脚本用于获取网站的 cookie，然后发送到我自己的服务器

- 发布这篇博客，有人查看的话，我就可以轻松的获取`访问者`的 cookie

### 解决方法

- 替换特殊字符，如 `<` 变为 `&lt;`; `>` 变为 `&gt;`

- 这样 script 就会直接显示，不会作为脚本执行

- 前端显示，后端存储的时候，都需要更换

## XSRF 跨站请求伪造

场景：

- 在购物的时候，看中了商品，id 为 100

- 付费接口是 xxx.com/pay?id=100

- 我是攻击者，我看中了一个商品，id 是 200

- 我向你发送一封邮件，邮件正文隐藏着<img src=xxx.com/pay?id=200 />

- 你一查看邮件，就购买了 id200 的商品

### 解决方法

- 使用 post 接口

- 增加验证码，密码，短信验证码等验证
