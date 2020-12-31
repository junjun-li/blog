# MongoDB 简介&安装

[macOS 安装](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

## linux 使用 docker 安装

[dockerHub-mongo](https://hub.docker.com/_/mongo)

```yml
version: '3.1'

services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
    ports:
      - 27017:27017
    volumes:
      - /docker-data/mongo:/data/db
```

```shell
docker-compose up -d
# 开启防火墙
firewall-cmd --add-port=27017/tcp --permanent
success
# 重启防火墙
firewall-cmd --reload
success
```

## 连接 mongodb

```shell
# 进入docker的交互式终端 docker-data_mongo_1 容器名称可能会变
docker exec -it docker-data_mongo_1 mongo

MongoDB shell version v4.2.7
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("53b71a10-048c-4890-a27d-81a614f3f56a") }
MongoDB server version: 4.2.7
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
	http://docs.mongodb.org/
Questions? Try the support group
	http://groups.google.com/group/mongodb-user
>
```

```shell
# 上面的指令只是进入了交互式终端, 还需要输入密码
> show dbs
> use admin
switched to db admin
> db.auth('root','example')
1
# 现在就可以看见所有数据库了
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
>
```

## 操作数据库

```shell
> use testdb
switched to db testdb
> db.createUser({user:'test',pwd:'123456',roles:[{role:'dbOwner',db:'testdb'}]})
Successfully added user: {
	"user" : "test",
	"roles" : [
		{
			"role" : "dbOwner",
			"db" : "testdb"
		}
	]
}
> use testdb
switched to db testdb
> db.auth('test', '123456')
1
# 至此为止, 可以创建数据了
```

## 基本的 sql 语句

```shell
# 使用我们刚刚创建的test账户
> db.auth('test','123456')
1
# 插入一条数据
> db.users.insertOne({name: "junjun", age: 24, email: "11776174@qq.com"})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5febd2c3726097f701ec826d")
}
> show collections
users
> db.users.find({})
{ "_id" : ObjectId("5febd2c3726097f701ec826d"), "name" : "junjun", "age" : 24, "email" : "11776174@qq.com" }

# 再来一条
> db.users.insertOne({name: "junjun2", email: "11776174@qq.com"})
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5febd46b726097f701ec826e")
}
# 就此我们可以发现非关系型的数据非常随意
> db.users.find({})
{ "_id" : ObjectId("5febd2c3726097f701ec826d"), "name" : "junjun", "age" : 24, "email" : "11776174@qq.com" }
{ "_id" : ObjectId("5febd46b726097f701ec826e"), "name" : "junjun2", "email" : "11776174@qq.com" }

# 我们现在来修改刚刚插入的内容
# updateOne()
# 参数一表示搜索条件
# 参数二表示修改内容
> db.users.updateOne({name: "junjun2"}, {$set: {age: 25}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
> db.users.find({})
{ "_id" : ObjectId("5febd2c3726097f701ec826d"), "name" : "junjun", "age" : 24, "email" : "11776174@qq.com" }
{ "_id" : ObjectId("5febd46b726097f701ec826e"), "name" : "junjun2", "email" : "11776174@qq.com", "age" : 25 }

# 最后删除一条数据 和update类似
> db.users.deleteOne({name: "junjun2"})
{ "acknowledged" : true, "deletedCount" : 1 }
> db.users.find({})
{ "_id" : ObjectId("5febd2c3726097f701ec826d"), "name" : "junjun", "age" : 24, "email" : "11776174@qq.com" }
```

## mongode的备份和恢复

### 备份

```shell
# -h mongodb的host
# -u 用户
# -p 密码
# -d 指定备份哪个数据库, 不加备份所有
# -o 指定备份到哪一个目录
docker exec -it docker-data_mongo_1 mongodump -h localhost -u root -p example -o /tmp/test
```

:::tip
`/tmp/test` 是在我们的容器内部, 我们的宿主机上面是没有的, 我们需要拷贝出来
:::

```shell
# 使用此命令把容器内部的数据复制出来
# 269b88734623 容器id 
docker cp 269b88734623:/tmp/test /tmp/test
```

### 恢复

```shell
# --dir /tmp/test 备份的目录
# /tmp/test 是在宿主机上, 要拷贝到镜像内部
docker exec -it docker-data_mongo_1 mongodump -h localhost -u root -p example --dir /tmp/test
# 看到如下图的 done 说明数据已经恢复了
```

[![rqRVAJ.png](https://s3.ax1x.com/2020/12/30/rqRVAJ.png)](https://imgchr.com/i/rqRVAJ)

