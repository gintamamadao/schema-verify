const { Schema } = require("../es/schema-verify");

describe("common:type", () => {
    test(`String`, () => {
        const schemaInfo = {
            type: String
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
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Number`, () => {
        const schemaInfo = {
            type: Number
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
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Object`, () => {
        const schemaInfo = {
            type: Object
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
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Array`, () => {
        const schemaInfo = {
            type: Array
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = [];
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
    test(`Function`, () => {
        const schemaInfo = {
            type: Function
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = () => {};
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
    test(`Boolean`, () => {
        const schemaInfo = {
            type: Boolean
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = true;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = false;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = null;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`null`, () => {
        const schemaInfo = {
            type: null
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = null;
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = false;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = 0;
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("common:required", () => {
    test(`required`, () => {
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
                const data = {};
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
    test(`required`, () => {
        const schemaInfo = {
            type: Object,
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
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: null
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = {
                    a: undefined
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`required`, () => {
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
                const data = [];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [null];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("common:hint", () => {
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                hint: {
                    type: "type error hint text"
                }
            };
            const schema = new Schema(schemaInfo);
            const data = 1;
            return schema.verify(data, true);
        }).toThrowError("type error hint text");
    });
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                custom: () => false,
                hint: {
                    custom: "custom error hint text"
                }
            };
            const schema = new Schema(schemaInfo);
            const data = "a";
            return schema.verify(data, true);
        }).toThrowError("custom error hint text");
    });
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: String
            };
            const schema = new Schema(schemaInfo);
            const data = 1;
            return schema.verify(data, true);
        }).toThrowError("校验不通过");
    });
    test(`hint`, () => {
        const schemaInfo = {
            type: Object,
            props: [
                {
                    index: "a",
                    type: String,
                    required: true,
                    hint: {
                        required: "required error hint text"
                    }
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(() => {
            const data = {};
            return schema.verify(data, true);
        }).toThrowError("required error hint text");
    });
    test(`hint`, () => {
        expect(() => {
            const schemaInfo = {
                type: Array,
                elements: {
                    index: 0,
                    type: String,
                    required: true,
                    hint: {
                        required: "required error hint text"
                    }
                }
            };
            const schema = new Schema(schemaInfo);
            const data = [];
            return schema.verify(data, true);
        }).toThrowError("required error hint text");
    });
});

describe("common:schema", () => {
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: String,
            pattern: "email"
        });
        const schemaInfo = {
            schema: schemaRule
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
});

describe("common:custom", () => {
    test(`custom`, () => {
        const schemaInfo = {
            type: String,
            custom: v => v.match(/a/)
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
                const data = "c";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`custom`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                custom: () => {
                    throw "custom fn error text";
                }
            };
            const schema = new Schema(schemaInfo);
            const data = "a";
            return schema.verify(data, true);
        }).toThrowError("custom fn error text");
    });
    test(`custom`, () => {
        expect(() => {
            const schemaInfo = {
                type: String,
                custom: () => {
                    a = a + 1;
                }
            };
            const schema = new Schema(schemaInfo);
            const data = "a";
            return schema.verify(data, true);
        }).toThrowError("defined");
    });
    test(`custom`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: [
                        {
                            index: "a",
                            type: String,
                            custom: (v, o) => {
                                return v === "aaa" && o === data;
                            }
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: "aaa"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
});

describe("common:index", () => {
    test(`index`, () => {
        const schemaInfo = {
            type: Object,
            props: [
                {
                    index: "a",
                    type: String
                },
                {
                    index: "b",
                    type: Number
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    a: "a",
                    b: 1
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
                    c: "c"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`index`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                {
                    index: 0,
                    type: String,
                    required: true
                }
            ]
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
                const data = [];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`index`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                {
                    index: 0,
                    type: String
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = ["a", 1];
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(
            (() => {
                const data = [1];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`index`, () => {
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
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
        expect(
            (() => {
                const data = [1, "b"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`index`, () => {
        const schemaInfo = {
            type: Array,
            elements: [
                {
                    index: 0,
                    type: String,
                    required: true
                },
                {
                    index: 2,
                    type: String,
                    required: true
                }
            ]
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = ["a", 1, "b"];
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
                const data = ["a", "b", 1];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
