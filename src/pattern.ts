import Type from "./type";

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
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && phoneReg.test(v);
        },
    },
    uri: {
        is(v: any): boolean {
            try {
                return Type.string.isNotEmpty(v) && Type.object.is(new URL(v));
            } catch (e) {
                return false;
            }
        },
    },
    email: {
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && emailReg.test(v);
        },
    },
    color: {
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && colorReg.test(v);
        },
    },
    version: {
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && versionReg.test(v);
        },
    },
    sign: {
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && signReg.test(v);
        },
    },
    numStr: {
        is(v: any): boolean {
            return Type.string.isNotEmpty(v) && numStrReg.test(v);
        },
    },
    jsonStr: {
        is(v: any): boolean {
            try {
                return Type.string.isNotEmpty(v) && JSON.parse(v);
            } catch (e) {
                return false;
            }
        },
    },
    time: {
        is(v: any): boolean {
            const timeInfo = new Date(v);
            return (
                Type.object.is(timeInfo) &&
                timeInfo.toString() !== "Invalid Date"
            );
        },
        isCommon(v: string): boolean {
            return Type.string.isNotEmpty(v) && commonTimeReg.test(v);
        },
    },
};

export default Pattern;
