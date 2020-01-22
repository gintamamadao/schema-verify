# schema-verify

> 校验数据合法性

## 项目简介

> js 本身是一种弱类型语音，但在有些情况下，例如 node.js 后端的项目中，对数据的类型或者结构有严格的要求，本项目可以自定义规则生成一个校验实例，通过这个校验实例校验数据是否符合要求。本项目单元测试用例 226 个，语句覆盖率 100%。

## 安装

```sh
npm i schema-verify --save
```

## 使用例子

```js
const { Schema } = require("schema-verify");

//数据结构类型要求
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

//生成一个校验实例
const schema = new Schema(schemaInfo);

//需要校验的数据
const data = {
    id: 1,
    email: "abc@abc.abc",
    gender: "male",
    address: {
        city: "London",
        street: "London street"
    }
};

//校验
schema.verify(data);
//true
```

**抛出错误**

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

# 目录

<!-- TOC -->

-   [Schema Rules](#schema-rules)
    -   [type](#type)
    -   [pattern](#pattern)
    -   [match](#match)
    -   [length](#length)
    -   [minLength](#minlength)
    -   [maxLength](#maxlength)
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
-   [Type Verify](#type-verify)
    -   [Type api](#type-api)
-   [Pattern Verify](#pattern-verify)

# Schema Rules

## type

> 数据类型校验规则，校验实例必须要有的校验规则，但如果规则中有 schema 校验实例规则的话，type 规则可以省略，因为会自动取 schema 校验实例的 type 规则

-   String， 字符串
-   Number， 数字
-   Object， 对象
-   Array， 数组
-   Function， 函数
-   Boolean， 布尔
-   null， 空值

> 注意： 有些校验规则是某特定类型才能设置，否则会报错

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

> 如果一个数据有可能是 String 或者 Number，可以这样设置：

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

> 也可以用字符串表示

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

## pattern

> 内置的特殊字符串格式校验规则，仅支持以下几种，有特殊要求的可以用 match 规则自定义正则。

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

## match

> 自定义特殊字符串格式校验规则，如果 pattern 中的规则不符合你的需求，可以在 match 里定义自己的正则规则。

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

## length

> 字符串或者数组的长度校验规则。

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

> 规则值也可以为某一个数字，表示固定某一长度

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

## minLength

> 字符串或者数组的最小长度校验规则。

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

## maxLength

> 字符串或者数组的最大长度校验规则。

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

## enum

> 合法值枚举校验规则，字符串或者数字只能是一组值中的某一个。

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

> enum 规则的值可以是数组，也可以是对象，但规则的值是对象的时候，有效值是对象的所有可读值

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

## range

> 数值的范围校验规则，仅数值类型可用。

-   min， 最小值，数值必须大于或等于最小值
-   max， 最大值，数值必须小于或等于最大值

> 规则中，min，max 两个属性中必须要有一个

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

## min

> 数值的最小值校验规则。

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

## max

> 数值的最大值校验规则。

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

## integer

> 数字是否是整数。

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

## natural

> 数字是否是自然数。

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

## props

> 该规则只有类型为 Object 才能设置，是用于设置对象属性的校验规则，规则内容可以为对象或者数组，为对象时根属性为对应要校验的属性

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

> 数组形式表示时用 index 指明属性名

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

> 上面的例子是根据 props 的键名来对应某个属性的校验，也可以设置所有属性的通用校验。

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

> 也可以用一个校验实例作为对象属性的校验规则。

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

> 如果一个属性有可能是 String 或者 Number，可以这样设置：

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

## required

> 属性是否必须存在，该规则只有 props 或者 elements 里的规则设置才有效。

```js
const schemaInfo = {
    type: Object,
    props: {
        a: {
            type: String,
            required: true
        }
    }
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

## restrict

> 属性是否要被限制，该规则只有类型为 Object 才能设置, 当规则设置为 true，对象的属性只能是 props 中出现的属性。

```js
const schemaInfo = {
    type: Object,
    restrict: true,
    props: {
        a: {
            type: String
        },
        b: {
            type: String
        }
    }
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

## elements

> 该规则只有类型为 Array 才能设置，是用于设置数组元素的校验规则。规则内容可以为对象或者数组，对象表示所有元素用同一个规则，数组则可以指定某个元素用特定规则

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

> 也可以用 index 指定校验哪个元素

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

> 也可以用一个校验实例作为元素的校验规则。

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

> 如果一个元素有可能是 String 或者 Number，可以这样设置：

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

## index

> 设置要校验元素或者属性的索引

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

## schema

> 可以设置一个校验实例作为规则，如果规则中没有 type 规则，就会自动取 schema 校验实例的 type 规则

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

## custom

> 如果没有校验符合你的需求，也可以设置自己的校验函数。自定义校验函数会在最后执行，函数会传入两个默认参数，一个是当前值，一个是父节点值。

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

## hint

> 项目本身对各个规则有默认的错误提示，但也可以通过设置 hint 改变某些规则错误后抛出的错误提示，schema.verify 的第二个参数为 true 时错误才会抛出。

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

## Type Verify

> 如果你仅仅想校验数据的类型，可以使用 Type 来校验

```js
const { Type } = require("schema-verify");
Type.string.is("a");
//true
Type.string.is(0);
//false
```

# Type api

## string

> string 类型相关

### is

> 是否是 string 类型

### isNot

> 是否不是 string 类型

### isEmpty

> 是否是空字符串

### isNotEmpty

> 是否是非空字符串

### safe

> 转换为 string 类型

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

## number

> number 类型相关

### is

> 是否是 number 类型

### isNot

> 是否不是 number 类型

### isinteger

> 是否是整数

### isNatural

> 是否是自然数

### safe

> 转换为 number 类型

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

## boolean

> boolean 类型相关

### is

> 是否是 boolean 类型

### isNot

> 是否不是 boolean 类型

```js
Type.boolean.is(false);
//true
Type.boolean.isNot(undefined);
//true
```

## array

> array 类型相关

### is

> 是否是 array 类型

### isNot

> 是否不是 array 类型

### isEmpty

> 是否是空数组

### isNotEmpty

> 是否是非数组

### safe

> 转换为 array 类型

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

## object

> object 类型相关

### is

> 是否是 object 类型

### isNot

> 是否不是 object 类型

### isEmpty

> 是否是空对象

### isNotEmpty

> 是否是非对象

### safe

> 转换为 object 类型

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

## function

> function 类型相关

### is

> 是否是 function 类型

### isNot

> 是否不是 function 类型

### safe

> 转换为 function 类型

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

## null

> null 相关

### is

> 是否是 null

### isNot

> 是否不是 null

## undefined

> undefined 相关

### is

> 是否是 undefined

### isNot

> 是否不是 undefined

## Pattern Verify

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

# Tests

> 单元测试用例 226 个，语句覆盖率 100%，查看报告可以执行

```sh
$ npm run test
```

> 测试报告

```sh
------------------|----------|----------|----------|----------|-------------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------|----------|----------|----------|----------|-------------------|
All files         |      100 |    95.32 |      100 |      100 |                   |
 src              |      100 |    95.89 |      100 |      100 |                   |
  constant.js     |      100 |      100 |      100 |      100 |                   |
  index.js        |      100 |      100 |      100 |      100 |                   |
  pattern.js      |      100 |      100 |      100 |      100 |                   |
  schema.js       |      100 |    93.93 |      100 |      100 |... 17,425,430,446 |
  type.js         |      100 |    98.11 |      100 |      100 |               150 |
  verify.js       |      100 |    98.31 |      100 |      100 |             61,96 |
 src/error        |      100 |    72.73 |      100 |      100 |                   |
  error.js        |      100 |    83.33 |      100 |      100 |                 3 |
  schema_error.js |      100 |      100 |      100 |      100 |                   |
  verify_error.js |      100 |       60 |      100 |      100 |                57 |
------------------|----------|----------|----------|----------|-------------------|
```

# License (MIT)

```
Copyright (c) 2019 gintamamadao

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
