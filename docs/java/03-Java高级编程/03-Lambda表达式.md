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