# JDBC

- java 数据库连接-Java DataBase Connectivity
- JDBC 就是通过 Java 来操作数据库

## 基本步骤

```java
package com.imooc.jdbc.sample;

import java.sql.*;

public class StandardJDBCSample {
    public static void main(String[] args) {
        Connection coon = null;
        try {
            // 1. 加载并注册JDBC驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 创建数据库连接
            coon = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/imooc?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai",
                "root",
                "11776174"
            );
            // 3. 创建 Statement 对象
            Statement stmt = coon.createStatement();
            ResultSet res = stmt.executeQuery("select * from employee");
            // 4. 遍历查询结果
            while (res.next()) {
                Integer eno = res.getInt("eno");
                String ename = res.getString("ename");
                Float salary = res.getFloat("salary");
                String dname = res.getString("dname");
                String hiredate = res.getString("hiredate");
                System.out.println(eno + "-" + ename + "-" + salary + "-" + dname + "-" + hiredate);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (coon != null && coon.isClosed() == false) {
                    // 5. 关闭连接,释放资源Exception
                    coon.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}

```

## JDBC 操作数据库

## JDBC 中的事物管理

- 事物是以一种可靠的、一致的方式，访问和操作数据库的程序单元
- 通俗的来说就是：要么把事情做完，要么什么都不做，不要做一半

```java
public class TransactionSample {
    public static void main(String[] args) {
        Connection conn = null;
        try {
            conn = DBUtils.getConnection();
            // 关闭JDBC自动提交模式
            conn.setAutoCommit(false);
            String sql = "insert into imooc.employee(eno, ename, salary, dname) values (?,?,?,?)";
            for (int i = 0; i < 10; i++) {
                if (i == 5) {
                    throw new RuntimeException("插入失败");
                }
                PreparedStatement pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, i);
                pstmt.setString(2, "员工" + i);
                pstmt.setFloat(3, 4000);
                pstmt.setString(4, "市场部");
                pstmt.executeUpdate();
            }
            // 提交数据
            conn.commit();
        } catch (Exception e) {
            e.printStackTrace();
            try {
                if (conn != null && !conn.isClosed()) {
                    // 如果代码报错，需要回滚
                    conn.rollback();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        } finally {
            DBUtils.closeConnection(conn);
        }
    }
}
```

## Druid & c3p0 连接池
