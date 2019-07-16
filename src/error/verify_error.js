const ErrorHint = require("./error");

class VerifyErrorHint extends ErrorHint {
    constructor() {
        super();
        this.propEmptyHint = "对象缺少属性";
        this.elementEmptyHint = "数组缺少元素";
        this.propErrorHint = this.propErrorHint.bind(this);
        this.elementErrorHint = this.elementErrorHint.bind(this);
    }
    minValueHint(min) {
        return `小于最小值 ${min}`;
    }
    maxValueHint(max) {
        return `大于最大值 ${max}`;
    }
    minLenHint(min) {
        return `小于最小长度 ${min}`;
    }
    maxLenHint(max) {
        return `大于最大长度 ${max}`;
    }
    typeNeedHint(type) {
        return `需要 ${type} 类型`;
    }
    enumHint(value) {
        return `${value} 不是有效值之一`;
    }
    integerHint(value) {
        return `${value} 不是整数`;
    }
    naturalHint(value) {
        return `${value} 不是自然数`;
    }
    matchHint(value) {
        return `${value} 未通过正则规则`;
    }
    patternNeedHint(pattern) {
        return `需要 ${pattern} 格式`;
    }
    propNeedHint(key) {
        return `属性 ${key}: 缺少数据`;
    }
    propRestrictHint(key) {
        return `属性 ${key} 不允许`;
    }
    propErrorHint(key, e) {
        return `属性 ${key}: ${this.safeErrorHint(e)}`;
    }
    elementNeedHint(index) {
        return `第 ${index} 项: 缺少数据`;
    }
    elementErrorHint(index, e) {
        return `第 ${index} 项: ${this.safeErrorHint(e)}`;
    }
    verifyErrorHint(type, customHint, originHint) {
        return `${type ? type + " " : ""}校验不通过, 错误信息：${customHint ||
            originHint ||
            "未知"}`;
    }
}

module.exports = new VerifyErrorHint();
