# Java 面向对象

> 1.什么是对象 2.什么是面向对象 3.什么是类 4.类和对象的关系

## 什么是对象

<a href="https://imgchr.com/i/0XC6Dx"><img src="https://s1.ax1x.com/2020/10/18/0XC6Dx.png" alt="0XC6Dx.png" border="0" width=400 /></a>

> Everything is object （万物皆对象）

**现实存在的客观事物都叫对象**

一处名胜古迹,一只宠物猫,一件衣服,办公用的电脑,身边的父母兄弟等等,只要是现实世界存在的都叫对象

## 什么是面向对象

面向对象就是与对象面对面,从计算机角度而言,可以理解为关注现实存在的事物的各方面信息,重对象的角度出发,根据事物的特征,进行相关的程序设计

```
小明某天路过宠物商店,看见小猫都非常的可爱, 也想买一只回家去养

进店之后,店员问想要养啥样的,小明回答到,想养小点的,可爱的,不容易掉毛的

听完我的描述之后,店员带我看了一只名叫花花的英短和一只叫凡凡的田园

整个宠物店买猫的过程,就可以理解为面向对象的过程

```

> 刚开始描述了需要宠物的模型,这时候是虚拟的但是包含了宠物猫的基本特征,
> 之后宠物店员带我看了两只具体满足我要求的实物, 这就是现实中处理问题的方式

- java 中类就是模型, 用来确定对象将会拥有的特征(属性)和方法

> 类可以理解为一个虚拟化的模子, 是一个概念性的东西

- 对象是类的实例表现

> 真实存在的,会蹦会跳的,摸得着的叫对象

**由于在计算机世界中,所有的信息都是数据,所以说**

- 类是对象的类型

- 对象是特定类型的数据

## 属性和方法

- 属性: 对象具有的各种静态特征(对象有什么)

> 猫的名字,体重,花色,年龄等叫属性

- 方法: 对象具有的各种动态行为(对象能做什么)

> 猫能叫,能睡,能吃,叫方法(能干什么)

## 使用 java 实现买猫的过程

- Cat.java

```java
package com.junjun.animal;

public class Cat {
  // 成员属性: 昵称, 年龄, 体重, 品种
  // 类里面的属性是有属性值的
  // 类型 默认值
  // string null
  // int 0
  // double 0.0
  String name;
  int month;
  double weight;
  String species;

  // 方法: 跑动和吃东西的能力
  public void run() {
    System.out.println("小猫会跑");
  }

  // 方法重载
  public void run(String name) {
    System.out.println(name + "在跑");
  }

  public void eat() {
    System.out.println("小猫吃鱼");
  }
}
```

- CatTest.java

```java
package com.junjun.animal;

public class CatTest {
  public static void main(String[] args) {
    // 对象实例化
    Cat one = new Cat();
    one.run();
    one.eat();

    one.name = "花花";
    one.month = 2;
    one.weight = 1000.1;
    one.species = "美短";

    one.run(one.name);

    System.out.println(one.name);
    System.out.println(one.month);
    System.out.println(one.weight);
  }
}

```

## 单一职责原则

单一职责原则（SRP：Single responsibility principle）又称单一功能原则

面向对象五个基本原则（SOLID： SRP 单一责任原则、OCP 开放封闭原则、LSP 里氏替换原则、DIP 依赖倒置原则、ISP 接口分离原则）之一。

它规定一个类应该只有一个发生变化的原因。该原则由罗伯特·C·马丁（Robert C.Martin）于《敏捷软件开发：原则、模式和实践》一书中给出的。马丁表示此原则是基于汤姆·狄马克(Tom DeMarco)和 Meilir Page-Jones 的著作中的内聚性原则发展出的。

一个类有且只有一个引起功能变化的原因(一个类只有一个功能)

如上代码, Cat 类只负责创建类, 和宠物猫的功能相关, 跟测试相关的信息放在了 CatText 中, 这就是职责单一的表现

