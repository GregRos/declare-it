import { declare_test, expect_type } from "@lib/index"

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
declare_test("A ⊂ B", check => {
    check = expect_type<1>().to_subtype<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_subtype<1 | 2>()

    check = expect_type<1>().not.to_equal<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_equal<1 | 2>()

    check = expect_type<1>().not.to_supertype<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_supertype<1 | 2>()

    check = expect_type<1>().to_strictly_subtype<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_strictly_subtype<1 | 2>()

    check = expect_type<1>().not.to_strictly_supertype<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_supertype<1 | 2>()

    check = expect_type<1>().not.to_resemble<1 | 2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_resemble<1 | 2>()
})

// Now check the reverse:
declare_test("B ⊃ A", check => {
    check = expect_type<1 | 2>().not.to_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().to_subtype<1>()

    check = expect_type<1 | 2>().not.to_equal<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().to_equal<1>()

    check = expect_type<1 | 2>().to_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().not.to_supertype<1>()

    check = expect_type<1 | 2>().not.to_strictly_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().to_strictly_subtype<1>()

    check = expect_type<1 | 2>().to_strictly_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().not.to_strictly_supertype<1>()

    check = expect_type<1 | 2>().not.to_resemble<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1 | 2>().to_resemble<1>()
})

declare_test("A ∩ B = ∅", check => {
    check = expect_type<1>().not.to_subtype<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_subtype<2>()

    check = expect_type<1>().not.to_equal<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_equal<2>()

    check = expect_type<1>().not.to_supertype<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_supertype<2>()

    check = expect_type<1>().not.to_strictly_subtype<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_subtype<2>()

    check = expect_type<1>().not.to_strictly_supertype<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_supertype<2>()

    check = expect_type<1>().not.to_resemble<2>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_resemble<2>()
})

declare_test("A ≡ B", check => {
    check = expect_type<1>().to_equal<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_equal<1>()

    check = expect_type<1>().to_resemble<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_resemble<1>()

    check = expect_type<1>().to_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_subtype<1>()

    check = expect_type<1>().to_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_supertype<1>()

    check = expect_type<1>().not.to_strictly_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_subtype<1>()

    check = expect_type<1>().not.to_strictly_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_supertype<1>()
})

declare_test("A ≈ B ∧ A ≢ B ∧ A ⊂ B", check => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    check = expect_type<A>().to_resemble<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().not.to_resemble<B>()

    check = expect_type<A>().not.to_equal<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().to_equal<B>()

    check = expect_type<A>().to_subtype<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().not.to_subtype<B>()

    check = expect_type<A>().to_supertype<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().not.to_supertype<B>()

    check = expect_type<A>().not.to_strictly_subtype<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().to_strictly_subtype<B>()

    check = expect_type<A>().not.to_strictly_supertype<B>()
    // @ts-expect-error inverse error check
    check = expect_type<A>().to_strictly_supertype<B>()
})

declare_test("never ⊂ 1", check => {
    check = expect_type<never>().to_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().not.to_subtype<1>()

    check = expect_type<never>().not.to_equal<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().to_equal<1>()

    check = expect_type<never>().not.to_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().to_supertype<1>()

    check = expect_type<never>().to_strictly_subtype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().not.to_strictly_subtype<1>()

    check = expect_type<never>().not.to_strictly_supertype<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().to_strictly_supertype<1>()

    check = expect_type<never>().not.to_resemble<1>()
    // @ts-expect-error inverse error check
    check = expect_type<never>().to_resemble<1>()
})

declare_test("1 ⊂ unknown", check => {
    check = expect_type<1>().to_subtype<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_subtype<unknown>()

    check = expect_type<1>().not.to_equal<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_equal<unknown>()

    check = expect_type<1>().not.to_supertype<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_supertype<unknown>()

    check = expect_type<1>().to_strictly_subtype<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().not.to_strictly_subtype<unknown>()

    check = expect_type<1>().not.to_strictly_supertype<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_strictly_supertype<unknown>()

    check = expect_type<1>().not.to_resemble<unknown>()
    // @ts-expect-error inverse error check
    check = expect_type<1>().to_resemble<unknown>()
})

declare_test("any ⊈ never", check => {
    check = expect_type<any>().not.to_subtype<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_subtype<never>()

    check = expect_type<any>().not.to_equal<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_equal<never>()

    check = expect_type<any>().not.to_supertype<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_supertype<never>()

    check = expect_type<any>().not.to_strictly_subtype<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_strictly_subtype<never>()

    check = expect_type<any>().not.to_strictly_supertype<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_strictly_supertype<never>()

    check = expect_type<any>().not.to_resemble<never>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_resemble<never>()
})

declare_test("any ≉ any", check => {
    check = expect_type<any>().not.to_equal<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_equal<any>()
    check = expect_type<any>().not.to_resemble<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_resemble<any>()

    check = expect_type<any>().not.to_subtype<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_subtype<any>()

    check = expect_type<any>().not.to_supertype<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_supertype<any>()

    check = expect_type<any>().not.to_strictly_subtype<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_strictly_subtype<any>()

    check = expect_type<any>().not.to_strictly_supertype<any>()
    // @ts-expect-error inverse error check
    check = expect_type<any>().to_strictly_supertype<any>()
})
