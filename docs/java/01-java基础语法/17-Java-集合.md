# 集合

Java 中的集合是工具类, 可以储存任意数量的具有相同属性的对象

## 与数组的区别

数组储存固定长度的数据, 集合的长度可以动态改变

## 应该场景

1. 无法预测存储数据的数量

2. 同时存储具有一对一关系的数据

3. 需要进行数据的增删

4. 数据重复的问题(集合提供了不允许有重复数据的方法)

## ArrayList

- **ArrayList.size()**

返回 ArrayList 的长度

- **ArrayList.add(Object)**

增加

- **ArrayList.remove(index) || ArrayList.remove(Object)**

删除, 传入下标或者对象

- **ArrayList.set(index, Object)**

设置, 传入下标和新对象

### 方法演示

演示 1:

```java
package con.junjun.set;

// 要记得导入包
import java.util.ArrayList;
import java.util.List;


public class ListDemo1 {
  public static void main(String[] args) {
    List list = new ArrayList();
    list.add("java");
    list.add("js");
    list.add("c");
    list.add("c++");

    // 输出元素个数
    System.out.println(list.size());

    for (int i = 0; i < list.size(); i++) {
      System.out.println(list.get(i) + ",");
    }

    // 移出
    // list.remove(2);
    // 或者, 传入字符串对象
    list.remove("js");

    System.out.println(list);
  }

  void practice() {
    ArrayList subject = new ArrayList();
    subject.add("语文");
    subject.add("数学");
    subject.add("英语");
    subject.add("化学");
    subject.add("物理");
    subject.add("生物");

    System.out.println(subject.size());

    for (int i = 0; i < subject.size(); i++) {
      System.out.println(subject.get(i));
    }
  }
}

```

演示 2:

```java
package con.junjun.set;

import java.util.Date;

public class Notice {
  private int id;
  private String title;
  private String creator;
  private Date created;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public Date getCreated() {
    return created;
  }

  public void setCreated(Date created) {
    this.created = created;
  }


  public Notice(int id, String title, String creator, Date created) {
    super();
    this.id = id;
    this.title = title;
    this.creator = creator;
    this.created = created;
  }
}

```

```java
package con.junjun.set;

import java.util.ArrayList;
import java.util.Date;

public class Test {
  public static void main(String[] args) {
    // 生成公告
    Notice n1 = new Notice(1, "公告1", "管理员", new Date());
    Notice n2 = new Notice(2, "公告2", "junjun", new Date());
    Notice n3 = new Notice(3, "公告3", "小红", new Date());

    ArrayList noticeList = new ArrayList();
    noticeList.add(n1);
    noticeList.add(n2);
    noticeList.add(n3);
    System.out.println(noticeList);

    for (int i = 0; i < noticeList.size(); i++) {
      // ((Notice) (noticeList.get(i))) 强制转换类型 大类转小类
      // (noticeList.get(i)) 返回Object类, 但是Object类没有 getTitle方法, 使用强转类型
      System.out.println(i + 1 + ":" + ((Notice) (noticeList.get(i))).getTitle());
    }
  }
}

```
