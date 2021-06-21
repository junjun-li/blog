# 泛型

## 作用

1. 提高 Java 程序的类型安全

通过前面的学习我们知道，在集合中可以添加 Object 类型的对象，如果在不使用泛型的情况下定义了一个 ArrayList 对象，那么各种类的对象都可以添加到该集合中。而在从集合中取值时，都需要进行强制类型转换，可以把取出的对象转换成任意类型，但是编译时不报错，但是运行时会发生 ClassCastException 异常。

因此，使用泛型可以使编译器知道集合的类型限制，在编译期如果添加不同类型的数据就能发现错误。

2. 消除强制类型转换

泛型可以消除源代码中的许多强制类型转换，这样可以使代码可读性更好，并减少出错的机会

## 案例

[![68dA6f.png](https://s3.ax1x.com/2021/03/09/68dA6f.png)](https://imgtu.com/i/68dA6f)

## 泛型作为参数

🌰1:

- Goods

```java
package com.company;

public abstract class Goods {
  public abstract void sell();
}
```

- Books

```java
package com.company;

public class Books extends Goods {
  @Override
  public void sell() {
    System.out.println("sell books");
  }
}

```

- GoodsSeller

```java
package com.company;

import java.util.List;

public class GoodsSeller {
  // ? extends 子类的列表也可以传入
  public void sellGoods(List<? extends Goods> goods) {
    // 调用集合中的sell方法
    for (Goods g : goods) {
      g.sell();
    }
  }
}
```

- Test

```java
package com.company;

import java.util.ArrayList;
import java.util.List;

public class Test {
  public static void main(String[] args) {
    List<Books> books = new ArrayList<Books>();
    books.add(new Books());
    books.add(new Books());

    GoodsSeller goodsSeller = new GoodsSeller();
    goodsSeller.sellGoods(books);
  }
}
```

## 总结

[![6JEuWR.png](https://s3.ax1x.com/2021/03/10/6JEuWR.png)](https://imgtu.com/i/6JEuWR)

## 自定义泛型类

调用的时候, 才知道类型是什么

```java
public class NumGeneric<T> {
  private T num;

  public T getNum() {
    return num;
  }

  public void setNum(T num) {
    this.num = num;
  }

  public static void main(String[] args) {
    NumGeneric<Integer> numGeneric = new NumGeneric<Integer>();
    numGeneric.setNum(10);
    System.out.println(numGeneric.getNum());
  }
}
```

多个泛型参数

```java
package com.custom;

public class TwoNumGeneric<T,E> {
  private T data1;
  private E data2;

  public T getData1() {
    return data1;
  }

  public void setData1(T data1) {
    this.data1 = data1;
  }

  public E getData2() {
    return data2;
  }

  public void setData2(E data2) {
    this.data2 = data2;
  }

  public static void main(String[] args) {
    TwoNumGeneric<String, Integer> twoNumGeneric = new TwoNumGeneric();
    twoNumGeneric.setData1("1");
    twoNumGeneric.setData2(2);
  }
}

```

## 自定义泛型方法

```java

public class GenericMethod {
  public <T> void fn (T t) {
    System.out.println(t);
  }
  // 这里表示只能传入Number的子类, 否则会报错
  // public <T extends Number> void fn (T t) {
  //   System.out.println(t);
  // }
  public static void main(String[] args) {
    GenericMethod genericMethod = new GenericMethod();
    genericMethod.fn("hello");
    genericMethod.fn(1);
    genericMethod.fn(5.0);
  }
}
```
