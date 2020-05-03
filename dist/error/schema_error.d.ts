import ErrorHint from "./error";
declare class SchemaErrorHint extends ErrorHint {
    propsInfoEmpty: string;
    emptyLengthInfo: string;
    emptyEnumInfo: string;
    errorEnumInfo: string;
    emptyHintInfo: string;
    emptyRangeInfo: string;
    constructor();
    unIdentifyType(v: string): string;
    illegalHintInfo(v: string): string;
    illegalVerifyProps(v: string): string;
    illegalPatternType(v: string): string;
}
declare const _default: SchemaErrorHint;
export default _default;
