# Java 接口

- 接口定义了某一批类所需要遵守的规范

- 接口不关心这些类的内部数据, 也不关心这些类里方法的实现细节, 它只规定这些类里必须提供某些方法

## 接口语法

```java
package com.junjun.tel;

// 接口通常使用 public
public interface INet {
  // 增加 abstract 关键字更加符合语义化
  // 也可以不写 abstract 关键字
  public abstract void network();

  // 当包含多个抽象方法的时候, 作为实现类, 必须实现所有的方法
  // 如果不想实现, 可以把类变成抽象类
  // public abstract void connection();

  // 定义常量
  // public static final int TEMP = 20;
  // 接口中可以包含常量, 默认会加 public static final 三个关键字
  int TEMP = 20;

  // 默认方法, 可以带方法体
  // 可以在实现类中重写, 并可以通过接口的引用调用
  // 调用父类的默认方法要这样子搞
  // INet.super.connection();
  default public void connection() {
    System.out.println("connection默认方法");
  }

  // 静态方法 可以带方法体 jdk1.8后增加的
  // 不可以在实现类中重写, 可以使用接口名调用
  static void stop() {
    System.out.println("我是接口中的静态方法");
  }
}

```

- 接口的实现放在继承后面, 一个类只能继承一个父类, 但是可以同时实现若干接口

- 在实现多个接口的时候, 要注意实现接口里面的待重写方法

- 当一个类实现多个接口, 而接口有多个重名方法的时候, 对于实现类而言, 必须重写一个满足特征的方法, 如果这个类继承了父类, 默认情况下, 会直接调用父类派生下来的方法

## 接口的继承

```java
// 接口可以继承多个父接口
// 对于实现类, 要实现接口的所有方法
public interface ISon extends IFather1, IFather2 {
  
}
```
