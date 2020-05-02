const { Type } = require("../dist/schema-verify");

describe("string", () => {
    test(`string:is`, () => {
        expect(Type.string.is("")).toBeTruthy();
        expect(Type.string.is("a")).toBeTruthy();
        expect(Type.string.is(null)).toBeFalsy();
        expect(Type.string.is(0)).toBeFalsy();
    });

    test(`string:isNot`, () => {
        expect(Type.string.isNot(null)).toBeTruthy();
        expect(Type.string.isNot("")).toBeFalsy();
        expect(Type.string.isNot(0)).toBeTruthy();
    });

    test(`string:isEmpty`, () => {
        expect(Type.string.isEmpty("")).toBeTruthy();
        expect(Type.string.isEmpty("a")).toBeFalsy();
    });

    test(`string:isNotEmpty`, () => {
        expect(Type.string.isNotEmpty("a")).toBeTruthy();
        expect(Type.string.isNotEmpty("")).toBeFalsy();
    });

    test(`string:safe`, () => {
        expect(Type.string.safe(null)).toEqual("");
        expect(Type.string.safe("a")).toEqual("a");
        expect(Type.string.safe(0)).toEqual("0");
    });
});

describe("number", () => {
    test(`number:is`, () => {
        expect(Type.number.is("a")).toBeFalsy();
        expect(Type.number.is("1")).toBeFalsy();
        expect(Type.number.is(1)).toBeTruthy();
        expect(Type.number.is(1.1)).toBeTruthy();
        expect(Type.number.is("1a")).toBeFalsy();
    });

    test(`number:isNot`, () => {
        expect(Type.number.isNot("a")).toBeTruthy();
        expect(Type.number.isNot("1")).toBeTruthy();
        expect(Type.number.isNot(1)).toBeFalsy();
        expect(Type.number.isNot(1.1)).toBeFalsy();
        expect(Type.number.isNot("1a")).toBeTruthy();
    });

    test(`number:isInteger`, () => {
        expect(Type.number.isInteger(1)).toBeTruthy();
        expect(Type.number.isInteger("1")).toBeFalsy();
        expect(Type.number.isInteger(1.1)).toBeFalsy();
        expect(Type.number.isInteger(-1)).toBeTruthy();
    });

    test(`number:isNatural`, () => {
        expect(Type.number.isNatural(1.1)).toBeFalsy();
        expect(Type.number.isNatural(-1)).toBeFalsy();
        expect(Type.number.isNatural(1)).toBeTruthy();
        expect(Type.number.isNatural(0)).toBeTruthy();
    });

    test(`number:safe`, () => {
        expect(Type.number.safe(0)).toEqual(0);
        expect(Type.number.safe(1)).toEqual(1);
        expect(Type.number.safe(null)).toEqual(0);
        expect(Type.number.safe("1")).toEqual(1);
        expect(Type.number.safe("1.1")).toEqual(1.1);
        expect(Type.number.safe({})).toEqual(0);
    });
});

describe("array", () => {
    test(`array:is`, () => {
        expect(Type.array.is([])).toBeTruthy();
        expect(Type.array.is(["a"])).toBeTruthy();
        expect(Type.array.is("a")).toBeFalsy();
        expect(Type.array.is({})).toBeFalsy();
        expect(Type.array.is(null)).toBeFalsy();
    });

    test(`array:isNot`, () => {
        expect(Type.array.isNot([])).toBeFalsy();
        expect(Type.array.isNot({})).toBeTruthy();
        expect(Type.array.isNot("a")).toBeTruthy();
        expect(Type.array.isNot(null)).toBeTruthy();
    });

    test(`array:isEmpty`, () => {
        expect(Type.array.isEmpty([])).toBeTruthy();
        expect(Type.array.isEmpty(["a"])).toBeFalsy();
        expect(Type.array.isNotEmpty(null)).toBeFalsy();
        expect(Type.array.isNotEmpty("a")).toBeFalsy();
    });

    test(`array:isNotEmpty`, () => {
        expect(Type.array.isNotEmpty(["a"])).toBeTruthy();
        expect(Type.array.isNotEmpty([])).toBeFalsy();
        expect(Type.array.isNotEmpty(null)).toBeFalsy();
        expect(Type.array.isNotEmpty("a")).toBeFalsy();
    });

    test(`array:safe`, () => {
        expect(Type.array.safe(["a"])).toEqual(["a"]);
        expect(Type.array.safe(["a", "b"])).toEqual(["a", "b"]);
        expect(Type.array.safe(null)).toEqual([]);
        expect(Type.array.safe("a")).toEqual([]);
    });

    test(`array:pure`, () => {
        expect(Type.array.pure(["a"])).toEqual(["a"]);
        expect(Type.array.pure(["a", null])).toEqual(["a"]);
        expect(Type.array.pure(["a", undefined])).toEqual(["a"]);
        expect(Type.array.pure(null)).toEqual([]);
        expect(Type.array.pure("a")).toEqual([]);
    });
});

