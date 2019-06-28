const Type = require("./type.js");
const Pattern = require("./pattern.js");
const ErrorMsg = require("./error.js");

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
            try {
                verify(propData, propClaims);
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

const verify = (data, claims) => {
    const fn = () => {
        const hint = Type.object.safe(claims.hint);
        for (const claimKey in claims) {
            const claimValue = claims[claimKey];
            const propsClaims = claims.props;
            const claimHint = hint[claimKey];
            switch (claimKey) {
                case "type":
                    typeVerify(data, claimValue, claimHint);
                    break;
                case "restrict":
                    restrictVerify(data, claimValue, propsClaims, claimHint);
                case "pattern":
                    patternVerify(data, claimValue, claimHint);
                    break;
                case "props":
                    propsVerify(data, propsClaims);
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
