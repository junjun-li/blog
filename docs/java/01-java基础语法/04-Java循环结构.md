# Java循环结构

### while循环

```java
// 循环求1-5的和
public class Demo {
  public static void main(String[] args) {
    int n = 1;
    int sum = 0;
    while (n <= 5) {
      sum += n;
      n++;
    }
    System.out.println(sum)
  }
}
```

### do-while

```java
// 1. do-while循环至少循环一次
// 2. 循环条件后的分号不能丢
public class Demo {
  public static void main(String[] args) {
    int n = 1;
    int sum = 0;
    do {
      sum += n;
      n++;
    } while (n <= 5);
  }
}
```

### for循环

```java
public class Demo{
  public static void main(String[] args) {
    int sum = 0
    for (int = 1;n <= 5;n++) {
      sum=sum+n
    }
    // 可以使用break跳出循环 
    // continue结束当前循环的执行, 但是还要继续下一次循环执行
    System.out.println(sum);
  }
}
```