describe("object", () => {
    test(`object:is`, () => {
        expect(Type.object.is({})).toBeTruthy();
        expect(
            Type.object.is({
                a: 1
            })
        ).toBeTruthy();
        expect(Type.object.is([])).toBeFalsy();
        expect(Type.object.is(null)).toBeFalsy();
        expect(Type.object.is("a")).toBeFalsy();
    });

    test(`object:isNot`, () => {
        expect(Type.object.isNot(null)).toBeTruthy();
        expect(Type.object.isNot(1)).toBeTruthy();
        expect(Type.object.isNot([])).toBeTruthy();
        expect(Type.object.isNot({})).toBeFalsy();
        expect(Type.object.isNot("a")).toBeTruthy();
    });

    test(`object:isEmpty`, () => {
        expect(Type.object.isEmpty({})).toBeTruthy();
        expect(
            Type.object.isEmpty({
                a: 1
            })
        ).toBeFalsy();
        expect(Type.object.isEmpty("a")).toBeFalsy();
        expect(Type.object.isEmpty(1)).toBeFalsy();
        expect(Type.object.isEmpty(null)).toBeFalsy();
    });

    test(`object:isNotEmpty`, () => {
        expect(
            Type.object.isNotEmpty({
                a: 1
            })
        ).toBeTruthy();
        expect(Type.object.isNotEmpty({})).toBeFalsy();
        expect(Type.object.isNotEmpty("a")).toBeFalsy();
        expect(Type.object.isNotEmpty(1)).toBeFalsy();
        expect(Type.object.isNotEmpty(null)).toBeFalsy();
    });

    test(`object:safe`, () => {
        expect(Type.object.safe({})).toEqual({});
        expect(
            Type.object.safe({
                a: "a"
            })
        ).toEqual({
            a: "a"
        });
        expect(
            Type.object.safe({
                a: "a",
                b: "b"
            })
        ).toEqual({
            a: "a",
            b: "b"
        });
        expect(Type.object.safe(null)).toEqual({});
        expect(Type.object.safe("a")).toEqual({});
    });

    test(`object:pure`, () => {
        expect(
            Type.object.pure({
                a: "a"
            })
        ).toEqual({
            a: "a"
        });
        expect(
            Type.object.pure({
                a: null
            })
        ).toEqual({});
        expect(
            Type.object.pure({
                a: undefined,
                b: "b"
            })
        ).toEqual({
            b: "b"
        });
        expect(Type.object.pure(null)).toEqual({});
    });
});

describe("function", () => {
    test(`function:is`, () => {
        expect(Type.func.is("a")).toBeFalsy();
        expect(Type.func.is(null)).toBeFalsy();
        expect(Type.func.is(() => {})).toBeTruthy();
        expect(Type.func.is(async () => {})).toBeTruthy();
        expect(Type.func.is(0)).toBeFalsy();
    });

    test(`function:isNot`, () => {
        expect(Type.func.isNot("a")).toBeTruthy();
        expect(Type.func.isNot(1)).toBeTruthy();
        expect(Type.func.isNot(() => {})).toBeFalsy();
        expect(Type.func.isNot(async () => {})).toBeFalsy();
    });

    test(`function:safe`, () => {
        const fn = p => {
            return p;
        };
        expect(Type.func.safe(fn)("a")).toEqual("a");
        expect(Type.func.safe(null)("a")).toEqual(undefined);
    });
});

describe("undefinedNull", () => {
    test(`undefinedNull:is`, () => {
        expect(Type.undefinedNull.is(null)).toBeTruthy();
        expect(Type.undefinedNull.is(undefined)).toBeTruthy();
        expect(Type.undefinedNull.is(0)).toBeFalsy();
        expect(Type.undefinedNull.is("")).toBeFalsy();
    });

    test(`undefinedNull:isNot`, () => {
        expect(Type.undefinedNull.isNot(null)).toBeFalsy();
        expect(Type.undefinedNull.isNot(undefined)).toBeFalsy();
        expect(Type.undefinedNull.isNot(0)).toBeTruthy();
        expect(Type.undefinedNull.isNot("")).toBeTruthy();
    });
});

describe("null", () => {
    test(`null:is`, () => {
        expect(Type.nul.is(null)).toBeTruthy();
        expect(Type.nul.is(undefined)).toBeFalsy();
        expect(Type.nul.is(0)).toBeFalsy();
        expect(Type.nul.is("")).toBeFalsy();
    });

    test(`null:isNot`, () => {
        expect(Type.nul.isNot(null)).toBeFalsy();
        expect(Type.nul.isNot(undefined)).toBeTruthy();
        expect(Type.nul.isNot(0)).toBeTruthy();
        expect(Type.nul.isNot("")).toBeTruthy();
    });
});

describe("undefined", () => {
    test(`undefined:is`, () => {
        expect(Type.undefined.is(null)).toBeFalsy();
        expect(Type.undefined.is(undefined)).toBeTruthy();
        expect(Type.undefined.is(0)).toBeFalsy();
        expect(Type.undefined.is("")).toBeFalsy();
    });

    test(`undefined:isNot`, () => {
        expect(Type.undefined.isNot(null)).toBeTruthy();
        expect(Type.undefined.isNot(undefined)).toBeFalsy();
        expect(Type.undefined.isNot(0)).toBeTruthy();
        expect(Type.undefined.isNot("")).toBeTruthy();
    });
});

describe("boolean", () => {
    test(`boolean:is`, () => {
        expect(Type.boolean.is(undefined)).toBeFalsy();
        expect(Type.boolean.is(0)).toBeFalsy();
        expect(Type.boolean.is(false)).toBeTruthy();
        expect(Type.boolean.is(true)).toBeTruthy();
    });

    test(`boolean:isNot`, () => {
        expect(Type.boolean.isNot(undefined)).toBeTruthy();
        expect(Type.boolean.isNot(0)).toBeTruthy();
        expect(Type.boolean.isNot(true)).toBeFalsy();
        expect(Type.boolean.isNot(false)).toBeFalsy();
    });
});
