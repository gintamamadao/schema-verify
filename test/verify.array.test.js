const { Schema } = require("../src/index");

describe("array:elements", () => {
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: {
                type: String,
                required: true
            }
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
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", 1];
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
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: {
                type: String
            }
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
                const data = [1];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [{}];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`elements`, () => {
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
        expect(
            (() => {
                const data = ["a", 1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                {
                    index: 0,
                    type: String,
                    required: true
                },
                {
                    index: 0,
                    type: Number,
                    required: true
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = [1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a"];
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
    test(`elements`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                [
                    {
                        index: 0,
                        type: String,
                        required: true
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
                const data = [1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = [{}];
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

describe("array:schema", () => {
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: String,
            required: true,
            pattern: "email"
        });
        const schemaInfo = {
            type: Array,
            elements: schemaRule
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["abc@abc.abc"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["abc@abc.abc", "a"];
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
    test(`schema`, () => {
        const schemaRuleA = new Schema({
            index: 0,
            type: String
        });

        const schemaRuleB = new Schema({
            index: 1,
            type: Number
        });

        const schemaInfo = {
            type: Array,
            elements: [schemaRuleA, schemaRuleB]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a", 1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("array:length", () => {
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: { min: 1, max: 2 }
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
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", "b", "c"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: { min: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a", "a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", "a", "a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: { max: 2 }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a", "a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", "a", "a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`length`, () => {
        const schemaInfo = {
            type: Array,
            length: 2
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a", "a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", "a", "a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
