# Dockerfile 简介及使用

## Dockerfile 简介

### 前端的 Dockerfile 示例

[vue 官方推荐示例](`https://cn.vuejs.org/v2/cookbook/dockerize-vuejs-app.html`)

```Dockerfile
# 使用node10版本
FROM node:10 as build-stage

# 谁在维护这个项目
LABEL maintainer=11776174@qq.com

# 创建了一个工作目录
WORKDIR /app

# 拷贝所有文件, 除了 .dockerignore 排除的文件
COPY . .

# 装包 使用 yarn 或者 npm 装包
#RUN npm install cnpm -g --no-progress --registry=https://registry.npm.taobao.org
RUN yarn install --registry=https://registry.npm.taobao.org

# 构建我们的项目
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 后端的 Dockerfile 示例

```Dockerfile
# 使用node10版本
FROM node:10

# 谁在维护这个项目
LABEL maintainer=11776174@qq.com

# 创建了一个工作目录
WORKDIR /app

# 拷贝所有文件, 除了 .dockerignore 排除的文件
COPY . .

# 装包 使用 yarn 或者 npm 装包
#RUN npm install cnpm -g --no-progress --registry=https://registry.npm.taobao.org
RUN yarn install --registry=https://registry.npm.taobao.org

# 构建我们的项目
RUN npm run build

# 暴露一个端口
EXPOSE 12005

# 把静态目录挂载出来
VOLUME ["/app/public"]

# 运行dist的bundle.js
CMD ["node", "dist/server.bundle.js"]

```


## 使用

以前端项目作为例子

```shell
# . 最后的点表示当前目录的Dockerfile文件
# docker会执行Dockerfile文件
docker build -t web:1.0 .

# 然后查看镜像
docker images
# 看看我们这个容器, 只有23.8M哟😊
# 这还是包含了nginx服务的
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
web                    1.0                 e1f823f24af5        17 seconds ago      23.8MB

# 然后运行这个镜像
docker run -itd --name web -p 11000:80 web:1.0
921b7fe7bd060b531f5b2e2e3b80ca68955b0ae13c1c6eb1cfcf9185d0606f05

# 查看镜像, 然后访问 localhost:11000 就可以看见我们的页面了
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                   NAMES
921b7fe7bd06        web:1.0             "/docker-entrypoint.…"   3 seconds ago       Up 2 seconds        0.0.0.0:11000->80/tcp   web
```