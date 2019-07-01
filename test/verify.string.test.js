const { Schema } = require("../src/index");

describe("string:pattern", () => {
    test(`pattern`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    pattern: "email"
                };
                const schema = new Schema(schemaInfo);
                const data = "abc@abc.abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`pattern`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    pattern: "email"
                };
                const schema = new Schema(schemaInfo);
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    pattern: "phone"
                };
                const schema = new Schema(schemaInfo);
                const data = "12312345123";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`pattern`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    pattern: "phone"
                };
                const schema = new Schema(schemaInfo);
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("string:length", () => {
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("string:enum", () => {
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    enum: ["a", "b", "c"]
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    enum: ["a", "b", "c"]
                };
                const schema = new Schema(schemaInfo);
                const data = "b";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    enum: ["a", "b", "c"]
                };
                const schema = new Schema(schemaInfo);
                const data = "d";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("string:match", () => {
    test(`match`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    match: "abc"
                };
                const schema = new Schema(schemaInfo);
                const data = "abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`match`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    match: /abc/
                };
                const schema = new Schema(schemaInfo);
                const data = "abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`match`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    match: "abc"
                };
                const schema = new Schema(schemaInfo);
                const data = "bcd";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`match`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    match: /abc/
                };
                const schema = new Schema(schemaInfo);
                const data = "bcd";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