[![yAko4J.png](https://s3.ax1x.com/2021/01/30/yAko4J.png)](https://imgchr.com/i/yAko4J)

## 实例化对象的过程分为两步

- 声明对象 Cat one

声明对象在栈里面

- 实例化对象 new Cat()

实例化对象在堆里面

[![0vTNiq.png](https://s1.ax1x.com/2020/10/19/0vTNiq.png)](https://imgchr.com/i/0vTNiq)

## 初始 Java 内存管理之堆和栈

- 栈

```
每个方法（Method）在执行时，都会创建一个栈帧，用于存储局部变量表、操作数、动态链接、方法出口信息等。

需要注意，栈中所存储，多用于保存局部信息的值，譬如：方法体中的基本数据类型定义的变量、对象的引用（也称为对象实例）等。当局部作用范围结束时，栈内信息立即自动释放。

当存储内容是由基本数据类型（byte、short、int、long、float、double、char、boolean）声明的局部变量时，在栈中存储的是它们对应的具体数值。

当存储的是局部的对象的引用（定义在方法体中的引用类型的变量），存储的是具体对象在堆中的地址。当然，如果对象的引用没有指向具体的空间，则是null。

```

- 堆

```
用来存放动态产生的数据，比如new出来的对象。当对象使用结束，并确定已无实例引用指向堆空间时，JVM才会依据相关垃圾回收机制进行资源回收，完成堆内资源释放，也就是说，并不是方法结束，方法内涉及到的堆空间就会立即释放，这也是与栈管理不同的地方。

此时，需要注意，创建出来的对象只包含属于各自的成员变量，并不包括成员方法。因为同一个类拥有各自的成员变量，存储在堆中的不同位置，但是同一个类不同实例的之间共享该类的方法，并不是每创建一个对象就把成员方法复制一次。
```

## 执行流程

1. JVM 自动寻找 main 方法，执行第一句代码，创建一个 Cat 类的实例 one，在栈中分配一块内存，存放一个指向堆区对象的地址譬如 0x111111。(如图 1)

2. 创建一个 double 型的变量 wh，由于是基础数据类型，直接在栈中存放 double 对应的值 200。 (如图 1)

3. 当调用 one 对象的 run 方法，并以 wh 为参数传入方法时，JVM 检测到方法参数 weight，作为方法局部变量，也会放入栈中并将 wh 的值 200 复制给 weight。（如图 2）

4. 当完成 run 方法调用后，立即释放局部变量 weight 所占用的栈空间。 （如图 3）

5. main 方法运行结束，立即释放栈中 one，wh 的空间，而堆中对象空间，则会当确定无引用指向后，由垃圾回收机制进行回收，不会立即释放资源。（如图 4）

[![yAVAAS.png](https://s3.ax1x.com/2021/01/30/yAVAAS.png)](https://imgchr.com/i/yAVAAS)

图 1

[![图2](https://climg.mukewang.com/5e9feb1809a5a19409980419.png)](https://climg.mukewang.com/5e9feb1809a5a19409980419.png)

图 2

[![图3](https://climg.mukewang.com/5e9feb390978fe3409920414.png)](https://climg.mukewang.com/5e9feb390978fe3409920414.png)

图 3

[![图4](https://climg.mukewang.com/5e9feb4f09e6f99008940403.png)](https://climg.mukewang.com/5e9feb4f09e6f99008940403.png)

图 4

## 构造方法

1. 构造方法与类名相同且没有返回值

2. 构造方法的语句格式

```java
public class Cat {
  // 访问修饰符 没有返回值类型 构造方法名与类名相同
  // 可以传入参数
  public Cat() {
    // 初始化代码
  }
}
```

3. 只能在对象实例化的时候调用

4. 当没有指定构造方法时, 系统会自动添加无参的构造方法

```java
public class Cat {
  // 访问修饰符 没有返回值类型 构造方法名与类名相同
  // 可以传入参数
  public Cat() {
    System.out.println("这是无参构造方法");
  }
  public void run() {
    System.out.println("小猫会跑");
  }
}
```

```java
package com.junjun.animal;

public class CatTest {
  public static void main(String[] args) {
    // 对象实例化
    Cat one = new Cat();
    one.run();
    // 输出:
    // 这是无参构造方法 (先执行构造方法)
    // 小猫会跑
  }
}
```

5. 当有指定构造方法, 无论是有参、无参的构造方法, 都不会自动添加无参的构造方法, 需要手动指定

6. 一个类中可以有多个构造方法

## 类成员属性的初始值

[![0xe2N9.png](https://s1.ax1x.com/2020/10/19/0xe2N9.png)](https://imgchr.com/i/0xe2N9)

## this 的注意事项

[![0xmtKK.png](https://s1.ax1x.com/2020/10/19/0xmtKK.png)](https://imgchr.com/i/0xmtKK)
