import { declare, type } from "@lib/index.js"

declare.test.skip("abc", expect => {
    expect(type<1>).to_equal(type<2>)
    expect(type<1>).to_resemble(type<2>)
    expect(type<1>).to_subtype(type<2>)
    expect(type<1>).to_supertype(type<2>)
})
