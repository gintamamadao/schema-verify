declare const Pattern: {
    phone: {
        is(v: any): boolean;
    };
    uri: {
        is(v: any): boolean;
    };
    email: {
        is(v: any): boolean;
    };
    color: {
        is(v: any): boolean;
    };
    version: {
        is(v: any): boolean;
    };
    sign: {
        is(v: any): boolean;
    };
    numStr: {
        is(v: any): boolean;
    };
    jsonStr: {
        is(v: any): boolean;
    };
    time: {
        is(v: any): boolean;
        isCommon(v: string): boolean;
    };
};
export default Pattern;
