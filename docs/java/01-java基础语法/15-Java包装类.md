# Java包装类

## 包装类的作用

> Java的包装类不能被继承


[![BdIN5Q.png](https://s1.ax1x.com/2020/11/01/BdIN5Q.png)](https://imgchr.com/i/BdIN5Q)

## 基本类型对应的包装类

[![BdId8s.png](https://s1.ax1x.com/2020/11/01/BdId8s.png)](https://imgchr.com/i/BdId8s)

## 装箱与拆箱

```java
public class wrapDemo {
  public static void main(String[] args) {
    // 装箱: 把基本数据类型装换为包装类
    // 1. 自动装箱
    int t1 = 1;
    Integer t2 = t1;
    // 2. 手动装箱
    Integer t3 = new Integer(t1);
    System.out.println(t1);
    System.out.println(t2);
    System.out.println(t3);
    System.out.println("======================");
    // 拆箱: 把包装类转换为基本数据类型
    // 1. 自动拆箱, 把一个包装类赋值给基本数据类型, 就可以实现自动拆箱
    int t4 = t2;
    // 2.手动拆箱
    int t5 = t2.intValue();
  }
}
```
