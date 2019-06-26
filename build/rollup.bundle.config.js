const util = require("./util");
const baseConfig = require("./rollup.config");
const uglify = require("rollup-plugin-uglify-es");

module.exports = {
    ...baseConfig,
    plugins: [...baseConfig.plugins, uglify()],
    output: {
        file: util.resolve("dist/js-verify.js"),
        format: "cjs"
    }
};
