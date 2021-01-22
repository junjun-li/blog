# 内部类

## 成员内部类

1. 内部类在外部使用时, 无法直接实例化, 需要借助外部类信息才能实例化
2. 内部类的访问修饰符, 可以任意, 但是访问范围会受到影响
3. 内部类可以直接访问外部类的成员, 如果出现同名属性, 优先访问内部类定义的
4. 可以使用外部类.this.成员的方式, 访问外部类中同名的信息
5. 外部类访问内部类信息, 需要通过内部类实例, 无法直接访问

```java
public class Person {
  int age;
  
  public Heart getHeart() {
    return new Heart();
  }
  
  class Heart {
    public String beat() {
      return "内部类哟😊";
    }
  }
}
```

```java
public class PersonTest {
  public static void main(String[] args) {
    Person lili = new Person();
    lili.age = 20;
    
    // 获取内部类的三种方式
    // 方式1 new 外部类.new 内部类
    Person.Heart myHeart = new Person().new Heart();
    System.out.println(myHeart.beat());
    
    // 方式2 外部类对象.new 内部类
    myHeart = lili.new Heart();
    System.out.println(myHeart.beat());
    
    // 方式3 外部类对象.获取方法
    myHeart = lili.getHeart();
    System.out.println(myHeart.beat());
  }
}
```

## 静态内部类

1. 静态内部类中, 只能直接访问外部类的静态成员, 如果需要调用非静态成员, 可以通过对象实例
2. 静态内部类对象实例时, 可以不依赖于外部类对象
3. 可以通过外部类.内部类.静态成员的方式, 访问内部类中的静态成员
4. 当内部类属性与外部类属性同名时, 默认直接调用内部类中的属性
5. 如果需要访问外部类中的静态属性, 则可以通过 外部类.属性的方式访问
6. 如果需要访问外部类中的非静态属性, 则可以通过new 外部类().属性的方式


## 方法内部类

1. 定义在方法内部, 作用范围也在方法内
2. 和方法内部成员规则一样, class前面不能添加 public,private,protected,static 关键字
3. 类中不能包含静态成员
4 类中可以包含final,abstract修饰的成员

## 匿名内部类

1. 匿名内部类没有类名名称, 实例对象名称
2. 编译后的文件名: 外部类$数字.class
3. 无法使用private,public,protected,abstract,static修饰符
4. 无法编写构造方法, 但是可以使用构造代码块
5. 不能出现静态成员
6. 匿名内部类可以实现接口也可以继承父类, 但不可兼得
