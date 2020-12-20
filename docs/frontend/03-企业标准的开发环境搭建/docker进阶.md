# docker 进阶-搭建各种服务

## docker 搭建 doclever 测试平台

> 使我们在内网环境下, 也可以使用 doclever, 方便大家在公司使用

[DOClever Docker 安装方式](https://github.com/sx1989827/DOClever/tree/master/docker)

1. 创建 docker-compose.yml 文件

```yml
version: '2'
services:
  DOClever:
    image: lw96/doclever:latest-ubuntu
    restart: always
    container_name: 'DOClever'
    ports:
      - 20080:10000
    # 我们修改一下数据的存储路径, 对数据进行持久化操作
    volumes:
      - /srv/doclever/file:/root/DOClever/data/file
      - /srv/doclever/img:/root/DOClever/data/img
      - /srv/doclever/tmp:/root/DOClever/data/tmp
    environment:
      # - DB_HOST=mongodb://localhost:27017/DOClever
      - PORT=10000
    links:
      - mongo:mongo

  mongo:
    image: mymongo
    restart: always
    container_name: 'mongodb'
    volumes:
      - /srv/doclever/db:/data/db
```

2. 使用 docker-compose up -d 会找到当前目录的 docker-compose.yml 文件进行执行

3. 如果开启了防火墙, 要放行端口

```shell
# 查看防火墙状态
firewall-cmd --state

# 查看已经放行的端口
firewall-cmd --list-all

# 增加端口
firewall-cmd --add-port=20080/tcp --zone=public --permanent

# 重启
firewall-cmd --reload
```

打开浏览器, 访问我们刚刚搭建的 doclever

[![rNKxnH.png](https://s3.ax1x.com/2020/12/19/rNKxnH.png)](https://imgchr.com/i/rNKxnH)
