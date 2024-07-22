import { declare_test } from "@lib/index"
declare_test("true ⊂ boolean", expect => {
    expect.type<true>(t => t.to_subtype<boolean>())
    expect.type<true>(t => t.not.to_supertype<boolean>())
    expect.type<true>(t => t.not.to_strictly_supertype<boolean>())
    expect.type<true>(t => t.to_strictly_subtype<boolean>())
    expect.type<true>(t => t.not.to_resemble<boolean>())
    expect.type<true>(t => t.not.to_equal<boolean>())
})

declare_test("1 ⊂ number", expect => {
    expect.type<1>(t => t.to_subtype<number>())
    expect.type<1>(t => t.not.to_supertype<number>())
    expect.type<1>(t => t.not.to_strictly_supertype<number>())
    expect.type<1>(t => t.to_strictly_subtype<number>())
    expect.type<1>(t => t.not.to_resemble<number>())
    expect.type<1>(t => t.not.to_equal<number>())
})

declare_test("'a' ⊂ string", expect => {
    expect.type<"a">(t => t.to_subtype<string>())
    expect.type<"a">(t => t.not.to_supertype<string>())
    expect.type<"a">(t => t.not.to_strictly_supertype<string>())
    expect.type<"a">(t => t.to_strictly_subtype<string>())
    expect.type<"a">(t => t.not.to_resemble<string>())
    expect.type<"a">(t => t.not.to_equal<string>())
})

declare_test("1 ⊂ 1 | 2", expect => {
    expect.type<1>(t => t.to_subtype<1 | 2>())
    expect.type<1>(t => t.not.to_supertype<1 | 2>())
    expect.type<1>(t => t.not.to_strictly_supertype<1 | 2>())
    expect.type<1>(t => t.to_strictly_subtype<1 | 2>())
    expect.type<1>(t => t.not.to_resemble<1 | 2>())
    expect.type<1>(t => t.not.to_equal<1 | 2>())
})

declare_test("1 & 1 ≡ 1", expect => {
    expect.type<1 & 1>(t => t.to_equal<1>())
})

declare_test("1 | 1 ≡ 1", expect => {
    expect.type<1 | 1>(t => t.to_equal<1>())
    expect.type<1 | 1>(t => t.to_resemble<1>())
    expect.type<1 | 1>(t => t.to_subtype<1>())
    expect.type<1 | 1>(t => t.to_supertype<1>())
    expect.type<1 | 1>(t => t.not.to_strictly_subtype<1>())
    expect.type<1 | 1>(t => t.not.to_strictly_supertype<1>())
})

declare_test("null ≉ undefined", e => {
    e.type<null>(t => t.not.to_equal<undefined>())
    e.type<null>(t => t.not.to_resemble<undefined>())
    e.type<null>(t => t.not.to_subtype<undefined>())
    e.type<null>(t => t.not.to_supertype<undefined>())
    e.type<null>(t => t.not.to_strictly_subtype<undefined>())
    e.type<null>(t => t.not.to_strictly_supertype<undefined>())
})

declare_test("undefined ⊂ void", e => {
    e.type<void>(t => t.not.to_equal<undefined>())
    e.type<void>(t => t.not.to_resemble<undefined>())
    e.type<void>(t => t.not.to_subtype<undefined>())
    e.type<void>(t => t.to_supertype<undefined>())
    e.type<void>(t => t.not.to_strictly_subtype<undefined>())
    e.type<void>(t => t.to_strictly_supertype<undefined>())
})

declare_test("1 ≡ 1", expect => {
    expect.type<1>(t => t.to_equal<1>())
    expect.type<1>(t => t.to_resemble<1>())
    expect.type<1>(t => t.to_subtype<1>())
    expect.type<1>(t => t.to_supertype<1>())
    expect.type<1>(t => t.not.to_strictly_subtype<1>())
    expect.type<1>(t => t.not.to_strictly_supertype<1>())
})
