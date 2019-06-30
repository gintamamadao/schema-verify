const { Type } = require("../dist/js-verify.js");

test(`string:is`, () => {
    expect(Type.string.is("")).toBeTruthy();
});

test(`string:is`, () => {
    expect(Type.string.is("a")).toBeTruthy();
});

test(`string:is`, () => {
    expect(Type.string.is(null)).toBeFalsy();
});

test(`string:is`, () => {
    expect(Type.string.is(0)).toBeFalsy();
});

test(`string:isNot`, () => {
    expect(Type.string.isNot(null)).toBeTruthy();
});

test(`string:isNot`, () => {
    expect(Type.string.isNot("")).toBeFalsy();
});

test(`string:isNot`, () => {
    expect(Type.string.isNot(0)).toBeTruthy();
});

test(`string:isEmpty`, () => {
    expect(Type.string.isEmpty("")).toBeTruthy();
});

test(`string:isEmpty`, () => {
    expect(Type.string.isEmpty("a")).toBeFalsy();
});

test(`string:isNotEmpty`, () => {
    expect(Type.string.isNotEmpty("a")).toBeTruthy();
});

test(`string:isNotEmpty`, () => {
    expect(Type.string.isNotEmpty("")).toBeFalsy();
});

test(`string:safe`, () => {
    expect(Type.string.safe(null)).toEqual("");
});

test(`string:safe`, () => {
    expect(Type.string.safe("a")).toEqual("a");
});

test(`number:is`, () => {
    expect(Type.number.is("a")).toBeFalsy();
});

test(`number:is`, () => {
    expect(Type.number.is("1")).toBeTruthy();
});

test(`number:is`, () => {
    expect(Type.number.is(1)).toBeTruthy();
});

test(`number:is`, () => {
    expect(Type.number.is("1a")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(Type.number.isNot(1)).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(Type.number.isNot("1")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(Type.number.isNot("1")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(Type.number.isNot("1a")).toBeTruthy();
});

test(`number:isinteger`, () => {
    expect(Type.number.isinteger(1)).toBeTruthy();
});

test(`number:isinteger`, () => {
    expect(Type.number.isinteger("1")).toBeFalsy();
});

test(`number:isinteger`, () => {
    expect(Type.number.isinteger(1.1)).toBeFalsy();
});

test(`number:isinteger`, () => {
    expect(Type.number.isinteger(-1)).toBeTruthy();
});

test(`number:isNatural`, () => {
    expect(Type.number.isNatural(1.1)).toBeFalsy();
});

test(`number:isNatural`, () => {
    expect(Type.number.isNatural(-1)).toBeFalsy();
});

test(`number:isNatural`, () => {
    expect(Type.number.isNatural(1)).toBeTruthy();
});

test(`number:isNatural`, () => {
    expect(Type.number.isNatural(0)).toBeTruthy();
});

test(`number:safe`, () => {
    expect(Type.number.safe(null)).toEqual(0);
});

test(`array:is`, () => {
    expect(Type.array.is([])).toBeTruthy();
});

test(`array:is`, () => {
    expect(Type.array.is({})).toBeFalsy();
});

test(`array:is`, () => {
    expect(Type.array.is(null)).toBeFalsy();
});

test(`array:isNot`, () => {
    expect(Type.array.isNot([])).toBeFalsy();
});

test(`array:isNot`, () => {
    expect(Type.array.isNot({})).toBeTruthy();
});

test(`array:isNot`, () => {
    expect(Type.array.isNot(null)).toBeTruthy();
});

test(`array:isEmpty`, () => {
    expect(Type.array.isEmpty([])).toBeTruthy();
});

test(`array:isEmpty`, () => {
    expect(Type.array.isEmpty(["a"])).toBeFalsy();
});

test(`array:isNotEmpty`, () => {
    expect(Type.array.isNotEmpty(["a"])).toBeTruthy();
});

test(`array:isNotEmpty`, () => {
    expect(Type.array.isNotEmpty([])).toBeFalsy();
});

test(`array:isNotEmpty`, () => {
    expect(Type.array.isNotEmpty(null)).toBeFalsy();
});

test(`array:safe`, () => {
    expect(Type.array.safe(null)).toEqual([]);
});

test(`object:is`, () => {
    expect(Type.object.is({})).toBeTruthy();
});

test(`object:is`, () => {
    expect(
        Type.object.is({
            a: 1
        })
    ).toBeTruthy();
});

test(`object:is`, () => {
    expect(Type.object.is(null)).toBeFalsy();
});

test(`object:isNot`, () => {
    expect(Type.object.isNot(null)).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(Type.object.isNot(1)).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(Type.object.isNot([])).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(Type.object.isNot({})).toBeFalsy();
});

test(`object:isEmpty`, () => {
    expect(Type.object.isEmpty({})).toBeTruthy();
});

test(`object:isEmpty`, () => {
    expect(
        Type.object.isEmpty({
            a: 1
        })
    ).toBeFalsy();
});

test(`object:isNotEmpty`, () => {
    expect(Type.object.isNotEmpty({})).toBeFalsy();
});

test(`object:isNotEmpty`, () => {
    expect(
        Type.object.isNotEmpty({
            a: 1
        })
    ).toBeTruthy();
});

test(`object:safe`, () => {
    expect(Type.object.safe(null)).toEqual({});
});

test(`function:is`, () => {
    expect(Type.function.is(null)).toBeFalsy();
});

test(`function:is`, () => {
    expect(Type.function.is(() => {})).toBeTruthy();
});

test(`function:is`, () => {
    expect(Type.function.is(async () => {})).toBeTruthy();
});

test(`function:is`, () => {
    expect(Type.function.is(0)).toBeFalsy();
});

test(`function:isNot`, () => {
    expect(Type.function.isNot("a")).toBeTruthy();
});

test(`function:isNot`, () => {
    expect(Type.function.isNot(1)).toBeTruthy();
});

test(`function:isNot`, () => {
    expect(Type.function.isNot(() => {})).toBeFalsy();
});

test(`undefinedNull:is`, () => {
    expect(Type.undefinedNull.is(null)).toBeTruthy();
});

test(`undefinedNull:is`, () => {
    expect(Type.undefinedNull.is(undefined)).toBeTruthy();
});

test(`undefinedNull:is`, () => {
    expect(Type.undefinedNull.is(0)).toBeFalsy();
});

test(`undefinedNull:isNot`, () => {
    expect(Type.undefinedNull.isNot(0)).toBeTruthy();
});

test(`undefinedNull:isNot`, () => {
    expect(Type.undefinedNull.isNot(null)).toBeFalsy();
});

test(`undefinedNull:isNot`, () => {
    expect(Type.undefinedNull.isNot(undefined)).toBeFalsy();
});

test(`boolean:is`, () => {
    expect(Type.boolean.is(undefined)).toBeFalsy();
});

test(`boolean:is`, () => {
    expect(Type.boolean.is(false)).toBeTruthy();
});

test(`boolean:is`, () => {
    expect(Type.boolean.is(true)).toBeTruthy();
});

test(`boolean:isNot`, () => {
    expect(Type.boolean.isNot(undefined)).toBeTruthy();
});

test(`boolean:isNot`, () => {
    expect(Type.boolean.isNot(true)).toBeFalsy();
});
