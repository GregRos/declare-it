import { declare_test } from "@lib/index"

// This checks the validity of the negation relations.
// So for each positive relation, we need to check the inverse errors
// we'll just do this exhaustive test here and use them interchangeably in the other tests

// To be exhaustive, we need to find the following combinations of types:
// A ⊂ B
// B ⊃ A
// A ∩ B = ∅
// A ≡ B
// A ≈ B ∧ A ≢ B
// never ⊂ 1
// 1 ⊂ unknown
// any
declare_test("A ⊂ B", expect => {
    expect.type<1>(t => t.to_subtype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_subtype<1 | 2>())

    expect.type<1>(t => t.not.to_equal<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_equal<1 | 2>())

    expect.type<1>(t => t.not.to_supertype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_supertype<1 | 2>())

    expect.type<1>(t => t.to_strictly_subtype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_strictly_subtype<1 | 2>())

    expect.type<1>(t => t.not.to_strictly_supertype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_supertype<1 | 2>())

    expect.type<1>(t => t.not.to_resemble<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_resemble<1 | 2>())
})

// Now check the reverse:
declare_test("B ⊃ A", expect => {
    expect.type<1 | 2>(t => t.not.to_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.to_subtype<1>())

    expect.type<1 | 2>(t => t.not.to_equal<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.to_equal<1>())

    expect.type<1 | 2>(t => t.to_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.not.to_supertype<1>())

    expect.type<1 | 2>(t => t.not.to_strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.to_strictly_subtype<1>())

    expect.type<1 | 2>(t => t.to_strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.not.to_strictly_supertype<1>())

    expect.type<1 | 2>(t => t.not.to_resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(t => t.to_resemble<1>())
})

declare_test("A ∩ B = ∅", expect => {
    expect.type<1>(t => t.not.to_subtype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_subtype<2>())

    expect.type<1>(t => t.not.to_equal<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_equal<2>())

    expect.type<1>(t => t.not.to_supertype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_supertype<2>())

    expect.type<1>(t => t.not.to_strictly_subtype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_subtype<2>())

    expect.type<1>(t => t.not.to_strictly_supertype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_supertype<2>())

    expect.type<1>(t => t.not.to_resemble<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_resemble<2>())
})

declare_test("A ≡ B", expect => {
    expect.type<1>(t => t.to_equal<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_equal<1>())

    expect.type<1>(t => t.to_resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_resemble<1>())

    expect.type<1>(t => t.to_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_subtype<1>())

    expect.type<1>(t => t.to_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_supertype<1>())

    expect.type<1>(t => t.not.to_strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_subtype<1>())

    expect.type<1>(t => t.not.to_strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_supertype<1>())
})

declare_test("A ≈ B ∧ A ≢ B ∧ A ⊂ B", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect.type<A>(t => t.to_resemble<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.not.to_resemble<B>())

    expect.type<A>(t => t.not.to_equal<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.to_equal<B>())

    expect.type<A>(t => t.to_subtype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.not.to_subtype<B>())

    expect.type<A>(t => t.to_supertype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.not.to_supertype<B>())

    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.to_strictly_subtype<B>())

    expect.type<A>(t => t.not.to_strictly_supertype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(t => t.to_strictly_supertype<B>())
})

declare_test("never ⊂ 1", expect => {
    expect.type<never>(t => t.to_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.not.to_subtype<1>())

    expect.type<never>(t => t.not.to_equal<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.to_equal<1>())

    expect.type<never>(t => t.not.to_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.to_supertype<1>())

    expect.type<never>(t => t.to_strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.not.to_strictly_subtype<1>())

    expect.type<never>(t => t.not.to_strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.to_strictly_supertype<1>())

    expect.type<never>(t => t.not.to_resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(t => t.to_resemble<1>())
})

declare_test("1 ⊂ unknown", expect => {
    expect.type<1>(t => t.to_subtype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_subtype<unknown>())

    expect.type<1>(t => t.not.to_equal<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_equal<unknown>())

    expect.type<1>(t => t.not.to_supertype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_supertype<unknown>())

    expect.type<1>(t => t.to_strictly_subtype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.not.to_strictly_subtype<unknown>())

    expect.type<1>(t => t.not.to_strictly_supertype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_strictly_supertype<unknown>())

    expect.type<1>(t => t.not.to_resemble<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(t => t.to_resemble<unknown>())
})

declare_test("any ⊈ never", expect => {
    expect.type<any>(t => t.not.to_subtype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_subtype<never>())

    expect.type<any>(t => t.not.to_equal<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_equal<never>())

    expect.type<any>(t => t.not.to_supertype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_supertype<never>())

    expect.type<any>(t => t.not.to_strictly_subtype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_strictly_subtype<never>())

    expect.type<any>(t => t.not.to_strictly_supertype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_strictly_supertype<never>())

    expect.type<any>(t => t.not.to_resemble<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_resemble<never>())
})

declare_test("any ≉ any", expect => {
    expect.type<any>(t => t.not.to_equal<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_equal<any>())
    expect.type<any>(t => t.not.to_resemble<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_resemble<any>())

    expect.type<any>(t => t.not.to_subtype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_subtype<any>())

    expect.type<any>(t => t.not.to_supertype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_supertype<any>())

    expect.type<any>(t => t.not.to_strictly_subtype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_strictly_subtype<any>())

    expect.type<any>(t => t.not.to_strictly_supertype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(t => t.to_strictly_supertype<any>())
})
