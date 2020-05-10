export declare const isobject: (v: any) => boolean;
export declare const isarray: (v: any) => boolean;
export declare const isstring: (v: any) => boolean;
export declare const isfinite: (v: any) => boolean;
export declare const isnumber: (v: any) => boolean;
export declare const isinteger: (v: any) => boolean;
export declare const isfunction: (v: any) => boolean;
export declare const isnull: (v: any) => boolean;
export declare const isundefined: (v: any) => boolean;
export declare const isundefinednull: (v: any) => boolean;
declare const Type: {
    string: {
        is(v: any): v is string;
        isNot(v: any): boolean;
        isEmpty(v: any): boolean;
        isNotEmpty(v: any): boolean;
        safe(v: any): string;
    };
    number: {
        is(v: any): v is number;
        isNot(v: any): boolean;
        isInteger(v: any): boolean;
        isNatural(v: any): boolean;
        safe(v: any): number;
    };
    boolean: {
        is(v: any): v is boolean;
        isNot(v: any): boolean;
    };
    array: {
        is<T>(v: any): v is T;
        isNot(v: any): boolean;
        isEmpty(v: any): boolean;
        isNotEmpty<T_1>(v: any): v is T_1;
        safe<T_2>(v: any): T_2;
        pure<T_3>(v: any): T_3;
    };
    object: {
        is<T_4>(v: any): v is T_4;
        isNot(v: any): boolean;
        isEmpty(v: any): boolean;
        isNotEmpty<T_5>(v: any): v is T_5;
        safe<T_6>(v: any): T_6;
        pure<T_7>(v: any): T_7;
    };
    func: {
        is<T_8>(v: any): v is T_8;
        isNot(v: any): boolean;
        safe(v: any, context?: any): Function;
    };
    undefinedNull: {
        is(v: any): v is null | undefined;
        isNot(v: any): boolean;
    };
    nul: {
        is(v: any): v is null;
        isNot(v: any): boolean;
    };
    undefined: {
        is(v: any): v is undefined;
        isNot(v: any): boolean;
    };
};
export default Type;
