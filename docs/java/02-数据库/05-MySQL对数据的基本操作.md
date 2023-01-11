# MySQL 对数据的基本操作

## 数据插入

- ignore 可以忽略主键冲突的错误，继续插入数据

```sql
# 插入一个部门
insert into t_dept(deptno, dname, loc)
values (50, "技术部", "北京");

# 插入一条数据，可以写子查询
insert into t_emp(empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (8001, "JunJun", "SALESMAN", 7902, "1988-01-01", 2000, null,
        (select d.deptno from t_dept d where d.dname = "技术部"));

# MySQL方言语法
insert ignore into t_emp
set empno=8002,
    ename="小明",
    job="SALESMAN",
    mgr=7902,
    hiredate="1988-01-01",
    sal=2000,
    comm=null,
    deptno=(select d.deptno from t_dept d where d.dname = "技术部");
```

## 数据修改

```sql
# 把每个员工的编号+1，需要先排序在加
update t_emp set empno=empno+1 order by empno desc;

# 把月收入前三名的员工底薪减100元，用limit子句完成
update t_emp set sal=sal-100  order by sal desc limit 3;

# 把10部门中，工龄超过20年的员工，底薪增加200元
update t_emp
set sal=sal + 200
where deptno = 10 and floor(datediff(now(), hiredate) / 365) > 20;

# 把ALLEN调往RESEARCH部门,职务调整为ANALYST
update t_emp e join t_dept d
set e.deptno=d.deptno,e.job="ANALYST",d.loc="上海"
where e.ename="ALLEN" and d.dname="RESEARCH";
```

## 数据删除

```sql
# 删除10部门中,工龄超过20年的员工记录
delete
from t_emp
where deptno = 10
  and datediff(now(), hiredate) / 365 >= 20;

# 删除20部门中工资最高的员工记录
delete
from t_emp
where deptno = 20
order by sal + ifnull(comm, 0) desc
limit 1;

# 删除SALES部门和该部门的全部员工记录
delete e,d
from t_emp e
         join t_dept d on e.deptno = d.deptno
where d.dname = "SALES";

# 删除每个低于部门平均底薪的员工记录
delete e
from t_emp e
         join (select avg(sal) as avg, deptno
               from t_emp
               group by deptno) d
              on e.deptno = d.deptno
where e.sal < d.avg;

# 删除员工KING和他的直接下属的员工记录，用表连接实现。
delete e1
from t_emp e1
         join (select ename, empno from t_emp where ename = "KING") e2
where e1.mgr = e2.empno or e1.empno=e2.empno;
```
