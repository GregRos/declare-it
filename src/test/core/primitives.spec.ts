import { declare_test, expect_type } from "@lib/index"

declare_test("true ⊂ boolean", check => {
    check = expect_type<true>().to_subtype<boolean>()
    check = expect_type<true>().not.to_supertype<boolean>()
    check = expect_type<true>().not.to_strictly_supertype<boolean>()
    check = expect_type<true>().to_strictly_subtype<boolean>()
    check = expect_type<true>().not.to_resemble<boolean>()
    check = expect_type<true>().not.to_equal<boolean>()
})

declare_test("1 ⊂ number", check => {
    check = expect_type<1>().to_subtype<number>()
    check = expect_type<1>().not.to_supertype<number>()
    check = expect_type<1>().not.to_strictly_supertype<number>()
    check = expect_type<1>().to_strictly_subtype<number>()
    check = expect_type<1>().not.to_resemble<number>()
    check = expect_type<1>().not.to_equal<number>()
})

declare_test("'a' ⊂ string", check => {
    check = expect_type<"a">().to_subtype<string>()
    check = expect_type<"a">().not.to_supertype<string>()
    check = expect_type<"a">().not.to_strictly_supertype<string>()
    check = expect_type<"a">().to_strictly_subtype<string>()
    check = expect_type<"a">().not.to_resemble<string>()
    check = expect_type<"a">().not.to_equal<string>()
})

declare_test("1 ⊂ 1 | 2", check => {
    check = expect_type<1>().to_subtype<1 | 2>()
    check = expect_type<1>().not.to_supertype<1 | 2>()
    check = expect_type<1>().not.to_strictly_supertype<1 | 2>()
    check = expect_type<1>().to_strictly_subtype<1 | 2>()
    check = expect_type<1>().not.to_resemble<1 | 2>()
    check = expect_type<1>().not.to_equal<1 | 2>()
})

declare_test("1 & 1 ≡ 1", check => {
    check = expect_type<1 & 1>().to_equal<1>()
})

declare_test("1 | 1 ≡ 1", check => {
    check = expect_type<1 | 1>().to_equal<1>()
    check = expect_type<1 | 1>().to_resemble<1>()
    check = expect_type<1 | 1>().to_subtype<1>()
    check = expect_type<1 | 1>().to_supertype<1>()
    check = expect_type<1 | 1>().not.to_strictly_subtype<1>()
    check = expect_type<1 | 1>().not.to_strictly_supertype<1>()
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
