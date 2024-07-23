import { declare_test } from "@lib/index"
declare_test("true ⊂ boolean", expect => {
    expect.type<true>(to => to.subtype<boolean>())
    expect.type<true>(to => to.not.supertype<boolean>())
    expect.type<true>(to => to.not.strictly_supertype<boolean>())
    expect.type<true>(to => to.strictly_subtype<boolean>())
    expect.type<true>(to => to.not.resemble<boolean>())
    expect.type<true>(to => to.not.equal<boolean>())
})

declare_test("1 ⊂ number", expect => {
    expect.type<1>(to => to.subtype<number>())
    expect.type<1>(to => to.not.supertype<number>())
    expect.type<1>(to => to.not.strictly_supertype<number>())
    expect.type<1>(to => to.strictly_subtype<number>())
    expect.type<1>(to => to.not.resemble<number>())
    expect.type<1>(to => to.not.equal<number>())
})

declare_test("'a' ⊂ string", expect => {
    expect.type<"a">(to => to.subtype<string>())
    expect.type<"a">(to => to.not.supertype<string>())
    expect.type<"a">(to => to.not.strictly_supertype<string>())
    expect.type<"a">(to => to.strictly_subtype<string>())
    expect.type<"a">(to => to.not.resemble<string>())
    expect.type<"a">(to => to.not.equal<string>())
})

declare_test("1 ⊂ 1 | 2", expect => {
    expect.type<1>(to => to.subtype<1 | 2>())
    expect.type<1>(to => to.not.supertype<1 | 2>())
    expect.type<1>(to => to.not.strictly_supertype<1 | 2>())
    expect.type<1>(to => to.strictly_subtype<1 | 2>())
    expect.type<1>(to => to.not.resemble<1 | 2>())
    expect.type<1>(to => to.not.equal<1 | 2>())
})

declare_test("1 & 1 ≡ 1", expect => {
    expect.type<1 & 1>(to => to.equal<1>())
})

declare_test("1 | 1 ≡ 1", expect => {
    expect.type<1 | 1>(to => to.equal<1>())
    expect.type<1 | 1>(to => to.resemble<1>())
    expect.type<1 | 1>(to => to.subtype<1>())
    expect.type<1 | 1>(to => to.supertype<1>())
    expect.type<1 | 1>(to => to.not.strictly_subtype<1>())
    expect.type<1 | 1>(to => to.not.strictly_supertype<1>())
})

declare_test("null ≉ undefined", e => {
    e.type<null>(to => to.not.equal<undefined>())
    e.type<null>(to => to.not.resemble<undefined>())
    e.type<null>(to => to.not.subtype<undefined>())
    e.type<null>(to => to.not.supertype<undefined>())
    e.type<null>(to => to.not.strictly_subtype<undefined>())
    e.type<null>(to => to.not.strictly_supertype<undefined>())
})

declare_test("undefined ⊂ void", e => {
    e.type<void>(to => to.not.equal<undefined>())
    e.type<void>(to => to.not.resemble<undefined>())
    e.type<void>(to => to.not.subtype<undefined>())
    e.type<void>(to => to.supertype<undefined>())
    e.type<void>(to => to.not.strictly_subtype<undefined>())
    e.type<void>(to => to.strictly_supertype<undefined>())
})

declare_test("1 ≡ 1", expect => {
    expect.type<1>(to => to.equal<1>())
    expect.type<1>(to => to.resemble<1>())
    expect.type<1>(to => to.subtype<1>())
    expect.type<1>(to => to.supertype<1>())
    expect.type<1>(to => to.not.strictly_subtype<1>())
    expect.type<1>(to => to.not.strictly_supertype<1>())
})
