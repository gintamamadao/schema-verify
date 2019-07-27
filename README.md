# schema-verify

verify data type and schema

## 项目简介

js 本身是一种弱类型语音，但有时候我们需要严格限制数据的类型或者结构，本项目设计的目的是能对 js 中的数据类型和数据结构根据一定规则进行校验分析。

## 安装

```sh
npm i schema-verify --save
```

## 使用例子

```js
const { Schema } = require("schema-verify");

const schemaInfo = {
    type: Object,
    restrict: true,
    props: {
        id: {
            required: true,
            type: Number,
            natural: true
        },
        email: {
            required: true,
            type: String,
            pattern: "email",
            length: { min: 3, max: 32 }
        },
        gender: {
            required: true,
            type: String,
            enum: ["male", "female"]
        },
        address: {
            required: true,
            type: Object,
            restrict: true,
            props: {
                city: {
                    required: true,
                    type: String,
                    maxLength: 100
                },
                street: {
                    required: true,
                    type: String,
                    maxLength: 100
                }
            }
        }
    }
};

const schema = new Schema(schemaInfo);

const data = {
    id: 1,
    email: "abc@abc.abc",
    gender: "male",
    address: {
        city: "London",
        street: "London street"
    }
};

schema.verify(data);
//true
```

### 变量说明

-   schemaInfo 即我们设计的数据结构的规则
-   schema 就是我们基于规则 schemaInfo 新建的一个校验实例
-   data 就是实际要校验的数据
-   schema.verify 表示对数据按照规则进行校验

schemaInfo 既可以为对象，也可以为数组，当为数组时只要满足某一个校验规则元素就视为通过。

### 抛出错误

校验可以选择是否抛出错误，错误会带有信息说明校验不通过的地方。

```js
const data = {
    id: 1,
    email: "abc@abc.abc",
    gender: "male",
    address: {
        city: 1,
        street: "London street"
    }
};
schema.verify(data, true);
// 第二参数为 true 时，校验不通过会抛出错误，上面的例子中data 的属性 address 里面的 city 属性类型不正确

// throw Error: 属性 address: 属性 city: type 校验不通过, 错误信息：需要 string 类型
```

## 目录

<!-- TOC -->

