# python 字符串

```python
>>> "hello word"
'hello word'
>>> 'hello word'
'hello word'
# 多行字符串, 和js的模板字符串很像
>>> '''
hello word
'''
'\nhello word\n'
>>>
```

## 转义字符

`\`使转义字符, 不转义

```python
>>> print('hello \n word')
hello
 word
>>> print('hello \\n word')
hello \n word
```

## r 不转义

当一个字符串前面加入了 `r`, 就表示这个字符串是一个`原始字符串`, 表示所见即所得, `\n`等转义字符不转义

```python
>>> print('c:\nrothwind\nrothwest')
c:
rothwind
rothwest
>>> print('c:\\nrothwind\\nrothwest')
c:\nrothwind\nrothwest
>>> print(r'c:\nrothwind\nrothwest')
c:\nrothwind\nrothwest
>>>
```

## 字符串的操作

- 字符串运算

```python
>>> 'hello' + 'word'
'helloword'
>>> 'hello' * 3
'hellohellohello'
```

- 获取字符串的值

```python
>>> 'hello word'[0]
'h'
# 如果输入负数, 就从末尾截取
>>> 'hello word'[-1]
'd'

# 截取区间
>>> 'hello word'[0:5]
'hello'

# 表示从字符串的末尾往回截取
'hello word'[0:-2]
'hello wo'
```
