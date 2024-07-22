import { declare_test } from "@lib/index"

declare_test("{a: 1} ≡ {a: 1}", expect => {
    expect = expect_type<{ a: 1 }>().to_equal<{ a: 1 }>()
    expect = expect_type<{ a: 1 }>().to_resemble<{ a: 1 }>()
    expect = expect_type<{ a: 1 }>().to_subtype<{ a: 1 }>()
    expect = expect_type<{ a: 1 }>().to_supertype<{ a: 1 }>()
    expect = expect_type<{ a: 1 }>().not.to_strictly_subtype<{ a: 1 }>()
    expect = expect_type<{ a: 1 }>().not.to_strictly_supertype<{ a: 1 }>()
})

declare_test("{a: 1; b: 2} ⊂ {a: 1}", expect => {
    expect = expect_type<{ a: 1; b: 2 }>().to_subtype<{ a: 1 }>()
    expect = expect_type<{ a: 1; b: 2 }>().not.to_supertype<{ a: 1 }>()
    expect = expect_type<{ a: 1; b: 2 }>().not.to_strictly_supertype<{ a: 1 }>()
    expect = expect_type<{ a: 1; b: 2 }>().to_strictly_subtype<{ a: 1 }>()
    expect = expect_type<{ a: 1; b: 2 }>().not.to_resemble<{ a: 1 }>()
    expect = expect_type<{ a: 1; b: 2 }>().not.to_equal<{ a: 1 }>()
})

declare_test("{a: 1; b: 2} ≡ {b: 2; a: 1}", expect => {
    type KeyOrder1 = { a: 1; b: 2 }
    type KeyOrder2 = { b: 2; a: 1 }
    expect = expect_type<KeyOrder1>().to_equal<KeyOrder2>()
    expect = expect_type<KeyOrder1>().to_resemble<KeyOrder2>()
    expect = expect_type<KeyOrder1>().to_subtype<KeyOrder2>()
    expect = expect_type<KeyOrder1>().to_supertype<KeyOrder2>()
    expect = expect_type<KeyOrder1>().not.to_strictly_subtype<KeyOrder2>()
    expect = expect_type<KeyOrder1>().not.to_strictly_supertype<KeyOrder2>()
})

declare_test("FALSE POSITIVE: {a: 1} ≈ {readonly a: 1}", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("{a: 1 | undefined} ⊂ {a?: 1}", expect => {
    type A = { a?: 1 }
    type B = { a: 1 | undefined }
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().not.to_resemble<B>()
    expect = expect_type<A>().not.to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().to_strictly_supertype<B>()
})

declare_test("{a(): 1} ≡ {a: () => 1}", expect => {
    type A = { a(): 1 }
    type B = { a: () => 1 }
    expect = expect_type<A>().to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("{a<T>(): 1} ≡ {a: <T>() => 1}", expect => {
    type A = { a<T>(): 1 }
    type B = { a: <T>() => 1 }
    expect = expect_type<A>().to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("{1: 1} ≡ {'1': 1}", expect => {
    type A = { 1: 1 }
    type B = { "1": 1 }
    expect = expect_type<A>().to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 1} ≢ {a: 1}", expect => {
    type A = { a: 1 } | { a: 1 }
    type B = { a: 1 }
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("Object conjunction order ignored", expect => {
    type A = { a: 1 }
    type B = { b: 1 }
    expect = expect_type<A & B>().to_equal<B & A>()
    expect = expect_type<A & B>().to_resemble<B & A>()
    expect = expect_type<A & B>().to_subtype<B & A>()
    expect = expect_type<A & B>().to_supertype<B & A>()
    expect = expect_type<A & B>().not.to_strictly_subtype<B & A>()
    expect = expect_type<A & B>().not.to_strictly_supertype<B & A>()
})

declare_test("FALSE NEGATIVE≡: {a: 1} & {b: 2} ≢ {a: 1; b: 2}", expect => {
    type A = { a: 1 } & { b: 2 }
    type B = { a: 1; b: 2 }
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("Disjunction order ignored", expect => {
    expect = expect_type<1 | 2>().to_equal<2 | 1>()
    expect = expect_type<1 | 2>().to_resemble<2 | 1>()
    expect = expect_type<1 | 2>().to_subtype<2 | 1>()
    expect = expect_type<1 | 2>().to_supertype<2 | 1>()
    expect = expect_type<1 | 2>().not.to_strictly_subtype<2 | 1>()
    expect = expect_type<1 | 2>().not.to_strictly_supertype<2 | 1>()
})

declare_test("recursive object", expect => {
    type A = { a: A }
    type B = { a: B }
    expect = expect_type<A>().to_equal<B>()
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 2} ≢ {a: 1 | 2}", expect => {
    type A = { a: 1 } | { a: 2 }
    type B = { a: 1 | 2 }
    expect = expect_type<A>().to_resemble<B>()
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().to_supertype<B>()
    expect = expect_type<A>().not.to_strictly_subtype<B>()
    expect_type<A>().not.to_strictly_supertype<B>()
})

declare_test("{a: 1; b: 2} | {a: 2; b: 1} ⊂ {a: 1 | 2; b: 1 | 2}", expect => {
    type A = { a: 1; b: 2 } | { a: 2; b: 1 }
    type B = { a: 1 | 2; b: 1 | 2 }

    expect = expect_type<A>().not.to_resemble<B>()
    expect = expect_type<A>().not.to_equal<B>()
    expect = expect_type<A>().to_subtype<B>()
    expect = expect_type<A>().not.to_supertype<B>()
    expect = expect_type<A>().to_strictly_subtype<B>()
    expect = expect_type<A>().not.to_strictly_supertype<B>()
})
