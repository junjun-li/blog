# git 工具导学&git 多密钥管理

## 基础

[![r5aMlT.png](https://s3.ax1x.com/2020/12/27/r5aMlT.png)](https://imgchr.com/i/r5aMlT)

## SSH 秘钥

[使用 SSH 连接到 GitHub](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)

### [生成 SSH 秘钥](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

1. 打开 Terminal（终端）。

2. 粘贴下面的文本（替换为您的 GitHub 电子邮件地址）。

```shell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. 提示您“Enter a file in which to save the key（输入要保存密钥的文件）”时，按 Enter 键。 这将接受默认文件位置。

```shell
> Enter a file in which to save the key (/Users/you/.ssh/id_ed25519): [Press enter]
```

4. 在提示时输入安全密码。 更多信息请参阅[“使用 SSH 密钥密码”](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/working-with-ssh-key-passphrases)。

```shell
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```

## 多个秘钥对与多个仓库通讯的方式

1. 打开 SSH 的默认路径, 生成一个`config`文件

::: warning
注意不要有任何后缀, 然后使用编辑器打开
:::

[![r4ZJE9.png](https://s3.ax1x.com/2020/12/26/r4ZJE9.png)](https://imgchr.com/i/r4ZJE9)

2. 编辑 config 文件

```shell
Host junjun
  Port 10022
  HostName 121.37.183.14
  User root
  IdentityFile ~/.ssh/id_rsa
  IdentitiesOnly yes

# 这个配置用来免密登录github拉取代码
Host junjun-github
  HostName github.com
  User junjun-li
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa

# 下面这个配置是我用来免密登录我自己的gitlab的
# Host 表示远程主机名(别名)
Host junjun-gitlab
  # 要连接的端口
  Port 19898
  # HostName 表示真正的域名
  HostName 121.37.183.14
  User junjun-li
  # publickey 表示一个鉴权方式, 不是很懂这个
  PreferredAuthentications publickey
  # IdentityFile 指定秘钥的一个路径
  IdentityFile ~/.ssh/id_rsa
```

3. 在自己 github 里面, 新建一个 test 仓库, 选择私有化

[![r4eaIs.png](https://s3.ax1x.com/2020/12/26/r4eaIs.png)](https://imgchr.com/i/r4eaIs)

找到 SSH 克隆仓库的地址

```shell
git@github.com:junjun-li/test.git
```

4. 在本地打开终端 使用如下指令克隆仓库

::: warning
我本地配置了 `config` 文件, 如上第二步
配置了一个 `Host junjun-gitlab`, 我们就可以使用如下指令来克隆我们自己的仓库了
:::

```shell
# github.com 改成 junjun-github
git clone git@junjun-github:junjun-li/test.git
# 这是一个测试的空仓库
Cloning into 'test'...
warning: You appear to have cloned an empty repository.
```
