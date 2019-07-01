const { Schema } = require("../src/index");

describe("compre", () => {
    test(`compre`, () => {
        expect(
            (() => {
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
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
});
