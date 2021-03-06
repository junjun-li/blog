# Redis 和 Node 集成与实践

## Redis GUI 工具

[GitHub](https://github.com/qishibo/AnotherRedisDesktopManager/releases)

## Redis Node 集成

[npm - Redis Node](https://www.npmjs.com/package/redis)

```js
// redisConfig
import redis from 'redis'
import { promisifyAll } from 'bluebird'
import config from './index'

const options = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
  // 当我们给redis传递二进制的数据时,redis会把这个返回回来
  detect_buffers: true,
  // https://github.com/NodeRedis/node-redis
  // 这里采用 node-redis 官方的例子
  retry_strategy: options => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    // 如果总共尝试的时长大于60分钟
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    // 如果总共尝试的次数大于10次
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}

// const client = redis.createClient(options)
const client = promisifyAll(redis.createClient(options))

client.on('error', err => {
  console.log(`redis client Error: ${err}`)
})

const setValue = (key, value) => {
  if (typeof value === 'undefined' || value === null || value === '') return

  if (typeof value === 'string') {
    client.set(key, value)
  } else if (typeof value === 'object') {
    Object.keys(value).forEach(item => {
      // hmset 用法
      // client.hmset('example', 'foo', 'bar')
      // client.hmset('example', 'hello', 'world')
      // client.hmset('example', 'name', 'junjun')
      client.hmset(key, item, value[item], redis.print)
    })
  }
}

// const { promisify } = require('util')
// const getAsync = promisify(client.get).bind(client)

const getValue = key => {
  // return getAsync(key)
  return client.getAsync(key)
}

const getHMValue = key => {
  // v8 promisify method use util, must node > 8
  // return promisify(client.hgetall).bind(client)(key)

  // use bluebird
  return client.hgetallAsync(key)
}

const delValue = key => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully')
    } else {
      console.log(`delete redis key error: ${err}`)
    }
  })
}

export { client, setValue, getValue, getHMValue, delValue }
```

使用 `npx babel-node src/config/redis-text.js` 测试我们的是否生效

```js
import { setValue, getValue, getHMValue, delValue } from './RedisConfig'

setValue('setValue', 'setValue')

getValue('setValue').then(res => {
  console.log(res)
})

setValue('setObject', {
  name: 'luowei',
  age: 23,
  email: '981311431@qq.com'
})

getHMValue('setObject').then(res => {
  console.log(res)
})

// delValue('setValue')
```

## redis 版本的问题

今天是 2021.1.9, 我查看我 docker 中 redis 的版本

```shell
docker exec -it redis redis-server -v
Redis server v=6.0.9 sha=00000000:0 malloc=jemalloc-5.1.0 bits=64 build=11509227cb1fdf31
```

我本地 mac 的版本是

```shell
127.0.0.1:6379> info
# Server
redis_version:5.0.8
```

在我本地使用 node-redis 操作, 是可以设置过期时间的, 使用 6.0 以上的版本却不行

先把 docker 中的 redis 回退一下, 先记录, 方便以后查看问题
