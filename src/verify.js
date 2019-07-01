const Type = require("./type.js");
const Pattern = require("./pattern.js");
const ErrorMsg = require("./error.js");
const { COMMON_METHODS, TYPE_METHODS } = require("./constant.js");

const CHECK_METHODS = COMMON_METHODS.slice(0, COMMON_METHODS.length - 2);

const typeVerify = (data, claim, hint) => {
    let isPass = false;
    switch (claim) {
        case "string":
            isPass = Type.string.is(data);
            break;
        case "number":
            isPass = Type.number.is(data);
            break;
        case "object":
            isPass = Type.object.is(data);
            break;
        case "array":
            isPass = Type.array.is(data);
            break;
    }
    if (!isPass) {
        throw new Error(
            ErrorMsg.verifyErrorHint("type", hint || `需要${claim}`)
        );
    }
    return true;
};

const restrictVerify = (data, claim, propsClaims, hint) => {
    if (!claim) {
        return true;
    }
    const dataKeys = Object.keys(data);
    const restrictKeys = Object.keys(propsClaims);
    for (const key of dataKeys) {
        if (!restrictKeys.includes(key)) {
            throw new Error(
                ErrorMsg.verifyErrorHint(
                    "restrict",
                    hint || `属性 ${key} 不允许`
                )
            );
        }
    }
    return true;
};

const propsVerify = (data, claimsMap) => {
    const fn = () => {
        for (const key in claimsMap) {
            const propClaims = claimsMap[key];
            const propData = data[key];
            const required = propClaims.required;
            const hint = Type.object.safe(propClaims.hint);
            const requiredHint = hint["required"] || `属性 ${key}: 缺少数据`;
            const isRequiredPass = requiredVerify(
                propData,
                required,
                requiredHint
            );
            if (isRequiredPass) {
                continue;
            }
            try {
                verify(propData, propClaims, data);
            } catch (e) {
                throw new Error(`属性 ${key}: ${e.message}`);
            }
        }
    };

    try {
        fn();
    } catch (e) {
        throw e;
    }
};

const requiredVerify = (data, claim, hint) => {
    if (Type.undefinedNull.is(data)) {
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
    if (Type.function.isNot(isFn)) {
        return true;
    }
    const isPass = isFn.call(Pattern[claim], data);
    if (!isPass) {
        throw new Error(
            ErrorMsg.verifyErrorHint("pattern", hint || `需要${claim}格式`)
        );
    }
    return true;
};

const lengthVerify = (data, claim, hint) => {
    const min = claim.min;
    const max = claim.max;
    const length = data.length;
    if (Type.number.is(min) && length < min) {
        throw new Error(
            ErrorMsg.verifyErrorHint("length", hint || `小于最小长度`)
        );
    }
    if (Type.number.is(max) && length > max) {
        throw new Error(
            ErrorMsg.verifyErrorHint("length", hint || `大于最大长度`)
        );
    }
    return true;
};

const enumVerify = (data, claim, hint) => {
    if (!claim.includes(data)) {
        throw new Error(ErrorMsg.verifyErrorHint("enum", hint || `非有效值`));
    }
    return true;
};

const integerVerify = (data, claim, hint) => {
    if (claim && !Type.number.isinteger(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint("integer", hint || `要求数字为整形`)
        );
    }
    return true;
};

const naturalVerify = (data, claim, hint) => {
    if (claim && !Type.number.isNatural(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint("natural", hint || `要求数字为自然数`)
        );
    }
    return true;
};

const matchVerify = (data, claim, hint) => {
    if (Type.string.is(claim)) {
        claim = new RegExp(claim);
    }
    if (!claim.test(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint("match", hint || `匹配规则不通过`)
        );
    }
    return true;
};

const rangeVerify = (data, claim, hint) => {
    const min = claim.min;
    const max = claim.max;
    if (Type.number.is(min) && data < min) {
        throw new Error(
            ErrorMsg.verifyErrorHint("range", hint || `小于最小值`)
        );
    }
    if (Type.number.is(max) && data > max) {
        throw new Error(
            ErrorMsg.verifyErrorHint("range", hint || `大于最大值`)
        );
    }
    return true;
};

const elementsVerify = (data, claim) => {
    const verifyItem = (itemData, itemClaim, index) => {
        const required = itemClaim.required;
        const hint = Type.object.safe(itemClaim.hint);
        const requiredHint = hint["required"] || `第 ${index} 项: 缺少数据`;
        const isRequiredPass = requiredVerify(itemData, required, requiredHint);
        if (isRequiredPass) {
            return;
        }
        try {
            verify(itemData, itemClaim, data);
        } catch (e) {
            throw new Error(`第 ${index} 项: ${e.message}`);
        }
    };
    const fn = () => {
        const checkedMap = {};
        for (const itemClaim of claim) {
            const index = itemClaim.index;
            if (Type.number.isNatural(index)) {
                const itemData = data[index];
                verifyItem(itemData, itemClaim, index);
                checkedMap[index] = true;
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (!checkedMap[i]) {
                        const itemData = data[i];
                        verifyItem(itemData, itemClaim, i);
                        checkedMap[i] = true;
                    }
                }
            }
        }
    };
    try {
        fn();
    } catch (e) {
        throw e;
    }
};

const customVerify = (data, claim, hint, parent) => {
    try {
        const isPass = claim(data, parent);
        if (!isPass) {
            throw new Error(hint || "未知");
        }
    } catch (e) {
        const msg = Type.string.is(e) ? e : e && e.message ? e.message : "未知";
        throw new Error(ErrorMsg.verifyErrorHint("claim", `${msg}`));
    }
    return true;
};

const verify = (data, claims, parent) => {
    const fn = () => {
        const hint = Type.object.safe(claims.hint);
        const type = claims.type;
        const claimMethods = [].concat(CHECK_METHODS, TYPE_METHODS[type]);
        claimMethods.push("custom");
        for (const claimKey of claimMethods) {
            if (!claims.hasOwnProperty(claimKey)) {
                continue;
            }
            const claimValue = claims[claimKey];
            const propsClaims = claims.props;
            const claimHint = hint[claimKey];
            switch (claimKey) {
                case "type":
                    typeVerify(data, claimValue, claimHint);
                    break;
                case "restrict":
                    restrictVerify(data, claimValue, propsClaims, claimHint);
                    break;
                case "pattern":
                    patternVerify(data, claimValue, claimHint);
                    break;
                case "length":
                    lengthVerify(data, claimValue, claimHint);
                    break;
                case "enum":
                    enumVerify(data, claimValue, claimHint);
                    break;
                case "match":
                    matchVerify(data, claimValue, claimHint);
                case "range":
                    rangeVerify(data, claimValue, claimHint);
                    break;
                case "integer":
                    integerVerify(data, claimValue, claimHint);
                    break;
                case "natural":
                    naturalVerify(data, claimValue, claimHint);
                    break;
                case "elements":
                    elementsVerify(data, claimValue);
                    break;
                case "props":
                    propsVerify(data, claimValue);
                    break;
                case "custom":
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

module.exports = verify;
