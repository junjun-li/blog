# MyBatis

## 代码示例

[菜鸟教程](https://www.runoob.com)

## What is MyBatis? 

- MyBatis 是优秀的持久性框架
- MyBatis 使用 XML 将 SQL 与程序解耦，便于维护
- MyBatis 学习简单，执行高效，是 JDBC 的延伸

## SqlSessionFactory 初始化

```java
public class MyBatisUtils {
    // 利用static关键字,属于类不属于对象达到全局唯一的目的
    private static SqlSessionFactory sqlSessionFactory = null;
    // 利用静态块在初始化时实例化sqlSessionFactory
    static {
        Reader reader = null;
        try {
            reader = Resources.getResourceAsReader("mybatis-config.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        } catch (IOException e) {
            e.printStackTrace();
            // 初始化错误时,通过抛出该错误来通知调用者
            throw new ExceptionInInitializerError(e);
        }
    }

    /**
     * openSession 创建一个新的SqlSession对象
     * @return SqlSession对象
     */
    public static SqlSession openSession() {
        return sqlSessionFactory.openSession();
    }

    /**
     * 释放一个有效的SqlSession对象
     * @param sqlSession sqlSession对象
     */
    public static void closeSession(SqlSession sqlSession) {
        if (sqlSession != null) {
            sqlSession.close();
        }
    }
}
```

## MyBatis 数据查询步骤

1. 创建实体类 Entity
2. 创建 Mapper XML：说明实体类对应的数据库表

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="goods">
    <!--
        resultType: 期望从这条语句中返回结果的类全限定名或别名。(说明数据返回的对象是什么)
    -->
    <select id="selectAll" resultType="com.imooc.entity.Goods">
        select *
        from t_goods
        order by goods_id desc
        limit 10
    </select>
</mapper>
```

3. 编写 sql 语句
4. 开启驼峰命名映射

```xml
<configuration>
    <!-- ... -->
    <!--启用驼峰命名转换 goods_id -> goodsId -->
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
    <!-- ... -->
</configuration>
```

5. 新增`mapper`

```xml
<configuration>
    <!-- ... -->
    <mappers>
        <mapper resource="mappers/goods.xml" />
    </mappers>
    <!-- ... -->
</configuration>
```

6. SqlSession 执行 select 语句

## Mybatis工作流程


