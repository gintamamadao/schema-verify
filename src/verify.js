const Type = require("./type.js");
const Pattern = require("./pattern.js");
const ErrorMsg = require("./error/verify_error.js");
const {
    COMMON_METHODS,
    TYPE_METHODS,
    TYPES,
    METHODS
} = require("./constant.js");

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
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.type,
                hint,
                ErrorMsg.typeNeedHint(claim)
            )
        );
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
            continue;
        }
        if (Type.array.is(item)) {
            restrictKeys.push(item[0].index);
            continue;
        }
    }
    restrictKeys = restrictKeys.filter(s => s);
    for (const key of dataKeys) {
        if (!restrictKeys.includes(key)) {
            throw new Error(
                ErrorMsg.verifyErrorHint(
                    METHODS.restrict,
                    hint,
                    ErrorMsg.propRestrictHint(key)
                )
            );
        }
    }
    return true;
};

const requiredVerify = (data, index, claim, hint) => {
    if (
        (Type.object.is(data) && !data.hasOwnProperty(index)) ||
        (Type.array.is(data) && Type.undefined.is(data[index]))
    ) {
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
    const isPass =
        typeof isFn === "function" && isFn.call(Pattern[claim], data);
    if (!isPass) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.pattern,
                hint,
                ErrorMsg.patternNeedHint(claim)
            )
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
            ErrorMsg.verifyErrorHint(
                METHODS.length,
                hint,
                ErrorMsg.minLenHint(min)
            )
        );
    }
    if (Type.number.is(max) && length > max) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.length,
                hint,
                ErrorMsg.maxLenHint(max)
            )
        );
    }
    return true;
};

const enumVerify = (data, claim, hint) => {
    if (!claim.includes(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.enum,
                hint,
                ErrorMsg.enumHint(data)
            )
        );
    }
    return true;
};

const integerVerify = (data, claim, hint) => {
    if (claim && !Type.number.isInteger(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.integer,
                hint,
                ErrorMsg.integerHint(data)
            )
        );
    }
    return true;
};

const naturalVerify = (data, claim, hint) => {
    if (claim && !Type.number.isNatural(data)) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.natural,
                hint,
                ErrorMsg.naturalHint(data)
            )
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
            ErrorMsg.verifyErrorHint(
                METHODS.match,
                hint,
                ErrorMsg.matchHint(data)
            )
        );
    }
    return true;
};

const rangeVerify = (data, claim, hint) => {
    const min = claim.min;
    const max = claim.max;
    if (Type.number.is(min) && data < min) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.range,
                hint,
                ErrorMsg.minValueHint(min)
            )
        );
    }
    if (Type.number.is(max) && data > max) {
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.range,
                hint,
                ErrorMsg.maxValueHint(max)
            )
        );
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
        const getHint =
            type === TYPES.object
                ? ErrorMsg.propNeedHint
                : ErrorMsg.elementNeedHint;
        const requiredHint = hint[METHODS.required] || getHint(index);
        const isRequiredPass = requiredVerify(
            data,
            index,
            required,
            requiredHint
        );
        if (isRequiredPass) {
            return;
        }
        try {
            verify(itemData, itemClaim, data);
        } catch (e) {
            const getHint =
                type === TYPES.object
                    ? ErrorMsg.propErrorHint
                    : ErrorMsg.elementErrorHint;
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
        const indexArr =
            type === TYPES.object
                ? Object.keys(data)
                : Array.from("a".repeat(data.length)).map((s, i) => i);
        const emptyHint =
            type === TYPES.object
                ? ErrorMsg.propEmptyHint
                : ErrorMsg.elementEmptyHint;
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
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.schema,
                hint || `${ErrorMsg.safeErrorHint(e)}`
            )
        );
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
        throw new Error(
            ErrorMsg.verifyErrorHint(
                METHODS.custom,
                `${ErrorMsg.safeErrorHint(e)}`
            )
        );
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

module.exports = verify;
