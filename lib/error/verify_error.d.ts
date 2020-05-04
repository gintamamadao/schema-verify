import ErrorHint from "./error";
declare class VerifyErrorHint extends ErrorHint {
    propEmptyHint: string;
    elementEmptyHint: string;
    constructor();
    minValueHint(min: number): string;
    maxValueHint(max: number): string;
    minLenHint(min: number): string;
    maxLenHint(max: number): string;
    typeNeedHint(type: string): string;
    enumHint(value: string): string;
    integerHint(value: string): string;
    naturalHint(value: string): string;
    matchHint(value: string): string;
    patternNeedHint(pattern: string): string;
    propNeedHint(key: string | number): string;
    propRestrictHint(key: string): string;
    propErrorHint: (key: string | number, e: string | Error) => string;
    elementNeedHint(index: string | number): string;
    elementErrorHint: (index: string | number, e: string | Error) => string;
    verifyErrorHint(type: string, customHint: any, originHint?: any): string;
}
declare const _default: VerifyErrorHint;
export default _default;
