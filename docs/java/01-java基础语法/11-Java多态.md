# Java 多态

## 什么是多态

- 生活中

如按下键盘的 F1, 在不同的应用下面会有不同的反应, 这就是多态

- 程序设计中

意味着允许不同类的对象对同意消息做出不同的响应

- 多态的必要条件

1. 满足继承关系
2. 父类引用指向子类对象

## 向上转型以及向下转型

- 向上转型(隐式转型, 自动转型)

父类引用指向具体的子类实例, 小类转换大类

:::tip 提示

1. 向上转型, 可以调用子类重写父类的方法, 以及父类派生的方法, 子类本身的方法就无法使用了

2. 静态方法不允许被重写
   :::

- 向下转型: 父类引用转换成子类引用, 大类转小类

### 向上转型语法及用处

> 即父类引用指向子类实例化对象, 也称之为自动转型或隐式转型

```java
public class Test {
  public static void main(String[] args) {
    Animal one = new Animal();
    // 向上转型: Animal父类的引用指向了子类Cat
    // 父类引用指向了子类实例
    // 把一个子类的对象转型为父类对象
    // 隐式转型,自动转型,
    Animal two = new Cat(); // 无法调用猫类自己的方法了
    Animal three = new Dog();
    one.eat();
    two.eat();
    three.eat();
  }
}
```

此时, two 只能访问**子类继承**或者**重写父类**的方法, 但是不能访问 Cat 自己的方法了

### 向上转型的有什么用处？直接创建子类对象不是更方便？

> 如果需要设置方法实现对各各子类 eat 方法的调用

- Person 类

```java
public class Person {
  public void eat() {
    System.out.println("是个人就要吃饭");
  }
}
```

- Chinese 类

```java
public class Chinese extends Person {
  public void eat() {
    System.out.println("中国人爱吃饺子");
  }
  public void run() {
    System.out.println("中国人会跑");
  }
}
```

- French 类

```java
public class French extends Person {
  public void eat() {
    System.out.println("法国人爱喝香槟");
  }
}
```

- PersonTest 运行

```java
public class PersonTest {
  public void eatTest(Person person) {
    person.eat();
  }

  // public void eatTest(Chinese ch) {
  //   ch.eat();
  // }
  //
  // public void eatTest(Russian ch) {
  //   ch.eat();
  // }
  //
  // public void eatTest(French ch) {
  //   ch.eat();
  // }

  public static void main(String[] args) {
    // Person chine = new Chinese();
    // chine.eat();
    PersonTest personTest = new PersonTest();
    personTest.eatTest(new Chinese());
    personTest.eatTest(new Russian());
    personTest.eatTest(new French());
  }
}
```

> 由上述代码 demo 可以清晰看出, 以后无论增加多少**人的类**, eatTest 都不需要重载了

### 为什么需要向下转型，直接实例化子类不是更简单？

> 向下转型一般是为了重新获得因为向上转型而丢失的子类特性而存在
> 因此,统筹在向下转型前需要先进行向上转型
> 向下转型通常也会结合`instanceof运算符`一起使用

此时如需在测试类 eatTest 方法中，修改 eatTest ，实现针对传入不同的参数分别调用各自独立方法，则可以参考如下代码

```java
public class PersonTest {
  public void eatTest(Person person) {
    if(person instanceof Chinese) {
      ((Chinese)person).TaiJiQuan();
    } else if (person instanceof Russian) {
      ((Russian) person).Wrestling();
    } else if (person instanceof French) {
      ((French) person).Fencing();
    }
    person.eat();
  }
  public static void main(String[] args) {
    PersonTest personTest = new PersonTest();
    personTest.eatTest(new Chinese());
  }
}
```

由此可见，借由向下转型，可以在灵活应用多态的基础上，同时兼顾子类的独有性，相较于直接创建子类实例，提高了代码加灵活性。

### instanceof 运算符

> 对象 => 类
> A instanceof B 语句表示左边对象引用类型是否可满足右边类型实例特征
> 判断对象是否是类的实例
> 可以提高向下转型的安全性

## abstract 抽象类

当一个类加上**abstract**关键字之后, 这个类就不能使用 new 来实例化了, 否则就会报错

但是可以通过向上转型, 指向子类实例

## abstract 抽象方法

如果在父类方法前面加上 abstract 关键字, 则这个函数不能增加方法体, 子类必须重写该方法, 否则会报错

```java
class Animal {
  // 抽象类没有方法体
  public abstract void eat();
}
```

## 抽象类&抽象方法使用规则

1. abstract 定义抽象类
2. 抽象类不能直接实例化, 只能被继承, 可以通过向上转型完成对象实例
3. abstract 定义抽象方法, 不需要具体实现
4. 包含抽象方法的类一定是抽象类
5. 但是抽象类可以没有抽象方法
6. 类里面有抽象方法, 这个类的子类必须`重写`抽象方法, 或者把这个子类也变成抽象类, 否则会报错
7. static, final, private 关键字不能与 abstract 共存
