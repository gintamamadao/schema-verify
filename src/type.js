const isarray = require("isarray");
const isobject = require("isobject");
const isnumber = require("is-number");
const isinteger = require("is-integer");

const isstring = function(v) {
    return typeof v === "string";
};

const isfunction = function(v) {
    return typeof v === "function";
};

const isnull = function(v) {
    return v === null;
};

const isundefined = function(v) {
    return v === undefined;
};

const isundefinednull = function(v) {
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
            return isstring(v) ? v : "";
        }
    },
    number: {
        is(v) {
            return isnumber(v);
        },
        isNot(v) {
            return !isnumber(v);
        },
        isinteger(v) {
            return isinteger(v);
        },
        isNatural(v) {
            return isinteger(v) && v >= 0;
        },
        safe(v) {
            return isnumber(v) ? v : 0;
        }
    },
    boolean: {
        is(v) {
            return v === true || v === false;
        },
        isNot(v) {
            return v !== true && v !== false;
        }
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
        }
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
        }
    },
    function: {
        is(v) {
            return isfunction(v);
        },
        isNot(v) {
            return !isfunction(v);
        },
        safeExecu(v, ...arg) {
            if (isfunction(v)) {
                return v.apply(null, arg);
            }
        }
    },
    undefinedNull: {
        is(v) {
            return isundefinednull(v);
        },
        isNot(v) {
            return !isundefinednull(v);
        }
    },
    null: {
        is(v) {
            return isnull(v);
        },
        isNot(v) {
            return !isnull(v);
        }
    },
    undefined: {
        is(v) {
            return isundefined(v);
        },
        isNot(v) {
            return !isundefined(v);
        }
    }
};

module.exports = Type;
