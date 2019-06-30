const COMMON_METHODS = ["index", "required", "type", "custom", "hint"];

const TYPE_METHODS = {
    string: ["pattern", "length", "enum"],
    number: ["range", "integer", "natural", "enum"],
    object: ["restrict", "props"],
    array: ["elements", "length"]
};

module.exports = {
    COMMON_METHODS,
    TYPE_METHODS
};
