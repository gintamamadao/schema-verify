const util = require("./util");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelOptions = {
    extensions,
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false,
                targets: {
                    node: "10.15.3"
                }
            }
        ]
    ]
};

module.exports = {
    input: util.resolve("src/index.js"),
    plugins: [babel(babelOptions), commonjs({ extensions })],
    external: [
        "is-function-x",
        "is-integer",
        "is-number",
        "isarray",
        "isobject"
    ]
};
