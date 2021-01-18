# 正则表达式

## 正则是什么，能做什么？

我们先来说概念。正则，就是正则表达式，英文是 Regular Expression，简称 RE。顾名思义，正则其实就是一种`描述文本内容组成规律的表示方式。`

## 创建正则表达式

```js
// 1. 构造函数的方式
let regExp = new RegExp(/\d/)

// 2. 正则字面量
let regExp = /\d/

// 3. 正则的使用
/\d/.test("aall")
```

## 元字符

正则表达式由一些普通字符和元字符组成, 普通字符包括大小写字母, 数字等, 而元字符具有特殊含义

[![sYsk5Q.png](https://s3.ax1x.com/2021/01/12/sYsk5Q.png)](https://imgchr.com/i/sYsk5Q)

## 优先级

`|`表示或, 优先级最低

`()`表示优先级最高, 表示分组

## 元字符

```js
// 元字符
// \d  数字  如果有数字就返回true
// console.log( /\d/.test('abc123'));
// console.log( /\d/.test('123'));
// console.log( /\d/.test(''));

// \D  非数字 有非数字为 true
// console.log( /\D/.test('abc123'));
// console.log( /\D/.test('123'));
// console.log( /\D/.test('abc'));

// \w  有字母或数字 为true
console.log(/\w/.test('abc123'))
console.log(/\w/.test('123'))
console.log(/\w/.test('abc'))

// \W 有非字母或数字
console.log(/\W/.test('abc '))
console.log(/\W/.test('123'))
console.log(/\W/.test('abc'))

// \s 有不可见字符的true  (特殊字符)
console.log(/\s/.test('123 '))
console.log(/\s/.test('\r'))

// \S 有可见字符  true
console.log(/\S/.test('abc '))

// . 任意字符   (\n \r)
console.log(/./.test('abc'))
console.log(/./.test('123'))
console.log(/./.test(''))
console.log(/./.test('_'))
console.log(/./.test('\n'))
```

## 字符类的元字符

`[]`在正则表达式中表示一个字符的位置, `[]`里面写这个位置可以出现的字符

```js
console.log(/[abc]/) // 匹配 a,b,c
```

`[^]`在中括号中的`^`表示非的意思 是否包括除了 XX 以外的字符串

```js
// ^ 表示该位置出现了该字符, 返回true
console.log(/^0/.test('0las')) // true

// [^0]: 除了0以外的字符
console.log(/[^0]/.test('laa000')) // /[^0]/只要开头不是0, 都是true
```

` [a-z]``[1-9] `表示范围

```js
console.log(/[a-z]/.test('d')) //小写字母
console.log(/[A-Z]/.test('d')) //大写字母
console.log(/[0-9]/.test('8')) //数字
console.log(/[a-zA-Z0-9]/) //所有的小写字母和大写字母以及数字
```

## 边界类元字符

> 我们刚刚看见的正则只要有满足条件的就会返回 true, 并不能做到精确匹配

^表示开头 []里面的^表示取反

$表示结尾

```js
console.log(/^chuna/.test('dachuna')) // false 必须以chuna开头
console.log(/chuna$/.test('chuna')) // true 必须以chuna结尾
console.log(/^chuan$/.test('chuan')) // true 精确匹配
```

## 量词类元字符

> 量词用来控制出现的次数, 一半来说量词和边界会一起使用

```js
//量词用来控制出现次数的

//console.log(/a/.test("abc"));
//console.log(/^a/.test("abc"));
//console.log(/^a$/.test("abc"));
```

1. `*`表示能够出现 0 次或者更多次，x>=0;
2. `+`表示能够出现 1 次或者多次，x>=1
3. `?`表示能够出现 0 次或者 1 次，x=0 或者 x=1
4. `{n}`表示能够出现 n 次
5. `{n,}`表示能够出现 n 次或者 n 次以上
6. `{n,m}`表示能够出现 n-m 次

## 正则的使用

1. 验证座机

比如 010-12345678 0797-1234567
开头是 3-4 位，首位必须是 0
后面是 7-8 位

```js
// ^0 以0开头
// \d 元字符(限制只能是数字)
// {2,3}表示只能够出现2-3次
// - 精确匹配 -
// \d{7,8} 下标7-8是数字
// $ 以数字结尾
var phoneReg = /^0\d{2,3}-\d{7,8}$/;​
```

2. 验证 qq

只能是数字
开头不能是 0
长度为 5-11

```js
// [^1-9]开头不能是0
// \d 必须是数字
// {4,10} 5-11位数
var qqReg = /[^1-9]\d{4,10}$/
```

3. 验证手机

11 位数字组成
号段 13[0-9] 147 15[0-9] 177[0178] 18[0-9]

```js
var mobilReg = /^(13[0-9]|147|15[0-9]|17[0178]|18[0-9])\d{8}$/
```

4. 验证邮箱

前面是字母或者数字
必须有@
@后面是字母或者数字
必须有.
.后面是字母或者数字

```js
var emailReg = /^\w+@\w+(\.\w+)+$/
```

## 正则替换 replace

```js
var str = '   123AD  asadf   asadfasf  adf  '

// 1. 替换掉字符串中的所有空白
// g: 表示搜索所有
str = str.replace(/ /g, '')

// 2. 将所有的ad替换成xx
// i: 表示忽略大小写
str = str.replace(/ad/gi, 'xx')

// 3. 将所有的ad/AD替换成xx
str = str.replace(/ad|AD/g, 'xx')
```

## 正则匹配 match

```js
// 正则的方法 : test() 测试           exec ==> 数组 提取正则的方法
// 字符串的方法 : replace 替换,       match ==> 数组 匹配

// 需求：把字符串中所有的手机号找出来。
var str =
  '我的手机号是：18511241111， 我的女朋友的手机号是：13211111111，我的前女友的手机号是：18522223333，我的前前女友的手机号是：18511112293'
// match: 返回匹配到的所有项, 是一个数组, 没有则返回null
// 以1开头, 第二位是 3-9 的数字, 接下来9位是数字
var a = str.match(/1[3-9]\d{9}/g)
```

## 正则匹配 exec

```js
//今天是2018-05-11， 要求；得到年月日;
var str = '今天是2018-05-11， 要求；得到年月日'

// 正则1
// 不加小括号  提取数组的一个匹配值
var reg = /\d{4}-\d{2}-\d{2}/

// 正则2
// 数组的第1个元素就是匹配到的
// 其他元素(2-3-4)  小括号里面的内容
var reg = /(\d{4})-(\d{2})-(\d{2})/

var a = reg.exec(str)

console.log(a)
```

## 总结

```js
//1. 字符串的 replace : 正则的替换
//2. 字符串的匹配 match : 匹配某个字符串中所有符合规律的字符串。
//3. 正则的测试 test : 表单校验，判断某个字符串是否符合正则的规律
//4. 正则的提取 exec :提取匹配的字符串的每一个部分。  ()进行分组
```
