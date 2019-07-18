const { Schema } = require("schema-verify");
describe("example", () => {
    test(`example`, () => {
        const schemaInfo = {
            type: Object,
            restrict: true,
            props: {
                id: {
                    required: true,
                    type: Number,
                    natural: true
                },
                email: {
                    required: true,
                    type: String,
                    pattern: "email",
                    length: { min: 3, max: 32 }
                },
                gender: {
                    required: true,
                    type: String,
                    enum: ["male", "female"]
                },
                address: {
                    required: true,
                    type: Object,
                    restrict: true,
                    props: {
                        city: {
                            required: true,
                            type: String,
                            maxLength: 100
                        },
                        street: {
                            required: true,
                            type: String,
                            maxLength: 100
                        }
                    }
                }
            }
        };
        const schema = new Schema(schemaInfo);
        expect(
            (() => {
                const data = {
                    id: 1,
                    email: "abc@abc.abc",
                    gender: "male",
                    address: {
                        city: "London",
                        street: "London street"
                    }
                };
                return schema.verify(data);
            })()
        ).toBeTruthy();
        expect(() => {
            const data = {
                id: 1,
                email: "abc@abc.abc",
                gender: "male",
                address: {
                    city: 1,
                    street: "London street"
                }
            };
            return schema.verify(data, true);
        }).toThrowError(
            "属性 address: 属性 city: type 校验不通过, 错误信息：需要 string 类型"
        );
    });
});
