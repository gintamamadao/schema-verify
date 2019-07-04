const { Schema } = require("../src/index");

describe("common:type", () => {
    test(`String`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`String`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Number`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number
                };
                const schema = new Schema(schemaInfo);
                const data = 1;
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`Number`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Number
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Object`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object
                };
                const schema = new Schema(schemaInfo);
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`Object`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`Array`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array
                };
                const schema = new Schema(schemaInfo);
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`Array`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array
                };
                const schema = new Schema(schemaInfo);
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("common:required", () => {
    test(`required`, () => {
        expect(
            (() => {
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
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`required`, () => {
        expect(
            (() => {
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
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`required`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: {
                        a: {
                            type: String
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`required`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: {
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
    test(`required`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Array,
                    elements: {
                        type: String,
                        required: true
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = [];
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
        expect(() => {
            const schemaInfo = {
                type: Object,
                props: {
                    a: {
                        type: String,
                        required: true,
                        hint: {
                            required: "required error hint text"
                        }
                    }
                }
            };
            const schema = new Schema(schemaInfo);
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
    test(`schema`, () => {
        const schemaRule = new Schema({
            type: String,
            required: true,
            pattern: "email",
            length: { min: 3, max: 12 }
        });
        const schemaInfo = {
            type: Object,
            props: {
                a: {
                    schema: schemaRule
                },
                b: {
                    schema: schemaRule
                }
            }
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
});

describe("common:custom", () => {
    test(`custom`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    custom: v => v.match(/a/)
                };
                const schema = new Schema(schemaInfo);
                const data = "a";
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`custom`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: String,
                    custom: v => v.match(/a/)
                };
                const schema = new Schema(schemaInfo);
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
                    props: {
                        a: {
                            type: String,
                            custom: (v, o) => {
                                return v === "aaa" && o === data;
                            }
                        }
                    }
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
        expect(
            (() => {
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
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`index`, () => {
        expect(
            (() => {
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
                const data = [];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`index`, () => {
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
                            type: String,
                            required: true
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = ["a", "b"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`index`, () => {
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
                            type: String,
                            required: true
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`index`, () => {
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
                            type: String
                        }
                    ]
                };
                const schema = new Schema(schemaInfo);
                const data = ["a"];
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
});
