# Java字符串

## 字符串和byte数组之间的转换

```java
class Test {
  public static void main(String[] args) {
    String str = new String("JAVA 编程 基础");
    byte[] arr = str.getBytes();
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
    System.out.println("======");
    String str1 = new String(arr);
    System.out.println(str1);
  }
}
```

## ==和equals的区别

> equals 比较的是内容是否相同
> == 比较的是地址是否相同

[![BwyaA1.png](https://s1.ax1x.com/2020/11/01/BwyaA1.png)](https://imgchr.com/i/BwyaA1)
