# docker 入门

## docker 是什么

[菜鸟教程-docker 是什么](https://www.runoob.com/docker/docker-tutorial.html)

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

> 说人话就是 docker 给我们自己的应用提供了一个运行环境

> 几句简单的命令, 就可以使我们的应用在任何运行环境上面跑起来

## docker vs 虚拟机

[![rG035Q.png](https://s3.ax1x.com/2020/12/17/rG035Q.png)](https://imgchr.com/i/rG035Q)

## centos 中 Docker 安装方法

1. 卸载旧版本

```shell
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine
```

2. 安装依赖

```shell
sudo yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
```

添加 stable 的 Docker-ce 的源:

```shell
sudo yum-config-manager \
--add-repo \
https://download.docker.com/linux/centos/docker-ce.repo
```

3. 安装 docker

```shell
sudo yum install docker-ce docker-ce-cli containerd.io
```

## 运行 docker

```sh
systemctl start docker # 运行docker进程
systemctl status docker # 查看docker运行状态
```

## 运行第一个 docker 容器应用

```sh
docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:6a65f928fb91fcfbc963f7aa6d57c8eeb426ad9a20c7ee045538ef34847f44f1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

- 查看 docker 进程

```sh
docker ps # 查询正在运行的进程

docker ps -a # 包括已结束的进程
```

## docker 中国镜像加速

修改`/etc/docker/daemon.json`文件

```sh
vi /etc/docker/daemon.json

# 进入vi编辑器
# 按i进入编辑状态 输入以下
{
    "registry-mirrors": [
        "https://1nj0zren.mirror.aliyuncs.com",
        "https://docker.mirrors.ustc.edu.cn",
        "http://f1361db2.m.daocloud.io",
        "https://registry.docker-cn.com"
    ]
}
# esc退出编辑状态
# : wq 保存编辑

# 重启docker镜像
systemctl daemon-reload
systemctl restart docker
```

[配置阿里云加速地址](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

::: tip 提醒
以下内容摘抄自 [https://yeasy.gitbook.io/docker_practice/install/mirror](https://yeasy.gitbook.io/docker_practice/install/mirror)
:::

### Ubuntu 16.04+、Debian 8+、CentOS 7+

目前主流 Linux 发行版均已使用 [systemd](https://systemd.io/) 进行服务管理，这里介绍如何在使用 systemd 的 Linux 发行版中配置镜像加速器。

请首先执行以下命令，查看是否在 `docker.service` 文件中配置过镜像地址。

```shell
systemctl cat docker | grep '\-\-registry\-mirror'
```

如果该命令有输出，那么请执行 `$ systemctl cat docker` 查看 `ExecStart=` 出现的位置，修改对应的文件内容去掉 `--registry-mirror` 参数及其值，并按接下来的步骤进行配置。

如果以上命令没有任何输出，那么就可以在 `/etc/docker/daemon.json` 中写入如下内容（如果文件不存在请新建该文件）：

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

> 注意，一定要保证该文件符合 json 规范，否则 Docker 将不能启动。

之后重新启动服务。

```shell
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

### macOS

对于使用 macOS 的用户，在任务栏点击 Docker Desktop 应用图标 -> Perferences，在左侧导航菜单选择 Docker Engine，在右侧像下边一样编辑 json 文件。修改完成之后，点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。

```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

### 检查加速器是否生效

执行 `$ docker info`，如果从结果中看到了如下内容，说明配置成功。

```
Registry Mirrors:
 https://hub-mirror.c.163.com/
```

## docker 常用命令

[菜鸟教程 Docker 命令大全](https://www.runoob.com/docker/docker-command-manual.html)

```shell
# 查看所有镜像
docker image
# 查看所有容器
docker ps
# 筛选需要查看的容器
docker ps | grep tmp
# 停止容器
docker stop (容器名称 | 容器Id)
# 运行一个容器
docker start (容器名称 | 容器Id)
# 删除一个容器 (不能删除正在运行的容器)
docker rm (容器名称 | 容器Id)
# 打印日志 -f 表示持续打印
docker logs -f (容器名称 | 容器Id)

# --name 给容器取一个名字
# -p 表示把这个端口号映射出来
# 23456 表示外部的,映射到宿主机的端口
# 27017 表示容器内部的端口
docker run --name some-mongo -p 23456:27017 -d mongo

# 登录docker hub
docker login
```

## docker-compose

Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。(摘抄自菜鸟教程)

> 说人话就是方便一次性运行多个 docker 镜像

## docker-compose 的安装

[Install Docker Compose](https://docs.docker.com/compose/install/)

linux 的安装方式

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 然后给他一个执行权限
chmod +x /usr/local/bin/docker-compose

# 查看docker-compose版本
docker-compose --version
```

## 离线安装

上面的地址, 下载有时候很慢, 我们之间进入 github 的 docker-compose 里面下载

[github-docker-compose-download](https://github.com/docker/compose/releases)

目前最新的稳定版是 1.27.4

[![sCSa28.png](https://s3.ax1x.com/2021/01/03/sCSa28.png)](https://imgchr.com/i/sCSa28)

下载之后, 改名为 `docker-compose`, 然后上传到 linux 服务器的 `/usr/local/bin`

[![sCSe4x.png](https://s3.ax1x.com/2021/01/03/sCSe4x.png)](https://imgchr.com/i/sCSe4x)

```shell
# 添加可执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 查看 docker-compose 版本
docker-compose -v
docker-compose version 1.27.4, build 40524192
```

## docker-compose.yml 文件的使用

::: tip yml 语法的格式

1. 冒号后面必须加一个空格
2. 不能是用缩进, 强制使用空格
3. 使用单引号, 换行前面不要加空格
   :::

```yml
# environment 表示环境变量
# ports 表示端口映射
version: '3'
services:
  mysql1:
    # 镜像
    image: mysql
    # 环境变量, 传递给容器内部使用
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    # 容器内部的端口, 映射到宿主机上面
    # 把容器内部的3306映射到宿主机上面的28002端口
    ports:
      - 28002:3306

  mysql2:
    image: mysql
    environment:
      - MYSQL_ROOT_PASSWORD=123456
    ports:
      - 28003:3306
```

使用 `docker-compose up -d` 运行

```shell
docker-compose up -d
Creating network "home_default" with the default driver
Creating home_mysql1_1 ... done
Creating home_mysql2_1 ... done
```

## docker Hub 的使用

就像 npm 一样, 我们自己也可以上传 docker 镜像

[Docker Hub](https://hub.docker.com/)

推送镜像

```shell
docker commit 容器id l11776174/mysql:1.0
# 推送
docker push l11776174/mysql:1.0
```

## node 以及 nvm, 发布自己的 node 包

[imocc](https://class.imooc.com/lesson/1159#mid=27895)
