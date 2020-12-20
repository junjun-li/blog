# linux 的简单介绍

## Linux 内核&硬件资源&测试

- lsb_release -a

> 查看操作系统版本

```shell
[root@hecs-x-large-2-linux-20200609095148 ~]# lsb_release -a
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release 7.6.1810 (Core)
Release:	7.6.1810
Codename:	Core
```

- uname -a

> 查看内核

```shell
[root@hecs-x-large-2-linux-20200609095148 ~]# uname -a
Linux hecs-x-large-2-linux-20200609095148 3.10.0-1062.12.1.el7.x86_64 #1 SMP Tue Feb 4 23:02:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

- df -Th

> 查看磁盘大小

```shell
[root@hecs-x-large-2-linux-20200609095148 ~]# df -Th
文件系统       类型      容量  已用  可用 已用% 挂载点
devtmpfs       devtmpfs  1.9G     0  1.9G    0% /dev
tmpfs          tmpfs     1.9G     0  1.9G    0% /dev/shm
tmpfs          tmpfs     1.9G  194M  1.7G   11% /run
```

- ls -la

```shell
[root@hecs-x-large-2-linux-20200609095148 ~]# ls -la
总用量 60
# d代表是一个目录
# 前面三个代表用户权限
# r代表可读
# w代表写
# x代表执行
# 之后三个表示组权限
# 最后三个是其他用户的权限
[root@hecs-x-large-2-linux-20200609095148 /]# ls -la
总用量 2269412
dr-xr-xr-x.  21 root root       4096 8月  11 17:17 .
dr-xr-xr-x.  21 root root       4096 8月  11 17:17 ..
-rw-r--r--    1 root root          0 4月  27 2020 .autorelabel
lrwxrwxrwx.   1 root root          7 4月  27 2020 bin -> usr/bin
dr-xr-xr-x.   5 root root       4096 6月   9 2020 boot
drwxr-xr-x    7 root root       4096 4月  27 2020 CloudResetPwdUpdateAgent
drwxr-xr-x    7 root root       4096 4月  27 2020 CloudrResetPwdAgent
drwxr-xr-x   19 root root       3020 6月   9 2020 dev
drwxr-xr-x    7 root root       4096 6月  16 2020 docker-data
drwxr-xr-x.  79 root root       4096 6月  16 2020 etc # 软件的配置文件
drwxr-xr-x.   4 root root       4096 6月  16 2020 home # 个人目录
-rw-r--r--    1 root root        102 5月  14 2020 HostGuardAgent_Linux64_V1.12.50.rpm.sha256
-rwxr-xr-x    1 root root       2052 5月  14 2020 hostguard_setup_config.dat
lrwxrwxrwx.   1 root root          7 4月  27 2020 lib -> usr/lib
lrwxrwxrwx.   1 root root          9 4月  27 2020 lib64 -> usr/lib64
drwx------.   2 root root      16384 4月  27 2020 lost+found
drwxr-xr-x.   2 root root       4096 4月  11 2018 media
drwxr-xr-x.   2 root root       4096 4月  11 2018 mnt
-rw-r--r--    1 root root  176295918 8月  11 17:20 node_modules.zip
drwxr-xr-x.   3 root root       4096 6月   9 2020 opt
dr-xr-xr-x  173 root root          0 6月   9 2020 proc
dr-xr-x---.   4 root root       4096 6月  13 2020 root
drwxr-xr-x   27 root root        820 8月  11 16:42 run
lrwxrwxrwx.   1 root root          8 4月  27 2020 sbin -> usr/sbin
drwxr-xr-x.   3 root root       4096 6月   9 2020 srv
-rw-r--r--    1 root root 2147483648 6月  10 2020 swap
dr-xr-xr-x   13 root root          0 12月 17 21:51 sys # 系统目录
drwxrwxrwt.   9 root root       4096 12月 17 21:48 tmp
drwxr-xr-x.  13 root root       4096 4月  27 2020 usr # 系统的可执行文件
drwxr-xr-x.  21 root root       4096 6月  10 2020 var # 日志文件
```

- top

> 查看运行的进程

```shell
[root@hecs-x-large-2-linux-20200609095148 /]# top