-   [Schema 规则](#Schema规则)
    -   [type](#type)
    -   [pattern](#pattern)
    -   [match](#match)
    -   [length](#length)
    -   [minLength](#minLength)
    -   [maxLength](#maxLength)
    -   [enum](#enum)
    -   [range](#range)
    -   [min](#min)
    -   [max](#max)
    -   [integer](#integer)
    -   [natural](#natural)
    -   [props](#props)
    -   [required](#required)
    -   [restrict](#restrict)
    -   [elements](#elements)
    -   [index](#index)
    -   [schema](#schema)
    -   [custom](#custom)
    -   [hint](#hint)
-   [Type 校验](#type校验)
    -   [Type api](#typeapi)
-   [Pattern 校验](#Pattern校验)

## Schema 规则

### type

数据类型校验规则，校验实例必须要有的校验规则，但如果规则中有 schema 校验实例规则的话，type 规则可以省略，因为会自动取 schema 校验实例的 type 规则

-   String， 字符串
-   Number， 数字
-   Object， 对象
-   Array， 数组
-   Function， 函数
-   Boolean， 布尔
-   null， 空值

有些校验规则是某特定类型才能设置

```js
const schemaInfo = {
    type: String
};
const schema = new Schema(schemaInfo);
schema.verify("a");
// true
schema.verify(1);
// false
```

如果一个数据有可能是 String 或者 Number，可以这样设置：

```js
const schemaInfo = [
    {
        type: String
    },
    {
        type: Number
    }
];
const schema = new Schema(schemaInfo);
schema.verify("a");
// true
schema.verify(1);
// true
schema.verify(null);
// false
schema.verify({});
// false
```

也可以用字符串表示

-   string， 字符串
-   number， 数字
-   object， 对象
-   array， 数组
-   function， 函数
-   boolean， 布尔
-   null， 空值

```js
const schemaInfo = {
    type: "string"
};
const schema = new Schema(schemaInfo);
```

### pattern

特殊字符串格式校验规则。

-   phone， 手机号
-   uri， 链接
-   email， 邮箱地址
-   color， 颜色
-   version， 版本号
-   sign， 仅允许由字母，数字和下划线组成，首字符必须为字母或者下划线
-   numStr， 仅允许数字组成
-   jsonStr， json 字符串，代码用 JSON.parse 实现校验
-   time， 时间格式，代码用 new Date(time) 实现校验

```js
const schemaInfo = {
    type: String,
    pattern: "email"
};
const schema = new Schema(schemaInfo);
schema.verify("abc@abc.abc");
// true
schema.verify("abc");
// false
```

### match

自定义特殊字符串格式校验规则，如果 pattern 中的规则不符合你的需求，可以在 match 里定义自己的正则规则。

```js
const schemaInfo = {
    type: String,
    match: /abc/
};
const schema = new Schema(schemaInfo);
return schema.verify(data);
schema.verify("abc");
// true
schema.verify("bcd");
// false
```

### length

字符串或者数组的长度校验规则。

-   min， 最小长度，字符串（数组）的长度必须大于或等于最小长度
-   max， 最大长度，字符串（数组）的长度必须小于或等于最大长度

```js
const schemaInfo = {
    type: String,
    length: { min: 1, max: 2 }
};
const schema = new Schema(schemaInfo);
schema.verify("aa");
// true
schema.verify("a");
// true
schema.verify("aaa");
// false
schema.verify("");
// false
```

规则值也可以为某一个数字，表示固定某一长度

```js
const schemaInfo = {
    type: String,
    length: 2
};
const schema = new Schema(schemaInfo);
schema.verify("aa");
// true
schema.verify("a");
// false
schema.verify("aaa");
// false
schema.verify("");
// false
```

### minLength

字符串或者数组的最小长度校验规则。

```js
const schemaInfo = {
    type: String,
    minLength: 2
};
const schema = new Schema(schemaInfo);
schema.verify("aa");
// true
schema.verify("a");
// false
schema.verify("aaa");
// true
```

### maxLength

字符串或者数组的最大长度校验规则。

```js
const schemaInfo = {
    type: String,
    maxLength: 2
};
const schema = new Schema(schemaInfo);
schema.verify("aa");
// true
schema.verify("a");
// true
schema.verify("aaa");
// false
```

### enum

合法值枚举校验规则，字符串或者数字只能是一组值中的某一个。

```js
const schemaInfo = {
    type: String,
    enum: ["a", "b", "c"]
};
const schema = new Schema(schemaInfo);
schema.verify("a");
// true
schema.verify("b");
// true
schema.verify("d");
// false
```

enum 规则的值可以是数组，也可以是对象，但规则的值是对象的时候，有效值是对象的所有可读键值

```js
const schemaInfo = {
    type: String,
    enum: {
        a: "1",
        b: "2",
        c: "3"
    }
};
const schema = new Schema(schemaInfo);
schema.verify("1");
// true
schema.verify("2");
// true
schema.verify("a");
// false
```

### range

数值的范围校验规则，仅数值类型可用。

-   min， 最小值，数值必须大于或等于最小值
-   max， 最大值，数值必须小于或等于最大值

规则中，min，max 两个属性中必须要有一个

```js
const schemaInfo = {
    type: Number,
    range: { min: 1, max: 2 }
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(2);
// true
schema.verify(0);
// false
```

### min

数值的最小值校验规则。

```js
const schemaInfo = {
    type: Number,
    min: 2
};
const schema = new Schema(schemaInfo);
schema.verify(2);
// true
schema.verify(1);
// false
schema.verify(3);
// true
```

### max

数值的最大值校验规则。

```js
const schemaInfo = {
    type: String,
    max: 2
};
const schema = new Schema(schemaInfo);
schema.verify(2);
// true
schema.verify(1);
// true
schema.verify(3);
// false
```

### integer

数字是否是整数。

```js
const schemaInfo = {
    type: Number,
    integer: true
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(-1);
// true
schema.verify(0.5);
// false
```

### natural

数字是否是自然数。

```js
const schemaInfo = {
    type: Number,
    natural: true
};
const schema = new Schema(schemaInfo);
schema.verify(1);
// true
schema.verify(-1);
// false
schema.verify(0.5);
// false
```

### props

该规则只有类型为 Object 才能设置，是用于设置对象属性的校验规则。

```js
const schemaInfo = {
    type: Object,
    props: {
        a: {
            type: Number
        }
    }
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    b: 1
});
// true
schema.verify({
    a: "a"
});
// false
```

props 的规则描述既可以是对象也可以数组，当为数组时需要 index 规则来说明是哪一个属性的校验规则

```js
const schemaInfo = {
    type: Object,
    props: [
        {
            index: "a",
            type: Number
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    b: 1
});
// true
schema.verify({
    a: "a"
});
// false
```

上面的例子是根据 index 的值来针对某个属性的校验，也可以设置一个属性的通用校验。

```js
const schemaInfo = {
    type: Object,
    props: {
        type: Number
    }
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    a: 1,
    b: 1
});
// true
schema.verify({
    a: 1,
    b: 2,
    c: 3
});
// true
schema.verify({
    a: 1,
    b: "a"
});
// false
```

也可以用一个校验实例作为对象属性的校验规则。

```js
const schemaRule = new Schema({
    type: Number
});
const schemaInfo = {
    type: Object,
    props: schemaRule
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    b: 1
});
// true
schema.verify({
    a: "a"
});
// false
schema.verify({
    b: "b"
});
// false
```

如果一个属性有可能是 String 或者 Number，可以这样设置：

```js
const schemaInfo = {
    type: Object,
    props: {
        a: [
            {
                type: String
            },
            {
                type: Number
            }
        ]
    }
};
```

或者以下这样

```js
const schemaInfo = {
    type: Object,
    props: [
        [
            {
                index: "a",
                type: String
            },
            {
                type: Number
            }
        ]
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: 1
});
// true
schema.verify({
    a: "a"
});
// true
schema.verify({
    a: null
});
// false
schema.verify({
    a: {}
});
// false
```

### required

属性是否必须存在，该规则只有 props 或者 elements 里的规则设置才有效。

```js
const schemaInfo = {
    type: Object,
    props: [
        {
            index: "a",
            type: String,
            required: true
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: "a"
});
// true
schema.verify({});
// false
schema.verify({
    b: "b"
});
// false
```

### restrict

属性是否要被限制，该规则只有类型为 Object 才能设置, 当规则设置为 true，对象的属性只能是 props 中出现的属性。

```js
const schemaInfo = {
    type: Object,
    restrict: true,
    props: [
        {
            index: "a",
            type: String
        },
        {
            index: "b:",
            type: String
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify({
    a: "a",
    b: "b"
});
// true
schema.verify({});
// true
schema.verify({
    a: "a",
    b: "b",
    c: "c"
});
// false
schema.verify({
    c: "c"
});
// false
```

### elements

该规则只有类型为 Array 才能设置，是用于设置数组元素的校验规则。规则内容可以为对象或者数组，对象表示所有元素用同一个规则，数组则可以指定某个元素用特定规则

```js
const schemaInfo = {
    type: Array,
    elements: {
        type: String,
        required: true
    }
};
const schema = new Schema(schemaInfo);
schema.verify(["a"]);
// true
schema.verify(["a", "b"]);
// true
schema.verify([]);
// false，因为 required 为 true，所以数组不能为空
schema.verify([1]);
// false
```

也可以用 index 指定校验哪个元素

```js
const schemaInfo = {
    type: Array,
    elements: [
        {
            index: 1,
            type: String,
            required: true
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify([1, "a"]);
// true
schema.verify(["a", "b"]);
// true
schema.verify([1, 2]);
// false
schema.verify([1]);
// false，因为 required 为 true，位置在 1 的元素不能为空
```

也可以用一个校验实例作为元素的校验规则。

```js
const schemaRuleA = new Schema({
    index: 0,
    type: String
});

const schemaRuleB = new Schema({
    index: 1,
    type: Number
});

const schemaInfo = {
    type: Array,
    elements: [schemaRuleA, schemaRuleB]
};
const schema = new Schema(schemaInfo);
schema.verify(["a", 1]);
// true
schema.verify(["a", "b"]);
// false
```

如果一个元素有可能是 String 或者 Number，可以这样设置：

```js
const schemaInfo = {
    type: Object,
    elements: [
        [
            {
                type: String
            },
            {
                type: Number
            }
        ]
    ]
};
const schema = new Schema(schemaInfo);
schema.verify(["a"]);
// true
schema.verify([0]);
// true
schema.verify([null]);
// false
```

### index

设置要校验元素或者属性的索引

```js
const schemaInfo = {
    type: Array,
    elements: [
        {
            index: 0,
            type: String,
            required: true
        },
        {
            index: 1,
            type: Number,
            required: true
        }
    ]
};
const schema = new Schema(schemaInfo);
schema.verify(["a", 1]);
// true
schema.verify(["a", "b"]);
// false
```

### schema

可以设置一个校验实例作为规则，如果规则中没有 type 规则，就会自动取 schema 校验实例的 type 规则

```js
const schemaRule = new Schema({
    type: String,
    pattern: "email"
});
const schemaInfo = {
    schema: schemaRule
};
const schema = new Schema(schemaInfo);
schema.verify("abc@abc.abc");
// true
schema.verify("aaa");
// false
```

### custom

如果没有校验符合你的需求，也可以设置自己的校验函数。自定义校验函数会在最后执行，函数会传入两个默认参数，一个是当前值，一个是父节点值。

```js
const schemaInfo = {
    type: String,
    custom: v => v.match(/a/)
};
const schema = new Schema(schemaInfo);
const data = "a";
schema.verify("a");
// true
schema.verify("b");
// false
```

### hint

项目本身对各个规则有默认的错误提示，但也可以通过设置 hint 改变某些规则错误后抛出的错误提示，schema.verify 的第二个参数为 true 时错误才会抛出。

```js
const schemaInfo = {
    type: String,
    hint: {
        type: "数据类型错误，需要字符串类型"
    }
};
const schema = new Schema(schemaInfo);
schema.verify(1, true);
// throw Error: 数据类型错误，需要字符串类型
```

## Type 校验

如果你仅仅想校验数据的类型，可以使用 Type 来校验

```js
const { Type } = require("schema-verify");
Type.string.is("a");
//true
Type.string.is(0);
//false
```

### Type api

#### string

    string 类型相关

##### is

     是否是 string 类型

##### isNot

     是否不是 string 类型

##### isEmpty

     是否是空字符串

##### isNotEmpty

     是否是非空字符串

##### safe

     转换为 string 类型

```js
Type.string.isNot(0);
//true
Type.string.isEmpty("");
//true
Type.string.isNotEmpty("a");
//true
Type.string.safe(null);
//""
```

#### number

    number 类型相关

##### is

     是否是 number 类型

##### isNot

     是否不是 number 类型

##### isinteger

     是否是整数

##### isNatural

     是否是自然数

##### safe

     转换为 number 类型

```js
Type.number.is(1);
//true
Type.number.isNot("a");
//true
Type.number.isinteger(1);
//true
Type.number.isNatural(1);
//true
Type.number.safe(null);
//0
```

#### boolean

    boolean 类型相关

##### is

     是否是 boolean 类型

##### isNot

     是否不是 boolean 类型

```js
Type.boolean.is(false);
//true
Type.boolean.isNot(undefined);
//true
```

#### array

    array 类型相关

##### is

     是否是 array 类型

##### isNot

     是否不是 array 类型

##### isEmpty

     是否是空数组

##### isNotEmpty

     是否是非数组

##### safe

     转换为 array 类型

```js
Type.array.is(["a"]);
//true
Type.array.isNot(null);
//true
Type.array.isEmpty([]);
//true
Type.array.isNotEmpty(["a"]);
//true
Type.array.safe(null);
//[]
```

#### object

    object 类型相关

##### is

     是否是 object 类型

##### isNot

     是否不是 object 类型

##### isEmpty

     是否是空对象

##### isNotEmpty

     是否是非对象

##### safe

     转换为 object 类型

```js
Type.object.is({});
//true
Type.object.isNot(null);
//true
Type.object.isEmpty({});
//true
Type.object.isNotEmpty({
    a: 1
});
//true
Type.object.safe(null);
//{}
```

#### function

    function 类型相关

##### is

     是否是 function 类型

##### isNot

     是否不是 function 类型

##### safe

     转换为 function 类型

```js
Type.function.is(() => {});
//true
Type.function.isNot("a");
//true
Type.function.safe(a => {
    return a;
})("a");
//a
Type.function.safe(null)("a");
//undefined
```

#### null

    null相关

##### is

     是否是 null

##### isNot

     是否不是 null

#### undefined

    undefined 相关

##### is

     是否是 undefined

##### isNot

     是否不是 undefined

## Pattern 校验

可以单独使用 Schema 规则中的 pattern 规则

-   phone， 手机号
-   uri， 链接
-   email， 邮箱地址
-   color， 颜色
-   version， 版本号
-   sign， 仅允许由字母，数字和下划线组成，首字符必须为字母或者下划线
-   numStr， 仅允许数字组成
-   jsonStr， json 字符串，代码用 JSON.parse 实现校验
-   time， 时间格式，代码用 new Date(time) 实现校验

```js
const { Pattern } = require("schema-verify");
Pattern.phone.is("13332222111");
//true
Pattern.phone.is("10000");
//false
Pattern.email.is("aaa@123.bbb");
//false
```
