# Robo3T语法

## 修改-批量更新post的所有数据

```shell
# 使posts中所有的数据, 都加上uid的字段
db.getCollection('posts').updateMany({}, {$set: {"uid":"5ffc601c84829c443efd8631"}})
```