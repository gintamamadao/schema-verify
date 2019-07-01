const { Schema } = require("../src/index");

describe("object:restrict", () => {
    test(`restrict`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    restrict: true,
                    props: {}
                };
                const schema = new Schema(schemaInfo);
                const data = {};
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`restrict`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    restrict: true,
                    props: {}
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`restrict`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    restrict: true,
                    props: {
                        a: {
                            type: String
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`restrict`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    restrict: true,
                    props: {
                        a: {
                            type: String
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    b: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});

describe("object:props", () => {
    test(`props`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: {
                        a: {
                            type: Number
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: 1
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`props`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: {
                        a: {
                            type: Number
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
    test(`props`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: {
                        a: {
                            type: String,
                            required: true
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {
                    a: "a"
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
    });
    test(`props`, () => {
        expect(
            (() => {
                const schemaInfo = {
                    type: Object,
                    props: {
                        a: {
                            type: String,
                            required: true
                        }
                    }
                };
                const schema = new Schema(schemaInfo);
                const data = {};
                return schema.verify(data);
            })()
        ).toBeFalsy();
    });
});
