import { declare_test, expect_type } from "../lib"

declare_test(
    "works for string type",
    expect_type<string>().to_assign_from<string>(),
    expect_type<string>().not.to_assign_from<number>()
)

declare_test(
    "works for number type",
    expect_type<number>().to_assign_from<number>()
)

declare_test(
    "works for unknown type",
    expect_type<unknown>().to_assign_from<string>(),
    expect_type<unknown>().to_assign_from<number>(),
    expect_type<unknown>().to_assign_from<unknown>(),
    expect_type<unknown>().to_assign_from<never>()
)

declare_test(
    "works for never type",
    expect_type<never>().not.to_assign_from<string>(),
    expect_type<never>().not.to_assign_from<number>(),
    expect_type<never>().not.to_assign_from<unknown>(),
    expect_type<never>().to_assign_from<never>()
)

declare_test(
    "works for object",
    expect_type<{}>().to_assign_from<{}>(),
    expect_type<{}>().to_assign_from<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_assign_from<{ a: 1 }>(),
    expect_type<{ a: 1 }>().to_assign_from<{ a: 1; b: 2 }>(),
    expect_type<{ a: 1 }>().not.to_assign_from<{ a: 2 }>(),
    expect_type<{ a: 1 }>().not.to_assign_from<{ b: 1 }>()
)

declare_test(
    "works for array",
    expect_type<[1]>().to_assign_from<[1]>(),
    expect_type<[1]>().not.to_assign_from<[1, 2]>(),
    expect_type<[1, 2]>().not.to_assign_from<[1]>(),
    expect_type<[1, 2]>().to_assign_from<[1, 2]>(),
    expect_type<[1, 2?]>().to_assign_from<[1]>(),
    expect_type<[1]>().not.to_assign_from<[1, 2?]>()
)

declare_test(
    "works for function",
    expect_type<() => void>().to_assign_from<() => void>(),
    expect_type<() => void>().to_assign_from<() => string>(),
    expect_type<() => void>().to_assign_from<() => void>(),
    expect_type<() => void>().to_assign_from<() => string>()
)

declare_test(
    "works for disjunction type",
    expect_type<1 | 2>().to_assign_from<1 | 2>(),
    expect_type<1 | 2>().not.to_assign_from<1 | 3>(),
    expect_type<1 | 2>().to_assign_from<1>()
)

declare_test(
    "works for conjunction type",
    expect_type<{ a: 1 }>().to_assign_from<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_assign_from<{ a: 1 } & { b: 1 }>(),
    expect_type<{ a: 1 }>().to_assign_from<{ a: 1 } & { b: 1 }>()
)
