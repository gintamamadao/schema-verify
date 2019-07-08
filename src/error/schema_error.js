const ErrorHint = require("./error");

class SchemaErrorHint extends ErrorHint {
    constructor() {
        super();
        this.propsInfoEmpty = "属性信息不能为空";
        this.unIdentifyType = "不可识别的属性类型";
        this.emptyLengthInfo = "空的长度信息";
        this.emptyEnumInfo = "空的枚举信息";
        this.errorEnumInfo = "错误的枚举信息";
        this.emptyHintInfo = "空的提示信息";
        this.emptyRangeInfo = "空的范围信息";
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

module.exports = new SchemaErrorHint();
