import { declare_test, expect_type } from "../../dist/cjs"

declare_test("works for string type", check => {
    check = expect_type<string>().to_supertype<string>()
    check = expect_type<string>().not.to_supertype<number>()
})
declare_test("works for number type", check => {
    check = expect_type<number>().to_supertype<number>()
})
declare_test("works for unknown type", check => {
    check = expect_type<unknown>().to_supertype<string>()
    check = expect_type<unknown>().to_supertype<number>()
    check = expect_type<unknown>().to_supertype<unknown>()
    check = expect_type<unknown>().to_supertype<never>()
})
declare_test("works for never type", check => {
    check = expect_type<never>().not.to_supertype<string>()
    check = expect_type<never>().not.to_supertype<number>()
    check = expect_type<never>().not.to_supertype<unknown>()
    check = expect_type<never>().to_supertype<never>()
})
declare_test("works for object", check => {
    check = expect_type<{}>().to_supertype<{}>()
    check = expect_type<{}>().to_supertype<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().to_supertype<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().to_supertype<{ a: 1; b: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_supertype<{ a: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_supertype<{ b: 1 }>()
})
declare_test("works for array", check => {
    check = expect_type<[1]>().to_supertype<[1]>()
    check = expect_type<[1]>().not.to_supertype<[1, 2]>()
    check = expect_type<[1, 2]>().not.to_supertype<[1]>()
    check = expect_type<[1, 2]>().to_supertype<[1, 2]>()
    check = expect_type<[1, 2?]>().to_supertype<[1]>()
    check = expect_type<[1]>().not.to_supertype<[1, 2?]>()
})
declare_test("works for function", check => {
    check = expect_type<() => void>().to_supertype<() => void>()
    check = expect_type<() => void>().to_supertype<() => string>()
    check = expect_type<() => void>().to_supertype<() => void>()
    check = expect_type<() => void>().to_supertype<() => string>()
})
declare_test("works for disjunction type", check => {
    check = expect_type<1 | 2>().to_supertype<1 | 2>()
    check = expect_type<1 | 2>().not.to_supertype<1 | 3>()
    check = expect_type<1 | 2>().to_supertype<1>()
})
declare_test("works for conjunction type", check => {
    check = expect_type<{ a: 1 }>().to_supertype<{ a: 1 } & { b: 1 }>()
    check = expect_type<{ a: 1 }>().to_supertype<{ a: 1 } & { b: 1 }>()
    check = expect_type<{ a: 1 }>().to_supertype<{ a: 1 } & { b: 1 }>()
})
