const util = require("./util");
const baseConfig = require("./rollup.config");

module.exports = {
    ...baseConfig,
    output: {
        file: util.resolve("dist/schema-verify.js"),
        format: "cjs"
    }
};
