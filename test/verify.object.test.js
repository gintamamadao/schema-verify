const { Schema } = require("../src/index");

describe("object:restrict", () => {
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            props: []
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            props: [
                {
                    index: "a",
                    type: String
                }
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
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    b: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            props: [
                {
                    index: "a",
                    type: String
                },
                {
                    index: "a",
                    type: Number
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    b: 1
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`restrict`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
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
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    b: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("object:props", () => {
    test(`props`, () => {
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
        expect(
            (() => {
                const data = {
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props`, () => {
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
                    a: "a",
                    b: "b"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("object:schema", () => {
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: String,
            required: true,
            pattern: "email",
            length: { min: 3, max: 12 }
        });
        const schemaInfo = {
            type: Object,
            props: [
                {
                    index: "a",
                    schema: schemaRule
                },
                {
                    index: "b",
                    schema: schemaRule
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "bcd@bcd.bcd"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "bcd@bcd.bcd",
                    c: "c"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "abc"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    a: "abcabcabcabc@abc.abc"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: String,
            required: true,
            pattern: "email"
        });
        const schemaInfo = {
            type: Object,
            props: schemaRule
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "bcd@bcd.bcd"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "abc@abc.abc",
                    b: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: Number
        });
        const schemaInfo = {
            type: Object,
            props: schemaRule
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    b: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    b: "b"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
