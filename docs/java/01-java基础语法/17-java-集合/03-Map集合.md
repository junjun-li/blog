# Map 集合

Map 中的数据是键值对(key-value)的形式存储的

key-value 以 Entry 类型的对象实例存在

可以通过 key 值快速的查找 value

不能包含重复的键值

## 基本示例

```java
public class FootballDemo {
  public static void main(String[] args) {
    Map<String, String> champion = new HashMap<String, String>();
    champion.put("2014", "德国");
    champion.put("2010", "西班牙");
    champion.put("2006", "意大利");
    champion.put("2002", "巴西");
    champion.put("1998", "法国");
    // 获取key值
    Iterator<String> it = champion.values().iterator();
    while (it.hasNext()) {
      System.out.println(it.next());
    }
    // 获取value,key
    Set<Map.Entry<String, String>> entrySet = champion.entrySet();
    for (Map.Entry<String, String> entry: entrySet) {
      System.out.print(entry.getKey() + "==>");
      System.out.println(entry.getValue());
    }
  }
}
```

## 查找

```java
Map<String, String> animal = new HashMap<String, String>();

// 添加数据
animal.put("key1", "value1");
animal.put("key2", "value2");
animal.put("key3", "value3");

// 通过key值查找数据
// 使用keySet方法
String strSearch = "key1";
// 1. 取得keySet集合
Set<String> KeySet = animal.keySet();
// 2. 遍历keySet, 增强型for循环
for(String key:KeySet) {
  if (strSearch.equals(key)) {
    System.out.println("找到了");
    System.out.println("key为: " + key + ",Value为: " + animal.get(key));
    break;
  }
}
```

## 商品信息

```java
package con.junjun.map;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Scanner;

public class GoodsTest {
  public static void main(String[] args) {
    Scanner console = new Scanner(System.in);
    // 创建hashMap
    Map<String, Goods> goodsMap = new HashMap<String, Goods>();
    int i = 0;
    while (i < 3) {
      System.out.println("请输入" + (i + 1) + "条编号信息");
      System.out.println("请输入商品编号");
      String goodId = console.next();
      // 判断商品编号, 是否在goodsMap的key中存在
      if (goodsMap.containsKey(goodId)) {
        System.out.println("商品编号已存在, 请从新输入");
        // 结束当前循环
        continue;
      }
      System.out.println("请输入商品名称");
      String goodName = console.next();

      System.out.println("请输入价格");
      // 价格可能会错误, 捕获一下异常
      double goodPrice = 0;
      try {
        goodPrice = console.nextDouble();
      } catch (java.util.InputMismatchException e) {
        System.out.println("商品价格格式不正确");
        console.next();// 错误的数据放进异常的next里面
        // 结束当前循环
        continue;
      }


      Goods good = new Goods(goodId, goodName, goodPrice);
      goodsMap.put(goodId, good);
      i++;
    }

    // 遍历map, 输入商品信息
    System.out.println("商品的全部信息");
    Iterator<Goods> itGoods = goodsMap.values().iterator();

    // for (Goods goods : goodsMap.values()) {
    //   System.out.println(goods);
    // }
    while (itGoods.hasNext()) {
      System.out.println(itGoods.next());
    }
  }
}
```
