const verify = require("./verify.js");
const Type = require("./type.js");
const ErrorMsg = require("./error.js");
const Pattern = require("./pattern.js");
const { COMMON_METHODS, TYPE_METHODS } = require("./constant.js");

const PATTERNS = Object.keys(Pattern);

const schemaCheck = function(info) {
    if (Type.object.isNot(info)) {
        throw new Error(ErrorMsg.propsInfoEmpty);
    }
    const result = Object.assign({}, info);
    return typeCheck(result);
};

const typeCheck = function(info) {
    const type = info.type;
    switch (type) {
        case String:
            info = stringCheck(info);
            info.type = "string";
            break;
        case Number:
            info = numberCheck(info);
            info.type = "number";
            break;
        case Object:
            info = objectCheck(info);
            info.type = "object";
            break;
        case Array:
            info = arrayCheck(info);
            info.type = "array";
            break;
    }
    return typeCommonCheck(info);
};

const typeCommonCheck = info => {
    const methods = TYPE_METHODS[info.type];
    if (Type.array.isNot(methods)) {
        throw new Error(ErrorMsg.unIdentifyType);
    }
    for (const key in info) {
        if (COMMON_METHODS.includes(key) || methods.includes(key)) {
            continue;
        } else {
            throw new Error(ErrorMsg.illegalVerifyProps(key));
        }
    }
    if (info.hasOwnProperty("hint")) {
        const hint = info.hint;
        if (!Type.object.is(hint)) {
            throw new Error(ErrorMsg.illegalVerifyProps("hint"));
        }
        for (const key in hint) {
            if (COMMON_METHODS.includes(key) || methods.includes(key)) {
                continue;
            } else {
                throw new Error(ErrorMsg.illegalHintInfo(key));
            }
        }
    }
    if (info.hasOwnProperty("custom")) {
        const custom = info.custom;
        if (Type.function.isNot(custom)) {
            throw new Error(ErrorMsg.illegalVerifyProps("custom"));
        }
    }
    if (info.hasOwnProperty("index")) {
        const index = info.index;
        if (Type.string.isNot(index) && Type.number.isNot(index)) {
            throw new Error(ErrorMsg.illegalVerifyProps("index"));
        }
    }
    return info;
};

const stringCheck = function(info) {
    if (info.hasOwnProperty("pattern")) {
        const pattern = info.pattern;
        if (!PATTERNS.includes(pattern)) {
            throw new Error(ErrorMsg.illegalPatternType(pattern));
        }
    }
    if (info.hasOwnProperty("length")) {
        const length = info.length;
        if (Type.object.isEmpty(length)) {
            throw new Error(ErrorMsg.emptyLengthInfo);
        }
        if (
            !Type.number.isNatural(length.min) &&
            !Type.number.isNatural(length.max)
        ) {
            throw new Error(ErrorMsg.emptyLengthInfo);
        }
        length.min = +length.min;
        length.max = +length.max;
    }
    if (info.hasOwnProperty("enum")) {
        const arr = info.enum;
        if (Type.array.isNot(arr) || Type.array.isEmpty(arr)) {
            throw new Error(ErrorMsg.emptyEnumInfo);
        }
        const isAllStr = arr.every(s => Type.string.is(s));
        if (!isAllStr) {
            throw new Error(ErrorMsg.errorEnumInfo);
        }
    }
    if (info.hasOwnProperty("match")) {
        const match = info.match;
        if (!Type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
            throw new Error(ErrorMsg.illegalVerifyProps("match"));
        }
    }
    return info;
};

const numberCheck = function(info) {
    if (info.hasOwnProperty("range")) {
        const range = info.range;
        if (Type.object.isEmpty(range)) {
            throw new Error(ErrorMsg.emptyRangeInfo);
        }
        if (Type.number.isNot(range.min) && Type.number.isNot(range.max)) {
            throw new Error(ErrorMsg.emptyRangeInfo);
        }
        range.min = +range.min;
        range.max = +range.max;
    }
    if (info.hasOwnProperty("integer")) {
        const integer = info.integer;
        if (Type.boolean.isNot(integer)) {
            throw new Error(ErrorMsg.illegalVerifyProps("integer"));
        }
    }
    if (info.hasOwnProperty("natural")) {
        const natural = info.natural;
        if (Type.boolean.isNot(natural)) {
            throw new Error(ErrorMsg.illegalVerifyProps("natural"));
        }
    }
    if (info.hasOwnProperty("enum")) {
        const arr = info.enum;
        if (Type.array.isNot(arr) || Type.array.isEmpty(arr)) {
            throw new Error(ErrorMsg.emptyEnumInfo);
        }
        const isAllNum = arr.every(s => Type.number.is(s));
        if (!isAllNum) {
            throw new Error(ErrorMsg.errorEnumInfo);
        }
    }
    return info;
};

const objectCheck = function(info) {
    if (info.hasOwnProperty("restrict")) {
        const restrict = info.restrict;
        const props = info.props;
        if (Type.boolean.isNot(restrict)) {
            throw new Error(ErrorMsg.illegalVerifyProps("restrict"));
        }
        if (restrict && Type.object.isNot(props)) {
            throw new Error(ErrorMsg.illegalVerifyProps("props"));
        }
    }
    if (info.hasOwnProperty("props")) {
        const props = info.props;
        if (Type.object.isNot(props)) {
            throw new Error(ErrorMsg.illegalVerifyProps("props"));
        }
        for (const propkey in props) {
            props[propkey] = schemaCheck(props[propkey]);
        }
        info.props = props;
    }
    return info;
};

const arrayCheck = function(info) {
    if (info.hasOwnProperty("elements")) {
        const elements = info.elements;
        if (
            !Type.object.isNotEmpty(elements) &&
            !Type.array.isNotEmpty(elements)
        ) {
            throw new Error(ErrorMsg.illegalVerifyProps("elements"));
        }
        if (Type.object.isNotEmpty(elements)) {
            info.elements = [schemaCheck(elements)];
        } else {
            info.elements = elements.map(item => {
                return schemaCheck(item);
            });
        }
    }
    if (info.hasOwnProperty("length")) {
        const length = info.length;
        if (Type.object.isEmpty(length)) {
            throw new Error(ErrorMsg.emptyLengthInfo);
        }
        if (
            !Type.number.isNatural(length.min) &&
            !Type.number.isNatural(length.max)
        ) {
            throw new Error(ErrorMsg.emptyLengthInfo);
        }
        length.min = +length.min;
        length.max = +length.max;
    }
    return info;
};
class Schema {
    constructor(info) {
        this.info = schemaCheck(info);
    }
    verify(data, throwError) {
        try {
            verify(data, this.info);
            return true;
        } catch (e) {
            if (throwError) {
                throw e;
            }
            return false;
        }
    }
}

module.exports = Schema;
