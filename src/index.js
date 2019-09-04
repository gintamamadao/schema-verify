const Type = require("./type.js");
const Pattern = require("./pattern.js");
const Schema = require("./schema.js");

function SchemaVerify(info) {
    const schema = new Schema(info);
    return schema;
}

SchemaVerify.Type = Type;
SchemaVerify.Pattern = Pattern;
SchemaVerify.Schema = Schema;

module.exports = SchemaVerify;
