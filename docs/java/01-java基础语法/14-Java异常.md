# Java异常

## 异常分类

[![BJbCYn.png](https://s1.ax1x.com/2020/10/29/BJbCYn.png)](https://imgchr.com/i/BJbCYn)

```java
public class Test {
  public static void main(String[] args) {
    System.exit(10); // 终止代码执行
    try {
      System.out.println(12/0);
    } catch (Exception e) {
      e.printStackTrace(); // 可以捕获错误出错的位置, 出现位置很随机
      System.out.println(e);
    } finally {
      // 无论程序是否出现异常, 这块代码都会执行, 强制执行
      System.out.println("无论程序是否出现异常, 这块代码都会执行"); 
    }
  }
}
```

## throw抛出异常

```java
public class TestErr {
  public static void main(String[] args) {
    TestErr.testAge();
  }
  public static void testAge() {
    int age = 11;
    if (age < 18 || age > 80) {
      try {
        throw new Exception("18岁以下,80岁以上不能住");
      } catch (Exception e) {
        e.printStackTrace();
      }
    } else {
      System.out.println("欢迎您");
    }
  }
}

```
