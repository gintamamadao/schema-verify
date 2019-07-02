const ErrorMsg = {
    propsInfoEmpty: "属性信息不能为空",
    unIdentifyType: "不可识别的属性类型",
    emptyLengthInfo: "空的长度信息",
    emptyEnumInfo: "空的枚举信息",
    errorEnumInfo: "错误的枚举信息",
    emptyHintInfo: "空的提示信息",
    emptyRangeInfo: "空的范围信息",
    illegalHintInfo: v => `非法的提示信息属性：${v}`,
    illegalVerifyProps: v => `非法的校验属性：${v}`,
    illegalPatternType: v => `非法的格式类型：${v}`
};

module.exports = ErrorMsg;
