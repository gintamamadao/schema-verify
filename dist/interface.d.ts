import { Schema } from "./schema";
export declare type ArrType = typeof Array;
export declare type TypeTypes = "string" | "number" | "object" | "array" | "function" | "boolean" | "null" | String | Number | Object | ArrType | Function | Boolean | null;
export declare type PatternTypes = "phone" | "uri" | "email" | "color" | "version" | "sign" | "numStr" | "jsonStr" | "time";
export declare type RangeType = {
    min?: number;
    max?: number;
};
export declare type LengthTypes = RangeType | number;
export declare type EnumTypes = string[] | number[] | {
    [prop: string]: string | number;
};
export declare type EleType = {
    index: string | number;
} & SchemaInfo;
export declare type PropsType = {
    [prop: string]: SchemaInfo;
} | EleType[] | Schema;
export declare type ElementsType = SchemaInfo | EleType[];
export declare type CustomType = (value: any, pattern: any) => boolean;
export declare type HintType = {
    [prop: string]: string;
};
export declare type SingleSchemaInfo = {
    type?: TypeTypes;
    pattern?: PatternTypes;
    match?: RegExp;
    length?: LengthTypes;
    minLength?: number;
    maxLength?: number;
    enum?: EnumTypes;
    range?: RangeType;
    min?: number;
    max?: number;
    integer?: boolean;
    natural?: boolean;
    props?: PropsType;
    required?: boolean;
    restrict?: boolean;
    elements?: ElementsType;
    schema?: Schema;
    custom?: CustomType;
    hint?: HintType;
};
export declare type SchemaInfo = SingleSchemaInfo | SingleSchemaInfo[];
