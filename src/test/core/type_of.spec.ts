import { declare, type, type_of } from "@lib/index.js"

declare.test("type_of string literal", expect => {
    expect(type_of("a")).to_equal(type<string>)
})
