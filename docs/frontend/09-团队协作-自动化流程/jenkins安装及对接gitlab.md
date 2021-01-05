# jenkins 安装及对接 gitlab

## 什么是自动化, 什么是 CI/CD

[![sSJKtx.png](https://s3.ax1x.com/2021/01/02/sSJKtx.png)](https://imgchr.com/i/sSJKtx)

[![sSJ11O.png](https://s3.ax1x.com/2021/01/02/sSJ11O.png)](https://imgchr.com/i/sSJ11O)

[![sSJ6Bj.png](https://s3.ax1x.com/2021/01/02/sSJ6Bj.png)](https://imgchr.com/i/sSJ6Bj)

## Jenkins -- CI&CD 工具鼻祖

[Jenkins 中文网](https://www.jenkins.io/zh/)

## docker-compose 安装 jenkins

```yml
version: '3'
services:
  jenkins:
    container_name: 'jenkins'
    image: jenkins/jenkins:lts
    restart: always
    user: jenkins:994
    ports:
      - '11005:8080'
      - '50000:50000'
      - '10051:10051'
    volumes:
      - /docker-data/jenkins/data:/var/jenkins_home
      - /docker-data/jenkins/docker:/usr/bin/docker
      - /docker-data/jenkins/docker.sock:/var/run/docker.sock
```

```shell
# 运行docker-compose
docker-compose up -d
# 查看log
docker logs -f jenkins
# 可能会报错, 如下图
# 给一个权限即可
chmod 777 /docker-data/jenkins/data
```

[![sSoEFA.png](https://s3.ax1x.com/2021/01/02/sSoEFA.png)](https://imgchr.com/i/sSoEFA)

::: tip 提示
jenkins 刚登录需要一个初始密码, 使用如下指令, 可以看见 jenkins 的初始登录密码
:::

```shell
# 打印日志
docker logs -f jenkins

*************************************************************
*************************************************************
*************************************************************
# Jenkins需要初始设置。已创建管理员用户并生成密码。
Jenkins initial setup is required. An admin user has been created and a password generated.
# 请使用以下密码继续安装：
Please use the following password to proceed to installation:
# 我们需要这个登录密码
bc14b96e6bb94c2cbafb745cb50d9c28

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
```

::: tip 提示
如果 jenkins 已经初始化好了, 没有日志了, 就需要进入容器内部查看密码了
:::

```shell
# 进入容器内部的交互式终端
docker exec -it 341a05b6de12 /bin/bash
# 密码在如下路径内
# 密码在容器内部的这个路径 => /var/jenkins_home/secrets/initialAdminPassword
```

[![sSzvH1.png](https://s3.ax1x.com/2021/01/02/sSzvH1.png)](https://imgchr.com/i/sSzvH1)

选择推荐插件安装

[![spSKC8.png](https://s3.ax1x.com/2021/01/02/spSKC8.png)](https://imgchr.com/i/spSKC8)

然后等着就可以了, 取决于服务器有多牛逼, 我的比较垃圾, 2 核 4G, 等了十分钟的样子

[![spS0v4.png](https://s3.ax1x.com/2021/01/02/spS0v4.png)](https://imgchr.com/i/spS0v4)

然后是傻瓜创建用户的操作

[![sppYsH.png](https://s3.ax1x.com/2021/01/02/sppYsH.png)](https://imgchr.com/i/sppYsH)

[![sppTlF.png](https://s3.ax1x.com/2021/01/02/sppTlF.png)](https://imgchr.com/i/sppTlF)

## jenkins 插件的安装

jenkins 的牛逼之处在于丰富的插件系统

点击 `Manage Jenkins => Manage Plugins`

下载插件都非常的慢, 使用清华的加速源

[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/)

::: tip 提醒
复制一下链接, 等一下要用
:::

[![sp98kq.png](https://s3.ax1x.com/2021/01/02/sp98kq.png)](https://imgchr.com/i/sp98kq)

链接拷贝到 jenkins 上, 如下图, 加速源就配置好了

[![sp9aX4.png](https://s3.ax1x.com/2021/01/02/sp9aX4.png)](https://imgchr.com/i/sp9aX4)

## gitlab 和 jenkins 对接

### 一、生成新的公私钥

```shell
# -C 是大写的 否则会报错
ssh-keygen -t rsa -b 4096 -C "11776174@qq.com"
Generating public/private rsa key pair.
# 这个是公私钥的存放路径
Enter file in which to save the key (/Users/lijunjun/.ssh/id_rsa): /Users/lijunjun/Downloads/deploy
# 密文输入123456
Enter passphrase (empty for no passphrase):
# 密文输入123456
Enter same passphrase again:
Your identification has been saved in /Users/lijunjun/Downloads/deploy.
Your public key has been saved in /Users/lijunjun/Downloads/deploy.pub.
The key fingerprint is:
SHA256:llAYhroY6hBqQxU0EREewN/bfHSayIXLL0j1l0KgnlM 11776174@qq.com
The key's randomart image is:
+---[RSA 4096]----+
|..oX*.oo.        |
| ...+..o         |
|  oo. o o        |
|o... o E = .     |
|++ .. X S + .    |
|=o.  * O * o     |
|+ . . o o o      |
| .   . . .       |
|        .        |
+----[SHA256]-----+
```

### 二、配置 GitLab

1. 配置密钥

以管理员账号登录 GitLab，在 Gitlab 上部署密钥(注意是`公钥`)。

![](https://pic1.zhimg.com/80/v2-0b2cc9a2f2eda263ccde187bac7dd8e0_1440w.jpg)

然后回到具体项目仓库，选择要部署的 Deploy Keys，具体操作如下所示：

![](https://pic1.zhimg.com/80/v2-a8f62947ae870ccdd40e6b36cd301bac_1440w.jpg)

2. 配置网络请求

![](https://pic1.zhimg.com/80/v2-c8eb18f31021cc59ff70ebd51d7ed878_1440w.jpg)

### 三、配置 jenkins

1. 进入 Jenkins 网站，点击左侧菜单栏下的`凭据` ，选择`系统` ，点击`全局凭据` 。

![](https://pic4.zhimg.com/80/v2-2382ef1cf747cfd357c97ebef0879853_1440w.jpg)

2. 然后点击`添加凭据`，将之前生成的`私钥`添加到凭据中，这样 Jenkins 就可以下载 Gitlab 上的仓库代码了。

![](https://pic4.zhimg.com/80/v2-3f0453fe551b13d9ceff372b96718a1f_1440w.jpg)

## 配置 jenkins 集成任务

### 一、配置源代码管理

:::tip 提醒
如果是本地使用 docker 搭建的 gitlab,注意一定不能使用 localhost,要使用宿主机的 ip
:::

![](https://pic4.zhimg.com/80/v2-f34f2d2d2cbb0e78669969e09140032f_1440w.jpg)

### 二、配置构建触发器

配置构建触发器，点击“高级”选项生成 Webhooks 所需的 Secrect Token，具体操作如下：

![](https://pic1.zhimg.com/80/v2-31b9538313f7b23e876c2c442cc12dc4_1440w.jpg)

![](https://pic1.zhimg.com/80/v2-92f626a4b8cebc3d2577575012e9bf94_1440w.jpg)

### 三、配置 Webhooks

回到 GitLab 代码仓库，将之前生成的 Secrect Token 配置到 Webhooks 当中。

![](https://pic3.zhimg.com/80/v2-bf2e58da45686e4221589349f8a75552_1440w.jpg)

### 四、配置构建操作

配置构建操作，这里输入一段 Shell 脚本进行测试。

![](https://pic2.zhimg.com/80/v2-03d7643f53a749ece176397d2ab4888d_1440w.jpg)

### 五、集成任务测试

回到刚才配置 Webhooks 的地方，点击“测试”按钮，模拟一个“Push events” 事件。

![](https://pic1.zhimg.com/80/v2-f5c24982bfcb07d75e1f140e65499ea8_1440w.jpg)

应该可以看到 Jenkins 正常工作

![](https://pic2.zhimg.com/80/v2-f5f73c6f7cac19feb85194a0e4ac9c59_1440w.jpg)

![](https://pic4.zhimg.com/80/v2-994c651e01e3e216569a4077a2c49a73_1440w.jpg)
