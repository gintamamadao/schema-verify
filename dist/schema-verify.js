'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isarray = _interopDefault(require('isarray'));
var isobject = _interopDefault(require('isobject'));
var isInteger = _interopDefault(require('is-integer'));

const isstring = function (v) {
  return typeof v === "string";
};

const isnumber = function (v) {
  return typeof v === "number" && !isNaN(v);
};

const isfunction = function (v) {
  return typeof v === "function";
};

const isnull = function (v) {
  return v === null;
};

const isundefined = function (v) {
  return v === undefined;
};

const isundefinednull = function (v) {
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
      return isstring(v) ? v : isundefinednull(v) ? "" : v + "";
    }

  },
  number: {
    is(v) {
      return isnumber(v);
    },

    isNot(v) {
      return !isnumber(v);
    },

    isinteger(v) {
      return isnumber(v) && isInteger(v);
    },

    isNatural(v) {
      return isnumber(v) && isInteger(v) && v >= 0;
    },

    safe(v) {
      if (isnumber(v)) {
        return v;
      } else if (isundefinednull(v)) {
        return 0;
      } else {
        v = new Number(v).valueOf();

        if (isnumber(v)) {
          return v;
        }
      }

      return 0;
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
    },

    pure(v) {
      if (!isarray(v)) {
        return [];
      }

      const t = [];
      v.forEach(item => {
        if (!isundefinednull(item)) {
          t.push(item);
        }
      });
      return t;
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
    },

    pure(v) {
      if (!isobject(v)) {
        return {};
      }

      const t = Object.assign({}, v);
      Object.keys(t).forEach(k => {
        if (isundefinednull(t[k])) {
          delete t[k];
        }
      });
      return t;
    }

  },
  function: {
    is(v) {
      return isfunction(v);
    },

    isNot(v) {
      return !isfunction(v);
    },

    safe(v, context) {
      return function () {
        if (isfunction(v)) {
          context = context || isnull(context) ? context : this;
          return v.apply(context, Array.prototype.slice.apply(arguments));
        }
      };
    }

  },
  undefinedNull: {
    is(v) {
      return isundefinednull(v);
    },

    isNot(v) {
      return !isundefinednull(v);
    }

  },
  null: {
    is(v) {
      return isnull(v);
    },

    isNot(v) {
      return !isnull(v);
    }

  },
  undefined: {
    is(v) {
      return isundefined(v);
    },

    isNot(v) {
      return !isundefined(v);
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

class ErrorHint {
  safeErrorHint(e) {
    return typeof e === "string" ? e : e && e.message ? e.message : "未知";
  }

}

var error = ErrorHint;

class VerifyErrorHint extends error {
  constructor() {
    super();
    this.propEmptyHint = "对象缺少属性";
    this.elementEmptyHint = "数组缺少元素";
    this.propErrorHint = this.propErrorHint.bind(this);
    this.elementErrorHint = this.elementErrorHint.bind(this);
  }

  minValueHint(min) {
    return `小于最小值 ${min}`;
  }

  maxValueHint(max) {
    return `大于最大值 ${max}`;
  }

  minLenHint(min) {
    return `小于最小长度 ${min}`;
  }

  maxLenHint(max) {
    return `大于最大长度 ${max}`;
  }

  typeNeedHint(type) {
    return `需要 ${type} 类型`;
  }

  enumHint(value) {
    return `${value} 不是有效值之一`;
  }

  integerHint(value) {
    return `${value} 不是整数`;
  }

  naturalHint(value) {
    return `${value} 不是自然数`;
  }

  matchHint(value) {
    return `${value} 未通过正则规则`;
  }

  patternNeedHint(pattern) {
    return `需要 ${pattern} 格式`;
  }

  propNeedHint(key) {
    return `属性 ${key}: 缺少数据`;
  }

  propRestrictHint(key) {
    return `属性 ${key} 不允许`;
  }

  propErrorHint(key, e) {
    return `属性 ${key}: ${this.safeErrorHint(e)}`;
  }

  elementNeedHint(index) {
    return `第 ${index} 项: 缺少数据`;
  }

  elementErrorHint(index, e) {
    return `第 ${index} 项: ${this.safeErrorHint(e)}`;
  }

  verifyErrorHint(type, customHint, originHint) {
    return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint || originHint || "未知"}`;
  }

}

var verify_error = new VerifyErrorHint();

const TYPES = {
  string: "string",
  number: "number",
  object: "object",
  array: "array",
  function: "function",
  boolean: "boolean",
  null: "null"
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
  minLength: "minLength",
  maxLength: "maxLength",
  min: "min",
  max: "max",
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
  string: [METHODS.pattern, METHODS.length, METHODS.enum, METHODS.match, METHODS.minLength, METHODS.maxLength],
  number: [METHODS.range, METHODS.integer, METHODS.natural, METHODS.enum, METHODS.min, METHODS.max],
  object: [METHODS.restrict, METHODS.props],
  array: [METHODS.elements, METHODS.length, METHODS.minLength, METHODS.maxLength],
  function: [],
  boolean: [],
  null: []
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

    case TYPES$1.function:
      isPass = type.function.is(data);
      break;

    case TYPES$1.boolean:
      isPass = type.boolean.is(data);
      break;

    case TYPES$1.null:
      isPass = type.null.is(data);
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
  let restrictKeys = [];

  for (const item of propsClaims) {
    if (type.object.is(item)) {
      restrictKeys.push(item.index);
      continue;
    }

    if (type.array.is(item)) {
      restrictKeys.push(item[0].index);
      continue;
    }
  }

  restrictKeys = restrictKeys.filter(s => s);

  for (const key of dataKeys) {
    if (!restrictKeys.includes(key)) {
      throw new Error(verify_error.verifyErrorHint(METHODS$1.restrict, hint, verify_error.propRestrictHint(key)));
    }
  }

  return true;
};

const requiredVerify = (data, index, claim, hint) => {
  if (type.object.is(data) && !data.hasOwnProperty(index) || type.array.is(data) && type.undefined.is(data[index])) {
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

const elePropVerify = (data, claims, type$1) => {
  const verifyItem = (itemData, itemClaim, index) => {
    let required;
    let hint;

    if (type.array.isNotEmpty(itemClaim)) {
      const itemItemClaim = itemClaim[0];
      required = itemItemClaim.required;
      hint = type.object.safe(itemItemClaim.hint);
    } else {
      required = itemClaim.required;
      hint = type.object.safe(itemClaim.hint);
    }

    const getHint = type$1 === TYPES$1.object ? verify_error.propNeedHint : verify_error.elementNeedHint;
    const requiredHint = hint[METHODS$1.required] || getHint(index);
    const isRequiredPass = requiredVerify(data, index, required, requiredHint);

    if (isRequiredPass) {
      return;
    }

    try {
      verify(itemData, itemClaim, data);
    } catch (e) {
      const getHint = type$1 === TYPES$1.object ? verify_error.propErrorHint : verify_error.elementErrorHint;
      throw new Error(getHint(index, e));
    }
  };

  const verifyArr = (itemClaim, checkedMap) => {
    let required;
    let hint;

    if (type.array.isNotEmpty(itemClaim)) {
      const itemItemClaim = itemClaim[0];
      required = itemItemClaim.required;
      hint = type.object.safe(itemItemClaim.hint);
    } else {
      required = itemClaim.required;
      hint = type.object.safe(itemClaim.hint);
    }

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

  const fn = claims => {
    const checkedMap = {};

    for (const itemClaim of claims) {
      let index;

      if (type.array.isNotEmpty(itemClaim)) {
        const itemItemClaim = itemClaim[0];
        index = itemItemClaim.index;
      } else {
        index = itemClaim.index;
      }

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
    fn(claims);
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
    const isPass = type.function.safe(claim)(data, parent);

    if (!isPass) {
      throw new Error(hint || "未知");
    }
  } catch (e) {
    throw new Error(verify_error.verifyErrorHint(METHODS$1.custom, `${verify_error.safeErrorHint(e)}`));
  }

  return true;
};

const claimsVerify = (data, claims, parent) => {
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

const verify = (data, info, parent) => {
  const fn = claimsInfo => {
    try {
      claimsVerify(data, claimsInfo, parent);
    } catch (e) {
      throw e;
    }
  };

  if (type.object.is(info)) {
    fn(info);
  }

  if (type.array.is(info)) {
    const errorMsgs = [];

    for (let i = 0; i < info.length; i++) {
      try {
        fn(info[i]);
        break;
      } catch (e) {
        errorMsgs.push(`schema-${i}: ${verify_error.safeErrorHint(e)}`);
      }
    }

    if (info.length === errorMsgs.length) {
      throw new Error(errorMsgs.join(";"));
    }
  }

  return true;
};

var verify_1 = verify;

class SchemaErrorHint extends error {
  constructor() {
    super();
    this.propsInfoEmpty = "属性信息不能为空";
    this.emptyLengthInfo = "空的长度信息";
    this.emptyEnumInfo = "空的枚举信息";
    this.errorEnumInfo = "错误的枚举信息";
    this.emptyHintInfo = "空的提示信息";
    this.emptyRangeInfo = "空的范围信息";
  }

  unIdentifyType(v) {
    return `不可识别的属性类型：${v}`;
  }

  illegalHintInfo(v) {
    return `非法的提示信息属性：${v}`;
  }

  illegalVerifyProps(v) {
    return `非法的校验属性：${v}`;
  }

  illegalPatternType(v) {
    return `非法的格式类型：${v}`;
  }

}

var schema_error = new SchemaErrorHint();

const {
  COMMON_METHODS: COMMON_METHODS$2,
  TYPE_METHODS: TYPE_METHODS$2,
  TYPES: TYPES$2,
  METHODS: METHODS$2
} = constant;
const PATTERNS = Object.keys(pattern);

const schemaCheck = function (info) {
  if (type.object.isNot(info) && !type.array.isNotEmpty(info)) {
    throw new Error(schema_error.propsInfoEmpty);
  }

  if (type.array.isNotEmpty(info)) {
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
    case TYPES$2.string:
    case String:
      info = stringCheck(info);
      info.type = TYPES$2.string;
      break;

    case TYPES$2.number:
    case Number:
      info = numberCheck(info);
      info.type = TYPES$2.number;
      break;

    case TYPES$2.object:
    case Object:
      info = objectCheck(info);
      info.type = TYPES$2.object;
      break;

    case TYPES$2.array:
    case Array:
      info = arrayCheck(info);
      info.type = TYPES$2.array;
      break;

    case TYPES$2.function:
    case Function:
      info.type = TYPES$2.function;
      break;

    case TYPES$2.boolean:
    case Boolean:
      info.type = TYPES$2.boolean;
      break;

    case TYPES$2.null:
    case null:
      info.type = TYPES$2.null;
      break;
  }

  return typeCommonCheck(info);
};

const typeCommonCheck = info => {
  const methods = TYPE_METHODS$2[info.type];

  if (type.array.isNot(methods)) {
    throw new Error(schema_error.unIdentifyType(methods));
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

  if (info.hasOwnProperty(METHODS$2.minLength)) {
    const minLength = info[METHODS$2.minLength];

    if (type.number.isNatural(minLength)) {
      let length = info[METHODS$2.length];
      const minInfo = {
        min: minLength
      };
      info[METHODS$2.length] = type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
      delete info[METHODS$2.minLength];
    }
  }

  if (info.hasOwnProperty(METHODS$2.maxLength)) {
    const maxLength = info[METHODS$2.maxLength];

    if (type.number.isNatural(maxLength)) {
      let length = info[METHODS$2.length];
      const maxInfo = {
        max: maxLength
      };
      info[METHODS$2.length] = type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
      delete info[METHODS$2.maxLength];
    }
  }

  if (info.hasOwnProperty(METHODS$2.length)) {
    let length = info[METHODS$2.length];

    if (!type.object.isNotEmpty(length) && !type.number.isNatural(length)) {
      throw new Error(schema_error.emptyLengthInfo);
    }

    if (type.number.isNatural(length)) {
      info[METHODS$2.length] = {
        min: length,
        max: length
      };
    } else if (type.object.isNotEmpty(length)) {
      if (!type.number.isNatural(length.min) && !type.number.isNatural(length.max)) {
        throw new Error(schema_error.emptyLengthInfo);
      }

      type.number.isNatural(length.min) && (length.min = +length.min);
      type.number.isNatural(length.max) && (length.max = +length.max);
    }
  }

  if (info.hasOwnProperty(METHODS$2.enum)) {
    const enumData = info[METHODS$2.enum];
    let arr;

    if (type.object.isNotEmpty(enumData)) {
      arr = Object.keys(enumData).map(key => enumData[key]);
    }

    if (type.array.isNotEmpty(enumData)) {
      arr = enumData;
    }

    if (!type.array.isNotEmpty(arr)) {
      throw new Error(schema_error.emptyEnumInfo);
    }

    const isAllStr = arr.every(s => type.string.is(s));

    if (!isAllStr) {
      throw new Error(schema_error.errorEnumInfo);
    }

    info[METHODS$2.enum] = arr;
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
  if (info.hasOwnProperty(METHODS$2.min)) {
    const min = info[METHODS$2.min];

    if (type.number.isNatural(min)) {
      let range = info[METHODS$2.range];
      const minInfo = {
        min
      };
      info[METHODS$2.range] = type.object.is(range) ? Object.assign({}, range, minInfo) : minInfo;
      delete info[METHODS$2.min];
    }
  }

  if (info.hasOwnProperty(METHODS$2.max)) {
    const max = info[METHODS$2.max];

    if (type.number.isNatural(max)) {
      let range = info[METHODS$2.range];
      const maxInfo = {
        max
      };
      info[METHODS$2.range] = type.object.is(range) ? Object.assign({}, range, maxInfo) : maxInfo;
      delete info[METHODS$2.max];
    }
  }

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
    const enumData = info[METHODS$2.enum];
    let arr;

    if (type.object.isNotEmpty(enumData)) {
      arr = Object.keys(enumData).map(key => enumData[key]);
    }

    if (type.array.isNotEmpty(enumData)) {
      arr = enumData;
    }

    if (!type.array.isNotEmpty(arr)) {
      throw new Error(schema_error.emptyEnumInfo);
    }

    const isAllNum = arr.every(s => type.number.is(s));

    if (!isAllNum) {
      throw new Error(schema_error.errorEnumInfo);
    }

    info[METHODS$2.enum] = arr;
  }

  return info;
};

const objectCheck = function (info) {
  if (info.hasOwnProperty(METHODS$2.props)) {
    const props = info[METHODS$2.props];

    if (!type.object.isNotEmpty(props) && !type.array.is(props)) {
      throw new Error(schema_error.illegalVerifyProps(METHODS$2.props));
    }

    const formatObjProps = (props, info) => {
      if (type.function.isNot(props[METHODS$2.type]) && type.null.isNot(props[METHODS$2.type]) && type.string.isNot(TYPES$2[props[METHODS$2.type]]) && !props.hasOwnProperty(METHODS$2.schema) && !(props instanceof Schema)) {
        props = Object.keys(props).map(key => {
          const item = props[key];

          if (key === "$_PROPS_DEFAULT_INFO") {
            return item;
          }

          if (type.object.is(item)) {
            item[METHODS$2.index] = key;
          }

          if (type.array.is(item) && type.object.is(item[0])) {
            item[0][METHODS$2.index] = key;
          }

          return item;
        });
        formatArrProps(props, info);
      } else {
        delete props[METHODS$2.index];
        info.props = [schemaCheck(props)];
      }
    };

    const formatArrProps = (props, info) => {
      const propMap = props.reduce((map, item) => {
        let index;

        if (type.object.is(item)) {
          index = item[METHODS$2.index];

          if (!type.string.isNotEmpty(index)) {
            delete item[METHODS$2.index];
          }
        }

        if (type.array.is(item) && type.object.is(item[0])) {
          index = item[0][METHODS$2.index];

          if (!type.string.isNotEmpty(index)) {
            delete item[0][METHODS$2.index];
          }
        }

        if (!type.string.isNotEmpty(index)) {
          index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
        }

        map[index] = schemaCheck(item);
        return map;
      }, {});
      info[METHODS$2.props] = Object.keys(propMap).map(key => propMap[key]);
    };

    if (type.object.isNotEmpty(props)) {
      formatObjProps(props, info);
    } else {
      formatArrProps(props, info);
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
      const elementMap = elements.reduce((map, item) => {
        let index;

        if (type.object.is(item)) {
          index = item.index;

          if (type.number.isNot(index)) {
            delete item["index"];
          }
        }

        if (type.array.is(item) && type.object.is(item[0])) {
          index = item[0].index;

          if (type.number.isNot(index)) {
            delete item[0]["index"];
          }
        }

        if (type.number.isNot(index)) {
          index = "$_PROPS_ELEMENTS_DEFAULT_SCHEME_INFO";
        }

        map[index] = schemaCheck(item);
        return map;
      }, {});
      info[METHODS$2.elements] = Object.keys(elementMap).map(key => elementMap[key]);
    }
  }

  if (info.hasOwnProperty(METHODS$2.minLength)) {
    const minLength = info[METHODS$2.minLength];

    if (type.number.isNatural(minLength)) {
      let length = info[METHODS$2.length];
      const minInfo = {
        min: minLength
      };
      info[METHODS$2.length] = type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
      delete info[METHODS$2.minLength];
    }
  }

  if (info.hasOwnProperty(METHODS$2.maxLength)) {
    const maxLength = info[METHODS$2.maxLength];

    if (type.number.isNatural(maxLength)) {
      let length = info[METHODS$2.length];
      const maxInfo = {
        max: maxLength
      };
      info[METHODS$2.length] = type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
      delete info[METHODS$2.maxLength];
    }
  }

  if (info.hasOwnProperty(METHODS$2.length)) {
    let length = info[METHODS$2.length];

    if (!type.object.isNotEmpty(length) && !type.number.isNatural(length)) {
      throw new Error(schema_error.emptyLengthInfo);
    }

    if (type.number.isNatural(length)) {
      info[METHODS$2.length] = {
        min: length,
        max: length
      };
    } else if (type.object.isNotEmpty(length)) {
      if (!type.number.isNatural(length.min) && !type.number.isNatural(length.max)) {
        throw new Error(schema_error.emptyLengthInfo);
      }

      type.number.isNatural(length.min) && (length.min = +length.min);
      type.number.isNatural(length.max) && (length.max = +length.max);
    }
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

function SchemaVerify(info) {
  const schema$1 = new schema(info);
  return schema$1;
}

SchemaVerify.Type = type;
SchemaVerify.Pattern = pattern;
SchemaVerify.Schema = schema;
var src = SchemaVerify;

module.exports = src;
