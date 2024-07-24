import { declare, type } from "@lib/index"

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
declare.test("A ⊂ B", expect => {
    expect(type<1>).to_subtype(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_subtype(type<1 | 2>)

    expect(type<1>).not.to_equal(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_equal(type<1 | 2>)

    expect(type<1>).not.to_supertype(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_supertype(type<1 | 2>)

    expect(type<1>).to_strictly_subtype(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_strictly_subtype(type<1 | 2>)

    expect(type<1>).not.to_strictly_supertype(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_supertype(type<1 | 2>)

    expect(type<1>).not.to_resemble(type<1 | 2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_resemble(type<1 | 2>)
})

// Now check the reverse:
declare.test("B ⊃ A", expect => {
    expect(type<1 | 2>).not.to_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).to_subtype(type<1>)

    expect(type<1 | 2>).not.to_equal(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).to_equal(type<1>)

    expect(type<1 | 2>).to_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).not.to_supertype(type<1>)

    expect(type<1 | 2>).not.to_strictly_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).to_strictly_subtype(type<1>)

    expect(type<1 | 2>).to_strictly_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).not.to_strictly_supertype(type<1>)

    expect(type<1 | 2>).not.to_resemble(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1 | 2>).to_resemble(type<1>)
})

declare.test("A ∩ B = ∅", expect => {
    expect(type<1>).not.to_subtype(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_subtype(type<2>)

    expect(type<1>).not.to_equal(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_equal(type<2>)

    expect(type<1>).not.to_supertype(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_supertype(type<2>)

    expect(type<1>).not.to_strictly_subtype(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_subtype(type<2>)

    expect(type<1>).not.to_strictly_supertype(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_supertype(type<2>)

    expect(type<1>).not.to_resemble(type<2>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_resemble(type<2>)
})

declare.test("A ≡ B", expect => {
    expect(type<1>).to_equal(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_equal(type<1>)

    expect(type<1>).to_resemble(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_resemble(type<1>)

    expect(type<1>).to_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_subtype(type<1>)

    expect(type<1>).to_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_supertype(type<1>)

    expect(type<1>).not.to_strictly_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_subtype(type<1>)

    expect(type<1>).not.to_strictly_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_supertype(type<1>)
})

declare.test("A ≈ B ∧ A ≢ B ∧ A ⊂ B", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect(type<A>).to_resemble(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).not.to_resemble(type<B>)

    expect(type<A>).not.to_equal(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).to_equal(type<B>)

    expect(type<A>).to_subtype(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).not.to_subtype(type<B>)

    expect(type<A>).to_supertype(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).not.to_supertype(type<B>)

    expect(type<A>).not.to_strictly_subtype(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).to_strictly_subtype(type<B>)

    expect(type<A>).not.to_strictly_supertype(type<B>)
    // @ts-expect-error inverse error check
    expect(type<A>).to_strictly_supertype(type<B>)
})

declare.test("never ⊂ 1", expect => {
    expect(type<never>).to_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).not.to_subtype(type<1>)

    expect(type<never>).not.to_equal(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).to_equal(type<1>)

    expect(type<never>).not.to_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).to_supertype(type<1>)

    expect(type<never>).to_strictly_subtype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).not.to_strictly_subtype(type<1>)

    expect(type<never>).not.to_strictly_supertype(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).to_strictly_supertype(type<1>)

    expect(type<never>).not.to_resemble(type<1>)
    // @ts-expect-error inverse error check
    expect(type<never>).to_resemble(type<1>)
})

declare.test("1 ⊂ unknown", expect => {
    expect(type<1>).to_subtype(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_subtype(type<unknown>)

    expect(type<1>).not.to_equal(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_equal(type<unknown>)

    expect(type<1>).not.to_supertype(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_supertype(type<unknown>)

    expect(type<1>).to_strictly_subtype(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).not.to_strictly_subtype(type<unknown>)

    expect(type<1>).not.to_strictly_supertype(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_strictly_supertype(type<unknown>)

    expect(type<1>).not.to_resemble(type<unknown>)
    // @ts-expect-error inverse error check
    expect(type<1>).to_resemble(type<unknown>)
})

declare.test("any ⊈ never", expect => {
    expect(type<any>).not.to_subtype(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_subtype(type<never>)
    expect(type<any>).not.to_equal(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_equal(type<never>)

    expect(type<any>).not.to_supertype(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_supertype(type<never>)

    expect(type<any>).not.to_strictly_subtype(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_strictly_subtype(type<never>)

    expect(type<any>).not.to_strictly_supertype(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_strictly_supertype(type<never>)

    expect(type<any>).not.to_resemble(type<never>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_resemble(type<never>)
})

declare.test("any ≉ any", expect => {
    expect(type<any>).to_equal(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).not.to_equal(type<any>)
    expect(type<any>).to_resemble(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).not.to_resemble(type<any>)

    expect(type<any>).to_subtype(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).not.to_subtype(type<any>)

    expect(type<any>).to_supertype(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).not.to_supertype(type<any>)

    expect(type<any>).not.to_strictly_subtype(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_strictly_subtype(type<any>)

    expect(type<any>).not.to_strictly_supertype(type<any>)
    // @ts-expect-error inverse error check
    expect(type<any>).to_strictly_supertype(type<any>)
})
