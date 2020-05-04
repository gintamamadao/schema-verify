const { Schema } = require("../lib/schema-verify");

describe("string:pattern", () => {
    test(`pattern:email`, () => {
        const schemaInfo = {
            type: String,
            pattern: "email"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "abc@abc.abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:phone`, () => {
        const schemaInfo = {
            type: String,
            pattern: "phone"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "12312345123";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:uri`, () => {
        const schemaInfo = {
            type: String,
            pattern: "uri"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "https://aa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:color`, () => {
        const schemaInfo = {
            type: String,
            pattern: "color"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "#000";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:version`, () => {
        const schemaInfo = {
            type: String,
            pattern: "version"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "v1.0";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:sign`, () => {
        const schemaInfo = {
            type: String,
            pattern: "sign"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "#aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:numStr`, () => {
        const schemaInfo = {
            type: String,
            pattern: "numStr"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "111";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "11a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:jsonStr`, () => {
        const schemaInfo = {
            type: String,
            pattern: "jsonStr"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "{}";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`pattern:time`, () => {
        const schemaInfo = {
            type: String,
            pattern: "time"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "20019-7-7";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("string:length", () => {
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: { min: 1, max: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = "";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: { min: 3 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: { max: 3 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: String,
            length: 3
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`minLength`, () => {
        const schemaInfo = {
            type: String,
            minLength: 3
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`maxLength`, () => {
        const schemaInfo = {
            type: String,
            maxLength: 3
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "aaa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "aaaa";
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = "aa";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
});

describe("string:enum", () => {
    test(`enum`, () => {
        const schemaInfo = {
            type: String,
            enum: ["a", "b", "c"]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "b";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "d";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`enum`, () => {
        const schemaInfo = {
            type: String,
            enum: {
                a: "1",
                b: "2",
                c: "3"
            }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "1";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "2";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = "b";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("string:match", () => {
    test(`match`, () => {
        const schemaInfo = {
            type: String,
            match: "abc"
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "bcd";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`match`, () => {
        const schemaInfo = {
            type: String,
            match: /abc/
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = "abc";
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = "bcd";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
