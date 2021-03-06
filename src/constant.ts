export const TYPES = {
    string: "string",
    number: "number",
    object: "object",
    array: "array",
    function: "function",
    boolean: "boolean",
    null: "null",
};

export const METHODS = {
    index: "index",
    required: "required",
    type: "type",
    schema: "schema",
    custom: "custom",
    hint: "hint",
    pattern: "pattern",
    length: "length",
    minLength: "minLength",
    maxLength: "maxLength",
    min: "min",
    max: "max",
    enum: "enum",
    match: "match",
    range: "range",
    integer: "integer",
    natural: "natural",
    restrict: "restrict",
    props: "props",
    elements: "elements",
};

export const COMMON_METHODS = [
    METHODS.index,
    METHODS.required,
    METHODS.type,
    METHODS.schema,
    METHODS.custom,
    METHODS.hint,
];

export const TYPE_METHODS = {
    string: [
        METHODS.pattern,
        METHODS.length,
        METHODS.enum,
        METHODS.match,
        METHODS.minLength,
        METHODS.maxLength,
    ],
    number: [
        METHODS.range,
        METHODS.integer,
        METHODS.natural,
        METHODS.enum,
        METHODS.min,
        METHODS.max,
    ],
    object: [METHODS.restrict, METHODS.props],
    array: [
        METHODS.elements,
        METHODS.length,
        METHODS.minLength,
        METHODS.maxLength,
    ],
    function: [],
    boolean: [],
    null: [],
};
