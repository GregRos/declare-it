import { declare_test } from "@lib/index"

declare_test("{a: 1} ≡ {a: 1}", expect => {
    expect.type<{ a: 1 }>(t => t.to_equal<{ a: 1 }>())
    expect.type<{ a: 1 }>(t => t.to_resemble<{ a: 1 }>())
    expect.type<{ a: 1 }>(t => t.to_subtype<{ a: 1 }>())
    expect.type<{ a: 1 }>(t => t.to_supertype<{ a: 1 }>())
    expect.type<{ a: 1 }>(t => t.not.to_strictly_subtype<{ a: 1 }>())
    expect.type<{ a: 1 }>(t => t.not.to_strictly_supertype<{ a: 1 }>())
})

declare_test("{a: 1; b: 2} ⊂ {a: 1}", expect => {
    expect.type<{ a: 1; b: 2 }>(t => t.to_subtype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(t => t.not.to_supertype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(t => t.not.to_strictly_supertype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(t => t.to_strictly_subtype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(t => t.not.to_resemble<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(t => t.not.to_equal<{ a: 1 }>())
})

declare_test("{a: 1; b: 2} ≡ {b: 2; a: 1}", expect => {
    type KeyOrder1 = { a: 1; b: 2 }
    type KeyOrder2 = { b: 2; a: 1 }
    expect.type<KeyOrder1>(t => t.to_equal<KeyOrder2>())
    expect.type<KeyOrder1>(t => t.to_resemble<KeyOrder2>())
    expect.type<KeyOrder1>(t => t.to_subtype<KeyOrder2>())
    expect.type<KeyOrder1>(t => t.to_supertype<KeyOrder2>())
    expect.type<KeyOrder1>(t => t.not.to_strictly_subtype<KeyOrder2>())
    expect.type<KeyOrder1>(t => t.not.to_strictly_supertype<KeyOrder2>())
})

declare_test("FALSE POSITIVE: {a: 1} ≈ {readonly a: 1}", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("{a: 1 | undefined} ⊂ {a?: 1}", expect => {
    type A = { a?: 1 }
    type B = { a: 1 | undefined }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.to_strictly_supertype<B>())
})

declare_test("{a(): 1} ≡ {a: () => 1}", expect => {
    type A = { a(): 1 }
    type B = { a: () => 1 }
    expect.type<A>(t => t.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("{a<T>(): 1} ≡ {a: <T>() => 1}", expect => {
    type A = { a<T>(): 1 }
    type B = { a: <T>() => 1 }
    expect.type<A>(t => t.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("{1: 1} ≡ {'1': 1}", expect => {
    type A = { 1: 1 }
    type B = { "1": 1 }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.not.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 1} ≢ {a: 1}", expect => {
    type A = { a: 1 } | { a: 1 }
    type B = { a: 1 }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("Object conjunction order ignored", expect => {
    type A = { a: 1 }
    type B = { b: 1 }
    expect.type<A & B>(t => t.to_equal<B & A>())
    expect.type<A & B>(t => t.to_resemble<B & A>())
    expect.type<A & B>(t => t.to_subtype<B & A>())
    expect.type<A & B>(t => t.to_supertype<B & A>())
    expect.type<A & B>(t => t.not.to_strictly_subtype<B & A>())
    expect.type<A & B>(t => t.not.to_strictly_supertype<B & A>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} & {b: 2} ≢ {a: 1; b: 2}", expect => {
    type A = { a: 1 } & { b: 2 }
    type B = { a: 1; b: 2 }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("Disjunction order ignored", expect => {
    expect.type<1 | 2>(t => t.to_equal<2 | 1>())
    expect.type<1 | 2>(t => t.to_resemble<2 | 1>())
    expect.type<1 | 2>(t => t.to_subtype<2 | 1>())
    expect.type<1 | 2>(t => t.to_supertype<2 | 1>())
    expect.type<1 | 2>(t => t.not.to_strictly_subtype<2 | 1>())
    expect.type<1 | 2>(t => t.not.to_strictly_supertype<2 | 1>())
})

declare_test("recursive object", expect => {
    type A = { a: A }
    type B = { a: B }
    expect.type<A>(t => t.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 2} ≢ {a: 1 | 2}", expect => {
    type A = { a: 1 } | { a: 2 }
    type B = { a: 1 | 2 }
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("{a: 1; b: 2} | {a: 2; b: 1} ⊂ {a: 1 | 2; b: 1 | 2}", expect => {
    type A = { a: 1; b: 2 } | { a: 2; b: 1 }
    type B = { a: 1 | 2; b: 1 | 2 }

    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.not.to_supertype<B>())
    expect.type<A>(t => t.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})
