const { Schema } = require("../src/index");

describe("object:elements", () => {
    test(`elements`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: {
                        index: 0,
                        type: String,
                        required: true
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`elements`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: {
                        index: 0,
                        type: String
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`elements`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: {
                        index: 0,
                        type: String
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = [{}];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`elements`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: [
                        {
                            index: 0,
                            type: String,
                            required: true
                        },
                        {
                            index: 1,
                            type: Number,
                            required: true
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = ["a", 1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`elements`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: [
                        {
                            index: 0,
                            type: String,
                            required: true
                        },
                        {
                            index: 1,
                            type: Number,
                            required: true
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = ["a", "b", 1];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("object:length", () => {
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    length: { min: 1, max: 2 }
                };
                const schema = new Schema(schemaInfo);
                const data = ["a", "b", "c"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
