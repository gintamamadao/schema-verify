import ErrorHint from "./error";

class VerifyErrorHint extends ErrorHint {
    public propEmptyHint: string = "对象缺少属性";
    public elementEmptyHint: string = "数组缺少元素";
    constructor() {
        super();
    }
    minValueHint(min: number) {
        return `小于最小值 ${min}`;
    }
    maxValueHint(max: number) {
        return `大于最大值 ${max}`;
    }
    minLenHint(min: number) {
        return `小于最小长度 ${min}`;
    }
    maxLenHint(max: number) {
        return `大于最大长度 ${max}`;
    }
    typeNeedHint(type: string) {
        return `需要 ${type} 类型`;
    }
    enumHint(value: string) {
        return `${value} 不是有效值之一`;
    }
    integerHint(value: string) {
        return `${value} 不是整数`;
    }
    naturalHint(value: string) {
        return `${value} 不是自然数`;
    }
    matchHint(value: string) {
        return `${value} 未通过正则规则`;
    }
    patternNeedHint(pattern: string) {
        return `需要 ${pattern} 格式`;
    }
    propNeedHint(key: string | number) {
        return `属性 ${key}: 缺少数据`;
    }
    propRestrictHint(key: string) {
        return `属性 ${key} 不允许`;
    }
    propErrorHint = (key: string | number, e: string | Error) => {
        return `属性 ${key}: ${this.safeErrorHint(e)}`;
    };
    elementNeedHint(index: string | number) {
        return `第 ${index} 项: 缺少数据`;
    }
    elementErrorHint = (index: string | number, e: string | Error) => {
        return `第 ${index} 项: ${this.safeErrorHint(e)}`;
    };
    verifyErrorHint(type: string, customHint: any, originHint?: any) {
        return `${type ? type + " " : ""}校验不通过, 错误信息：${
            customHint || originHint || "未知"
        }`;
    }
}

export default new VerifyErrorHint();
