const { Schema } = require("../dist/schema-verify");

describe("object: restrict", () => {
    test(`restrict: empty`, () => {
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
    test(`restrict: empty`, () => {
        const schemaInfo = {
            type: Object,
            restrict: false,
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
        ).toBeTruthy();
    });
    test(`restrict: not empty`, () => {
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
    test(`restrict: duplicate claim`, () => {
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
                const data = {
                    a: "1"
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
        expect(
            (() => {
                const data = {
                    b: 1
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`restrict: single arr`, () => {
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

describe("object: props", () => {
    test(`props:arr`, () => {
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
    test(`props: arr`, () => {
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
    test(`props: single arr`, () => {
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
                    a: "a",
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: null
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
                    a: {},
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: null,
                    b: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props:single arr default`, () => {
        const schemaInfo = {
            type: Object,
            props: [
                [
                    {
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
                    a: "a",
                    b: 2
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: 2,
                    c: "c",
                    d: 4
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
                    a: "a",
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: 1,
                    b: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props:key obj`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                a: {
                    type: Number
                }
            }
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
    test(`props:key obj required`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                a: {
                    type: String,
                    required: true
                }
            }
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
                const data = {
                    a: "a",
                    b: null
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
        ).toBeFalsy();
        expect(() => {
            const data = {};
            return schema.verify(data, true);
        }).toThrowError("属性");
    });
    test(`props:key obj arr`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                a: [
                    {
                        type: String
                    },
                    {
                        type: Number
                    }
                ]
            }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: null
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
                    a: {},
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: null,
                    b: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props: default`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                type: String
            }
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
                const data = {
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: 1
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props: key obj $_PROPS_DEFAULT_INFO`, () => {
        const schemaInfo = {
            type: Object,
            props: {
                $_PROPS_DEFAULT_INFO: [
                    {
                        type: String
                    },
                    {
                        type: Number
                    }
                ]
            }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: 2
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: 2,
                    c: "c",
                    d: 4
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
                    a: "a",
                    b: {}
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: 1,
                    b: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("object: schema schemaObj", () => {
    test(`schema schemaObj`, () => {
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
    test(`schema: key schemaObj`, () => {
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
    test(`schema: key schemaObj`, () => {
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
