import ErrorHint from "./error";

class SchemaErrorHint extends ErrorHint {
    public propsInfoEmpty: string = "属性信息不能为空";
    public emptyLengthInfo: string = "空的长度信息";
    public emptyEnumInfo: string = "空的枚举信息";
    public errorEnumInfo: string = "错误的枚举信息";
    public emptyHintInfo: string = "空的提示信息";
    public emptyRangeInfo: string = "空的范围信息";
    constructor() {
        super();
    }
    unIdentifyType(v: string) {
        return `不可识别的属性类型：${v}`;
    }
    illegalHintInfo(v: string) {
        return `非法的提示信息属性：${v}`;
    }
    illegalVerifyProps(v: string) {
        return `非法的校验属性：${v}`;
    }
    illegalPatternType(v: string) {
        return `非法的格式类型：${v}`;
    }
}

export default new SchemaErrorHint();
