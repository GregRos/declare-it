import { declare } from "@lib/index"

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
    expect.type<1>(to => to.subtype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.subtype<1 | 2>())

    expect.type<1>(to => to.not.equal<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.equal<1 | 2>())

    expect.type<1>(to => to.not.supertype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.supertype<1 | 2>())

    expect.type<1>(to => to.strictly_subtype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.strictly_subtype<1 | 2>())

    expect.type<1>(to => to.not.strictly_supertype<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_supertype<1 | 2>())

    expect.type<1>(to => to.not.resemble<1 | 2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.resemble<1 | 2>())
})

// Now check the reverse:
declare.test("B ⊃ A", expect => {
    expect.type<1 | 2>(to => to.not.subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.subtype<1>())

    expect.type<1 | 2>(to => to.not.equal<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.equal<1>())

    expect.type<1 | 2>(to => to.supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.not.supertype<1>())

    expect.type<1 | 2>(to => to.not.strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.strictly_subtype<1>())

    expect.type<1 | 2>(to => to.strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.not.strictly_supertype<1>())

    expect.type<1 | 2>(to => to.not.resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<1 | 2>(to => to.resemble<1>())
})

declare.test("A ∩ B = ∅", expect => {
    expect.type<1>(to => to.not.subtype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.subtype<2>())

    expect.type<1>(to => to.not.equal<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.equal<2>())

    expect.type<1>(to => to.not.supertype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.supertype<2>())

    expect.type<1>(to => to.not.strictly_subtype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_subtype<2>())

    expect.type<1>(to => to.not.strictly_supertype<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_supertype<2>())

    expect.type<1>(to => to.not.resemble<2>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.resemble<2>())
})

declare.test("A ≡ B", expect => {
    expect.type<1>(to => to.equal<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.equal<1>())

    expect.type<1>(to => to.resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.resemble<1>())

    expect.type<1>(to => to.subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.subtype<1>())

    expect.type<1>(to => to.supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.supertype<1>())

    expect.type<1>(to => to.not.strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_subtype<1>())

    expect.type<1>(to => to.not.strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_supertype<1>())
})

declare.test("A ≈ B ∧ A ≢ B ∧ A ⊂ B", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect.type<A>(to => to.resemble<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.not.resemble<B>())

    expect.type<A>(to => to.not.equal<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.equal<B>())

    expect.type<A>(to => to.subtype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.not.subtype<B>())

    expect.type<A>(to => to.supertype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.not.supertype<B>())

    expect.type<A>(to => to.not.strictly_subtype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.strictly_subtype<B>())

    expect.type<A>(to => to.not.strictly_supertype<B>())
    // @ts-expect-error inverse error check
    expect.type<A>(to => to.strictly_supertype<B>())
})

declare.test("never ⊂ 1", expect => {
    expect.type<never>(to => to.subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.not.subtype<1>())

    expect.type<never>(to => to.not.equal<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.equal<1>())

    expect.type<never>(to => to.not.supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.supertype<1>())

    expect.type<never>(to => to.strictly_subtype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.not.strictly_subtype<1>())

    expect.type<never>(to => to.not.strictly_supertype<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.strictly_supertype<1>())

    expect.type<never>(to => to.not.resemble<1>())
    // @ts-expect-error inverse error check
    expect.type<never>(to => to.resemble<1>())
})

declare.test("1 ⊂ unknown", expect => {
    expect.type<1>(to => to.subtype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.subtype<unknown>())

    expect.type<1>(to => to.not.equal<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.equal<unknown>())

    expect.type<1>(to => to.not.supertype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.supertype<unknown>())

    expect.type<1>(to => to.strictly_subtype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.not.strictly_subtype<unknown>())

    expect.type<1>(to => to.not.strictly_supertype<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.strictly_supertype<unknown>())

    expect.type<1>(to => to.not.resemble<unknown>())
    // @ts-expect-error inverse error check
    expect.type<1>(to => to.resemble<unknown>())
})

declare.test("any ⊈ never", expect => {
    expect.type<any>(to => to.not.subtype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.subtype<never>())

    expect.type<any>(to => to.not.equal<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.equal<never>())

    expect.type<any>(to => to.not.supertype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.supertype<never>())

    expect.type<any>(to => to.not.strictly_subtype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.strictly_subtype<never>())

    expect.type<any>(to => to.not.strictly_supertype<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.strictly_supertype<never>())

    expect.type<any>(to => to.not.resemble<never>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.resemble<never>())
})

declare.test("any ≉ any", expect => {
    expect.type<any>(to => to.equal<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.not.equal<any>())
    expect.type<any>(to => to.resemble<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.not.resemble<any>())

    expect.type<any>(to => to.subtype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.not.subtype<any>())

    expect.type<any>(to => to.supertype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.not.supertype<any>())

    expect.type<any>(to => to.not.strictly_subtype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.strictly_subtype<any>())

    expect.type<any>(to => to.not.strictly_supertype<any>())
    // @ts-expect-error inverse error check
    expect.type<any>(to => to.strictly_supertype<any>())
})
