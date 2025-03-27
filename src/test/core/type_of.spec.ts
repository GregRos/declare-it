import { declare, type, type_of } from "@lib/index.js"

declare.test("type_of string literal", expect => {
    const a = expect(type_of("a")).to_equal(type<string>())
})
