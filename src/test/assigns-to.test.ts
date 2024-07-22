import { declare_test, expect_type } from "@lib"

declare_test("works for string type", check => {
    check = expect_type<string>().to_subtype<string>()
    check = expect_type<string>().not.to_subtype<number>()
})
declare_test("works for number type", () => {
    expect_type<number>().to_subtype<number>()
})

declare_test("works for unknown type", check => {
    check = expect_type<unknown>().not.to_subtype<string>()
    check = expect_type<unknown>().not.to_subtype<number>()
    check = expect_type<unknown>().to_subtype<unknown>()
})
declare_test("works for never type", check => {
    check = expect_type<never>().to_subtype<string>()
    check = expect_type<never>().to_subtype<number>()
    check = expect_type<never>().to_subtype<unknown>()
    check = expect_type<never>().to_subtype<never>()
})
declare_test("works for object", check => {
    check = expect_type<{}>().to_subtype<{}>()
    check = expect_type<{}>().not.to_subtype<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().to_subtype<{ a: 1 }>()
    check = expect_type<{ a: 1 }>().not.to_subtype<{ a: 1; b: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_subtype<{ a: 2 }>()
    check = expect_type<{ a: 1 }>().not.to_subtype<{ b: 1 }>()
})
declare_test("works for array", check => {
    check = expect_type<[1]>().to_subtype<[1]>()
    check = expect_type<[1]>().not.to_subtype<[1, 2]>()
    check = expect_type<[1, 2]>().not.to_subtype<[1]>()

    check = expect_type<[1, 2]>().to_subtype<[1, 2]>()
    check = expect_type<[1, 2?]>().not.to_subtype<[1]>()
    check = check = expect_type<[1]>().to_subtype<[1, 2?]>()
})
