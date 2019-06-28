const { Schema } = require("../src/index");

const info = {
    type: Object,
    restrict: true,
    hint: {
        type: "Title must be a string.",
        required: "Title is required."
    },
    props: {
        email: {
            index: "email",
            required: true,
            type: String,
            pattern: "email",
            length: { min: 3, max: 32 },
            enum: ["cat", "dog", "cow"],
            hint: {
                type: "Title must be a string.",
                required: "Title is required."
            }
        },
        no: {
            index: "no",
            required: true,
            type: Number,
            range: { min: 3, max: 32 },
            integer: true,
            natural: true,
            enum: [1, 2],
            custom: () => {},
            hint: {}
        },
        obj: {
            index: "obj",
            required: true,
            type: Object,
            restrict: true,
            props: {
                version: {
                    index: "version",
                    required: true,
                    type: String,
                    pattern: "version"
                }
            },
            hint: {
                type: "Title must be a string.",
                required: "Title is required."
            }
        },
        arr: {
            index: "arr",
            required: true,
            type: Array,
            length: { min: 3, max: 32 },
            elements: [
                {
                    index: 0,
                    type: Object,
                    restrict: true,
                    props: {
                        version: {
                            index: "version",
                            required: true,
                            type: String,
                            pattern: "version"
                        }
                    },
                    hint: {
                        type: "Title must be a string.",
                        required: "Title is required."
                    }
                }
            ],
            hint: {
                type: "Title must be a string.",
                required: "Title is required."
            }
        }
    }
};

const aaa = new Schema(info);

const bbb = {
    email: "abc@abc.abc",
    no: 1,
    obj: {
        version: "v1.0"
    },
    arr: [""]
};

aaa.verify(bbb, true);

// console.log(JSON.stringify(info), "info");
console.log(JSON.stringify(aaa.info));
