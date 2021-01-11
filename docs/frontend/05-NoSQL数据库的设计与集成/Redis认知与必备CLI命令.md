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
version: '3'

services:
  redis:
    image: redis
    restart: always
    container_name: 'redis'
    ports:
      - 15001:6379
    volumes:
      - /docker-data/redis-data:/data
    command: ['redis-server', '--requirepass', '123456']
```

::: warning 警告
暂时没搞懂, 我用上诉文件装 redis, 总是报错, 说啥内存不足啥的, 忘记了, 我直接用下面这一条命令安装的 redis
:::

## dcoekr 启动 redis 三个警告的解决办法(解决上诉问题)

[原文链接](https://www.cnblogs.com/lovling/p/12532549.html)

### 警告的内容和大概意思

1. 关于 TCP 连接数

内容：WARNING: The TCP backlog setting of 511 cannot be enforced because
/proc/sys/net/core/somaxconn is set to the lower value of 128

意思：大概就是 tcp 连接数设置为 128 太小了

2. 关于 overcommit_memory 的值设置

内容：WARNING overcommit_memory is set to 0! Background save may fail under
low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to
/etc/sysctl.conf and then reboot or run the command
'sysctl vm.overcommit_memory=1' for this to take effect

意思：大概是 overcommit_memory 的值设置为 0 时 在低内存条件下，后台保存可能会失败

3. 关于 THP 支持

内容：WARNING you have Transparent Huge Pages (THP) support enabled in your
kernel. This will create latency and memory usage issues with Redis. To fix this
issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled'
as root, and add it to your /etc/rc.local in order to retain the setting after a
reboot. Redis must be restarted after THP is disabled

意思：大概是内核中启用了透明大页面（THP）支持。 这将导致 Redis 的延迟和内存使用问题

### 解决办法

1. 修改配置文件 vim /etc/sysctl.conf, 写入下面两个内容（注意是宿主机）

```shell
net.core.somaxconn=551   # 这里的数据根据生产的需要和电脑的性能进行调整 必须 大于等于 551
vm.overcommit_memory=1
```

2. 保存之后执行 sysctl -p 使得修改生效

3. 修改配置文件 vim /etc/rc.local，写入下面的内容

```shell
echo never > /sys/kernel/mm/transparent_hugepage/enabled
```

4. 保存之后，赋予文件执行权限，并使得配置生效

```shell
chmod +x /etc/rc.local
source /etc/rc.local
```

### 重新启动一个 docker 容器

1. 笔者这边采用 docker-compose 的方式启动，docker-compose.yml 配置文件如下

```yml
version: '3.1'
services:
  master:
    image: redis
    container_name: redis
    ports:
      - 6379:6379
    volumes:
      - ./redis.conf:/etc/redis.conf
      - ./data:/data
    command: redis-server /etc/redis.conf
```

2. 查看日志文件发现 后面的两个警告都没了，但是第一个警告还存在，我们进入 docker 容器查看原因

```shell
docker exec -it redis bash
cat /proc/sys/net/core/somaxconn
```

3. 我们发现容器的这个值还是 128，也就是说修改宿主机并没有同步改变容器的这个值

4. 由于 /proc/sys/net/core/somaxconn 这个文件是只读的，笔者这边选择使用特权容器强行修改该值，修改 docker-compose.yml 如下

```yml
version: '3.1'
services:
  master:
    image: redis
    container_name: redis
    privileged: true # 启动特权模式
    ports:
      - 6379:6379
    volumes:
      - ./redis.conf:/etc/redis.conf
      - ./data:/data
    command: # 多个命令同时执行
      - /bin/bash
      - -c
      - |
        echo 551 > /proc/sys/net/core/somaxconn
        redis-server /etc/redis.conf
```

5. 删除日志文件，重启 docker 容器

```shell
docker-compose down
docker-compose up -d
```

6. 我们在去看启动之后的日志文件，没有 waring，没有 error，有强迫症的我感觉世界都清净了

## 使用 docker run 安装

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

## redis 的备份和恢复

[慕课网](https://class.imooc.com/lesson/1167#mid=28310)
