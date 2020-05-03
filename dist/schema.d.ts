declare class Schema {
    info: any;
    constructor(info: any);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
export default Schema;
