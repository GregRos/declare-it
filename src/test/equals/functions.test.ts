import { declare_test, expect_type } from "@lib"
declare_test(
    "does not check parameter names",
    expect_type<(a: 1) => void>().to_equal<(b: 1) => void>()
)

declare_test(
    "checks parameter order",
    expect_type<(a: 1, b: 2) => void>().not.to_equal<(b: 2, a: 1) => void>()
)

declare_test(
    "checks parameter types",
    expect_type<(a: 1) => void>().not.to_equal<(a: 2) => void>(),
    // @ts-expect-error
    expect_type<(a: 1) => void>().to_equal<(a: 2) => void>()
)

declare_test(
    "checks return type",
    expect_type<() => 1>().not.to_equal<() => 2>(),
    // @ts-expect-error
    expect_type<() => 1>().to_equal<() => 2>()
)

declare_test(
    "checks this parameter",
    expect_type<(this: string) => void>().not.to_equal<(this: number) => void>()
)

declare_test(
    "doesn't tell call signature from function type",
    expect_type<() => void>().to_equal<{ (): void }>()
)

declare_test(
    "tells optional parameter from disjunction with undefined",
    expect_type<(a?: 1) => void>().not.to_equal<(a: 1 | undefined) => void>(),
    expect_type<(a?: 1) => void>().to_equal<(a?: 1 | undefined) => void>()
)

declare_test(
    "tells apart Function and specific function types, even with any",
    expect_type<Function>().not.to_equal<() => void>(),
    expect_type<Function>().not.to_equal<(...x: any) => any>(),
    expect_type<Function>().to_equal<Function>()
)

declare_test(
    "checks rest parameter",
    expect_type<(...a: 1[]) => void>().to_equal<(...a: 1[]) => void>(),
    expect_type<(...a: 1[]) => void>().not.to_equal<(...a: 2[]) => void>(),
    // @ts-expect-error
    expect_type<(...a: 1[]) => void>().to_equal<(...a: 2[]) => void>(),
    // @ts-expect-error
    expect_type<(...a: 1[]) => void>().not.to_equal<(...a: 1) => void>()
)
