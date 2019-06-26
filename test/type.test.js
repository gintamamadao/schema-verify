const { type } = require("../dist/js-verify.js");

test(`string:is`, () => {
    expect(type.string.is("")).toBeTruthy();
});

test(`string:is`, () => {
    expect(type.string.is("a")).toBeTruthy();
});

test(`string:is`, () => {
    expect(type.string.is(null)).toBeFalsy();
});

test(`string:is`, () => {
    expect(type.string.is(0)).toBeFalsy();
});

test(`string:isNot`, () => {
    expect(type.string.isNot(null)).toBeTruthy();
});

test(`string:isNot`, () => {
    expect(type.string.isNot("")).toBeFalsy();
});

test(`string:isNot`, () => {
    expect(type.string.isNot(0)).toBeTruthy();
});

test(`string:isEmpty`, () => {
    expect(type.string.isEmpty("")).toBeTruthy();
});

test(`string:isEmpty`, () => {
    expect(type.string.isEmpty("a")).toBeFalsy();
});

test(`string:isNotEmpty`, () => {
    expect(type.string.isNotEmpty("a")).toBeTruthy();
});

test(`string:isNotEmpty`, () => {
    expect(type.string.isNotEmpty("")).toBeFalsy();
});

test(`string:safe`, () => {
    expect(type.string.safe(null)).toEqual("");
});

test(`string:safe`, () => {
    expect(type.string.safe("a")).toEqual("a");
});

test(`number:is`, () => {
    expect(type.number.is("a")).toBeFalsy();
});

test(`number:is`, () => {
    expect(type.number.is("1")).toBeTruthy();
});

test(`number:is`, () => {
    expect(type.number.is(1)).toBeTruthy();
});

test(`number:is`, () => {
    expect(type.number.is("1a")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(type.number.isNot(1)).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(type.number.isNot("1")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(type.number.isNot("1")).toBeFalsy();
});

test(`number:isNot`, () => {
    expect(type.number.isNot("1a")).toBeTruthy();
});

test(`number:isinteger`, () => {
    expect(type.number.isinteger(1)).toBeTruthy();
});

test(`number:isinteger`, () => {
    expect(type.number.isinteger("1")).toBeFalsy();
});

test(`number:isinteger`, () => {
    expect(type.number.isinteger(1.1)).toBeFalsy();
});

test(`number:isinteger`, () => {
    expect(type.number.isinteger(-1)).toBeTruthy();
});

test(`number:isNatural`, () => {
    expect(type.number.isNatural(1.1)).toBeFalsy();
});

test(`number:isNatural`, () => {
    expect(type.number.isNatural(-1)).toBeFalsy();
});

test(`number:isNatural`, () => {
    expect(type.number.isNatural(1)).toBeTruthy();
});

test(`number:isNatural`, () => {
    expect(type.number.isNatural(0)).toBeTruthy();
});

test(`number:safe`, () => {
    expect(type.number.safe(null)).toEqual(0);
});

test(`array:is`, () => {
    expect(type.array.is([])).toBeTruthy();
});

test(`array:is`, () => {
    expect(type.array.is({})).toBeFalsy();
});

test(`array:is`, () => {
    expect(type.array.is(null)).toBeFalsy();
});

test(`array:isNot`, () => {
    expect(type.array.isNot([])).toBeFalsy();
});

test(`array:isNot`, () => {
    expect(type.array.isNot({})).toBeTruthy();
});

test(`array:isNot`, () => {
    expect(type.array.isNot(null)).toBeTruthy();
});

test(`array:isEmpty`, () => {
    expect(type.array.isEmpty([])).toBeTruthy();
});

test(`array:isEmpty`, () => {
    expect(type.array.isEmpty(["a"])).toBeFalsy();
});

test(`array:isNotEmpty`, () => {
    expect(type.array.isNotEmpty(["a"])).toBeTruthy();
});

test(`array:isNotEmpty`, () => {
    expect(type.array.isNotEmpty([])).toBeFalsy();
});

test(`array:isNotEmpty`, () => {
    expect(type.array.isNotEmpty(null)).toBeFalsy();
});

test(`array:safe`, () => {
    expect(type.array.safe(null)).toEqual([]);
});

test(`object:is`, () => {
    expect(type.object.is({})).toBeTruthy();
});

test(`object:is`, () => {
    expect(
        type.object.is({
            a: 1
        })
    ).toBeTruthy();
});

test(`object:is`, () => {
    expect(type.object.is(null)).toBeFalsy();
});

test(`object:isNot`, () => {
    expect(type.object.isNot(null)).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(type.object.isNot(1)).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(type.object.isNot([])).toBeTruthy();
});

test(`object:isNot`, () => {
    expect(type.object.isNot({})).toBeFalsy();
});

test(`object:isEmpty`, () => {
    expect(type.object.isEmpty({})).toBeTruthy();
});

test(`object:isEmpty`, () => {
    expect(
        type.object.isEmpty({
            a: 1
        })
    ).toBeFalsy();
});

test(`object:isNotEmpty`, () => {
    expect(type.object.isNotEmpty({})).toBeFalsy();
});

test(`object:isNotEmpty`, () => {
    expect(
        type.object.isNotEmpty({
            a: 1
        })
    ).toBeTruthy();
});

test(`object:safe`, () => {
    expect(type.object.safe(null)).toEqual({});
});

test(`function:is`, () => {
    expect(type.function.is(null)).toBeFalsy();
});

test(`function:is`, () => {
    expect(type.function.is(() => {})).toBeTruthy();
});

test(`function:is`, () => {
    expect(type.function.is(async () => {})).toBeTruthy();
});

test(`function:is`, () => {
    expect(type.function.is(0)).toBeFalsy();
});

test(`function:isNot`, () => {
    expect(type.function.isNot("a")).toBeTruthy();
});

test(`function:isNot`, () => {
    expect(type.function.isNot(1)).toBeTruthy();
});

test(`function:isNot`, () => {
    expect(type.function.isNot(() => {})).toBeFalsy();
});

test(`undefinedNull:is`, () => {
    expect(type.undefinedNull.is(null)).toBeTruthy();
});

test(`undefinedNull:is`, () => {
    expect(type.undefinedNull.is(undefined)).toBeTruthy();
});

test(`undefinedNull:is`, () => {
    expect(type.undefinedNull.is(0)).toBeFalsy();
});

test(`undefinedNull:isNot`, () => {
    expect(type.undefinedNull.isNot(0)).toBeTruthy();
});

test(`undefinedNull:isNot`, () => {
    expect(type.undefinedNull.isNot(null)).toBeFalsy();
});

test(`undefinedNull:isNot`, () => {
    expect(type.undefinedNull.isNot(undefined)).toBeFalsy();
});
