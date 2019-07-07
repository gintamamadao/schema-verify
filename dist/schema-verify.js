'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isarray = _interopDefault(require('isarray'));
var isobject = _interopDefault(require('isobject'));
var isNumber = _interopDefault(require('is-number'));
var isInteger = _interopDefault(require('is-integer'));
var isFunctionX = _interopDefault(require('is-function-x'));

const isstring = function (v) {
  return typeof v === "string";
};

const isundefinedNull = function (v) {
  return v === undefined || v === null;
};

const Type = {
  string: {
    is(v) {
      return isstring(v);
    },

    isNot(v) {
      return !isstring(v);
    },

    isEmpty(v) {
      return isstring(v) && v.length === 0;
    },

    isNotEmpty(v) {
      return isstring(v) && v.length >= 1;
    },

    safe(v) {
      return isstring(v) ? v : "";
    }

  },
  number: {
    is(v) {
      return isNumber(v);
    },

    isNot(v) {
      return !isNumber(v);
    },

    isinteger(v) {
      return isInteger(v);
    },

    isNatural(v) {
      return isInteger(v) && v >= 0;
    },

    safe(v) {
      return isNumber(v) ? v : 0;
    }

  },
  boolean: {
    is(v) {
      return v === true || v === false;
    },

    isNot(v) {
      return v !== true && v !== false;
    }

  },
  array: {
    is(v) {
      return isarray(v);
    },

    isNot(v) {
      return !isarray(v);
    },

    isEmpty(v) {
      return isarray(v) && v.length === 0;
    },

    isNotEmpty(v) {
      return isarray(v) && v.length >= 1;
    },

    safe(v) {
      return isarray(v) ? v : [];
    }

  },
  object: {
    is(v) {
      return isobject(v);
    },

    isNot(v) {
      return !isobject(v);
    },

    isEmpty(v) {
      return isobject(v) && Object.keys(v).length === 0;
    },

    isNotEmpty(v) {
      return isobject(v) && Object.keys(v).length >= 1;
    },

    safe(v) {
      return isobject(v) ? v : {};
    }

  },
  function: {
    is(v) {
      return isFunctionX(v);
    },

    isNot(v) {
      return !isFunctionX(v);
    }

  },
  undefinedNull: {
    is(v) {
      return isundefinedNull(v);
    },

    isNot(v) {
      return !isundefinedNull(v);
    }

  }
};
var type = Type;

