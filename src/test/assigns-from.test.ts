import { declare_test, expect_type } from "../../dist/cjs"

declare_test("works for string type", check => {
    check = expect_type<string>().to_extend_by<string>()
    check = expect_type<string>().not.to_extend_by<number>()
})
declare_test("works for number type", check => {
    check = expect_type<number>().to_extend_by<number>()
})
declare_test("works for unknown type", check => {
    check = expect_type<unknown>().to_extend_by<string>()
    check = expect_type<unknown>().to_extend_by<number>()
    check = expect_type<unknown>().to_extend_by<unknown>()
    check = expect_type<unknown>().to_extend_by<never>()
})
declare_test("works for never type", check => {
    check = expect_type<never>().not.to_extend_by<string>()
    check = expect_type<never>().not.to_extend_by<number>()
    check = expect_type<never>().not.to_extend_by<unknown>()
    check = expect_type<never>().to_extend_by<never>()
})
declare_test("works for object", check => {
    check = expect_type<{}>().to_extend_by<{}>()
    check = expect_type<{}>().to_extend_by<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().to_extend_by<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().to_extend_by<{ a: 1; b: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_extend_by<{ a: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_extend_by<{ b: 1 }>()
})
declare_test("works for array", check => {
    check = expect_type<[1]>().to_extend_by<[1]>()
    check = expect_type<[1]>().not.to_extend_by<[1, 2]>()
    check = expect_type<[1, 2]>().not.to_extend_by<[1]>()
    check = expect_type<[1, 2]>().to_extend_by<[1, 2]>()
    check = expect_type<[1, 2?]>().to_extend_by<[1]>()
    check = expect_type<[1]>().not.to_extend_by<[1, 2?]>()
})
declare_test("works for function", check => {
    check = expect_type<() => void>().to_extend_by<() => void>()
    check = expect_type<() => void>().to_extend_by<() => string>()
    check = expect_type<() => void>().to_extend_by<() => void>()
    check = expect_type<() => void>().to_extend_by<() => string>()
})
declare_test("works for disjunction type", check => {
    check = expect_type<1 | 2>().to_extend_by<1 | 2>()
    check = expect_type<1 | 2>().not.to_extend_by<1 | 3>()
    check = expect_type<1 | 2>().to_extend_by<1>()
})
declare_test("works for conjunction type", check => {
    check = expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>()
    check = expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>()
    check = expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>()
})
