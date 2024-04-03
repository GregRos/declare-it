import { declare_test, expect_type } from "@lib"

declare_test(
    "FALSE NEGATIVE: Object intersection and resulting object not equal",
    expect_type<{ a: 1 } & { b: 1 }>().not.to_equal<{ a: 1; b: 1 }>()
)

declare_test(
    "FALSE NEGATIVE: Disjunction between identical object types not equal to type",
    expect_type<{ a: 1 } | { a: 1 }>().not.to_equal<{ a: 1 }>()
)

declare_test(
    "FALSE NEGATIVE: Conjunction between identical object types not equal to type",
    expect_type<{ a: 1 } & { a: 1 }>().not.to_equal<{ a: 1 }>()
)

declare_test(
    "FALSE NEGATIVE: Multiple identical call signatures and function type not equal",
    expect_type<() => void>().not.to_equal<{ (): void; (): void }>()
)

declare_test(
    "FALSE POSITIVE: Assumes intersection order doesn't matter for call signature types",
    expect_type<{ (): 1 } & { (): 2 }>().to_equal<{ (): 2 } & { (): 1 }>()
)
