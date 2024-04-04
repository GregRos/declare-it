import { declare_test, expect_type } from "@lib"

declare_test(
    "works for string type",
    expect_type<string>().to_extend<string>(),
    expect_type<string>().not.to_extend<number>()
)

declare_test("works for number type", expect_type<number>().to_extend<number>())

declare_test(
    "works for unknown type",
    expect_type<unknown>().not.to_extend<string>(),
    expect_type<unknown>().not.to_extend<number>(),
    expect_type<unknown>().to_extend<unknown>(),
    expect_type<unknown>().not.to_extend<never>()
)

declare_test(
    "works for never type",
    expect_type<never>().to_extend<string>(),
    expect_type<never>().to_extend<number>(),
    expect_type<never>().to_extend<unknown>(),
    expect_type<never>().to_extend<never>()
)

declare_test(
    "works for object",
    expect_type<{}>().to_extend<{}>(),
    expect_type<{}>().not.to_extend<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_extend<{ a: 1 }>(),
    expect_type<{ a: 1 }>().not.to_extend<{ a: 1; b: 2 }>(),
    expect_type<{ a: 1 }>().not.to_extend<{ a: 2 }>(),
    expect_type<{ a: 1 }>().not.to_extend<{ b: 1 }>()
)

declare_test(
    "works for array",
    expect_type<[1]>().to_extend<[1]>(),
    expect_type<[1]>().not.to_extend<[1, 2]>(),
    expect_type<[1, 2]>().not.to_extend<[1]>(),
    expect_type<[1, 2]>().to_extend<[1, 2]>(),
    expect_type<[1, 2?]>().not.to_extend<[1]>(),
    expect_type<[1]>().to_extend<[1, 2?]>()
)
