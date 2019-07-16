const { Schema } = require("schema-verify");
describe("example", () => {
    test(`example`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            hint: {
                type: "type error hint text",
                restrict: "restrict error hint text"
            },
            props: [
                {
                    index: "email",
                    required: true,
                    type: String,
                    pattern: "email",
                    length: { min: 3, max: 32 },
                    match: /abc/
                },
                {
                    index: "str",
                    required: true,
                    type: String,
                    enum: ["a", "b", "c"]
                },
                {
                    index: "no",
                    required: true,
                    type: Number,
                    range: { min: 0, max: 2 },
                    natural: true,
                    enum: [1, 2],
                    custom: () => true
                },
                {
                    index: "obj",
                    required: true,
                    type: Object,
                    restrict: true,
                    props: [
                        {
                            index: "phone",
                            required: true,
                            type: String,
                            pattern: "phone"
                        }
                    ]
                },
                {
                    index: "arr",
                    required: true,
                    type: Array,
                    length: { min: 0, max: 2 },
                    elements: [
                        {
                            index: 0,
                            type: Object,
                            required: true,
                            restrict: true,
                            props: [
                                {
                                    index: "uri",
                                    required: true,
                                    type: String,
                                    pattern: "uri"
                                }
                            ]
                        },
                        {
                            type: String,
                            enum: ["a", "b", "c"]
                        }
                    ]
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
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
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(() => {
            const data = {
                email: "abc@abc.abc",
                str: "a",
                no: 1,
                obj: {
                    phone: "12312345123"
                },
                arr: [
                    {
                        uri: 0
                    },
                    "a"
                ]
            };
            return schema.verify(data, true);
        }).toThrowError(
            "属性 arr: 第 0 项: 属性 uri: type 校验不通过, 错误信息：需要 string 类型"
        );
    });
});
