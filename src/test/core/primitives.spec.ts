import { declare_test } from "@lib/index"
import { declare_test } from "@lib/type-assertions/declare_test"
declare_test("true ⊂ boolean", expect => {
    expect = expect_type<true>().to_subtype<boolean>()
    expect = expect_type<true>().not.to_supertype<boolean>()
    expect = expect_type<true>().not.to_strictly_supertype<boolean>()
    expect = expect_type<true>().to_strictly_subtype<boolean>()
    expect = expect_type<true>().not.to_resemble<boolean>()
    expect = expect_type<true>().not.to_equal<boolean>()
})

declare_test("1 ⊂ number", expect => {
    expect = expect_type<1>().to_subtype<number>()
    expect = expect_type<1>().not.to_supertype<number>()
    expect = expect_type<1>().not.to_strictly_supertype<number>()
    expect = expect_type<1>().to_strictly_subtype<number>()
    expect = expect_type<1>().not.to_resemble<number>()
    expect = expect_type<1>().not.to_equal<number>()
})

declare_test("'a' ⊂ string", expect => {
    expect = expect_type<"a">().to_subtype<string>()
    expect = expect_type<"a">().not.to_supertype<string>()
    expect = expect_type<"a">().not.to_strictly_supertype<string>()
    expect = expect_type<"a">().to_strictly_subtype<string>()
    expect = expect_type<"a">().not.to_resemble<string>()
    expect = expect_type<"a">().not.to_equal<string>()
})

declare_test("1 ⊂ 1 | 2", expect => {
    expect = expect_type<1>().to_subtype<1 | 2>()
    expect = expect_type<1>().not.to_supertype<1 | 2>()
    expect = expect_type<1>().not.to_strictly_supertype<1 | 2>()
    expect = expect_type<1>().to_strictly_subtype<1 | 2>()
    expect = expect_type<1>().not.to_resemble<1 | 2>()
    expect = expect_type<1>().not.to_equal<1 | 2>()
})

declare_test("1 & 1 ≡ 1", expect => {
    expect = expect_type<1 & 1>().to_equal<1>()
})

declare_test("1 | 1 ≡ 1", expect => {
    expect = expect_type<1 | 1>().to_equal<1>()
    expect = expect_type<1 | 1>().to_resemble<1>()
    expect = expect_type<1 | 1>().to_subtype<1>()
    expect = expect_type<1 | 1>().to_supertype<1>()
    expect = expect_type<1 | 1>().not.to_strictly_subtype<1>()
    expect = expect_type<1 | 1>().not.to_strictly_supertype<1>()
})

declare_test("null ≉ undefined", () => {
    expect_type<null>().not.to_equal<undefined>()
    expect_type<null>().not.to_resemble<undefined>()
    expect_type<null>().not.to_subtype<undefined>()
    expect_type<null>().not.to_supertype<undefined>()
    expect_type<null>().not.to_strictly_subtype<undefined>()
    expect_type<null>().not.to_strictly_supertype<undefined>()
})

declare_test("void ≉ undefined", () => {
    expect_type<void>().not.to_equal<undefined>()
    expect_type<void>().not.to_resemble<undefined>()
    expect_type<void>().not.to_subtype<undefined>()
    expect_type<void>().not.to_supertype<undefined>()
    expect_type<void>().not.to_strictly_subtype<undefined>()
    expect_type<void>().not.to_strictly_supertype<undefined>()
})
declare_test("1 ≡ 1", expect => {
    expect.type<1>(t => t.to_equal<1>())
    expect.type<1>(t => t.to_resemble<1>())
    expect.type<1>(t => t.to_subtype<1>())
    expect.type<1>(t => t.to_supertype<1>())
    expect.type<1>(t => t.not.to_strictly_subtype<1>())
    expect.type<1>(t => t.not.to_strictly_supertype<1>())
})
