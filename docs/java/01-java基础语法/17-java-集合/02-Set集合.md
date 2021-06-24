# Set 集合

Set 是元素无序并且`不可以重复`的集合, 被称为集合

## HashSet

- HashSet 是 Set 的一个重要实现类,称为哈希集

- HashSet 中的元素无序并且不可以重复

- HashSet 中只允许一个 null 元素

- 具有良好的存取和查找性能

## Set 集合示例

```java
public class HashSetDemo {
  public static void main(String[] args) {
    Set set = new HashSet();
    set.add("blue");
    set.add("red");
    set.add("black");
    set.add("yellow");


    Iterator it =  set.iterator(); // 迭代器方法

    // 遍历迭代器并且输出元素
    while (it.hasNext()) {
      System.out.print(it.next() + " ");
    }

    // 集合中插入新的单词 因为 set 元素无序并且`不可以重复`, 所以插入元素还是用add
    // 如果往集合中插入重复元素, 则不会插入
    // set.add("green");
  }
}
```

### Iterator(迭代器)

- Iterator 接口可以以统一的方式对各种集合元素进行遍历

- hasNext()方法检测集合中是否还有下一个元素

- next()方法返回集合中的下一个元素

## `hashCode`和`equals`方法的作用

hashCode()方法用于给对象返回 hash code 值，equals()方法用于判断其他对象与该对象是否相等。为什么需要这两个方法呢？我们知道 HashSet 中是不允许添加重复元素的，那么当调用 add()方法向 HashSet 中添加元素时，是如何判断两个元素是不同的。这就用到了 hashCode()和 equals()方法。在添加数据时，会调用 hashCode()方法得到 hash code 值，通过这个值可以找到数据存储位置，该位置可以理解成一片区域，在该区域存储的数据的 hashCode 值都是相等的。如果该区域已经有数据了，就继续调用 equals()方法判断数据是否相等，如果相等就说明数据重复了，就不能再添加了。如果不相等，就找到一个位置进行存储。

这些是基于哈希算法完成的，它使得添加数据的效率得到了提升。假设此时 Set 集合中已经有 100 个元素，那么如果想添加第 101 个元素，如果此时没有使用哈希算法，就需要调用 equals()方法将第 101 个元素与前 100 个元素依次进行比较，如果元素更多，比较所耗费的时间就越长。

如果两个对象相等，那么他们的 hashCode 值一定相等。反之，如果两个对象的 hashCode 值相等，那么这两个对象不一定相等，还需要使用 equals()方法进行判断。

如果不重写 hashCode()方法，默认每个对象的 hashCode()值都不一样，所以该类的每个对象都不会相等。

```java
package con.junjun.set;

import java.util.Objects;

public class Cat {
  private String name;
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

  Cat() {

  }

  Cat(String name, int month, String species) {
    this.name = name;
    this.month = month;
    this.species = species;
  }

  @Override
  public String toString() {
    return "Cat{" +
      "name='" + name + '\'' +
      ", month=" + month +
      ", species='" + species + '\'' +
      '}';
  }

  // @Override
  // public boolean equals(Object o) {
  //   if (this == o) return true;
  //   if (o == null || getClass() != o.getClass()) return false;
  //   Cat cat = (Cat) o;
  //   return month == cat.month &&
  //     Objects.equals(name, cat.name) &&
  //     Objects.equals(species, cat.species);
  // }

  @Override
  public int hashCode() {
    return Objects.hash(name, month, species);
  }

  // 老师示例的equals
  @Override
  public boolean equals(Object obj) {
    // 先判断对象是否相等
    if (this == obj) {
      return true;
    }

    // 对象相等之后, 比较内容是否相等 obj 是否是Cat类的对象
    if (obj.getClass() == Cat.class) {

      Cat cat = (Cat) obj;
      return cat.getName().equals(name) &&
        (cat.getMonth() == month) &&
        (cat.getSpecies().equals(species));
    }
    return false;
  }
}

```

