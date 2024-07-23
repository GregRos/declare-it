import { declare_test } from "@lib/index"

declare_test("{a: 1} ≡ {a: 1}", expect => {
    expect.type<{ a: 1 }>(to => to.equal<{ a: 1 }>())
    expect.type<{ a: 1 }>(to => to.resemble<{ a: 1 }>())
    expect.type<{ a: 1 }>(to => to.subtype<{ a: 1 }>())
    expect.type<{ a: 1 }>(to => to.supertype<{ a: 1 }>())
    expect.type<{ a: 1 }>(to => to.not.strictly_subtype<{ a: 1 }>())
    expect.type<{ a: 1 }>(to => to.not.strictly_supertype<{ a: 1 }>())
})

declare_test("{a: 1; b: 2} ⊂ {a: 1}", expect => {
    expect.type<{ a: 1; b: 2 }>(to => to.subtype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(to => to.not.supertype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(to => to.not.strictly_supertype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(to => to.strictly_subtype<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(to => to.not.resemble<{ a: 1 }>())
    expect.type<{ a: 1; b: 2 }>(to => to.not.equal<{ a: 1 }>())
})

declare_test("{a: 1; b: 2} ≡ {b: 2; a: 1}", expect => {
    type KeyOrder1 = { a: 1; b: 2 }
    type KeyOrder2 = { b: 2; a: 1 }
    expect.type<KeyOrder1>(to => to.equal<KeyOrder2>())
    expect.type<KeyOrder1>(to => to.resemble<KeyOrder2>())
    expect.type<KeyOrder1>(to => to.subtype<KeyOrder2>())
    expect.type<KeyOrder1>(to => to.supertype<KeyOrder2>())
    expect.type<KeyOrder1>(to => to.not.strictly_subtype<KeyOrder2>())
    expect.type<KeyOrder1>(to => to.not.strictly_supertype<KeyOrder2>())
})

declare_test("FALSE POSITIVE: {a: 1} ≈ {readonly a: 1}", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("{a: 1 | undefined} ⊂ {a?: 1}", expect => {
    type A = { a?: 1 }
    type B = { a: 1 | undefined }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.strictly_supertype<B>())
})

declare_test("{a(): 1} ≡ {a: () => 1}", expect => {
    type A = { a(): 1 }
    type B = { a: () => 1 }
    expect.type<A>(to => to.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("{a<T>(): 1} ≡ {a: <T>() => 1}", expect => {
    type A = { a<T>(): 1 }
    type B = { a: <T>() => 1 }
    expect.type<A>(to => to.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("{1: 1} ≡ {'1': 1}", expect => {
    type A = { 1: 1 }
    type B = { "1": 1 }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 1} ≢ {a: 1}", expect => {
    type A = { a: 1 } | { a: 1 }
    type B = { a: 1 }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("Object conjunction order ignored", expect => {
    type A = { a: 1 }
    type B = { b: 1 }
    expect.type<A & B>(to => to.equal<B & A>())
    expect.type<A & B>(to => to.resemble<B & A>())
    expect.type<A & B>(to => to.subtype<B & A>())
    expect.type<A & B>(to => to.supertype<B & A>())
    expect.type<A & B>(to => to.not.strictly_subtype<B & A>())
    expect.type<A & B>(to => to.not.strictly_supertype<B & A>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} & {b: 2} ≢ {a: 1; b: 2}", expect => {
    type A = { a: 1 } & { b: 2 }
    type B = { a: 1; b: 2 }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("Disjunction order ignored", expect => {
    expect.type<1 | 2>(to => to.equal<2 | 1>())
    expect.type<1 | 2>(to => to.resemble<2 | 1>())
    expect.type<1 | 2>(to => to.subtype<2 | 1>())
    expect.type<1 | 2>(to => to.supertype<2 | 1>())
    expect.type<1 | 2>(to => to.not.strictly_subtype<2 | 1>())
    expect.type<1 | 2>(to => to.not.strictly_supertype<2 | 1>())
})

declare_test("recursive object", expect => {
    type A = { a: A }
    type B = { a: B }
    expect.type<A>(to => to.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("FALSE NEGATIVE≡: {a: 1} | {a: 2} ≢ {a: 1 | 2}", expect => {
    type A = { a: 1 } | { a: 2 }
    type B = { a: 1 | 2 }
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("{a: 1; b: 2} | {a: 2; b: 1} ⊂ {a: 1 | 2; b: 1 | 2}", expect => {
    type A = { a: 1; b: 2 } | { a: 2; b: 1 }
    type B = { a: 1 | 2; b: 1 | 2 }

    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.not.supertype<B>())
    expect.type<A>(to => to.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})
