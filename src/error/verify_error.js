const ErrorMsg = {
    minValueHint: min => `小于最小值 ${min}`,
    maxValueHint: max => `大于最大值 ${max}`,
    minLenHint: min => `小于最小长度 ${min}`,
    maxLenHint: max => `大于最大长度 ${max}`,
    typeNeedHint: type => `需要 ${type} 类型`,
    enumHint: value => `${value} 不是有效值之一`,
    integerHint: value => `${value} 不是整数`,
    naturalHint: value => `${value} 不是自然数`,
    matchHint: value => `${value} 未通过正则规则`,
    patternNeedHint: pattern => `需要 ${pattern} 格式`,
    propNeedHint: key => `属性 ${key}: 缺少数据`,
    propRestrictHint: key => `属性 ${key} 不允许`,
    propErrorHint: (key, e) => `属性 ${key}: ${ErrorMsg.safeErrorHint(e)}`,
    elementEmptyHint: "数组缺少元素",
    elementNeedHint: index => `第 ${index} 项: 缺少数据`,
    elementErrorHint: (index, e) =>
        `第 ${index} 项: ${ErrorMsg.safeErrorHint(e)}`,
    safeErrorHint: e => {
        return typeof e === "string" ? e : e && e.message ? e.message : "未知";
    },
    verifyErrorHint: (type, customHint, originHint) => {
        return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint ||
            originHint ||
            "未知"}`;
    }
};

module.exports = ErrorMsg;
