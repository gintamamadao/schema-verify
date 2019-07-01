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
    test(`required`, () => {
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
