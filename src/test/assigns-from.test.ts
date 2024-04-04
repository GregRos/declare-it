import { declare_test, expect_type } from "../../dist/cjs"

declare_test(
    "works for string type",
    expect_type<string>().to_extend_by<string>(),
    expect_type<string>().not.to_extend_by<number>()
)

declare_test(
    "works for number type",
    expect_type<number>().to_extend_by<number>()
)

declare_test(
    "works for unknown type",
    expect_type<unknown>().to_extend_by<string>(),
    expect_type<unknown>().to_extend_by<number>(),
    expect_type<unknown>().to_extend_by<unknown>(),
    expect_type<unknown>().to_extend_by<never>()
)

declare_test(
    "works for never type",
    expect_type<never>().not.to_extend_by<string>(),
    expect_type<never>().not.to_extend_by<number>(),
    expect_type<never>().not.to_extend_by<unknown>(),
    expect_type<never>().to_extend_by<never>()
)

declare_test(
    "works for object",
    expect_type<{}>().to_extend_by<{}>(),
    expect_type<{}>().to_extend_by<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_extend_by<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_extend_by<{ a: 1; b: 2 }>(),
    expect_type<{ a: 1 }>().not.to_extend_by<{ a: 2 }>(),
    expect_type<{ a: 1 }>().not.to_extend_by<{ b: 1 }>()
)

declare_test(
    "works for array",
    expect_type<[1]>().to_extend_by<[1]>(),
    expect_type<[1]>().not.to_extend_by<[1, 2]>(),
    expect_type<[1, 2]>().not.to_extend_by<[1]>(),
    expect_type<[1, 2]>().to_extend_by<[1, 2]>(),
    expect_type<[1, 2?]>().to_extend_by<[1]>(),
    expect_type<[1]>().not.to_extend_by<[1, 2?]>()
)

declare_test(
    "works for function",
    expect_type<() => void>().to_extend_by<() => void>(),
    expect_type<() => void>().to_extend_by<() => string>(),
    expect_type<() => void>().to_extend_by<() => void>(),
    expect_type<() => void>().to_extend_by<() => string>()
)

declare_test(
    "works for disjunction type",
    expect_type<1 | 2>().to_extend_by<1 | 2>(),
    expect_type<1 | 2>().not.to_extend_by<1 | 3>(),
    expect_type<1 | 2>().to_extend_by<1>()
)

declare_test(
    "works for conjunction type",
    expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_extend_by<{ a: 1 } & { b: 1 }>()
)
