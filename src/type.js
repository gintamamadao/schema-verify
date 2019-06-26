const isarray = require("isarray");
const isobject = require("isobject");
const isnumber = require("is-number");
const isinteger = require("is-integer");
const isfunction = require("is-function-x");

const isstring = function(v) {
    return typeof v === "string";
};

const isundefinedNull = function(v) {
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
        }
    },
    undefinedNull: {
        is(v) {
            return isundefinedNull(v);
        },
        isNot(v) {
            return !isundefinedNull(v);
        }
    }
};

module.exports = Type;
