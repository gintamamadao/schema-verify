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
    });
});
