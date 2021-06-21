# Java 包装类

Java 是一种面向对象的编程语言，但 Java 中却存在 8 种“特殊的”数据类型，它们不支持面向对象的编程机制，也不具备面向对象的特性(不包含任何属性和方法)。这 8 种数据类型分别为 byte、short、int、long、char、double、float 以及 boolean, 它们被称为 Java 的 8 种基本数据类型。

兼容这 8 种基本数据类型给开发带来了一定的便利，例如采用 8 种数据类型进行常规的数据处理时非常的方便。但在某些场景下，采用基本数据类型却带来了一定的约束，它们只是纯粹的数据，除了数值本身的信息之外，基本类型数据不带有其他信息或者可操作方法。而这在实际使用中存在很多不足。例如：当某个方法的形参只接受引用数据类型，但方法调用者只能提供基本数据类型的实参时，基本数据类型就显得无能为力了。

为解决这一矛盾，Java 在 1.5 之后为每个基本数据类型引入了对应的包装类，他们之间的对应关系及默认值具体如表 1 所示。包装类不仅弥补了基本数据类型在面向对象上的不足，而且还可与其对应的基本数据类型之间进行相互转换，这一功能称之为“拆箱&装箱”操作。其中，装箱，即为把基本数据类型转换为其包装类；而拆箱，则是将包装类转换为基本数据类型。

## 包装类的作用

所有的包装类都有`final`关键字, 所以 Java 的包装类不能被继承, 并且没有子类

[![BdIN5Q.png](https://s1.ax1x.com/2020/11/01/BdIN5Q.png)](https://imgchr.com/i/BdIN5Q)

## 基本类型对应的包装类

[![BdId8s.png](https://s1.ax1x.com/2020/11/01/BdId8s.png)](https://imgchr.com/i/BdId8s)

在包装类与基本数据类型的使用，几点需要注意：

1. 类型特点：包装类是引用类型，拥有方法和属性；基本数据类型只包含数值信息。

2. 储存方式：包装类型对象实例化，借由 new 在堆空间里进行空间分配，对应栈空间中存储地址引用；基本数据类型变量对应栈空间中存储的是具体数据值。如下图所示。通常，包装类的效率会比基本数据类型的效率低，空间占用大。

[![yhm8s0.png](https://s3.ax1x.com/2021/02/19/yhm8s0.png)](https://imgchr.com/i/yhm8s0)

3. 初始值：基本数据类型有各自默认初始值，包装类的对象未初始化时，初始值均为 null

## 装箱与拆箱

`装箱`和`拆箱`主要用于包装类和基本数据类型的转换

装箱: 基本数据类型 => 包装类

拆箱: 包装类 => 基本数据类型

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

```java
public class WrapTestTwo {
  public static void main(String[] args) {
    int t1 = 2;
    // 基本数据类型 => 字符串
    String t2 = Integer.toString(t1);
    System.out.println(t2);

    // 字符串 => 基本数据类型
    int t3 = Integer.parseInt(t2);
    System.out.println(t3);
  }
}
```

## 包装类的注意事项

```java
package com.company;

import java.sql.SQLOutput;

public class WrapTest {
  public static void main(String[] args) {
    Integer one = new Integer(100);
    Integer two = new Integer(100);

    // 自动装箱 会隐式调用 Integer three = Integer.valueOf(100)
    Integer three = 100;

    // 自动装箱
    Integer four = 100;

    // 对象比较一定是false
    System.out.println("on == two的结果" + (one == two)); // false

    // 自动拆箱了,还原整数值100
    System.out.println("three == 100吗? :" + (three == 100)); // true

    // java在执行默认的拆箱装箱的时候, 默认执行
    // Integer four = Integer.valueOf(100)
    // valueOf(100)这段代码执行的时候,有一个缓存区(对象常量池)
    // 如果-128 <= 参数 <=127, 会直接从缓存区查找对象, 如果有就会直接产生, 所以会是true
    // 如果没有就会隐式的调用 new Integer 产生
    // three和four指向同一缓存区的变量
    System.out.println("three == four吗? : " + (three == four)); // true

    Integer five = 200;
    System.out.println("five == 200 ? " + (five == 200));

    // -128 <= 参数 <=127 才会相等
    Integer six = 200;
    System.out.println("five == six ? " + (five == six));
  }
}

```

[![yhy86s.png](https://s3.ax1x.com/2021/02/19/yhy86s.png)](https://imgchr.com/i/yhy86s)

1. 有基本数据类型多方便呀，为什么还要弄个包装类？既然需要包装类，为什么还要装箱和拆箱？自动拆装箱这么方便，手动拆装箱还有存在的意义吗？

基本数据类型空间占用少，性能高给开发带来了一定的便利，但同时也因为只能存储纯粹的数据，而无法以对象的形态操作属性和方法，在很多实际应用时带来一定约束。所以，两者是需要并存的，也是需要能支持相互转换的，而这也是装箱和拆箱存在的目的。至于自动拆装箱，其实底层封装的还是手动拆装箱的操作，所以还是有存在价值的。

2. 装、拆箱操作对比强制类型转换有什么不同呢？

类型的强制转换和装箱/拆箱是不同的：

- 装箱&拆箱多用于同类型基本数据类型和其对应包装类之间；强制转换多用于可兼容类型之间。

- 强制类型转换时不产生新的对象的，只有类型兼容性检查和安全性检查等性能消耗。

3. 哪几种包装类支持缓存操作？

Java 在几种包装类中提供了缓存设计，会对一定范围内的数据作缓存，如果数据在范围内，会优先从缓存中取数据，超出范围才会创建新对象。其中：

- Byte、Short、Integer、Long：缓存[-128，127]区间的数据

- Character：缓存[0，127]区间的数据

- Boolean：缓存 true、false。

- **注意，Double、Float 并不支持。**

4. 方法重载时，如重载方法的参数分别为基本数据类型与包装类，会如何执行调用？

当方法以基本数据类型和其对应包装类作为方法重载的参数条件时，原则是：各回各家，各找各妈。如下图 1 所示，类中分别存在以 Integer 和 int 作为参数的 testAge 方法，当主方法中传入包装类对象时，输出结果如图 2 所示。

```java
public class Test {
  public static void main(String[] args) {
    testAge(new Integer(1));
  }

  public static void testAge(Integer i) {
    // 执行这一段代码
    System.out.println("我是包装类做参数的方法");
  }

  public static void testAge(int i) {
    System.out.println("基本数据类型做参数的办法");
  }
}
```

5. 可以与 int 直接运算么？

当包装类正常实例化后，可以与基本数据类型进行运算操作。

```java
public static void main(String[] args) {
  // 这里自动装箱完成了赋值
  Integer one = 12;
  int two = 10;
  // 这里相加的时候又进行了自动拆箱
  System.out.println(one + two);
}
```
