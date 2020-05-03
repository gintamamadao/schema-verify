import { Schema } from "./schema";

export type ArrType = typeof Array;

export type TypeTypes =
    | "string"
    | "number"
    | "object"
    | "array"
    | "function"
    | "boolean"
    | "null"
    | String
    | Number
    | Object
    | ArrType
    | Function
    | Boolean
    | null;

export type PatternTypes =
    | "phone"
    | "uri"
    | "email"
    | "color"
    | "version"
    | "sign"
    | "numStr"
    | "jsonStr"
    | "time";

export type RangeType = {
    min?: number;
    max?: number;
};

export type LengthTypes = RangeType | number;

export type EnumTypes =
    | string[]
    | number[]
    | {
          [prop: string]: string | number;
      };

export type PropsType =
    | {
          [prop: string]: SchemaInfo;
      }
    | Schema
    | SchemaInfo;

export type ElementsType = SchemaInfo;

export type CustomType = (value: any, pattern: any) => boolean;

export type HintType = {
    [prop: string]: string;
};

export type SingleSchemaInfo = {
    index?: string | number;
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
    elements?: SchemaInfo;
    schema?: Schema;
    custom?: CustomType;
    hint?: HintType;
};

export type SchemaInfo = SingleSchemaInfo | SingleSchemaInfo[];
