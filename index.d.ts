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

// declare class SchemaClass {
//     constructor(info: any);
//     verify(data: any, throwError?: boolean, parent?: any): boolean;
// }

// declare interface Schema {
//     Type: Type;
//     Pattern: Pattern;
//     Schema: Schema;
// }

// export = Schema;


// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file. You should rename it to index.d.ts
 *~ and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ If this module is a UMD module that exposes a global variable 'myLib' when
 *~ loaded outside a module loader environment, declare that global here.
 *~ Otherwise, delete this declaration.
 */
export as namespace myLib;

/*~ If this module has methods, declare them as functions like so.
 */
export function myMethod(a: string): string;
export function myOtherMethod(a: number): number;

/*~ You can declare types that are available via importing the module */
export interface someType {
    name: string;
    length: number;
    extras?: string[];
}

/*~ You can declare properties of the module using const, let, or var */
export const myField: number;

/*~ If there are types, properties, or methods inside dotted names
 *~ of the module, declare them inside a 'namespace'.
 */
export namespace subProp {
    /*~ For example, given this definition, someone could write:
     *~   import { subProp } from 'yourModule';
     *~   subProp.foo();
     *~ or
     *~   import * as yourMod from 'yourModule';
     *~   yourMod.subProp.foo();
     */
    export function foo(): void;
}