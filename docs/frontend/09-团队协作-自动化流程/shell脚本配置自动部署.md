# shell 脚本配置自动部署

上面测试之后, jenkins 只会执行一个 echo 脚本, 并不会帮我们部署和运行项目, 我们还需要配置 shell 脚本, 运行我们的 dockerfile 脚本才行

## shell 脚本的简单介绍


```shell
# 这句表示这是一个shell脚本
#!/bin/bash

# 定义变量
CONTAINER_NAME=${container_name}
PORT=${PORT}
```