# Java 反射(Reflect)

## 介绍、作用

### 什么是反射？

- 反射(Reflect)在运行时动态访问类与对象的技术
- 反射是 JDK1.2 后的高级特性，隶属于`java.lang.reflect`
- 大多数 java 框架基于反射实现参数配置、动态注入等特性
- 反射最核心的机制就是：在`运行时`，对类的成员变量和方法提供了访问和调用的机制

## 运用

```java
package com.imooc.reflect;

import com.imooc.reflect.entity.Employee;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Sample {
    /**
     * 使用默认的构造方法创建对象
     */
    public static void classSample() {
        try {
            // Class.forName()方法将指定的类加载到jvm,并返回对应Class对象
            Class employeeClass = Class.forName("com.imooc.reflect.entity.Employee");
            System.out.println("Employee已被加载到jvm");
            // newInstance通过默认构造方法创建新的对象
            Employee emp = (Employee) employeeClass.newInstance();
            System.out.println(emp);
        } catch (ClassNotFoundException e) {
            // 类名与类路径书写错误是抛出"类无法找到"异常
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            // 非法访问异常,当在作用域外访问对象方法或成员变量时抛出
            // 例如该类的构造方法是private
            e.printStackTrace();
        } catch (InstantiationException e) {
            // 对象无法被实例化,抛出"实例化异常"
            // 例如该类是抽象类 abstract
            e.printStackTrace();
        }
    }

    /**
     * 使用带参数的构造方法创建对象
     */
    public static void ConstructorSample() {
        try {
            Class employeeClass = Class.forName("com.imooc.reflect.entity.Employee");
            Constructor constructor = employeeClass.getConstructor(new Class[]{
                Integer.class, String.class, Float.class, String.class
            });
            Employee employee = (Employee) constructor.newInstance(new Object[]{
                100, "李磊", 3000f, "研发部"
            });
            System.out.println(employee);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            //没有找到与之对应格式的方法
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            //当被调用的方法的内部抛出了异常而没有被捕获时
            e.printStackTrace();
        }
    }

    /**
     * 获取反射对象中的方法并且调用
     */
    public static void MethodSample() {
        try {
            // 获取类
            Class employeeClass = Class.forName("com.imooc.reflect.entity.Employee");
            // 获取构造函数
            Constructor constructor = employeeClass.getConstructor(new Class[]{
                Integer.class,
                String.class,
                Float.class,
                String.class,
            });
            // 创建对象
            Employee employee = (Employee) constructor.newInstance(new Object[]{
                100, "小明", 200f, "研发部"
            });
            // 获取对象方法
            Method updateSalary = employeeClass.getMethod("updateSalary", new Class[]{
                Float.class
            });
            // invoke调用方法,返回新的employee对象
            Employee newEmployee = (Employee) updateSalary.invoke(employee, 300f);
            System.out.println(newEmployee);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }

    /**
     * 利用Field对成员变量赋值/取值
     */
    public static void FieldSample() {
        try {
            Class employeeClass = Class.forName("com.imooc.reflect.entity.Employee");
            Constructor constructor = employeeClass.getConstructor(new Class[]{
                Integer.class, String.class, Float.class, String.class
            });
            Employee employee = (Employee) constructor.newInstance(new Object[]{
                100, "李磊", 3000f, "研发部"
            });
            Field enameField = employeeClass.getField("ename");
            enameField.set(employee, "李雷");
            String ename = (String) enameField.get(employee);
            System.out.println("ename:" + ename);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            //没有找到对应成员变量时抛出的异常
            e.printStackTrace();
        }
    }

    /**
     * getDeclared系列方法 加"s"会获取所有的
     * getDeclaredConstructor(s)|Method(s)|Field(s)获取对应对象
     */
    public static void GetDeclaredSample() {
        try {
            Class employeeClass = Class.forName("com.imooc.reflect.entity.Employee");
            Constructor constructor = employeeClass.getConstructor(new Class[]{
                Integer.class, String.class, Float.class, String.class
            });
            Employee employee = (Employee) constructor.newInstance(new Object[]{
                100,
                "李磊",
                3000f,
                "研发部"
            });
            // 获取当前类所有成员变量
            Field[] fields = employeeClass.getDeclaredFields();
            for (Field field : fields) {
                if (field.getModifiers() == 1) {
                    // public修饰的可以直接获取值
                    Object val = field.get(employee);
                    // getName: 用于获取键值
                    System.out.println(field.getName() + ": " + val);
                } else if (field.getModifiers() == 2) {
                    // private修饰的需要通过get方法获取值
                    String methodName = "get"
                        + field.getName().substring(0, 1).toUpperCase()
                        + field.getName().substring(1);
                    System.out.println("methodName " + methodName);
                    Method method = employeeClass.getMethod(methodName);
                    Object val = method.invoke(employee);
                    System.out.println(field.getName() + ": " + val);
                }
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // FieldSample();
        GetDeclaredSample();
    }
}

```