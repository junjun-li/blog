# Maven

## Mac 安装 maven

1. 下载 maven：https://maven.apache.org/download.cgi

![image-20230123115029259](./images/image-20230123115029259.png)

2. 解压，移动至`/usr/local`目录中

3. 设置环境变量

```shell
# 打开环境变量配置文件
open ~/.bash_profile

# 输入：
export MAVEN_HOME=/usr/local/apache-maven-3.8.7
export PATH=${PATH}:${MAVEN_HOME}/bin

# 使bash_profile生效
source ~/.bash_profile
```

4. 验证安装是否成功

```shell
➜  / mvn -v
Apache Maven 3.8.7 (b89d5959fcde851dcb1c8946a785a163f14e1e29)
Maven home: /usr/local/apache-maven-3.8.7
Java version: 1.8.0_312, vendor: Temurin, runtime: /Library/Java/JavaVirtualMachines/temurin-8.jdk/Contents/Home/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "10.16", arch: "x86_64", family: "mac"
```