# Lambda表达式

## 什么是Lambda

- 和js的箭头函数非常类似，可以让程序编写的更加优雅
- 在java中更简洁的实现匿名内部类和函数声明与调用

> 约束条件：Lambda表达式只能实现有且只有一个抽象方法的接口，Java称为`函数式接口`

```java
// 这个接口只能有一个抽象方法
public interface MathOperation {
    public Float operator(Integer a, Integer b);
}

public class LambdaSample {
    public static void main(String[] args) {
        MathOperation addition = (a, b) -> a + b + 0f;
        System.out.println(addition.operator(10, 20));
    }
}
/*等价代码
class Addition implements MathOperation{
    @Override
    public Float operate(Integer a, Integer b) {
        System.out.println("加法运算");
        return a+b+0f;
    }
}
Addition addition = new Addition();
System.out.println(addition.operate(5,3));
*/
```

## Java中的函数式编程

- 函数式编程的理念：将代码作用可重用数据，代入到程序运行中
- 函数式编程是基于`函数式接口`和lambda表达的编程方式

```java
// 注解作用: 通知编译器这是函数式接口，进行抽象方法检查
@FunctionalInterface
public interface MathOperation {
    public Float operator(Integer a, Integer b);
}

public class LambdaSample {
    public static void filter(List<Integer> list, Predicate<Integer> num) {
        for (Integer item : list) {
            if (num.test(item)) {
                System.out.print(item + " ");
            }
        }
        System.out.println();
    }
    public static void main(String[] args) {
        // Lambda基本语法
        MathOperation addition = (a, b) -> a + b + 0f;
        System.out.println(addition.operator(10, 20));
        // Predicate接口作用示例
        Predicate<Integer> predicate = n -> n > 4;
        boolean res = predicate.test(10);
        System.out.println(res);

        // 函数式编程的运用
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        // for (Integer item : list) {
        //     if (item % 2 == 1) {
        //         System.out.println(item);
        //     }
        // }
        // 找出所有的奇数
        filter(list, n -> n % 2 == 1);
        // 找出所有的偶数
        filter(list, n -> n % 2 == 0);
        // 找出大于五的偶数
        filter(list, n -> n > 5 && n % 2 == 0);
    }
}

public class ConsumerSample {
    public static void output(Consumer<String> consumer) {
        consumer.accept("吃饭睡觉打豆豆");
    }

    public static void main(String[] args) {
        output(s -> System.out.println("控制台打印: " + s));
        output(s -> {
            System.out.println("发送数据包: " + s);
            System.out.println("发送数据包: " + s);
        });
    }
}

public class FunctionSample {
    public static void main(String[] args) {
        // 随机生成字符串
        Function<Integer, String> randomStringFunction = l -> {
            String chars = "abcdefghijklmnopqrst0123456789";
            StringBuilder stringBuffer = new StringBuilder();
            Random random = new Random();
            for (int i = 0; i < l; i++) {
                int position = random.nextInt(chars.length());
                stringBuffer.append(chars.charAt(position));
            }
            return stringBuffer.toString();
        };

        String string1 = randomStringFunction.apply(10);
        String string2 = randomStringFunction.apply(10);

        System.out.println(string1);
        System.out.println(string2);
    }
}
```
