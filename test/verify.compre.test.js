const { Schema } = require("../src/index");

describe("compre", () => {
    test(`compre`, () => {
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
        const email = "abc@abc.abc";
        const str = "a";
        const no = 1;
        const phone = "12312345123";
        const uri = "https://abc.abc";
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {
                        phone: phone
                    },
                    arr: [
                        {
                            uri: uri
                        }
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {
                        phone: phone
                    },
                    arr: [
                        {
                            uri: uri
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    email: "a",
                    str: str,
                    no: no,
                    obj: {
                        phone: phone
                    },
                    arr: [
                        {
                            uri: uri
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {
                        phone: "a"
                    },
                    arr: [
                        {
                            uri: uri
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: "a",
                    obj: {
                        phone: phone
                    },
                    arr: [
                        {
                            uri: "a"
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {
                        phone: phone
                    },
                    arr: [
                        {
                            uri: "a"
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {
                        phone: phone
                    },
                    arr: []
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    email: email,
                    str: str,
                    no: no,
                    obj: {},
                    arr: [
                        {
                            uri: uri
                        },
                        str
                    ]
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(() => {
            const data = {
                email: email,
                str: str,
                no: no,
                obj: {
                    phone: phone
                },
                arr: [
                    {
                        uri: "a"
                    },
                    str
                ]
            };
            return schema.verify(data, true);
        }).toThrowError(
            "属性 arr: 第 0 项: 属性 uri: pattern 校验不通过, 错误信息：需要 uri 格式"
        );
    });
});

describe("multiple", () => {
    test(`multiple`, () => {
        const schemaInfo = [
            {
                type: String
            },
            {
                type: Number
            }
        ];
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 0;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = null;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`multiple:Schema`, () => {
        const schemaRuleA = new Schema({
            type: String
        });
        const schemaRuleB = new Schema({
            type: Number
        });
        const schemaInfo = [schemaRuleA, schemaRuleB];
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 0;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = null;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`multiple:Object Schema`, () => {
        const schemaRuleA = new Schema({
            index: "a",
            type: String
        });
        const schemaRuleB = new Schema({
            index: "a",
            type: Number
        });
        const schemaInfo = {
            type: Object,
            props: [[schemaRuleA, schemaRuleB]]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: 0
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`multiple:Object`, () => {
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
        expect(
            (() => {
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: 0
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`multiple:Array`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                [
                    {
                        index: 0,
                        required: true,
                        type: String
                    },
                    {
                        type: Number
                    }
                ]
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = [0];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = [null];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
