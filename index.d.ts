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
}

export default class Schema {
    constructor(info: any);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
