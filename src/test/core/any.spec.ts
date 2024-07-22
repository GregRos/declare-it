import { declare_test } from "@lib/index"

declare_test("any is only equal to any", expect => {
    expect.type<any>(t => t.to_equal<any>())
    expect.type<any>(t => t.to_resemble<any>())
    expect.type<any>(t => t.to_subtype<any>())
    expect.type<any>(t => t.to_supertype<any>())
    expect.type<any>(t => t.not.to_strictly_subtype<any>())
    expect.type<any>(t => t.not.to_strictly_supertype<any>())
})

declare_test("{a: any} ≡ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any }
    expect.type<A>(t => t.to_equal<B>())
    expect.type<A>(t => t.to_resemble<B>())
    expect.type<A>(t => t.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("{a: any} ⊈ {a: 1}", expect => {
    type A = { a: any }
    type B = { a: 1 }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.not.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())

    expect.type<B>(t => t.not.to_equal<A>())
    expect.type<B>(t => t.not.to_resemble<A>())
    expect.type<B>(t => t.not.to_subtype<A>())
    expect.type<B>(t => t.not.to_supertype<A>())
    expect.type<B>(t => t.not.to_strictly_subtype<A>())
})

declare_test("{a: any, b: any} ⊂ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any; b: any }
    expect.type<B>(t => t.to_subtype<A>())
    expect.type<B>(t => t.not.to_supertype<A>())
    expect.type<B>(t => t.to_strictly_subtype<A>())
    expect.type<B>(t => t.not.to_strictly_supertype<A>())
    expect.type<B>(t => t.not.to_equal<A>())
    expect.type<B>(t => t.not.to_resemble<A>())
})

declare_test("3 level nested", expect => {
    type A = {
        a: {
            b: {
                c: any
            }
        }
    }
    type B = {
        a: {
            b: {
                c: 1
            }
        }
    }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.not.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})

declare_test("5 level nested", expect => {
    type A = {
        a: {
            b: {
                c: {
                    d: {
                        e: any
                    }
                }
            }
        }
    }
    type B = {
        a: {
            b: {
                c: {
                    d: {
                        e: 1
                    }
                }
            }
        }
    }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.not.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
    // @ts-expect-error
    expect.type<B>(t => t.to_equal<A>())
    // @ts-expect-error
    expect.type<B>(t => t.to_resemble<A>())
    // @ts-expect-error
    expect.type<B>(t => t.to_subtype<A>())
    // @ts-expect-error
    expect.type<B>(t => t.to_supertype<A>())
    // @ts-expect-error
    expect.type<B>(t => t.to_strictly_subtype<A>())
    // @ts-expect-error
    expect.type<B>(t => t.to_strictly_supertype<A>())
})

declare_test("two identical disj types", expect => {
    // this caused lots of issues in the past
    type A = { a: any } | { a: 1 }
    type B = { a: 1 } | { a: any }
    expect.type<A>(t => t.to_subtype<A>())
    expect.type<B>(t => t.to_supertype<A>())
    expect.type<B>(t => t.not.to_strictly_subtype<A>())
    expect.type<B>(t => t.not.to_strictly_supertype<A>())
    expect.type<B>(t => t.to_equal<A>())
    expect.type<B>(t => t.to_resemble<A>())
})

declare_test("two differnt disj types", expect => {
type A = { a: any } | { b: 1=
    type B = { a: 1 } | { b: any }
    expect.type<A>(t => t.not.to_equal<B>())
    expect.type<A>(t => t.not.to_resemble<B>())
    expect.type<A>(t => t.not.to_subtype<B>())
    expect.type<A>(t => t.to_supertype<B>())
    expect.type<A>(t => t.not.to_strictly_subtype<B>())
    expect.type<A>(t => t.not.to_strictly_supertype<B>())
})
