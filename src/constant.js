const TYPES = {
    string: "string",
    number: "number",
    object: "object",
    array: "array"
};

const METHODS = {
    index: "index",
    required: "required",
    type: "type",
    custom: "custom",
    hint: "hint",
    pattern: "pattern",
    length: "length",
    enum: "enum",
    match: "match",
    range: "range",
    integer: "integer",
    natural: "natural",
    restrict: "restrict",
    props: "props",
    elements: "elements"
};

const COMMON_METHODS = [
    METHODS.index,
    METHODS.required,
    METHODS.type,
    METHODS.custom,
    METHODS.hint
];

const TYPE_METHODS = {
    string: [METHODS.pattern, METHODS.length, METHODS.enum, METHODS.match],
    number: [METHODS.range, METHODS.integer, METHODS.natural, METHODS.enum],
    object: [METHODS.restrict, METHODS.props],
    array: [METHODS.elements, METHODS.length]
};

module.exports = {
    COMMON_METHODS,
    TYPE_METHODS,
    TYPES,
    METHODS
};
