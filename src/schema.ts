import verify from "./verify";
import Type from "./type";
import Pattern from "./pattern";
import ErrorMsg from "./error/schema_error.js";
import {
    SchemaInfo,
    SingleSchemaInfo,
    EnumObj,
    RangeType,
    LengthTypes,
} from "./interface";
import { COMMON_METHODS, TYPE_METHODS, TYPES, METHODS } from "./constant.js";

const PATTERNS = Object.keys(Pattern);

const checkLengthRule = (info: any) => {
    let length = info[METHODS.length];
    if (
        !Type.object.isNotEmpty<LengthTypes>(length) &&
        !Type.number.isNatural(length)
    ) {
        throw new Error(ErrorMsg.emptyLengthInfo);
    }
    if (Type.number.isNatural(length)) {
        info[METHODS.length] = {
            min: length,
            max: length,
        };
    } else if (Type.object.isNotEmpty<RangeType>(length)) {
        if (
            !Type.number.isNatural(length.min) &&
            !Type.number.isNatural(length.max)
        ) {
            throw new Error(ErrorMsg.emptyLengthInfo);
        }
        if (!Type.number.isNatural(length.min)) {
            delete length.min;
        }
        if (!Type.number.isNatural(length.max)) {
            delete length.max;
        }
    }
};

const checkEnumRule = (info: any, isNumberType?: boolean) => {
    const enumData = info[METHODS.enum];
    let arr: any;
    if (Type.object.isNotEmpty<EnumObj>(enumData)) {
        arr = Object.keys(enumData).map((key) => enumData[key]);
    }
    if (Type.array.isNotEmpty<string[] | number[]>(enumData)) {
        arr = enumData;
    }
    if (!Type.array.isNotEmpty<string[] | number[]>(arr)) {
        throw new Error(ErrorMsg.emptyEnumInfo);
    }
    const isAllNum = arr.every((s) => Type.number.is(s));
    const isAllStr = arr.every((s) => Type.string.is(s));
    if (!isAllNum && isNumberType) {
        throw new Error(ErrorMsg.errorEnumInfo);
    }
    if (!isAllStr && !isNumberType) {
        throw new Error(ErrorMsg.errorEnumInfo);
    }
    info[METHODS.enum] = arr;
};

const checkMaxMinLenRule = (info: any) => {
    if (info.hasOwnProperty(METHODS.minLength)) {
        const minLength = info[METHODS.minLength];
        if (Type.number.isNatural(minLength)) {
            let length = info[METHODS.length];
            const minInfo = {
                min: minLength,
            };
            info[METHODS.length] = Type.object.is(length)
                ? Object.assign({}, length, minInfo)
                : minInfo;
            delete info[METHODS.minLength];
        }
    }
    if (info.hasOwnProperty(METHODS.maxLength)) {
        const maxLength = info[METHODS.maxLength];
        if (Type.number.isNatural(maxLength)) {
            let length = info[METHODS.length];
            const maxInfo = {
                max: maxLength,
            };
            info[METHODS.length] = Type.object.is(length)
                ? Object.assign({}, length, maxInfo)
                : maxInfo;
            delete info[METHODS.maxLength];
        }
    }
};

const schemaCheck = (info: SchemaInfo) => {
    if (Type.object.isNot(info) && !Type.array.isNotEmpty(info)) {
        throw new Error(ErrorMsg.propsInfoEmpty);
    }
    if (Type.array.is<any[]>(info)) {
        const result: SingleSchemaInfo[] = [];
        for (let i = 0; i < info.length; i++) {
            result[i] = schemaCheck(info[i]);
        }
        return result;
    }
    if (info instanceof Schema) {
        info = {
            schema: info,
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

const typeCheck = (info: any) => {
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
        case TYPES.boolean:
        case Boolean:
            info.type = TYPES.boolean;
            break;
        case TYPES.null:
        case null:
            info.type = TYPES.null;
            break;
    }
    return typeCommonCheck(info);
};

const typeCommonCheck = (info: any) => {
    const methods = TYPE_METHODS[info.type];
    if (Type.array.isNot(methods)) {
        throw new Error(ErrorMsg.unIdentifyType(methods));
    }
    for (const key of Object.keys(info)) {
        if (COMMON_METHODS.includes(key) || methods.includes(key)) {
            continue;
        } else {
            throw new Error(ErrorMsg.illegalVerifyProps(key));
        }
    }
    if (info.hasOwnProperty(METHODS.hint)) {
        const hint = info[METHODS.hint];
        if (!Type.object.is<any>(hint)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.hint));
        }
        for (const key of Object.keys(hint)) {
            if (COMMON_METHODS.includes(key) || methods.includes(key)) {
                continue;
            } else {
                throw new Error(ErrorMsg.illegalHintInfo(key));
            }
        }
    }
    if (info.hasOwnProperty(METHODS.custom)) {
        const custom = info[METHODS.custom];
        if (Type.func.isNot(custom)) {
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

const stringCheck = (info) => {
    if (info.hasOwnProperty(METHODS.pattern)) {
        const pattern = info[METHODS.pattern];
        if (!PATTERNS.includes(pattern)) {
            throw new Error(ErrorMsg.illegalPatternType(pattern));
        }
    }
    checkMaxMinLenRule(info);
    if (info.hasOwnProperty(METHODS.length)) {
        checkLengthRule(info);
    }
    if (info.hasOwnProperty(METHODS.enum)) {
        checkEnumRule(info);
    }
    if (info.hasOwnProperty(METHODS.match)) {
        const match = info[METHODS.match];
        if (!Type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.match));
        }
    }
    return info;
};

const numberCheck = (info) => {
    if (info.hasOwnProperty(METHODS.min)) {
        const min = info[METHODS.min];
        if (Type.number.isNatural(min)) {
            let range = info[METHODS.range];
            const minInfo = {
                min,
            };
            info[METHODS.range] = Type.object.is(range)
                ? Object.assign({}, range, minInfo)
                : minInfo;
            delete info[METHODS.min];
        }
    }
    if (info.hasOwnProperty(METHODS.max)) {
        const max = info[METHODS.max];
        if (Type.number.isNatural(max)) {
            let range = info[METHODS.range];
            const maxInfo = {
                max,
            };
            info[METHODS.range] = Type.object.is(range)
                ? Object.assign({}, range, maxInfo)
                : maxInfo;
            delete info[METHODS.max];
        }
    }
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
        checkEnumRule(info, true);
    }
    return info;
};

