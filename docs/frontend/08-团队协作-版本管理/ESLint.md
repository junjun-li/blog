# ESLint

## 安装和基本使用

先决条件：Node.js (>=6.14), npm version 3+。

你可以使用 npm 安装 ESLint：

```shell
npm install eslint --save-dev
```

紧接着你应该设置一个配置文件：

```shell
./node_modules/.bin/eslint --init
# or
npx eslint --init
```

```shell
➜  ESLint-demo npx eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JavaScript
Successfully created .eslintrc.js file in /Users/lijunjun/MKW/big-front-end/ESLint-demo
```

使用

```shell
npx eslint ./app.js
# 检查src下的所有js文件
npx eslint src/**/*.js
```

[![rHAab8.png](https://s3.ax1x.com/2020/12/29/rHAab8.png)](https://imgchr.com/i/rHAab8)
