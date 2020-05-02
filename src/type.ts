export const isobject = (v) => {
    return v != null && typeof v === "object" && Array.isArray(v) === false;
};

export const isarray = (v) => {
    return Object.prototype.toString.call(v) == "[object Array]";
};

export const isstring = (v) => {
    return typeof v === "string";
};

export const isfinite = (v) => {
    return v !== Infinity && v !== -Infinity;
};

export const isnumber = (v) => {
    return typeof v === "number" && !Number.isNaN(v) && isfinite(v);
};

export const isinteger = (v) => {
    return isnumber(v) && Math.floor(v) === v;
};

export const isfunction = (v) => {
    return typeof v === "function";
};

export const isnull = (v) => {
    return v === null;
};

export const isundefined = (v) => {
    return v === undefined;
};

export const isundefinednull = (v) => {
    return v === undefined || v === null;
};

const Type = {
    string: {
        is(v) {
            return isstring(v);
        },
        isNot(v) {
            return !isstring(v);
        },
        isEmpty(v) {
            return isstring(v) && v.length === 0;
        },
        isNotEmpty(v) {
            return isstring(v) && v.length >= 1;
        },
        safe(v) {
            return isstring(v) ? v : isundefinednull(v) ? "" : v + "";
        },
    },
    number: {
        is(v) {
            return isnumber(v);
        },
        isNot(v) {
            return !isnumber(v);
        },
        isInteger(v) {
            return isnumber(v) && isinteger(v);
        },
        isNatural(v) {
            return isnumber(v) && isinteger(v) && v >= 0;
        },
        safe(v) {
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
        is(v) {
            return v === true || v === false;
        },
        isNot(v) {
            return v !== true && v !== false;
        },
    },
    array: {
        is(v) {
            return isarray(v);
        },
        isNot(v) {
            return !isarray(v);
        },
        isEmpty(v) {
            return isarray(v) && v.length === 0;
        },
        isNotEmpty(v) {
            return isarray(v) && v.length >= 1;
        },
        safe(v) {
            return isarray(v) ? v : [];
        },
        pure(v) {
            if (!isarray(v)) {
                return [];
            }
            const t: any[] = [];
            v.forEach((item) => {
                if (!isundefinednull(item)) {
                    t.push(item);
                }
            });
            return t;
        },
    },
    object: {
        is(v) {
            return isobject(v);
        },
        isNot(v) {
            return !isobject(v);
        },
        isEmpty(v) {
            return isobject(v) && Object.keys(v).length === 0;
        },
        isNotEmpty(v) {
            return isobject(v) && Object.keys(v).length >= 1;
        },
        safe(v) {
            return isobject(v) ? v : {};
        },
        pure(v) {
            if (!isobject(v)) {
                return {};
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
        is(v) {
            return isfunction(v);
        },
        isNot(v) {
            return !isfunction(v);
        },
        safe(v, context) {
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
        is(v) {
            return isundefinednull(v);
        },
        isNot(v) {
            return !isundefinednull(v);
        },
    },
    nul: {
        is(v) {
            return isnull(v);
        },
        isNot(v) {
            return !isnull(v);
        },
    },
    undefined: {
        is(v) {
            return isundefined(v);
        },
        isNot(v) {
            return !isundefined(v);
        },
    },
};

export default Type;
