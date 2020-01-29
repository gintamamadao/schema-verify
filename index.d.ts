declare namespace Type {
    namespace string {
        let is: (v: any) => boolean;
    }
}

export default class Schema {
    constructor(info: any);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
