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
    const restrictKeys = Object.keys(propsClaims);
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

const propsVerify = (data, claimsMap) => {
    const fn = () => {
        for (const key in claimsMap) {
            const propClaims = claimsMap[key];
            const propData = data[key];
            const required = propClaims.required;
            const hint = Type.object.safe(propClaims.hint);
            const requiredHint =
                hint[METHODS.required] || ErrorMsg.propNeedHint(key);
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
                throw new Error(ErrorMsg.propErrorHint(key, e));
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
    if (claim && !Type.number.isinteger(data)) {
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

const elementsVerify = (data, claim) => {
    const verifyItem = (itemData, itemClaim, index) => {
        const required = itemClaim.required;
        const hint = Type.object.safe(itemClaim.hint);
        const requiredHint =
            hint[METHODS.required] || ErrorMsg.elementNeedHint(index);
        const isRequiredPass = requiredVerify(itemData, required, requiredHint);
        if (isRequiredPass) {
            return;
        }
        try {
            verify(itemData, itemClaim, data);
        } catch (e) {
            throw new Error(ErrorMsg.elementErrorHint(index, e));
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
                const required = itemClaim.required;
                const hint = Type.object.safe(itemClaim.hint);
                if (required && data.length <= 0) {
                    throw new Error(
                        hint[METHODS.required] || ErrorMsg.elementEmptyHint
                    );
                }
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
        const isPass = claim(data, parent);
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

const verify = (data, claims, parent) => {
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
                    elementsVerify(data, claimValue);
                    break;

                case METHODS.props:
                    propsVerify(data, claimValue);
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

module.exports = verify;
