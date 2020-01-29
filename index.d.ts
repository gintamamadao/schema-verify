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
        let is: <T>(v: any) => v is T;
        let isNot: (v: any) => boolean;
        let isEmpty: (v: any) => boolean;
        let isNotEmpty: (v: any) => boolean;
        let safe: <T>(v: any) => T;
        let pure: <T>(v: any) => T;
    }
    namespace object {
        let is: <T>(v: any) => v is T;
        let isNot: (v: any) => boolean;
        let isEmpty: (v: any) => boolean;
        let isNotEmpty: (v: any) => boolean;
        let safe: <T>(v: any) => T;
        let pure: <T>(v: any) => T;
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

declare namespace Pattern {
    namespace phone {
        let is: (v: any) => boolean;
    }
    namespace uri {
        let is: (v: any) => boolean;
    }
    namespace email {
        let is: (v: any) => boolean;
    }
    namespace color {
        let is: (v: any) => boolean;
    }
    namespace version {
        let is: (v: any) => boolean;
    }
    namespace sign {
        let is: (v: any) => boolean;
    }
    namespace numStr {
        let is: (v: any) => boolean;
    }
    namespace jsonStr {
        let is: (v: any) => boolean;
    }
    namespace time {
        let is: (v: any) => boolean;
        let isCommon: (v: any) => boolean;
    }
}

export default class Schema {
    constructor(info: any);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
