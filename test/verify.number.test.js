const { Schema } = require("../lib/schema-verify");

describe("number:range", () => {
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            range: { min: 1, max: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 0;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            range: { min: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            range: { max: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            min: 2
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`range`, () => {
        const schemaInfo = {
            type: Number,
            max: 2
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:integer", () => {
    test(`integer`, () => {
        const schemaInfo = {
            type: Number,
            integer: true
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = -1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 0.5;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:natural", () => {
    test(`natural`, () => {
        const schemaInfo = {
            type: Number,
            natural: true
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = -1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = 0.5;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:enum", () => {
    test(`enum`, () => {
        const schemaInfo = {
            type: Number,
            enum: [1, 2, 3]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = 4;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
