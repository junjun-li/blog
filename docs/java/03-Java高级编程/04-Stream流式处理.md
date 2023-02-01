# Stream 流式处理

- Stream对集合数据处理进行高度抽象，极大简化代码量
- Stream可对集合进行迭代、去重、筛选、排序、聚合等操作

## 示例

```java
public class StreamGenerator {
    //1.基于数组进行创建
    @Test
    public void generator1() {
        String[] arr = {"Lily", "Andy", "Jackson", "Smith"};
        Stream<String> stream = Stream.of(arr);
        stream.forEach(s -> System.out.println(s));
    }

    //2.基于集合进行创建
    @Test
    public void generator2() {
        List<String> list = new ArrayList<>();
        list.add("Lily");
        list.add("Andy");
        list.add("Jackson");
        list.add("Smith");
        Stream<String> stream = list.stream();
        stream.forEach(s -> System.out.println(s));
    }

    //3.利用generate方法创建无限长度流
    @Test
    public void generator3() {
        Stream<Integer> stream = Stream.generate(() -> new Random().nextInt(100000));
        stream.limit(10).forEach(i -> System.out.println(i));
    }

    //4.基于迭代器创建流
    @Test
    public void generator4() {
        Stream<Integer> stream = Stream.iterate(1, n -> n + 1);
        stream.limit(100).forEach(i -> System.out.println(i));
    }

    //5.基于字符序列创建流
    @Test
    public void generator5() {
        String str = "abcdefg我的";
        IntStream stream = str.chars();
        stream.forEach(c -> System.out.println((char) c));
    }
}


public class StreamMethod {
    //提取集合中所有偶数并求和
    @Test
    public void case1() {
        List<String> list = Arrays.asList("1", "2", "3", "4", "5", "6");
        int sum = list.stream() //获取stream对象
            .mapToInt(s -> Integer.parseInt(s)) //mapToInt将流中每一个数据转为整数
            .filter(n -> n % 2 == 0) //filter对流数据进行过滤
            .sum();//求和
        System.out.println(sum);
    }

    //所有名字首字母大写
    @Test
    public void case2() {
        List<String> list = Arrays.asList("lily", "smith", "jackson");
        List newList = list.stream()
            //按规则对每一个流数据进行转换
            .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1))
            //.forEach(s-> System.out.println(s));
            //collect对流数据进行收集,生成新的List/Set
            .collect(Collectors.toList());
        System.out.println(newList);
    }

    //将所有奇数从大到小进行排序,且不许出现重复
    @Test
    public void case3() {
        List<Integer> list = Arrays.asList(1, 60, 38, 21, 51, 60, 51, 73);
        List newList = list.stream().distinct()//去除重复的流数据
            .filter(n -> n % 2 == 1)
            .sorted((a, b) -> b - a) //流数据排序
            .collect(Collectors.toList());
        System.out.println(newList);
    }
}
```