const objectCheck = (info) => {
    if (info.hasOwnProperty(METHODS.props)) {
        const props = info[METHODS.props];
        if (!Type.object.isNotEmpty(props) && !Type.array.is(props)) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.props));
        }
        const formatObjProps = (props, info) => {
            if (
                Type.func.isNot(props[METHODS.type]) &&
                Type.nul.isNot(props[METHODS.type]) &&
                Type.string.isNot(TYPES[props[METHODS.type]]) &&
                !props.hasOwnProperty(METHODS.schema) &&
                !(props instanceof Schema)
            ) {
                props = Object.keys(props).map((key) => {
                    const item = props[key];
                    if (key === "$_PROPS_DEFAULT_INFO") {
                        return item;
                    }
                    if (Type.object.is<any>(item)) {
                        item[METHODS.index] = key;
                    }
                    if (
                        Type.array.is<any>(item) &&
                        Type.object.is<any>(item[0])
                    ) {
                        item[0][METHODS.index] = key;
                    }
                    return item;
                });
                formatArrProps(props, info);
            } else {
                delete props[METHODS.index];
                info.props = [schemaCheck(props)];
            }
        };
        const formatArrProps = (props, info) => {
            const propMap = props.reduce((map, item) => {
                let index;
                if (
                    Type.object.is<any>(item) &&
                    item.hasOwnProperty(METHODS.index)
                ) {
                    index = item[METHODS.index];
                    if (
                        !Type.string.isNotEmpty(index) &&
                        !Type.number.is(index)
                    ) {
                        throw new Error(
                            ErrorMsg.illegalVerifyProps(METHODS.index)
                        );
                    }
                }
                if (Type.array.is<any>(item) && Type.object.is<any>(item[0])) {
                    index = item[0][METHODS.index];
                    if (!Type.string.isNotEmpty(index)) {
                        delete item[0][METHODS.index];
                    }
                }
                if (!Type.string.isNotEmpty(index)) {
                    index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
                }
                map[index] = schemaCheck(item);
                return map;
            }, {});
            info[METHODS.props] = Object.keys(propMap).map(
                (key) => propMap[key]
            );
        };
        if (Type.object.isNotEmpty(props)) {
            formatObjProps(props, info);
        } else {
            formatArrProps(props, info);
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

const arrayCheck = (info) => {
    if (info.hasOwnProperty(METHODS.elements)) {
        const elements = info[METHODS.elements];
        if (
            !Type.object.isNotEmpty<SingleSchemaInfo>(elements) &&
            !Type.array.is<SingleSchemaInfo[]>(elements)
        ) {
            throw new Error(ErrorMsg.illegalVerifyProps(METHODS.elements));
        }
        if (Type.object.isNotEmpty<SingleSchemaInfo>(elements)) {
            delete elements["index"];
            info.elements = [schemaCheck(elements)];
        } else {
            const elementMap = elements.reduce((map, item) => {
                let index;
                if (Type.object.is<any>(item)) {
                    if (
                        item.hasOwnProperty(METHODS.index) &&
                        Type.number.isNot(item.index)
                    ) {
                        throw new Error(
                            ErrorMsg.illegalVerifyProps(METHODS.index)
                        );
                    } else {
                        index = item.index;
                    }
                }
                if (Type.array.is<any>(item) && Type.object.is<any>(item[0])) {
                    if (
                        item[0].hasOwnProperty(METHODS.index) &&
                        Type.number.isNot(item[0].index)
                    ) {
                        throw new Error(
                            ErrorMsg.illegalVerifyProps(METHODS.index)
                        );
                    } else {
                        index = item[0].index;
                    }
                }
                if (Type.number.isNot(index)) {
                    index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
                }
                map[index] = schemaCheck(item);
                return map;
            }, {});
            info[METHODS.elements] = Object.keys(elementMap).map(
                (key) => elementMap[key]
            );
        }
    }

    checkMaxMinLenRule(info);
    if (info.hasOwnProperty(METHODS.length)) {
        checkLengthRule(info);
    }
    return info;
};

export class Schema {
    public info: any;
    constructor(info: SchemaInfo) {
        this.info = schemaCheck(info);
        this.verify = this.verify.bind(this);
    }
    verify(data: any, throwError?: boolean, parent?: any) {
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

export default Schema;
