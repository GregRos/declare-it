import { declare_test, expect_type } from "../../dist/cjs"

declare_test(
    "works for string type",
    expect_type<string>().to_be_extended<string>(),
    expect_type<string>().not.to_be_extended<number>()
)

declare_test(
    "works for number type",
    expect_type<number>().to_be_extended<number>()
)

declare_test(
    "works for unknown type",
    expect_type<unknown>().to_be_extended<string>(),
    expect_type<unknown>().to_be_extended<number>(),
    expect_type<unknown>().to_be_extended<unknown>(),
    expect_type<unknown>().to_be_extended<never>()
)

declare_test(
    "works for never type",
    expect_type<never>().not.to_be_extended<string>(),
    expect_type<never>().not.to_be_extended<number>(),
    expect_type<never>().not.to_be_extended<unknown>(),
    expect_type<never>().to_be_extended<never>()
)

declare_test(
    "works for object",
    expect_type<{}>().to_be_extended<{}>(),
    expect_type<{}>().to_be_extended<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_be_extended<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_be_extended<{ a: 1; b: 2 }>(),
    expect_type<{ a: 1 }>().not.to_be_extended<{ a: 2 }>(),
    expect_type<{ a: 1 }>().not.to_be_extended<{ b: 1 }>()
)

declare_test(
    "works for array",
    expect_type<[1]>().to_be_extended<[1]>(),
    expect_type<[1]>().not.to_be_extended<[1, 2]>(),
    expect_type<[1, 2]>().not.to_be_extended<[1]>(),
    expect_type<[1, 2]>().to_be_extended<[1, 2]>(),
    expect_type<[1, 2?]>().to_be_extended<[1]>(),
    expect_type<[1]>().not.to_be_extended<[1, 2?]>()
)

declare_test(
    "works for function",
    expect_type<() => void>().to_be_extended<() => void>(),
    expect_type<() => void>().to_be_extended<() => string>(),
    expect_type<() => void>().to_be_extended<() => void>(),
    expect_type<() => void>().to_be_extended<() => string>()
)

declare_test(
    "works for disjunction type",
    expect_type<1 | 2>().to_be_extended<1 | 2>(),
    expect_type<1 | 2>().not.to_be_extended<1 | 3>(),
    expect_type<1 | 2>().to_be_extended<1>()
)

declare_test(
    "works for conjunction type",
    expect_type<{ a: 1 }>().to_be_extended<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_be_extended<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_be_extended<{ a: 1 } & { b: 1 }>()
)
