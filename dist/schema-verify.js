'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isobject = v => {
  return v != null && typeof v === "object" && Array.isArray(v) === false;
};
const isarray = v => {
  return Object.prototype.toString.call(v) == "[object Array]";
};
const isstring = v => {
  return typeof v === "string";
};
const isfinite = v => {
  return v !== Infinity && v !== -Infinity;
};
const isnumber = v => {
  return typeof v === "number" && !Number.isNaN(v) && isfinite(v);
};
const isinteger = v => {
  return isnumber(v) && Math.floor(v) === v;
};
const isfunction = v => {
  return typeof v === "function";
};
const isnull = v => {
  return v === null;
};
const isundefined = v => {
  return v === undefined;
};
const isundefinednull = v => {
  return v == null;
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

    isInteger(v) {
      return isnumber(v) && isinteger(v);
    },

    isNatural(v) {
      return isnumber(v) && isinteger(v) && v >= 0;
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
  func: {
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
  nul: {
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
      return Type.string.isNotEmpty(v) && phoneReg.test(v);
    }

  },
  uri: {
    is(v) {
      try {
        return Type.string.isNotEmpty(v) && Type.object.is(new URL(v));
      } catch (e) {
        return false;
      }
    }

  },
  email: {
    is(v) {
      return Type.string.isNotEmpty(v) && emailReg.test(v);
    }

  },
  color: {
    is(v) {
      return Type.string.isNotEmpty(v) && colorReg.test(v);
    }

  },
  version: {
    is(v) {
      return Type.string.isNotEmpty(v) && versionReg.test(v);
    }

  },
  sign: {
    is(v) {
      return Type.string.isNotEmpty(v) && signReg.test(v);
    }

  },
  numStr: {
    is(v) {
      return Type.string.isNotEmpty(v) && numStrReg.test(v);
    }

  },
  jsonStr: {
    is(v) {
      try {
        return Type.string.isNotEmpty(v) && JSON.parse(v);
      } catch (e) {
        return false;
      }
    }

  },
  time: {
    is(v) {
      const timeInfo = new Date(v);
      return Type.object.is(timeInfo) && timeInfo.toString() !== "Invalid Date";
    },

    isCommon(v) {
      return Type.string.isNotEmpty(v) && commonTimeReg.test(v);
    }

  }
};

class ErrorHint {
  safeErrorHint(e) {
    return typeof e === "string" ? e : e && e.message ? e.message : "未知";
  }

}

class VerifyErrorHint extends ErrorHint {
  constructor() {
    super();
    this.propEmptyHint = "对象缺少属性";
    this.elementEmptyHint = "数组缺少元素";

    this.propErrorHint = (key, e) => {
      return `属性 ${key}: ${this.safeErrorHint(e)}`;
    };

    this.elementErrorHint = (index, e) => {
      return `第 ${index} 项: ${this.safeErrorHint(e)}`;
    };
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

  elementNeedHint(index) {
    return `第 ${index} 项: 缺少数据`;
  }

  verifyErrorHint(type, customHint, originHint) {
    return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint || originHint || "未知"}`;
  }

}

var ErrorMsg = new VerifyErrorHint();

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

const CHECK_METHODS = COMMON_METHODS.slice(0, COMMON_METHODS.length - 2);

const typeVerify = (data, claim, hint) => {
  let isPass = false;

  switch (claim) {
    case TYPES.string:
      isPass = Type.string.is(data);
      break;

    case TYPES.number:
      isPass = Type.number.is(data);
      break;

    case TYPES.object:
      isPass = Type.object.is(data);
      break;

    case TYPES.array:
      isPass = Type.array.is(data);
      break;

    case TYPES.function:
      isPass = Type.func.is(data);
      break;

    case TYPES.boolean:
      isPass = Type.boolean.is(data);
      break;

    case TYPES.null:
      isPass = Type.nul.is(data);
      break;
  }

  if (!isPass) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.type, hint, ErrorMsg.typeNeedHint(claim)));
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
    if (Type.object.is(item)) {
      restrictKeys.push(item.index);
    }

    if (Type.array.is(item)) {
      restrictKeys.push(item[0].index);
    }
  }

  restrictKeys = restrictKeys.filter(s => s);

  for (const key of dataKeys) {
    if (!restrictKeys.includes(key)) {
      throw new Error(ErrorMsg.verifyErrorHint(METHODS.restrict, hint, ErrorMsg.propRestrictHint(key)));
    }
  }

  return true;
};

const requiredVerify = (data, index, claim, hint) => {
  if (Type.object.is(data) && !data.hasOwnProperty(index) || Type.array.is(data) && Type.undefined.is(data[index])) {
    if (claim) {
      throw new Error(hint);
    } else {
      return true;
    }
  }

  return false;
};

const patternVerify = (data, claim, hint) => {
  const isFn = (Pattern[claim] || {}).is;
  const isPass = typeof isFn === "function" && isFn.call(Pattern[claim], data);

  if (!isPass) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.pattern, hint, ErrorMsg.patternNeedHint(claim)));
  }

  return true;
};

const lengthVerify = (data, claim, hint) => {
  const min = claim.min;
  const max = claim.max;
  const length = data.length;

  if (Type.number.is(min) && length < min) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.length, hint, ErrorMsg.minLenHint(min)));
  }

  if (Type.number.is(max) && length > max) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.length, hint, ErrorMsg.maxLenHint(max)));
  }

  return true;
};

const enumVerify = (data, claim, hint) => {
  if (!claim.includes(data)) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.enum, hint, ErrorMsg.enumHint(data)));
  }

  return true;
};

const integerVerify = (data, claim, hint) => {
  if (claim && !Type.number.isInteger(data)) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.integer, hint, ErrorMsg.integerHint(data)));
  }

  return true;
};

const naturalVerify = (data, claim, hint) => {
  if (claim && !Type.number.isNatural(data)) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.natural, hint, ErrorMsg.naturalHint(data)));
  }

  return true;
};

const matchVerify = (data, claim, hint) => {
  if (Type.string.is(claim)) {
    claim = new RegExp(claim);
  }

  if (!claim.test(data)) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.match, hint, ErrorMsg.matchHint(data)));
  }

  return true;
};

const rangeVerify = (data, claim, hint) => {
  const min = claim.min;
  const max = claim.max;

  if (Type.number.is(min) && data < min) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.range, hint, ErrorMsg.minValueHint(min)));
  }

  if (Type.number.is(max) && data > max) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.range, hint, ErrorMsg.maxValueHint(max)));
  }

  return true;
};

const elePropVerify = (data, claims, type) => {
  const verifyItem = (itemData, itemClaim, index) => {
    let required;
    let hint;

    if (Type.array.isNotEmpty(itemClaim)) {
      const itemItemClaim = itemClaim[0];
      required = itemItemClaim.required;
      hint = Type.object.safe(itemItemClaim.hint);
    } else {
      required = itemClaim.required;
      hint = Type.object.safe(itemClaim.hint);
    }

    const getHint = type === TYPES.object ? ErrorMsg.propNeedHint : ErrorMsg.elementNeedHint;
    const requiredHint = hint[METHODS.required] || getHint(index);
    const isRequiredPass = requiredVerify(data, index, required, requiredHint);

    if (isRequiredPass) {
      return;
    }

    try {
      verify(itemData, itemClaim, data);
    } catch (e) {
      const getHint = type === TYPES.object ? ErrorMsg.propErrorHint : ErrorMsg.elementErrorHint;
      throw new Error(getHint(index, e));
    }
  };

  const verifyArr = (itemClaim, checkedMap) => {
    let required;
    let hint;

    if (Type.array.isNotEmpty(itemClaim)) {
      const itemItemClaim = itemClaim[0];
      required = itemItemClaim.required;
      hint = Type.object.safe(itemItemClaim.hint);
    } else {
      required = itemClaim.required;
      hint = Type.object.safe(itemClaim.hint);
    }

    const indexArr = type === TYPES.object ? Object.keys(data) : Array.from("a".repeat(data.length)).map((s, i) => i);
    const emptyHint = type === TYPES.object ? ErrorMsg.propEmptyHint : ErrorMsg.elementEmptyHint;

    if (required && indexArr.length <= 0) {
      throw new Error(hint[METHODS.required] || emptyHint);
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

      if (Type.array.isNotEmpty(itemClaim)) {
        const itemItemClaim = itemClaim[0];
        index = itemItemClaim.index;
      } else {
        index = itemClaim.index;
      }

      if (Type.number.isNatural(index) || Type.string.isNotEmpty(index)) {
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
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.schema, hint || `${ErrorMsg.safeErrorHint(e)}`));
  }

  return true;
};

const customVerify = (data, claim, hint, parent) => {
  try {
    const isPass = Type.func.safe(claim)(data, parent);

    if (!isPass) {
      throw new Error(hint || "未知");
    }
  } catch (e) {
    throw new Error(ErrorMsg.verifyErrorHint(METHODS.custom, `${ErrorMsg.safeErrorHint(e)}`));
  }

  return true;
};

const claimsVerify = (data, claims, parent) => {
  const fn = () => {
    const hint = Type.object.safe(claims.hint);
    const type = claims.type;
    const claimMethods = [].concat(CHECK_METHODS, TYPE_METHODS[type]);
    claimMethods.push(METHODS.custom);

    for (const claimKey of claimMethods) {
      if (!claims.hasOwnProperty(claimKey)) {
        continue;
      }

      const claimValue = claims[claimKey];
      const propsClaims = claims.props;
      const claimHint = hint[claimKey];

      switch (claimKey) {
        case METHODS.type:
          typeVerify(data, claimValue, claimHint);
          break;

        case METHODS.restrict:
          restrictVerify(data, claimValue, propsClaims, claimHint);
          break;

        case METHODS.pattern:
          patternVerify(data, claimValue, claimHint);
          break;

        case METHODS.length:
          lengthVerify(data, claimValue, claimHint);
          break;

        case METHODS.enum:
          enumVerify(data, claimValue, claimHint);
          break;

        case METHODS.match:
          matchVerify(data, claimValue, claimHint);
          break;

        case METHODS.range:
          rangeVerify(data, claimValue, claimHint);
          break;

        case METHODS.integer:
          integerVerify(data, claimValue, claimHint);
          break;

        case METHODS.natural:
          naturalVerify(data, claimValue, claimHint);
          break;

        case METHODS.elements:
          elePropVerify(data, claimValue, type);
          break;

        case METHODS.props:
          elePropVerify(data, claimValue, type);
          break;

        case METHODS.schema:
          schemaVerify(data, claimValue, claimHint, parent);
          break;

        case METHODS.custom:
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

  if (Type.object.is(info)) {
    fn(info);
  }

  if (Type.array.is(info)) {
    const errorMsgs = [];

    for (let i = 0; i < info.length; i++) {
      try {
        fn(info[i]);
        break;
      } catch (e) {
        errorMsgs.push(`schema-${i}: ${ErrorMsg.safeErrorHint(e)}`);
      }
    }

    if (info.length === errorMsgs.length) {
      throw new Error(errorMsgs.join(";"));
    }
  }

  return true;
};

class SchemaErrorHint extends ErrorHint {
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

var ErrorMsg$1 = new SchemaErrorHint();

const PATTERNS = Object.keys(Pattern);

const schemaCheck = info => {
  if (Type.object.isNot(info) && !Type.array.isNotEmpty(info)) {
    throw new Error(ErrorMsg$1.propsInfoEmpty);
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
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.schema));
    }

    const schemaRuleInfo = schema.info;

    for (const method of [METHODS.type, METHODS.required, METHODS.index]) {
      if (!info.hasOwnProperty(method) && schemaRuleInfo.hasOwnProperty(method)) {
        info[method] = schemaRuleInfo[method];
      }
    }
  }

  const result = Object.assign({}, info);
  return typeCheck(result);
};

const typeCheck = info => {
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

const typeCommonCheck = info => {
  const methods = TYPE_METHODS[info.type];

  if (Type.array.isNot(methods)) {
    throw new Error(ErrorMsg$1.unIdentifyType(methods));
  }

  for (const key of Object.keys(info)) {
    if (COMMON_METHODS.includes(key) || methods.includes(key)) {
      continue;
    } else {
      throw new Error(ErrorMsg$1.illegalVerifyProps(key));
    }
  }

  if (info.hasOwnProperty(METHODS.hint)) {
    const hint = info[METHODS.hint];

    if (!Type.object.is(hint)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.hint));
    }

    for (const key of Object.keys(hint)) {
      if (COMMON_METHODS.includes(key) || methods.includes(key)) {
        continue;
      } else {
        throw new Error(ErrorMsg$1.illegalHintInfo(key));
      }
    }
  }

  if (info.hasOwnProperty(METHODS.custom)) {
    const custom = info[METHODS.custom];

    if (Type.func.isNot(custom)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.custom));
    }
  }

  if (info.hasOwnProperty(METHODS.index)) {
    const index = info[METHODS.index];

    if (Type.string.isNot(index) && Type.number.isNot(index)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
    }
  }

  return info;
};

const stringCheck = info => {
  if (info.hasOwnProperty(METHODS.pattern)) {
    const pattern = info[METHODS.pattern];

    if (!PATTERNS.includes(pattern)) {
      throw new Error(ErrorMsg$1.illegalPatternType(pattern));
    }
  }

  if (info.hasOwnProperty(METHODS.minLength)) {
    const minLength = info[METHODS.minLength];

    if (Type.number.isNatural(minLength)) {
      let length = info[METHODS.length];
      const minInfo = {
        min: minLength
      };
      info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
      delete info[METHODS.minLength];
    }
  }

  if (info.hasOwnProperty(METHODS.maxLength)) {
    const maxLength = info[METHODS.maxLength];

    if (Type.number.isNatural(maxLength)) {
      let length = info[METHODS.length];
      const maxInfo = {
        max: maxLength
      };
      info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
      delete info[METHODS.maxLength];
    }
  }

  if (info.hasOwnProperty(METHODS.length)) {
    let length = info[METHODS.length];

    if (!Type.object.isNotEmpty(length) && !Type.number.isNatural(length)) {
      throw new Error(ErrorMsg$1.emptyLengthInfo);
    }

    if (Type.number.isNatural(length)) {
      info[METHODS.length] = {
        min: length,
        max: length
      };
    } else if (Type.object.isNotEmpty(length)) {
      if (!Type.number.isNatural(length.min) && !Type.number.isNatural(length.max)) {
        throw new Error(ErrorMsg$1.emptyLengthInfo);
      }

      Type.number.isNatural(length.min) && (length.min = +length.min);
      Type.number.isNatural(length.max) && (length.max = +length.max);
    }
  }

  if (info.hasOwnProperty(METHODS.enum)) {
    const enumData = info[METHODS.enum];
    let arr;

    if (Type.object.isNotEmpty(enumData)) {
      arr = Object.keys(enumData).map(key => enumData[key]);
    }

    if (Type.array.isNotEmpty(enumData)) {
      arr = enumData;
    }

    if (!Type.array.isNotEmpty(arr)) {
      throw new Error(ErrorMsg$1.emptyEnumInfo);
    }

    const isAllStr = arr.every(s => Type.string.is(s));

    if (!isAllStr) {
      throw new Error(ErrorMsg$1.errorEnumInfo);
    }

    info[METHODS.enum] = arr;
  }

  if (info.hasOwnProperty(METHODS.match)) {
    const match = info[METHODS.match];

    if (!Type.string.isNotEmpty(match) && !(match instanceof RegExp)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.match));
    }
  }

  return info;
};

const numberCheck = info => {
  if (info.hasOwnProperty(METHODS.min)) {
    const min = info[METHODS.min];

    if (Type.number.isNatural(min)) {
      let range = info[METHODS.range];
      const minInfo = {
        min
      };
      info[METHODS.range] = Type.object.is(range) ? Object.assign({}, range, minInfo) : minInfo;
      delete info[METHODS.min];
    }
  }

  if (info.hasOwnProperty(METHODS.max)) {
    const max = info[METHODS.max];

    if (Type.number.isNatural(max)) {
      let range = info[METHODS.range];
      const maxInfo = {
        max
      };
      info[METHODS.range] = Type.object.is(range) ? Object.assign({}, range, maxInfo) : maxInfo;
      delete info[METHODS.max];
    }
  }

  if (info.hasOwnProperty(METHODS.range)) {
    const range = info[METHODS.range];

    if (Type.object.isEmpty(range)) {
      throw new Error(ErrorMsg$1.emptyRangeInfo);
    }

    if (Type.number.isNot(range.min) && Type.number.isNot(range.max)) {
      throw new Error(ErrorMsg$1.emptyRangeInfo);
    }

    range.min = +range.min;
    range.max = +range.max;
  }

  if (info.hasOwnProperty(METHODS.integer)) {
    const integer = info[METHODS.integer];

    if (Type.boolean.isNot(integer)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.integer));
    }
  }

  if (info.hasOwnProperty(METHODS.natural)) {
    const natural = info[METHODS.natural];

    if (Type.boolean.isNot(natural)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.natural));
    }
  }

  if (info.hasOwnProperty(METHODS.enum)) {
    const enumData = info[METHODS.enum];
    let arr;

    if (Type.object.isNotEmpty(enumData)) {
      arr = Object.keys(enumData).map(key => enumData[key]);
    }

    if (Type.array.isNotEmpty(enumData)) {
      arr = enumData;
    }

    if (!Type.array.isNotEmpty(arr)) {
      throw new Error(ErrorMsg$1.emptyEnumInfo);
    }

    const isAllNum = arr.every(s => Type.number.is(s));

    if (!isAllNum) {
      throw new Error(ErrorMsg$1.errorEnumInfo);
    }

    info[METHODS.enum] = arr;
  }

  return info;
};

const objectCheck = info => {
  if (info.hasOwnProperty(METHODS.props)) {
    const props = info[METHODS.props];

    if (!Type.object.isNotEmpty(props) && !Type.array.is(props)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.props));
    }

    const formatObjProps = (props, info) => {
      if (Type.func.isNot(props[METHODS.type]) && Type.nul.isNot(props[METHODS.type]) && Type.string.isNot(TYPES[props[METHODS.type]]) && !props.hasOwnProperty(METHODS.schema) && !(props instanceof Schema)) {
        props = Object.keys(props).map(key => {
          const item = props[key];

          if (key === "$_PROPS_DEFAULT_INFO") {
            return item;
          }

          if (Type.object.is(item)) {
            item[METHODS.index] = key;
          }

          if (Type.array.is(item) && Type.object.is(item[0])) {
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

        if (Type.object.is(item) && item.hasOwnProperty(METHODS.index)) {
          index = item[METHODS.index];

          if (!Type.string.isNotEmpty(index) && !Type.number.is(index)) {
            throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
          }
        }

        if (Type.array.is(item) && Type.object.is(item[0])) {
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
      info[METHODS.props] = Object.keys(propMap).map(key => propMap[key]);
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
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.restrict));
    }

    if (restrict && Type.array.isNot(props)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.props));
    }
  }

  return info;
};

const arrayCheck = info => {
  if (info.hasOwnProperty(METHODS.elements)) {
    const elements = info[METHODS.elements];

    if (!Type.object.isNotEmpty(elements) && !Type.array.is(elements)) {
      throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.elements));
    }

    if (Type.object.isNotEmpty(elements)) {
      delete elements["index"];
      info.elements = [schemaCheck(elements)];
    } else {
      const elementMap = elements.reduce((map, item) => {
        let index;

        if (Type.object.is(item)) {
          if (item.hasOwnProperty(METHODS.index) && Type.number.isNot(item.index)) {
            throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
          } else {
            index = item.index;
          }
        }

        if (Type.array.is(item) && Type.object.is(item[0])) {
          if (item[0].hasOwnProperty(METHODS.index) && Type.number.isNot(item[0].index)) {
            throw new Error(ErrorMsg$1.illegalVerifyProps(METHODS.index));
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
      info[METHODS.elements] = Object.keys(elementMap).map(key => elementMap[key]);
    }
  }

  if (info.hasOwnProperty(METHODS.minLength)) {
    const minLength = info[METHODS.minLength];

    if (Type.number.isNatural(minLength)) {
      let length = info[METHODS.length];
      const minInfo = {
        min: minLength
      };
      info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, minInfo) : minInfo;
      delete info[METHODS.minLength];
    }
  }

  if (info.hasOwnProperty(METHODS.maxLength)) {
    const maxLength = info[METHODS.maxLength];

    if (Type.number.isNatural(maxLength)) {
      let length = info[METHODS.length];
      const maxInfo = {
        max: maxLength
      };
      info[METHODS.length] = Type.object.is(length) ? Object.assign({}, length, maxInfo) : maxInfo;
      delete info[METHODS.maxLength];
    }
  }

  if (info.hasOwnProperty(METHODS.length)) {
    let length = info[METHODS.length];

    if (!Type.object.isNotEmpty(length) && !Type.number.isNatural(length)) {
      throw new Error(ErrorMsg$1.emptyLengthInfo);
    }

    if (Type.number.isNatural(length)) {
      info[METHODS.length] = {
        min: length,
        max: length
      };
    } else if (Type.object.isNotEmpty(length)) {
      if (!Type.number.isNatural(length.min) && !Type.number.isNatural(length.max)) {
        throw new Error(ErrorMsg$1.emptyLengthInfo);
      }

      Type.number.isNatural(length.min) && (length.min = +length.min);
      Type.number.isNatural(length.max) && (length.max = +length.max);
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

exports.Pattern = Pattern;
exports.Schema = Schema;
exports.Type = Type;
exports.default = Schema;
