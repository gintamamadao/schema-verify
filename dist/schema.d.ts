import { SchemaInfo } from "./interface";
export declare class Schema {
    info: any;
    constructor(info: SchemaInfo);
    verify(data: any, throwError?: boolean, parent?: any): boolean;
}
export default Schema;
