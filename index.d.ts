// declare interface Type {
//     string: {
//         is: (v: any) => v is string;
//         isNot: (v: any) => boolean;
//         isEmpty: (v: any) => boolean;
//         isNotEmpty: (v: any) => boolean;
//         safe: (v: any) => string;
//     };
//     number: {
//         is: (v: any) => v is number;
//         isNot: (v: any) => boolean;
//         isInteger: (v: any) => boolean;
//         isNatural: (v: any) => boolean;
//         safe: (v: any) => number;
//     };
//     boolean: {
//         is: (v: any) => v is boolean;
//         isNot: (v: any) => boolean;
//     };
//     array: {
//         is: <T = any>(v: any) => v is T;
//         isNot: (v: any) => boolean;
//         isEmpty: (v: any) => boolean;
//         isNotEmpty: (v: any) => boolean;
//         safe: <T = any>(v: any) => T;
//         pure: <T = any>(v: any) => T;
//     };
//     object: {
//         is: <T = any>(v: any) => v is T;
//         isNot: (v: any) => boolean;
//         isEmpty: (v: any) => boolean;
//         isNotEmpty: (v: any) => boolean;
//         safe: <T = any>(v: any) => T;
//         pure: <T = any>(v: any) => T;
//     };
//     func: {
//         is: (v: any) => v is Function;
//         isNot: (v: any) => boolean;
//         safe: (v: any, context: any) => Function;
//     };
//     undefinedNull: {
//         is: (v: any) => boolean;
//         isNot: (v: any) => boolean;
//     };
//     nul: {
//         is: (v: any) => v is null;
//         isNot: (v: any) => boolean;
//     };
//     undefined: {
//         is: (v: any) => v is undefined;
//         isNot: (v: any) => boolean;
//     };
// }

// declare interface Pattern {
//     phone: {
//         is: (v: any) => boolean;
//     };
//     uri: {
//         is: (v: any) => boolean;
//     };
//     email: {
//         is: (v: any) => boolean;
//     };
//     color: {
//         is: (v: any) => boolean;
//     };
//     version: {
//         is: (v: any) => boolean;
//     };
//     sign: {
//         is: (v: any) => boolean;
//     };
//     numStr: {
//         is: (v: any) => boolean;
//     };
//     jsonStr: {
//         is: (v: any) => boolean;
//     };
//     time: {
//         is: (v: any) => boolean;
//         isCommon: (v: any) => boolean;
//     };
// }

// declare class Schema {
//     constructor(info: any);
//     verify(data: any, throwError?: boolean, parent?: any): boolean;
// }

// declare module SchemaVerify {
//     export let Type: Type;
//     export let Pattern: Pattern;
//     export let Schema: Schema;
// }

// export default SchemaVerify;

// Type definitions for isomorphic-fetch 0.0
// Project: https://github.com/matthew-andrews/isomorphic-fetch
// Definitions by: Todd Lucas <https://github.com/toddlucas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

declare namespace _fetch {}
declare const _fetch: typeof fetch;
export = _fetch;
