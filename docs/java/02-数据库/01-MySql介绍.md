# MySql 介绍

## 安装

- [mysql](https://dev.mysql.com/downloads/mysql/)

- [mysql GUI 工具 navicat-premium](https://macwk.com/soft/navicat-premium)

```shell
# 登录
➜  ~ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ;
# 退出
mysql> exit
Bye
```

## 用户管理

```shell
# 创建text数据表
create database text

# 解决1142的问题
# https://class.imooc.com/course/qadetail/316206

# 1. 创建用户
# 2. 给用户创建权限
```

## 重置root密码

1. 创建一个TXT文件，定义修改密码的SQL语句

```shell
# localhost表只允许本地登录
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456'
```
