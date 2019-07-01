const { Schema } = require("../src/index");

describe("number:range", () => {
    test(`range`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    range: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`range`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    range: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`range`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    range: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = 3;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:integer", () => {
    test(`integer`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    integer: true
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`integer`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    integer: true
                };
                const schema = new Schema(schemaInfo);
                const data = -1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`integer`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    integer: true
                };
                const schema = new Schema(schemaInfo);
                const data = 0.5;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:natural", () => {
    test(`natural`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    natural: true
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`natural`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    natural: true
                };
                const schema = new Schema(schemaInfo);
                const data = -1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`natural`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    natural: true
                };
                const schema = new Schema(schemaInfo);
                const data = 0.5;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("number:enum", () => {
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    enum: [1, 2, 3]
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    enum: [1, 2, 3]
                };
                const schema = new Schema(schemaInfo);
                const data = 2;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`enum`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number,
                    enum: [1, 2, 3]
                };
                const schema = new Schema(schemaInfo);
                const data = 4;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
