import { declare_test, expect_type } from "@lib.js"

declare_test("checks object", expect_type<{ a: 1 }>().to_equal<{ a: 1 }>())

declare_test(
    "checks object with multiple keys",
    expect_type<{ a: 1; b: 2 }>().to_equal<{ a: 1; b: 2 }>()
)

declare_test(
    "checks object with different key types",
    expect_type<{ a: 1; b: "2" }>().to_equal<{ a: 1; b: "2" }>()
)

declare_test(
    "checks readonly key",
    expect_type<{ readonly a: 1 }>().not.to_equal<{ a: 1 }>(),
    // @ts-expect-error
    expect_type<{ readonly a: 1 }>().to_equal<{ a: 1 }>()
)

declare_test(
    "checks optional key",
    expect_type<{ a?: 1 }>().not.to_equal<{ a: 1 }>(),
    // @ts-expect-error
    expect_type<{ a?: 1 }>().to_equal<{ a: 1 }>()
)

declare_test(
    "does not check key order",
    expect_type<{ a: 1; b: 2 }>().to_equal<{ b: 2; a: 1 }>(),
    // @ts-expect-error
    expect_type<{ a: 1; b: 2 }>().not.to_equal<{ b: 2; a: 1 }>()
)

declare_test(
    "does not check number vs numeric keys",
    expect_type<{ 1: 1 }>().to_equal<{ "1": 1 }>()
)

declare_test(
    "does not check disjunction order",
    expect_type<{ a: 1 } | { b: 2 }>().to_equal<{ b: 2 } | { a: 1 }>(),
    // @ts-expect-error
    expect_type<{ a: 1 } | { b: 2 }>().not.to_equal<{ b: 2 } | { a: 1 }>()
)

declare_test(
    "does not check intersection order",
    expect_type<{ a: 1 } & { b: 2 }>().to_equal<{ b: 2 } & { a: 1 }>(),
    // @ts-expect-error
    expect_type<{ a: 1 } & { b: 2 }>().not.to_equal<{ b: 2 } & { a: 1 }>()
)

declare_test(
    "doesn't tell method from function property.js",
    expect_type<{ a(): void }>().to_equal<{ a: () => void }>()
)
declare_test(
    "doesn't tell generic method from function property.js",
    expect_type<{ a<T>(): void }>().to_equal<{ a: <T>() => void }>()
)