top - 21:54:43 up 191 days, 11:48,  2 users,  load average: 0.21, 0.23, 0.18
Tasks: 162 total,   1 running, 161 sleeping,   0 stopped,   0 zombie
%Cpu(s):  3.5 us,  1.5 sy,  0.0 ni, 94.6 id,  0.0 wa,  0.0 hi,  0.3 si,  0.0 st
KiB Mem :  3879860 total,   284368 free,  3006500 used,   588992 buff/cache
KiB Swap:  2097148 total,  1443296 free,   653852 used.   401928 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
17964 1000      20   0 1977888 609176   2892 S   3.3 15.7 668:13.04 ruby2.6
28130 polkitd   20   0   46328   5888    824 S   2.6  0.2   1522:05 redis-server
13372 polkitd   20   0 1607236  53844   3048 S   1.3  1.4 596:05.02 mongod
 1303 root      20   0 3509776  61396   2760 S   0.7  1.6 160:05.76 java
 6738 root      20   0  162044   2340   1588 R   0.7  0.1   0:00.04 top
11930 polkitd   20   0 1628792  19600   2408 S   0.7  0.5 578:57.52 mongod
13969 polkitd   20   0   52776    848    464 S   0.7  0.0 212:50.41 redis-server
26183 1000      20   0 3577308 707560   1732 S   0.7 18.2  48:59.00 java
```

## Linux 常见指令

### 文档型

```shell
# 查看文件
ls

# 创建test目录
mkdir test

# 创建test.txt文件
touch test.txt

# 进入vi编辑器 编辑test文件
vi test.txt

按 i 进入编辑状态

按 esc , 退出编辑状态

按 :q! 不保存退出
按 :wq 保存退出

# 查看内容
cat test.txt

# 往文件里面push内容
# 一个 > 表示覆盖
# 两个 >> 表示追加
echo '1234' >> test.txt

# 删除文件
rm test.txt
# 删除目录
rm -r testdir/

# 不要用 强制删除
# rm -rf testdir/
```

### 下载/压缩/解压

```shell
# 下载
wget 下载地址

# 解压
# z: 表示有这种.gz文件
# x: 表示解压缩
# v: 表示显示解压过程
# f: 表示使用一样的名字, 及解压的名字和压缩包一样
tar zxvf 压缩包

# 压缩
# c: 表示压缩
tar zcvf 压缩包名.gz 文件名
```

### 查看进程

```shell
# 查看进程  grep 搜索的意思
ps -ef | grep docker

# 终止进程
# -9 表示强制终止
kill -9 27643
```

### 查看服务

```shell
# 查看service服务
service sshd status

# 重启服务
service sshd restart

# 终止服务
service sshd stop
```

## 修改 SSH 默认端口

```sh
# 先查看默认的端口
netstat -anlp | grep sshd

# 输出 现在默认监听22端口

tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1558/sshd
tcp        0     36 192.168.0.245:22        101.84.36.232:32708     ESTABLISHED 16658/sshd: root@pt
tcp        0      0 192.168.0.245:22        101.84.36.232:32740     ESTABLISHED 16290/sshd: root@pt
tcp6       0      0 :::22                   :::*                    LISTEN      1558/sshd
unix  3      [ ]         STREAM     CONNECTED     16952    1558/sshd
unix  2      [ ]         DGRAM                    61746    16658/sshd: root@pt
unix  2      [ ]         DGRAM                    60281    16290/sshd: root@pt
```

```sh
# 进入配置文件
vi /etc/ssh/sshd_config
# 然后可以看见下图
# 使用 i 进入编辑状态
# 然后按esc退出编辑状态
# :wq 保存
# 然后按照下图操作即可
# 记得要在对应的云服务器厂商配置安全组规则,放行你自己设置的端口, 不然还是无法访问
```

[![t5JGPf.png](https://s1.ax1x.com/2020/06/09/t5JGPf.png)](https://imgchr.com/i/t5JGPf)
[![t5UFyD.png](https://s1.ax1x.com/2020/06/09/t5UFyD.png)](https://imgchr.com/i/t5UFyD)
[![t5UiQO.png](https://s1.ax1x.com/2020/06/09/t5UiQO.png)](https://imgchr.com/i/t5UiQO)

## ssh 密钥方式远程 linux

[生成 ssh 密钥的方式](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### 使用 ssh 登录,连接上云服务器,把公钥放进如下图所示的目录中

> 注意是公钥哦,短的是公钥, ssh-rsa 开头的

[![t50PNd.png](https://s1.ax1x.com/2020/06/09/t50PNd.png)](https://imgchr.com/i/t50PNd)

### 然后本地的.ssh 目录下面新建一个 config 文件,如下图配置好就 ok 了

[![t50CAH.png](https://s1.ax1x.com/2020/06/09/t50CAH.png)](https://imgchr.com/i/t50CAH)
