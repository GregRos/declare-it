import { declare, type } from "@lib/index"

declare.test("{a: 1} ≡ {a: 1}", expect => {
    expect(type<{ a: 1 }>).to_equal(type<{ a: 1 }>)
    expect(type<{ a: 1 }>).to_resemble(type<{ a: 1 }>)
    expect(type<{ a: 1 }>).to_subtype(type<{ a: 1 }>)
    expect(type<{ a: 1 }>).to_supertype(type<{ a: 1 }>)
    expect(type<{ a: 1 }>).not.to_strictly_subtype(type<{ a: 1 }>)
    expect(type<{ a: 1 }>).not.to_strictly_supertype(type<{ a: 1 }>)
})

declare.test("{a: 1; b: 2} ⊂ {a: 1}", expect => {
    expect(type<{ a: 1; b: 2 }>).to_subtype(type<{ a: 1 }>)
    expect(type<{ a: 1; b: 2 }>).not.to_supertype(type<{ a: 1 }>)
    expect(type<{ a: 1; b: 2 }>).not.to_strictly_supertype(type<{ a: 1 }>)
    expect(type<{ a: 1; b: 2 }>).to_strictly_subtype(type<{ a: 1 }>)
    expect(type<{ a: 1; b: 2 }>).not.to_resemble(type<{ a: 1 }>)
    expect(type<{ a: 1; b: 2 }>).not.to_equal(type<{ a: 1 }>)
})

declare.test("{a: 1; b: 2} ≡ {b: 2; a: 1}", expect => {
    type KeyOrder1 = { a: 1; b: 2 }
    type KeyOrder2 = { b: 2; a: 1 }
    expect(type<KeyOrder1>).to_equal(type<KeyOrder2>)
    expect(type<KeyOrder1>).to_resemble(type<KeyOrder2>)
    expect(type<KeyOrder1>).to_subtype(type<KeyOrder2>)
    expect(type<KeyOrder1>).to_supertype(type<KeyOrder2>)
    expect(type<KeyOrder1>).not.to_strictly_subtype(type<KeyOrder2>)
    expect(type<KeyOrder1>).not.to_strictly_supertype(type<KeyOrder2>)
})

declare.test("FALSE POSITIVE: {a: 1} ≈ {readonly a: 1}", expect => {
    type A = { a: 1 }
    type B = { readonly a: 1 }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("{a: 1 | undefined} ⊂ {a?: 1}", expect => {
    type A = { a?: 1 }
    type B = { a: 1 | undefined }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).to_strictly_supertype(type<B>)
})

declare.test("{a(): 1} ≡ {a: () => 1}", expect => {
    type A = { a(): 1 }
    type B = { a: () => 1 }
    expect(type<A>).to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("{a<T>(): 1} ≡ {a: <T>() => 1}", expect => {
    type A = { a<T>(): 1 }
    type B = { a: <T>() => 1 }
    expect(type<A>).to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("{1: 1} ≡ {'1': 1}", expect => {
    type A = { 2: 2 }
    type B = { "2": 2 }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("FALSE NEGATIVE≡: {a: 1} | {a: 1} ≢ {a: 1}", expect => {
    type A = { a: 1 } | { a: 1 }
    type B = { a: 1 }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("Object conjunction order ignored", expect => {
    type A = { a: 1 }
    type B = { b: 1 }
    expect(type<A & B>).to_equal(type<B & A>)
    expect(type<A & B>).to_resemble(type<B & A>)
    expect(type<A & B>).to_subtype(type<B & A>)
    expect(type<A & B>).to_supertype(type<B & A>)
    expect(type<A & B>).not.to_strictly_subtype(type<B & A>)
    expect(type<A & B>).not.to_strictly_supertype(type<B & A>)
})

declare.test("FALSE NEGATIVE≡: {a: 1} & {b: 2} ≢ {a: 1; b: 2}", expect => {
    type A = { a: 1 } & { b: 2 }
    type B = { a: 1; b: 2 }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("Disjunction order ignored", expect => {
    expect(type<1 | 2>).to_equal(type<2 | 1>)
    expect(type<1 | 2>).to_resemble(type<2 | 1>)
    expect(type<1 | 2>).to_subtype(type<2 | 1>)
    expect(type<1 | 2>).to_supertype(type<2 | 1>)
    expect(type<1 | 2>).not.to_strictly_subtype(type<2 | 1>)
    expect(type<1 | 2>).not.to_strictly_supertype(type<2 | 1>)
})

declare.test("recursive object", expect => {
    type A = { a: A }
    type B = { a: B }
    expect(type<A>).to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("FALSE NEGATIVE≡: {a: 1} | {a: 2} ≢ {a: 1 | 2}", expect => {
    type A = { a: 1 } | { a: 2 }
    type B = { a: 1 | 2 }
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("{a: 1; b: 2} | {a: 2; b: 1} ⊂ {a: 1 | 2; b: 1 | 2}", expect => {
    type A = { a: 1; b: 2 } | { a: 2; b: 1 }
    type B = { a: 1 | 2; b: 1 | 2 }

    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).not.to_supertype(type<B>)
    expect(type<A>).to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})