```java
package con.junjun.set;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class CatText {
  public static void main(String[] args) {
    // 添加显示宠物猫
    Cat huahua1 = new Cat("花花", 12, "美短");
    Cat fanfan = new Cat("凡凡", 18, "中华田园猫");
    Cat huahua2 = new Cat("花花", 12, "美短");
    Set set = new HashSet();
    set.add(huahua1);
    set.add(fanfan);
    // set.add(huahua2);
    Iterator it = set.iterator();

    while (it.hasNext()) {
      // 这里会自动调用对象的toString方法
      System.out.println(it.next());
    }
    System.out.println("**************");
    set.add(huahua2);

    it = set.iterator();
    while (it.hasNext()) {
      System.out.println(it.next());
    }
    System.out.println("**************");

    // if (set.contains(huahua1)) {
    //   System.out.println(huahua1);
    //   System.out.println("找到了花花");
    // } else {
    //   System.out.println("没有");
    // }
    boolean flag = false;
    Cat c = null;
    // 迭代器要从新写
    it = set.iterator();
    while (it.hasNext()) {
      c = (Cat) (it.next());
      if (c.getName() == "花花") {
        flag = true;
        break;
      }
    }
    if (flag) {
      System.out.println("找到了花花");
      System.out.println(c);
    } else {
      System.out.println("没有花花");
    }
  }
}

```

## `obj.getClass()`和`.class`的作用

首先, 来看一下 Class 类, 在 java 中, 万物皆对象, 每个类都有一个对应的 Class 对象
通过 Class 类, 可以获取一个类的基本信息, 比如属性, 方法和构造方法等

getClass()是 Object 类的方法，该方法的返回值类型是 Class 类，通过 getClass()方法可以得到一个 Class 类的对象。而.class 返回的也是 Class 类型的对象。所以，如果 obj.getClass()和 Cat.class 返回的内容相等，说明是同一个对象。

既然都可以得到 Class 的对象，关于 getClass()和.class 的区别：

:::tip
getClass()方法，有多态能力，运行时可以返回子类的类型信息。
.class 是没有多态的，是静态解析的，编译时可以确定类型信息。
:::

## set 的删除操作

- set.remove(cat)

不建议使用`set.remove`, 如果 set 元素删除之后, 还有别的元素, 在循环里面会报错

- set.removeAll(removeSetList)

建议使用`set.removeAll`, 该方法支持传入一个 set 集合, 把一个需要删除的集合传入即可

```java
public class CatText {
  public static void main(String[] args) {
    // 添加显示宠物猫
    Cat huahua1 = new Cat("花花", 12, "美短");
    Cat fanfan = new Cat("凡凡", 18, "中华田园猫");
    Cat huahua2 = new Cat("花花二代", 12, "美短");
    Set<Cat> set = new HashSet<Cat>();
    set.add(huahua1);
    set.add(fanfan);
    set.add(huahua2);

    // 删除花花信息
    // 这样子删除有安全隐患, 删除了在循环会报错
    // 除非删除了就跳出循环
    // removeAll支持传入一个集合
    // for (Cat cat : set) {
    //   if ("花花".equals(cat.getName())) {
    //     set.remove(cat);
    //     break;
    //   }
    // }
    Set<Cat> removeSetList = new HashSet<Cat>();
    for (Cat cat : set) {
      if (cat.getMonth() < 20) {
        removeSetList.add(cat);
      }
    }
    set.removeAll(removeSetList);
    System.out.println("删除了花花");
    for (Cat cat : set) {
      System.out.println(cat);
    }

    // 删除所有集合, 返回一个布尔值
    // boolean bool = set.removeAll(set);
    // if (bool) {
    //   System.out.println("猫都不见了");
    // } else {
    //   System.out.println("猫还在");
    // }

    // 判断集合是否为空
    System.out.println(set.isEmpty()); // true
    System.out.println(set); // []
  }
}
```
