# shell 脚本配置自动部署

上面测试之后, jenkins 只会执行一个 echo 脚本, 并不会帮我们部署和运行项目, 我们还需要配置 shell 脚本, 运行我们的 dockerfile 脚本才行

## shell 脚本的简单介绍

```shell
# 这句表示这是一个shell脚本
#!/bin/bash

# 定义变量
# ${containerName} 表示读取jenkins配置参数
# echo $containerName 输出这个变量的值(shell语法)
containerName=${containerName}

port=${port}

# --no-cache 不需要缓存 以保证每次构建都是最新的文件
# 完成了镜像的构建
# docker build --no-cache -t web:1.0 .
docker build --no-cache -t ${imageName}:${tag} .

# docker inspect 查看容器所有的状态
running=${docker inspect --format="{{ .State.Running }}" $containerName 2 > /dev/null}

# 条件判断
# -n 空值判断 如果有一个运行的状态
if [ ! -n $running ]; then
	echo "$containerName does not exit"
    return 1
fi

# 跑服务
docker run -itd --name ${containerName} -p ${port}:80 ${imageName}:${tag}
```
