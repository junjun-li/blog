# Redis 认知与必备 CLI 命令

## Redis 的基本概念

[![rvmok9.png](https://s3.ax1x.com/2020/12/31/rvmok9.png)](https://imgchr.com/i/rvmok9)

## Redis 的特点

1. 高性能, 可持久化

2. key-value 结构, 支持多种数据类型

3. 支持事物, 数据的原子性(要么不做/全做)

## Redis 应用场景

- 缓存(读写性能优异)

- 计数&消息系统(高并发、发布/订阅阻塞队列功能)

- 分布式会话 session &分布式锁(秒杀)

## docker 安装 redis

```yml
version: "3"

services:

  redis:
    image: redis
    restart: always
    container_name: "redis"
    ports:
      - 15001:6379
    volumes:
      - /docker-data/redis-data:/data
    command: [ "redis-server", "--requirepass", "123456" ]

```

## 使用docker run安装

```shell
docker run -itd --restart=always --name redis -p 15001:6379 -v /docker-data/redis-data:/data redis redis-server --requirepass 123456
```

## redis-cli

[Redis 命令参考](http://doc.redisfans.com/)

[Redis 命令参考](http://redisdoc.com/)

### 登录

```shell
# 进入redis的cli命令行
docker exec -it redis redis-cli
127.0.0.1:6379> 
# 或者
docker exec -it redis /bin/bash
root@9c420575474d:/data# redis-cli
# auth 输入密码进入
127.0.0.1:6379> auth 123456
# 登录成功
OK 
```

```shell
# 心跳检测
127.0.0.1:6379> ping
PONG

# 断开连接
127.0.0.1:6379> quit

# 设置 key value
127.0.0.1:6379> set name junjun
OK
# 切换数据库 redis 中 数据是隔离的
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> set name lijunjun
OK
127.0.0.1:6379[1]> get name
"lijunjun"
127.0.0.1:6379[1]> select 0
OK
127.0.0.1:6379> get name
"junjun"
127.0.0.1:6379> 
```

### 数字的增加减少, 例如网页的浏览次数 

```shell
127.0.0.1:6379> set num 1
OK
# 增1
127.0.0.1:6379> INCR num
(integer) 2
127.0.0.1:6379> get num
"2"
# 减1
127.0.0.1:6379> DECR num
(integer) 1
127.0.0.1:6379> 
```

### 搜索

```shell
# 搜索所有 *表示所有
127.0.0.1:6379> keys *
1) "num"
2) "name"
# 搜索 以nu开头
127.0.0.1:6379> keys nu*
1) "num"

# exists 检查 key 是否存在 
127.0.0.1:6379> exists num
# 存在
(integer) 1
127.0.0.1:6379> exists num1
# 不存在
(integer) 0

# 删除键值
127.0.0.1:6379> del name
(integer) 1
```

## 哈希表指令

### 设置, 取值

```shell
127.0.0.1:6379> hset junjun name lijunjun
(integer) 1
127.0.0.1:6379> hset junjun email 11776174@qq.com
(integer) 1
127.0.0.1:6379> hget junjun name
"lijunjun"
127.0.0.1:6379> hget junjun email
"11776174@qq.com"
# 打印键值
127.0.0.1:6379> hgetall junjun
1) "name"
2) "lijunjun"
3) "email"
4) "11776174@qq.com"
127.0.0.1:6379> 
```

### 设置多个, 取值多个

```shell
127.0.0.1:6379> hmset junjun1 name lijunjun age 18 email 11776174@qq.com
OK
127.0.0.1:6379> hmget junjun1 name age
1) "lijunjun"
2) "18"
127.0.0.1:6379> 
```

## redis的备份和恢复

[慕课网](https://class.imooc.com/lesson/1167#mid=28310)