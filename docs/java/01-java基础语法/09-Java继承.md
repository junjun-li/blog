# Java 继承

只能继承父类的非私有成员

## 继承示例

使用`extends`关键字实现继承

- Animal.java

```java
package com.junjun.animal;

public class Animal {
  private String name; // 昵称
  private int month;
  private String species;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getMonth() {
    return month;
  }

  public void setMonth(int month) {
    this.month = month;
  }

  public String getSpecies() {
    return species;
  }

  public void setSpecies(String species) {
    this.species = species;
  }
}
```

- Cat.java

```java
package com.junjun.animal;

public class Cat extends Animal {
  public Cat() {

  }

  private double weight;

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public void run() {
    System.out.println(this.getName() + "在run");
  }

}

```

- Dog.java

```java
package com.junjun.animal;

public class Dog extends Animal {
  public Dog() {

  }

  private String sex; //性别

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  // 睡觉的方法
  public void sleep () {
    System.out.println("小狗" + this.getName() + "在睡觉");
  }
}

```

## 方法重载和方法重新的区别

### 方法重载

1. 同一个类中
2. 方法名相同,参数列表不同(参数顺序,个数,类型)
3. 方法返回值,访问修饰符任意
4. 与方法名的参数无关

### 方法重写

1. 如果其他子类调用了重写的方法, 调用的是重写之后的函数
2. 使用 super.方法名() 来调用父类的方法
3. super:父类对象的引用
4. 还要注意父类的构造方法不允许被继承, 也不允许被重写

```java
// 1.有继承关系的子类中
// 2.方法名相同,参数列表相同(参数顺序,个数,类型)
// 3.访问修饰符 访问范围需要大于等于父类的访问范围, 不能降低范围可见性
// 4.与方法参数名无关
// 5.当方法返回值是void或者基本数据类型时,必须相同
//   当返回值是引用类型时, 返回值可以是其父类或者子类
//   重写方法的返回值可以设置为与父类方法相同或是为父类方法返回值的子类
```

[![BAGh3d.png](https://s1.ax1x.com/2020/10/23/BAGh3d.png)](https://imgchr.com/i/BAGh3d)

## 访问修饰符

### private 私有属性

只允许在本类中进行访问

### public 公有属性

允许在任意位置访问

### protected

允许在当前类、同包子类/非子类、跨包子类调用; 跨包非子类不允许访问 

### 默认

> 允许在当前类、同包子类/非子类调用;跨包子类/非子类不允许调用

[![BkKlng.png](https://s1.ax1x.com/2020/10/22/BkKlng.png)](https://imgchr.com/i/BkKlng)

## 继承后的初始化顺序

[![BASGct.png](https://s1.ax1x.com/2020/10/23/BASGct.png)](https://imgchr.com/i/BASGct)

## super 关键字

> 子类构造默认调用父类的无参构造方法, 如果父类没有无参构造, 子类则会报错
> 可以通过 super 关键字, 调用父类允许被访问的其他构造方法
> super() 必须放在子类 `构造方法`中, 并且放在子类构造方法的第一行

- super 关键字的作用

[![BAuo26.png](https://s1.ax1x.com/2020/10/23/BAuo26.png)](https://imgchr.com/i/BAuo26)

- super 关键字的注意事项

[![BAuHKO.png](https://s1.ax1x.com/2020/10/23/BAuHKO.png)](https://imgchr.com/i/BAuHKO)

## super 和 this 的比较

> 构造方法调用时, this()和 super()不能同时出现, 因为他们都要放在方法里面的第一行

### super

1. 访问父类的成员方法
2. 访问父类的成员属性
3. 访问父类的构造方法
4. 不能在静态方法中使用

### this

1. 访问当前类的成员方法
2. 访问当前类的成员属性
3. 访问当前类的构造方法
4. 不能在静态方法中使用

## 所有类的祖先-Object

### Object.equals

- 进行对象的比较, 如果指向同一个地址, 返回 true, 反之返回 false

### Object.toString

- 输出对象名的时候, 会默认调用 toString 方法, 打印`包名@内存位置的哈希值`

## final

> 不能用来修饰构造方法

- final 加在 class 前面

  > 表示该类没有子类, 如果有子类继承则会报错

- final 加在方法前面

  > 表示该方法不能被子类重写, 但是可以被子类使用

- final 加在局部变量前面

  > 表示是一个常量, 不可以修改(可以先定义,在赋值, 只能赋值一次)

- final 如果来修饰成员的属性

  > 只能在`构造方法`或者`构造代码`块进行赋值 或者定义的时候就赋值

- final 如果用来修饰引用类型的
  > 可以修改其属性, 但是不可以修改其引用地址
