const util = require("./util");
const typescript = require("rollup-plugin-typescript2");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const babelOptions = {
    extensions,
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false,
            },
        ],
    ],
};

module.exports = {
    input: util.resolve("src/index.ts"),
    output: {
        file: util.resolve("lib/schema-verify.js"),
        format: "cjs",
    },
    plugins: [
        typescript(),
        commonjs({ extensions, ignore: ["conditional-runtime-dependency"] }),
        babel(babelOptions),
        terser({
            compress: {
                pure_getters: true,
                unsafe_comps: true,
                warnings: false,
            },
        }),
    ],
};