const phoneReg = new RegExp(/^1\d{10}$/);
const emailReg = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
const colorReg = new RegExp(/(^#\w{3}$)|(^#\w{6}$)|(^rgb\s*\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)$)|(^rgba\s*\((\s*\d{1,3}\s*,){3},[01]{1}\.?\d*\s*\)$)/);
const versionReg = new RegExp(/(^[vV]\d+$)|(^[vV]((\d+\.)+)(\d+)$)/);
const signReg = new RegExp(/^[a-zA-Z_][a-zA-Z_\d]*$/);
const numStrReg = new RegExp(/^\d+$/);
const commonTimeReg = new RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?/);
const Pattern = {
  phone: {
    is(v) {
      return type.string.isNotEmpty(v) && phoneReg.test(v);
    }

  },
  uri: {
    is(v) {
      try {
        return type.string.isNotEmpty(v) && type.object.is(new URL(v));
      } catch (e) {
        return false;
      }
    }

  },
  email: {
    is(v) {
      return type.string.isNotEmpty(v) && emailReg.test(v);
    }

  },
  color: {
    is(v) {
      return type.string.isNotEmpty(v) && colorReg.test(v);
    }

  },
  version: {
    is(v) {
      return type.string.isNotEmpty(v) && versionReg.test(v);
    }

  },
  sign: {
    is(v) {
      return type.string.isNotEmpty(v) && signReg.test(v);
    }

  },
  numStr: {
    is(v) {
      return type.string.isNotEmpty(v) && numStrReg.test(v);
    }

  },
  jsonStr: {
    is(v) {
      try {
        return type.string.isNotEmpty(v) && JSON.parse(v);
      } catch (e) {
        return false;
      }
    }

  },
  time: {
    is(v) {
      try {
        const timeInfo = new Date(v);
        return type.object.is(timeInfo) && timeInfo.toString() !== "Invalid Date";
      } catch (e) {
        return false;
      }
    },

    isCommon(v) {
      return type.string.isNotEmpty(v) && commonTimeReg.test(v);
    }

  }
};
var pattern = Pattern;

const ErrorMsg = {
  minValueHint: min => `小于最小值 ${min}`,
  maxValueHint: max => `大于最大值 ${max}`,
  minLenHint: min => `小于最小长度 ${min}`,
  maxLenHint: max => `大于最大长度 ${max}`,
  typeNeedHint: type => `需要 ${type} 类型`,
  enumHint: value => `${value} 不是有效值之一`,
  integerHint: value => `${value} 不是整数`,
  naturalHint: value => `${value} 不是自然数`,
  matchHint: value => `${value} 未通过正则规则`,
  patternNeedHint: pattern => `需要 ${pattern} 格式`,
  propEmptyHint: "对象缺少属性",
  propNeedHint: key => `属性 ${key}: 缺少数据`,
  propRestrictHint: key => `属性 ${key} 不允许`,
  propErrorHint: (key, e) => `属性 ${key}: ${ErrorMsg.safeErrorHint(e)}`,
  elementEmptyHint: "数组缺少元素",
  elementNeedHint: index => `第 ${index} 项: 缺少数据`,
  elementErrorHint: (index, e) => `第 ${index} 项: ${ErrorMsg.safeErrorHint(e)}`,
  safeErrorHint: e => {
    return typeof e === "string" ? e : e && e.message ? e.message : "未知";
  },
  verifyErrorHint: (type, customHint, originHint) => {
    return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint || originHint || "未知"}`;
  }
};
var verify_error = ErrorMsg;

const TYPES = {
  string: "string",
  number: "number",
  object: "object",
  array: "array"
};
const METHODS = {
  index: "index",
  required: "required",
  type: "type",
  schema: "schema",
  custom: "custom",
  hint: "hint",
  pattern: "pattern",
  length: "length",
  enum: "enum",
  match: "match",
  range: "range",
  integer: "integer",
  natural: "natural",
  restrict: "restrict",
  props: "props",
  elements: "elements"
};
const COMMON_METHODS = [METHODS.index, METHODS.required, METHODS.type, METHODS.schema, METHODS.custom, METHODS.hint];
const TYPE_METHODS = {
  string: [METHODS.pattern, METHODS.length, METHODS.enum, METHODS.match],
  number: [METHODS.range, METHODS.integer, METHODS.natural, METHODS.enum],
  object: [METHODS.restrict, METHODS.props],
  array: [METHODS.elements, METHODS.length]
};
var constant = {
  COMMON_METHODS,
  TYPE_METHODS,
  TYPES,
  METHODS
};

const {
  COMMON_METHODS: COMMON_METHODS$1,
  TYPE_METHODS: TYPE_METHODS$1,
  TYPES: TYPES$1,
  METHODS: METHODS$1
} = constant;
const CHECK_METHODS = COMMON_METHODS$1.slice(0, COMMON_METHODS$1.length - 2);

const typeVerify = (data, claim, hint) => {
  let isPass = false;

  switch (claim) {
    case TYPES$1.string:
      isPass = type.string.is(data);
      break;

    case TYPES$1.number:
      isPass = type.number.is(data);
      break;

    case TYPES$1.object:
      isPass = type.object.is(data);
      break;

    case TYPES$1.array:
      isPass = type.array.is(data);
      break;
  }

  if (!isPass) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.type, hint, verify_error.typeNeedHint(claim)));
  }

  return true;
};

const restrictVerify = (data, claim, propsClaims, hint) => {
  if (!claim) {
    return true;
  }

  const dataKeys = Object.keys(data);
  const restrictKeys = propsClaims.map(item => item.index).filter(s => s);

  for (const key of dataKeys) {
    if (!restrictKeys.includes(key)) {
      throw new Error(verify_error.verifyErrorHint(METHODS$1.restrict, hint, verify_error.propRestrictHint(key)));
    }
  }

  return true;
};

const requiredVerify = (data, claim, hint) => {
  if (type.undefinedNull.is(data)) {
    if (claim) {
      throw new Error(hint);
    } else {
      return true;
    }
  }

  return false;
};

const patternVerify = (data, claim, hint) => {
  const isFn = (pattern[claim] || {}).is;

  if (type.function.isNot(isFn)) {
    return true;
  }

  const isPass = isFn.call(pattern[claim], data);

  if (!isPass) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.pattern, hint, verify_error.patternNeedHint(claim)));
  }

  return true;
};

const lengthVerify = (data, claim, hint) => {
  const min = claim.min;
  const max = claim.max;
  const length = data.length;

  if (type.number.is(min) && length < min) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.length, hint, verify_error.minLenHint(min)));
  }

  if (type.number.is(max) && length > max) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.length, hint, verify_error.maxLenHint(max)));
  }

  return true;
};

const enumVerify = (data, claim, hint) => {
  if (!claim.includes(data)) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.enum, hint, verify_error.enumHint(data)));
  }

  return true;
};

const integerVerify = (data, claim, hint) => {
  if (claim && !type.number.isinteger(data)) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.integer, hint, verify_error.integerHint(data)));
  }

  return true;
};

const naturalVerify = (data, claim, hint) => {
  if (claim && !type.number.isNatural(data)) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.natural, hint, verify_error.naturalHint(data)));
  }

  return true;
};

const matchVerify = (data, claim, hint) => {
  if (type.string.is(claim)) {
    claim = new RegExp(claim);
  }

  if (!claim.test(data)) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.match, hint, verify_error.matchHint(data)));
  }

  return true;
};

const rangeVerify = (data, claim, hint) => {
  const min = claim.min;
  const max = claim.max;

  if (type.number.is(min) && data < min) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.range, hint, verify_error.minValueHint(min)));
  }

  if (type.number.is(max) && data > max) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.range, hint, verify_error.maxValueHint(max)));
  }

  return true;
};

const elePropVerify = (data, claim, type$1) => {
  const verifyItem = (itemData, itemClaim, index) => {
    const required = itemClaim.required;
    const hint = type.object.safe(itemClaim.hint);
    const getHint = type$1 === TYPES$1.object ? verify_error.propNeedHint : verify_error.elementNeedHint;
    const requiredHint = hint[METHODS$1.required] || getHint(index);
    const isRequiredPass = requiredVerify(itemData, required, requiredHint);

    if (isRequiredPass) {
      return;
    }

    try {
      verify(itemData, itemClaim, data);
    } catch (e) {
      throw new Error(verify_error.elementErrorHint(index, e));
    }
  };

  const verifyArr = (itemClaim, checkedMap) => {
    const required = itemClaim.required;
    const hint = type.object.safe(itemClaim.hint);
    const indexArr = type$1 === TYPES$1.object ? Object.keys(data) : Array.from("a".repeat(data.length)).map((s, i) => i);
    const emptyHint = type$1 === TYPES$1.object ? verify_error.propEmptyHint : verify_error.elementEmptyHint;

    if (required && indexArr.length <= 0) {
      throw new Error(hint[METHODS$1.required] || emptyHint);
    }

    for (let index of indexArr) {
      if (!checkedMap[index]) {
        const itemData = data[index];
        verifyItem(itemData, itemClaim, index);
        checkedMap[index] = true;
      }
    }
  };

  const fn = () => {
    const checkedMap = {};

    for (const itemClaim of claim) {
      const index = itemClaim.index;

      if (type.number.isNatural(index) || type.string.isNotEmpty(index)) {
        const itemData = data[index];
        verifyItem(itemData, itemClaim, index);
        checkedMap[index] = true;
      } else {
        verifyArr(itemClaim, checkedMap);
      }
    }
  };

  try {
    fn();
  } catch (e) {
    throw e;
  }
};

const schemaVerify = (data, claim, hint, parent) => {
  try {
    claim.verify(data, true, parent);
  } catch (e) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.schema, hint || `${verify_error.safeErrorHint(e)}`));
  }

  return true;
};

const customVerify = (data, claim, hint, parent) => {
  try {
    const isPass = claim(data, parent);

    if (!isPass) {
      throw new Error(hint || "未知");
    }
  } catch (e) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.custom, `${verify_error.safeErrorHint(e)}`));
  }

  return true;
};

const verify = (data, claims, parent) => {
  const fn = () => {
    const hint = type.object.safe(claims.hint);
    const type$1 = claims.type;
    const claimMethods = [].concat(CHECK_METHODS, TYPE_METHODS$1[type$1]);
    claimMethods.push(METHODS$1.custom);

    for (const claimKey of claimMethods) {
      if (!claims.hasOwnProperty(claimKey)) {
        continue;
      }

      const claimValue = claims[claimKey];
      const propsClaims = claims.props;
      const claimHint = hint[claimKey];

      switch (claimKey) {
        case METHODS$1.type:
          typeVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.restrict:
          restrictVerify(data, claimValue, propsClaims, claimHint);
          break;

        case METHODS$1.pattern:
          patternVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.length:
          lengthVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.enum:
          enumVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.match:
          matchVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.range:
          rangeVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.integer:
          integerVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.natural:
          naturalVerify(data, claimValue, claimHint);
          break;

        case METHODS$1.elements:
          elePropVerify(data, claimValue, type$1);
          break;

        case METHODS$1.props:
          elePropVerify(data, claimValue, type$1);
          break;

        case METHODS$1.schema:
          schemaVerify(data, claimValue, claimHint, parent);
          break;

        case METHODS$1.custom:
          customVerify(data, claimValue, claimHint, parent);
          break;
      }
    }
  };

  try {
    fn();
  } catch (e) {
    throw e;
  }
};

var verify_1 = verify;

const ErrorMsg$1 = {
  propsInfoEmpty: "属性信息不能为空",
  unIdentifyType: "不可识别的属性类型",
  emptyLengthInfo: "空的长度信息",
  emptyEnumInfo: "空的枚举信息",
  errorEnumInfo: "错误的枚举信息",
  emptyHintInfo: "空的提示信息",
  emptyRangeInfo: "空的范围信息",
  illegalHintInfo: v => `非法的提示信息属性：${v}`,
  illegalVerifyProps: v => `非法的校验属性：${v}`,
  illegalPatternType: v => `非法的格式类型：${v}`
};
var schema_error = ErrorMsg$1;

const {
  COMMON_METHODS: COMMON_METHODS$2,
  TYPE_METHODS: TYPE_METHODS$2,
  TYPES: TYPES$2,
  METHODS: METHODS$2
} = constant;
const PATTERNS = Object.keys(pattern);

const schemaCheck = function (info) {
  if (type.object.isNot(info)) {
    throw new Error(schema_error.propsInfoEmpty);
  }

  if (info instanceof Schema) {
    info = {
      schema: info
    };
  }

  if (info.hasOwnProperty(METHODS$2.schema)) {
    const schema = info[METHODS$2.schema];

    if (type.object.isNot(schema) || !(schema instanceof Schema)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.schema));
    }

    const schemaRuleInfo = schema.info;

    for (const method of [METHODS$2.type, METHODS$2.required, METHODS$2.index]) {
      if (!info.hasOwnProperty(method) && schemaRuleInfo.hasOwnProperty(method)) {
        info[method] = schemaRuleInfo[method];
      }
    }
  }

  const result = Object.assign({}, info);
  return typeCheck(result);
};

const typeCheck = function (info) {
  const type = info.type;

  switch (type) {
    case String:
      info = stringCheck(info);
      info.type = TYPES$2.string;
      break;

    case Number:
      info = numberCheck(info);
      info.type = TYPES$2.number;
      break;

    case Object:
      info = objectCheck(info);
      info.type = TYPES$2.object;
      break;

    case Array:
      info = arrayCheck(info);
      info.type = TYPES$2.array;
      break;

    case TYPES$2.string:
      info = stringCheck(info);
      break;

    case TYPES$2.number:
      info = numberCheck(info);
      break;

    case TYPES$2.object:
      info = objectCheck(info);
      break;

    case TYPES$2.array:
      info = arrayCheck(info);
      break;
  }

  return typeCommonCheck(info);
};

const typeCommonCheck = info => {
  const methods = TYPE_METHODS$2[info.type];

  if (type.array.isNot(methods)) {
    throw new Error(schema_error.unIdentifyType);
  }

  for (const key in info) {
    if (COMMON_METHODS$2.includes(key) || methods.includes(key)) {
      continue;
    } else {
      throw new Error(schema_error.illegalVerifyProps(key));
    }
  }

  if (info.hasOwnProperty(METHODS$2.hint)) {
    const hint = info[METHODS$2.hint];

    if (!type.object.is(hint)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.hint));
    }

    for (const key in hint) {
      if (COMMON_METHODS$2.includes(key) || methods.includes(key)) {
        continue;
      } else {
        throw new Error(schema_error.illegalHintInfo(key));
      }
    }
  }

  if (info.hasOwnProperty(METHODS$2.custom)) {
    const custom = info[METHODS$2.custom];

    if (type.function.isNot(custom)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.custom));
    }
  }

  if (info.hasOwnProperty(METHODS$2.index)) {
    const index = info[METHODS$2.index];

    if (type.string.isNot(index) && type.number.isNot(index)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.index));
    }
  }

  return info;
};

const stringCheck = function (info) {
  if (info.hasOwnProperty(METHODS$2.pattern)) {
    const pattern = info[METHODS$2.pattern];

    if (!PATTERNS.includes(pattern)) {
      throw new Error(schema_error.illegalPatternType(pattern));
    }
  }

  if (info.hasOwnProperty(METHODS$2.length)) {
    const length = info[METHODS$2.length];

    if (type.object.isEmpty(length)) {
      throw new Error(schema_error.emptyLengthInfo);
    }

    if (!type.number.isNatural(length.min) && !type.number.isNatural(length.max)) {
      throw new Error(schema_error.emptyLengthInfo);
    }

    length.min = +length.min;
    length.max = +length.max;
  }

  if (info.hasOwnProperty(METHODS$2.enum)) {
    const arr = info[METHODS$2.enum];

    if (type.array.isNot(arr) || type.array.isEmpty(arr)) {
      throw new Error(schema_error.emptyEnumInfo);
    }

    const isAllStr = arr.every(s => type.string.is(s));

    if (!isAllStr) {
      throw new Error(schema_error.errorEnumInfo);
    }
  }

  if (info.hasOwnProperty(METHODS$2.match)) {
    const match = info[METHODS$2.match];

    if (!type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.match));
    }
  }

  return info;
};

const numberCheck = function (info) {
  if (info.hasOwnProperty(METHODS$2.range)) {
    const range = info[METHODS$2.range];

    if (type.object.isEmpty(range)) {
      throw new Error(schema_error.emptyRangeInfo);
    }

    if (type.number.isNot(range.min) && type.number.isNot(range.max)) {
      throw new Error(schema_error.emptyRangeInfo);
    }

    range.min = +range.min;
    range.max = +range.max;
  }

  if (info.hasOwnProperty(METHODS$2.integer)) {
    const integer = info[METHODS$2.integer];

    if (type.boolean.isNot(integer)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.integer));
    }
  }

  if (info.hasOwnProperty(METHODS$2.natural)) {
    const natural = info[METHODS$2.natural];

    if (type.boolean.isNot(natural)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.natural));
    }
  }

  if (info.hasOwnProperty(METHODS$2.enum)) {
    const arr = info[METHODS$2.enum];

    if (type.array.isNot(arr) || type.array.isEmpty(arr)) {
      throw new Error(schema_error.emptyEnumInfo);
    }

    const isAllNum = arr.every(s => type.number.is(s));

    if (!isAllNum) {
      throw new Error(schema_error.errorEnumInfo);
    }
  }

  return info;
};

const objectCheck = function (info) {
  if (info.hasOwnProperty(METHODS$2.props)) {
    const props = info[METHODS$2.props];

    if (!type.object.isNotEmpty(props) && !type.array.is(props)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.props));
    }

    if (type.object.isNotEmpty(props)) {
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

  if (info.hasOwnProperty(METHODS$2.restrict)) {
    const restrict = info[METHODS$2.restrict];
    const props = info[METHODS$2.props];

    if (type.boolean.isNot(restrict)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.restrict));
    }

    if (restrict && type.array.isNot(props)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.props));
    }
  }

  return info;
};

const arrayCheck = function (info) {
  if (info.hasOwnProperty(METHODS$2.elements)) {
    const elements = info[METHODS$2.elements];

    if (!type.object.isNotEmpty(elements) && !type.array.is(elements)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.elements));
    }

    if (type.object.isNotEmpty(elements)) {
      delete elements["index"];
      info.elements = [schemaCheck(elements)];
    } else {
      info.elements = elements.map(item => {
        return schemaCheck(item);
      });
    }
  }

  if (info.hasOwnProperty(METHODS$2.length)) {
    const length = info[METHODS$2.length];

    if (type.object.isEmpty(length)) {
      throw new Error(schema_error.emptyLengthInfo);
    }

    if (!type.number.isNatural(length.min) && !type.number.isNatural(length.max)) {
      throw new Error(schema_error.emptyLengthInfo);
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

  verify(data, throwError, parent) {
    try {
      verify_1(data, this.info, parent);
      return true;
    } catch (e) {
      if (throwError) {
        throw e;
      }

      return false;
    }
  }

}

var schema = Schema;

var src = {
  Type: type,
  Pattern: pattern,
  Schema: schema
};
var src_1 = src.Type;
var src_2 = src.Pattern;
var src_3 = src.Schema;

exports.Pattern = src_2;
exports.Schema = src_3;
exports.Type = src_1;
exports.default = src;
