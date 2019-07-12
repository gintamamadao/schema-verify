const verify = require("./verify.js");
const Type = require("./type.js");
const ErrorMsg = require("./error/schema_error.js");
const Pattern = require("./pattern.js");
const {
    COMMON_METHODS,
    TYPE_METHODS,
    TYPES,
    METHODS
} = require("./constant.js");

const PATTERNS = Object.keys(Pattern);

const schemaCheck = function(info) {
    if (Type.object.isNot(info) && !Type.array.isNotEmpty(info)) {
        throw new Error(ErrorMsg.propsInfoEmpty);
    }
    if (Type.array.isNotEmpty(info)) {
        const result = [];
        for (let i = 0; i < info.length; i++) {
            result[i] = schemaCheck(info[i]);
        }
        return result;
    }
    if (info instanceof Schema) {
        info = {
            schema: info
        };
    }
    if (info.hasOwnProperty(METHODS.schema)) {
        const schema = info[METHODS.schema];
        if (Type.object.isNot(schema) || !(schema instanceof Schema)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.schema));
        }
        const schemaRuleInfo = schema.info;
        for (const method of [METHODS.type, METHODS.required, METHODS.index]) {
            if (
                !info.hasOwnProperty(method) &&
                schemaRuleInfo.hasOwnProperty(method)
            ) {
                info[method] = schemaRuleInfo[method];
            }
        }
    }
    const result = Object.assign({}, info);
    return typeCheck(result);
};

const typeCheck = function(info) {
    const type = info.type;
    switch (type) {
        case TYPES.string:
        case String:
            info = stringCheck(info);
            info.type = TYPES.string;
            break;

        case TYPES.number:
        case Number:
            info = numberCheck(info);
            info.type = TYPES.number;
            break;

        case TYPES.object:
        case Object:
            info = objectCheck(info);
            info.type = TYPES.object;
            break;

        case TYPES.array:
        case Array:
            info = arrayCheck(info);
            info.type = TYPES.array;
            break;

        case TYPES.function:
        case Function:
            info.type = TYPES.function;
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
    if (info.hasOwnProperty(METHODS.hint)) {
        const hint = info[METHODS.hint];
        if (!Type.object.is(hint)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.hint));
        }
        for (const key in hint) {
            if (COMMON_METHODS.includes(key) || methods.includes(key)) {
                continue;
            } else {
                throw new Error(ErrorMsg.illegalHintInfo(key));
            }
        }
    }
    if (info.hasOwnProperty(METHODS.custom)) {
        const custom = info[METHODS.custom];
        if (Type.function.isNot(custom)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.custom));
        }
    }
    if (info.hasOwnProperty(METHODS.index)) {
        const index = info[METHODS.index];
        if (Type.string.isNot(index) && Type.number.isNot(index)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.index));
        }
    }
    return info;
};

const stringCheck = function(info) {
    if (info.hasOwnProperty(METHODS.pattern)) {
        const pattern = info[METHODS.pattern];
        if (!PATTERNS.includes(pattern)) {
            throw new Error(ErrorMsg.illegalPatternType(pattern));
        }
    }
    if (info.hasOwnProperty(METHODS.length)) {
        const length = info[METHODS.length];
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
    if (info.hasOwnProperty(METHODS.enum)) {
        const arr = info[METHODS.enum];
        if (Type.array.isNot(arr) || Type.array.isEmpty(arr)) {
            throw new Error(ErrorMsg.emptyEnumInfo);
        }
        const isAllStr = arr.every(s => Type.string.is(s));
        if (!isAllStr) {
            throw new Error(ErrorMsg.errorEnumInfo);
        }
    }
    if (info.hasOwnProperty(METHODS.match)) {
        const match = info[METHODS.match];
        if (!Type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.match));
        }
    }
    return info;
};

const numberCheck = function(info) {
    if (info.hasOwnProperty(METHODS.range)) {
        const range = info[METHODS.range];
        if (Type.object.isEmpty(range)) {
            throw new Error(ErrorMsg.emptyRangeInfo);
        }
        if (Type.number.isNot(range.min) && Type.number.isNot(range.max)) {
            throw new Error(ErrorMsg.emptyRangeInfo);
        }
        range.min = +range.min;
        range.max = +range.max;
    }
    if (info.hasOwnProperty(METHODS.integer)) {
        const integer = info[METHODS.integer];
        if (Type.boolean.isNot(integer)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.integer));
        }
    }
    if (info.hasOwnProperty(METHODS.natural)) {
        const natural = info[METHODS.natural];
        if (Type.boolean.isNot(natural)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.natural));
        }
    }
    if (info.hasOwnProperty(METHODS.enum)) {
        const arr = info[METHODS.enum];
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
    if (info.hasOwnProperty(METHODS.props)) {
        const props = info[METHODS.props];
        if (!Type.object.isNotEmpty(props) && !Type.array.is(props)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.props));
        }
        if (Type.object.isNotEmpty(props)) {
            delete props["index"];
            info.props = [schemaCheck(props)];
        } else {
            const propMap = props.reduce((map, item) => {
                const index = item.index;
                map[index] = schemaCheck(item);
                return map;
            }, {});
            info.props = Object.keys(propMap).map(prop => propMap[prop]);
        }
    }
    if (info.hasOwnProperty(METHODS.restrict)) {
        const restrict = info[METHODS.restrict];
        const props = info[METHODS.props];
        if (Type.boolean.isNot(restrict)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.restrict));
        }
        if (restrict && Type.array.isNot(props)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.props));
        }
    }
    return info;
};

const arrayCheck = function(info) {
    if (info.hasOwnProperty(METHODS.elements)) {
        const elements = info[METHODS.elements];
        if (!Type.object.isNotEmpty(elements) && !Type.array.is(elements)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.elements));
        }
        if (Type.object.isNotEmpty(elements)) {
            delete elements["index"];
            info.elements = [schemaCheck(elements)];
        } else {
            info.elements = elements.map(item => {
                return schemaCheck(item);
            });
        }
    }
    if (info.hasOwnProperty(METHODS.length)) {
        const length = info[METHODS.length];
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
        this.verify = this.verify.bind(this);
    }
    verify(data, throwError, parent) {
        try {
            verify(data, this.info, parent);
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
