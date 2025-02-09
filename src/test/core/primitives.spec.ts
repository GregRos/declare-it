import { declare, type } from "@lib/index.js"
declare.test("true ⊂ boolean", expect => {
    expect(type<true>).to_subtype(type<boolean>)
    expect(type<true>).not.to_supertype(type<boolean>)
    expect(type<true>).not.to_strictly_supertype(type<boolean>)
    expect(type<true>).to_strictly_subtype(type<boolean>)
    expect(type<true>).not.to_resemble(type<boolean>)
    expect(type<true>).not.to_equal(type<boolean>)
})

declare.test("1 ⊂ number", expect => {
    expect(type<1>).to_subtype(type<number>)
    expect(type<1>).not.to_supertype(type<number>)
    expect(type<1>).not.to_strictly_supertype(type<number>)
    expect(type<1>).to_strictly_subtype(type<number>)
    expect(type<1>).not.to_resemble(type<number>)
    expect(type<1>).not.to_equal(type<number>)
})

declare.test("'a' ⊂ string", expect => {
    expect(type<"a">).to_subtype(type<string>)
    expect(type<"a">).not.to_supertype(type<string>)
    expect(type<"a">).not.to_strictly_supertype(type<string>)
    expect(type<"a">).to_strictly_subtype(type<string>)
    expect(type<"a">).not.to_resemble(type<string>)
    expect(type<"a">).not.to_equal(type<string>)
})

declare.test("1 ⊂ 1 | 2", expect => {
    expect(type<1>).to_subtype(type<1 | 2>)
    expect(type<1>).not.to_supertype(type<1 | 2>)
    expect(type<1>).not.to_strictly_supertype(type<1 | 2>)
    expect(type<1>).to_strictly_subtype(type<1 | 2>)
    expect(type<1>).not.to_resemble(type<1 | 2>)
    expect(type<1>).not.to_equal(type<1 | 2>)
})

declare.test("1 & 1 ≡ 1", expect => {
    expect(type<1 & 1>).to_equal(type<1>)
})

declare.test("1 | 1 ≡ 1", expect => {
    expect(type<1 | 1>).to_equal(type<1>)
    expect(type<1 | 1>).to_resemble(type<1>)
    expect(type<1 | 1>).to_subtype(type<1>)
    expect(type<1 | 1>).to_supertype(type<1>)
    expect(type<1 | 1>).not.to_strictly_subtype(type<1>)
    expect(type<1 | 1>).not.to_strictly_supertype(type<1>)
})

declare.test("null ≉ undefined", e => {
    e(type<null>).not.to_equal(type<undefined>)
    e(type<null>).not.to_resemble(type<undefined>)
    e(type<null>).not.to_subtype(type<undefined>)
    e(type<null>).not.to_supertype(type<undefined>)
    e(type<null>).not.to_strictly_subtype(type<undefined>)
    e(type<null>).not.to_strictly_supertype(type<undefined>)
})

declare.test("undefined ⊂ void", e => {
    e(type<void>).not.to_equal(type<undefined>)
    e(type<void>).not.to_resemble(type<undefined>)
    e(type<void>).not.to_subtype(type<undefined>)
    e(type<void>).to_supertype(type<undefined>)
    e(type<void>).not.to_strictly_subtype(type<undefined>)
    e(type<void>).to_strictly_supertype(type<undefined>)
})

declare.test("1 ≡ 1", expect => {
    expect(type<1>).to_equal(type<1>)
    expect(type<1>).to_resemble(type<1>)
    expect(type<1>).to_subtype(type<1>)
    expect(type<1>).to_supertype(type<1>)
    expect(type<1>).not.to_strictly_subtype(type<1>)
    expect(type<1>).not.to_strictly_supertype(type<1>)
})
