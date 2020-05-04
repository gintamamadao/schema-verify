const { Pattern } = require("../lib/schema-verify");

describe("phone", () => {
    test(`phone:is`, () => {
        expect(Pattern.phone.is(null)).toBeFalsy();
    });

    test(`phone:is`, () => {
        expect(Pattern.phone.is("10000")).toBeFalsy();
    });

    test(`phone:is`, () => {
        expect(Pattern.phone.is("13332222111")).toBeTruthy();
    });
});

describe("uri", () => {
    test(`uri:is`, () => {
        expect(Pattern.uri.is(null)).toBeFalsy();
    });

    test(`uri:is`, () => {
        expect(Pattern.uri.is("aaa")).toBeFalsy();
    });

    test(`uri:is`, () => {
        expect(Pattern.uri.is("http://aaa")).toBeTruthy();
    });

    test(`uri:is`, () => {
        expect(Pattern.uri.is("https://aaa")).toBeTruthy();
    });

    test(`uri:is`, () => {
        expect(Pattern.uri.is("ftp://aaa")).toBeTruthy();
    });
});

describe("email", () => {
    test(`email:is`, () => {
        expect(Pattern.email.is(null)).toBeFalsy();
    });

    test(`email:is`, () => {
        expect(Pattern.email.is("aaa")).toBeFalsy();
    });

    test(`email:is`, () => {
        expect(Pattern.email.is("aaa@123.bbb")).toBeTruthy();
    });
});

describe("color", () => {
    test(`color:is`, () => {
        expect(Pattern.color.is(null)).toBeFalsy();
    });

    test(`color:is`, () => {
        expect(Pattern.color.is("aaa")).toBeFalsy();
    });

    test(`color:is`, () => {
        expect(Pattern.color.is("#666")).toBeTruthy();
    });

    test(`color:is`, () => {
        expect(Pattern.color.is("#666666")).toBeTruthy();
    });
});

describe("version", () => {
    test(`version:is`, () => {
        expect(Pattern.version.is(null)).toBeFalsy();
    });

    test(`version:is`, () => {
        expect(Pattern.version.is("aaa")).toBeFalsy();
    });

    test(`version:is`, () => {
        expect(Pattern.version.is("v1")).toBeTruthy();
    });

    test(`version:is`, () => {
        expect(Pattern.version.is("v1.0")).toBeTruthy();
    });
});

describe("sign", () => {
    test(`sign:is`, () => {
        expect(Pattern.sign.is(null)).toBeFalsy();
    });

    test(`sign:is`, () => {
        expect(Pattern.sign.is("a&aa")).toBeFalsy();
    });

    test(`sign:is`, () => {
        expect(Pattern.sign.is("aaa")).toBeTruthy();
    });

    test(`sign:is`, () => {
        expect(Pattern.sign.is("_aaa")).toBeTruthy();
    });
});

describe("numStr", () => {
    test(`numStr:is`, () => {
        expect(Pattern.numStr.is("123")).toBeTruthy();
    });

    test(`numStr:is`, () => {
        expect(Pattern.numStr.is("")).toBeFalsy();
    });

    test(`numStr:is`, () => {
        expect(Pattern.numStr.is("a123")).toBeFalsy();
    });

    test(`numStr:is`, () => {
        expect(Pattern.numStr.is("123a")).toBeFalsy();
    });
});

describe("time", () => {
    test(`time:is`, () => {
        expect(Pattern.time.is("2019")).toBeTruthy();
    });

    test(`time:is`, () => {
        expect(Pattern.time.is("2019-13")).toBeFalsy();
    });

    test(`time:is`, () => {
        expect(Pattern.time.is("2019-12")).toBeTruthy();
    });

    test(`time:is`, () => {
        expect(Pattern.time.is("2019-12-32")).toBeFalsy();
    });

    test(`time:is`, () => {
        expect(Pattern.time.is("2019-12-31")).toBeTruthy();
    });

    test(`time:is`, () => {
        expect(Pattern.time.is({})).toBeFalsy();
    });

    test(`time:isCommon`, () => {
        expect(Pattern.time.isCommon("2019-12-31")).toBeFalsy();
    });

    test(`time:isCommon`, () => {
        expect(Pattern.time.isCommon("2019-12-31 10:10")).toBeTruthy();
    });

    test(`time:isCommon`, () => {
        expect(Pattern.time.isCommon("2019-12-31 10:10:10")).toBeTruthy();
    });
});
