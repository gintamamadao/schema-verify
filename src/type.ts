export const isobject = (v: any): boolean => {
    return v != null && typeof v === "object" && Array.isArray(v) === false;
};

export const isarray = (v: any): boolean => {
    return Object.prototype.toString.call(v) == "[object Array]";
};

export const isstring = (v: any): boolean => {
    return typeof v === "string";
};

export const isfinite = (v: any): boolean => {
    return v !== Infinity && v !== -Infinity;
};

export const isnumber = (v: any): boolean => {
    return typeof v === "number" && !Number.isNaN(v) && isfinite(v);
};

export const isinteger = (v: any): boolean => {
    return isnumber(v) && Math.floor(v) === v;
};

export const isfunction = (v: any): boolean => {
    return typeof v === "function";
};

export const isnull = (v: any): boolean => {
    return v === null;
};

export const isundefined = (v: any): boolean => {
    return v === undefined;
};

export const isundefinednull = (v: any): boolean => {
    return v == null;
};

const Type = {
    string: {
        is(v: any): v is string {
            return isstring(v);
        },
        isNot(v: any): boolean {
            return !isstring(v);
        },
        isEmpty(v: any): boolean {
            return isstring(v) && v.length === 0;
        },
        isNotEmpty(v: any): boolean {
            return isstring(v) && v.length >= 1;
        },
        safe(v: any): string {
            return isstring(v) ? v : isundefinednull(v) ? "" : v + "";
        },
    },
    number: {
        is(v: any): v is number {
            return isnumber(v);
        },
        isNot(v: any): boolean {
            return !isnumber(v);
        },
        isInteger(v: any): boolean {
            return isnumber(v) && isinteger(v);
        },
        isNatural(v: any): boolean {
            return isnumber(v) && isinteger(v) && v >= 0;
        },
        safe(v: any): number {
            if (isnumber(v)) {
                return v;
            } else if (isundefinednull(v)) {
                return 0;
            } else {
                v = new Number(v).valueOf();
                if (isnumber(v)) {
                    return v;
                }
            }
            return 0;
        },
    },
    boolean: {
        is(v: any): v is boolean {
            return v === true || v === false;
        },
        isNot(v: any): boolean {
            return v !== true && v !== false;
        },
    },
    array: {
        is<T>(v: any): v is T {
            return isarray(v);
        },
        isNot(v: any): boolean {
            return !isarray(v);
        },
        isEmpty(v: any): boolean {
            return isarray(v) && v.length === 0;
        },
        isNotEmpty(v: any): boolean {
            return isarray(v) && v.length >= 1;
        },
        safe<T>(v: any): T {
            return isarray(v) ? v : [];
        },
        pure<T>(v: any): T {
            if (!isarray(v)) {
                return <any>[];
            }
            const t: any = [];
            v.forEach((item) => {
                if (!isundefinednull(item)) {
                    t.push(item);
                }
            });
            return t;
        },
    },
    object: {
        is<T>(v: any): v is T {
            return isobject(v);
        },
        isNot(v: any): boolean {
            return !isobject(v);
        },
        isEmpty(v: any): boolean {
            return isobject(v) && Object.keys(v).length === 0;
        },
        isNotEmpty(v: any): boolean {
            return isobject(v) && Object.keys(v).length >= 1;
        },
        safe<T>(v: any): T {
            return isobject(v) ? v : {};
        },
        pure<T>(v: any): T {
            if (!isobject(v)) {
                return <any>{};
            }
            const t = Object.assign({}, v);
            Object.keys(t).forEach((k) => {
                if (isundefinednull(t[k])) {
                    delete t[k];
                }
            });
            return t;
        },
    },
    func: {
        is<T>(v: any): v is T {
            return isfunction(v);
        },
        isNot(v: any): boolean {
            return !isfunction(v);
        },
        safe(v: any, context?: any): Function {
            return function () {
                if (isfunction(v)) {
                    context = context || isnull(context) ? context : this;
                    return v.apply(
                        context,
                        Array.prototype.slice.apply(arguments)
                    );
                }
            };
        },
    },
    undefinedNull: {
        is(v: any): v is null | undefined {
            return isundefinednull(v);
        },
        isNot(v: any): boolean {
            return !isundefinednull(v);
        },
    },
    nul: {
        is(v: any): v is null {
            return isnull(v);
        },
        isNot(v: any): boolean {
            return !isnull(v);
        },
    },
    undefined: {
        is(v: any): v is undefined {
            return isundefined(v);
        },
        isNot(v: any): boolean {
            return !isundefined(v);
        },
    },
};

export default Type;
