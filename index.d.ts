declare namespace Type {
    namespace string {
        let is: (v: any) => v is string;
        let isNot: (v: any) => boolean;
        let isEmpty: (v: any) => boolean;
        let isNotEmpty: (v: any) => boolean;
        let safe: (v: any) => string;
    }
    namespace number {
        let is: (v: any) => v is number;
        let isNot: (v: any) => boolean;
        let isInteger: (v: any) => boolean;
        let isNatural: (v: any) => boolean;
        let safe: (v: any) => number;
    }
    namespace boolean {
        let is: (v: any) => v is boolean;
        let isNot: (v: any) => boolean;
    }
    namespace array {
        let is: (v: any) => v is Array;
        let isNot: (v: any) => boolean;
        let isEmpty: (v: any) => boolean;
        let isNotEmpty: (v: any) => boolean;
        let safe: (v: any) => Array;
        let pure: (v: any) => Array;
    }
    namespace object {
        let is: (v: any) => v is object;
        let isNot: (v: any) => boolean;
        let isEmpty: (v: any) => boolean;
        let isNotEmpty: (v: any) => boolean;
        let safe: (v: any) => object;
        let pure: (v: any) => object;
    }
    namespace func {
        let is: (v: any) => v is Function;
        let isNot: (v: any) => boolean;
        let safe: (v: any, context: any) => Function;
    }
    namespace undefinedNull {
        let is: (v: any) => boolean;
        let isNot: (v: any) => boolean;
    }
    namespace nul {
        let is: (v: any) => v is null;
        let isNot: (v: any) => boolean;
    }
    namespace undefined {
        let is: (v: any) => v is undefined;
        let isNot: (v: any) => boolean;
    }
}

export default class Schema {
    constructor(info: any);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
