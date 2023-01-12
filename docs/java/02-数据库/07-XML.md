# XML

## 基本语法

```xml
<!-- 和html一样 -->
<?xml version="1.0" encoding="UTF-8" ?>
<hr>
    <employee>
        <name>张三</name>
        <age>18</age>
        <salary>400</salary>
        <department>
            <d-name>会计部</d-name>
            <address>地址</address>
        </department>
    </employee>
</hr>
```

## XML 语法约束

### DTD

- DTD(Document Type Definition，文档类型定义)是一种简单易用的语义约束方式

- DTD 文件扩展名为`.dtd`

```dtd
<!-- 最少出现一个子节点 -->
<!ELEMENT hr(employee+)>

<!-- 不限制子节点数量 -->
<!ELEMENT hr(employee*)>

<!-- 最多出现1个子节点 -->
<!ELEMENT hr(employee?)>
```

- 示例

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE hr SYSTEM "hr.dtd">
<hr>
    <employee no="3306">
        <name>张三</name>
        <age>18</age>
        <salary>400</salary>
        <department>
            <d-name>会计部</d-name>
            <address>地址1</address>
        </department>
    </employee>
    <employee no="3307">
        <name>李四</name>
        <age>19</age>
        <salary>500</salary>
        <department>
            <d-name>法律部</d-name>
            <address>地址2</address>
        </department>
    </employee>
</hr>
```

```dtd
<?xml version="1.0" encoding="UTF-8" ?>
<!ELEMENT hr (employee+)>
<!ELEMENT employee (name,age,salary,department)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT age (#PCDATA)>
<!ELEMENT salary (#PCDATA)>
<!ELEMENT department (d-name,address)>
<!ELEMENT d-name (#PCDATA)>
<!ELEMENT address (#PCDATA)>
<!ATTLIST employee no CDATA "">
```

### XML Schema

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--公司员工数据-->
<hr xmlns="http://www.imooc.com/xml-schema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.imooc.com/xml-schema hr.xsd">
    <employee no="3309">
        <name>张三</name>
        <age>31</age>
        <salary>4000</salary>
        <department>
            <dname>会计部</dname>
            <address>XX大厦-B103</address>
        </department>
    </employee>
    <employee no="3310">
        <name>李四</name>
        <age>23</age>
        <salary>3000</salary>
        <department>
            <dname>工程部</dname>
            <address>XX大厦-B104</address>
        </department>
    </employee>
</hr>
```

```xsd
<?xml version="1.0" encoding="UTF-8" ?>
<schema xmlns="http://www.w3.org/2001/XMLSchema"
    targetNamespace="http://www.imooc.com/xml-schema" elementFormDefault="qualified">
    <element name="hr">
        <complexType>
            <sequence>
                <element name="employee" minOccurs="0" maxOccurs="99999">
                    <complexType>
                        <sequence>
                            <element name="name" type="string"></element>
                            <element name="age">
                                <simpleType>
                                    <restriction base="integer">
                                        <minInclusive value="18"></minInclusive>
                                        <maxInclusive value="65"></maxInclusive>
                                    </restriction>
                                </simpleType>
                            </element>
                            <element name="salary" type="integer"></element>
                            <element name="department">
                                <complexType>
                                    <sequence>
                                        <element name="dname" type="string"></element>
                                        <element name="address" type="string"></element>
                                    </sequence>
                                </complexType>
                            </element>
                        </sequence>
                        <attribute name="no" type="string" use="required"></attribute>
                    </complexType>
                </element>
            </sequence>
        </complexType>
    </element>
</schema>
```
