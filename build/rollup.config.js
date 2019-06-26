const util = require("./util");
const babel = require("rollup-plugin-babel");
const nodeResolve = require("rollup-plugin-node-resolve");
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
    ],
    plugins: ["@babel/external-helpers", "@babel/transform-runtime"]
};

module.exports = {
    input: util.resolve("src/index.js"),
    plugins: [
        nodeResolve({ extensions }),
        commonjs({ extensions }),
        babel(babelOptions)
    ]
};
