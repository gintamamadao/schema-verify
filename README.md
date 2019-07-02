# schema-verify

verify data type and schema

## 项目简介

js 本身是一种弱类型语音，但有时候我们需要严格限制数据的类型或者结构，本项目设计的目的是能对 js 中的数据类型和数据结构根据一定规则进行校验分析。
本项目的设计思路借鉴于 npm 上 validate 这个项目，但逻辑为独立完成。

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
    hint: {
        type: "type error hint text",
        restrict: "restrict error hint text"
    },
    props: {
        email: {
            required: true,
            type: String,
            pattern: "email",
            length: { min: 3, max: 32 },
            match: /abc/
        },
        str: {
            required: true,
            type: String,
            enum: ["a", "b", "c"]
        },
        no: {
            required: true,
            type: Number,
            range: { min: 0, max: 2 },
            natural: true,
            enum: [1, 2],
            custom: () => true
        },
        obj: {
            required: true,
            type: Object,
            restrict: true,
            props: {
                phone: {
                    required: true,
                    type: String,
                    pattern: "phone"
                }
            }
        },
        arr: {
            required: true,
            type: Array,
            length: { min: 0, max: 2 },
            elements: [
                {
                    index: 0,
                    type: Object,
                    restrict: true,
                    props: {
                        uri: {
                            required: true,
                            type: String,
                            pattern: "uri"
                        }
                    }
                },
                {
                    type: String,
                    enum: ["a", "b", "c"]
                }
            ]
        }
    }
};

const schema = new Schema(schemaInfo);

const data = {
    email: "abc@abc.abc",
    str: "a",
    no: 1,
    obj: {
        phone: "12312345123"
    },
    arr: [
        {
            uri: "https://abc.abc"
        },
        "a"
    ]
};
schema.verify(data);
```

-   schemaInfo 即我们设计的数据结构的规则
-   schema 就是我们基于规则 schemaInfo 新建的一个校验实例
-   data 就是实际要校验的数据
-   schema.verify 表示对数据按照规则进行校验
