import { declare } from "@lib/index"

declare.test("type_of string literal", expect => {
    expect.type_of("hello")
})
