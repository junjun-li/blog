# Java运算符

### 除法的注意事项

```java
public class BooleanDemo {
  public static void main(String[] args) {
    // 分子分母都是整型时, 结果为整除后的结果
    System.out.println(13/5); // 输出2
    System.out.println(13.0/5);// 输出2.6
    // ++ --
    num2 = ++num1 // 先进行加法运算, 在进行赋值运算
    num2 = num1++

  }
}
```

### 自增自减运算符

```java
public class Operation {
  public static void main(String[] args) {
    // ++ --
    num2 = ++num1 // 先进行加法运算, 在进行赋值运算
    // 执行方式 先加减,后赋值
    num1 = num1+1;num2=num1
    // 结果
    num1 = 2;
    num2 = 2
    // 如下图
  }
}
```

[![0Wk4aV.png](https://s1.ax1x.com/2020/10/12/0Wk4aV.png)](https://imgchr.com/i/0Wk4aV)

### 逻辑"与"运算符

```java
public class Demo {
  public static void main(String[] args) {
    // &一个运算符
    int n = 3;
    boolean b = (3 > 7) & ((n++) < 2); // 问: b=? n=?
    // 输出 b = false; n = 4;
    
    // 两个 && 又叫短路运算符 如果左边的计算为false, 右边的就不执行了
    boolean b = (3 > 7) && ((n++) < 2);
    // 输出b = false; n = 3; 因为左边的是false, 所有右边的代码不会执行了
  }
}
```

### 逻辑"或"运算符
```java
public class Demo {
  public static void main(String[] args) {
    // |运算符
    int n = 3;
    boolean b = (3 > 7) | ((n++) < 2); // 问: b=? n=?
    // b = true, n = 4
    boolean b = (3 > 7) || ((n++) < 2); // 问: b=? n=?
    // b = true, n = 3
    // "||"运算符是: 如果左边计算后的操作数为true，右边则不再执行，返回true。
    //  "|"运算符是：前后两个操作数都会进行计算。
  }
}
```

### 运算符的优先级

[![0h4VfS.png](https://s1.ax1x.com/2020/10/13/0h4VfS.png)](https://imgchr.com/i/0h4VfS)

### switch结构
```java
switch(表达式) {
  case 常量表达式1:
    语句1;break;
  case 常量表达式2:
    语句1;break;
  default:
    语句3;
}
```