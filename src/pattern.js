const type = require("./type.js");

const phoneReg = new RegExp(/^1\d{10}$/);
const emailReg = new RegExp(
    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
);
const colorReg = new RegExp(
    /(^#\w{3}$)|(^#\w{6}$)|(^rgb\s*\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)$)|(^rgba\s*\((\s*\d{1,3}\s*,){3},[01]{1}\.?\d*\s*\)$)/
);
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
    time: {
        is(v) {
            try {
                const timeInfo = new Date(v);
                return (
                    type.object.is(timeInfo) &&
                    timeInfo.toString() !== "Invalid Date"
                );
            } catch (e) {
                return false;
            }
        },
        isCommon(v) {
            return type.string.isNotEmpty(v) && commonTimeReg.test(v);
        }
    }
};

module.exports = Pattern;
