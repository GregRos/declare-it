import { declare_test } from "@lib/index"

declare_test("any is only equal to any", expect => {
    expect.type<any>(to => to.equal<any>())
    expect.type<any>(to => to.resemble<any>())
    expect.type<any>(to => to.subtype<any>())
    expect.type<any>(to => to.supertype<any>())
    expect.type<any>(to => to.not.strictly_subtype<any>())
    expect.type<any>(to => to.not.strictly_supertype<any>())
})

declare_test("{a: any} ≡ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any }
    expect.type<A>(to => to.equal<B>())
    expect.type<A>(to => to.resemble<B>())
    expect.type<A>(to => to.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})

declare_test("{a: any} ⊈ {a: 1}", expect => {
    type A = { a: any }
    type B = { a: 1 }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.subtype<B>())
    expect.type<A>(to => to.not.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())

    expect.type<B>(to => to.not.equal<A>())
    expect.type<B>(to => to.not.resemble<A>())
    expect.type<B>(to => to.not.subtype<A>())
    expect.type<B>(to => to.not.supertype<A>())
    expect.type<B>(to => to.not.strictly_subtype<A>())
})

declare_test("{a: any, b: any} ⊂ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any; b: any }
    expect.type<B>(to => to.subtype<A>())
    expect.type<B>(to => to.not.supertype<A>())
    expect.type<B>(to => to.strictly_subtype<A>())
    expect.type<B>(to => to.not.strictly_supertype<A>())
    expect.type<B>(to => to.not.equal<A>())
    expect.type<B>(to => to.not.resemble<A>())
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
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.subtype<B>())
    expect.type<A>(to => to.not.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
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
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.subtype<B>())
    expect.type<A>(to => to.not.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
    // @ts-expect-error
    expect.type<B>(to => to.equal<A>())
    // @ts-expect-error
    expect.type<B>(to => to.resemble<A>())
    // @ts-expect-error
    expect.type<B>(to => to.subtype<A>())
    // @ts-expect-error
    expect.type<B>(to => to.supertype<A>())
    // @ts-expect-error
    expect.type<B>(to => to.strictly_subtype<A>())
    // @ts-expect-error
    expect.type<B>(to => to.strictly_supertype<A>())
})

declare_test("two identical disj types", expect => {
    // this caused lots of issues in the past
    type A = { a: any } | { a: 1 }
    type B = { a: 1 } | { a: any }
    expect.type<A>(to => to.subtype<A>())
    expect.type<B>(to => to.supertype<A>())
    expect.type<B>(to => to.not.strictly_subtype<A>())
    expect.type<B>(to => to.not.strictly_supertype<A>())
    expect.type<B>(to => to.equal<A>())
    expect.type<B>(to => to.resemble<A>())
})

declare_test("two differnt disj types", expect => {
    type A = { a: any } | { b: 1 }
    type B = { a: 1 } | { b: any }
    expect.type<A>(to => to.not.equal<B>())
    expect.type<A>(to => to.not.resemble<B>())
    expect.type<A>(to => to.not.subtype<B>())
    expect.type<A>(to => to.supertype<B>())
    expect.type<A>(to => to.not.strictly_subtype<B>())
    expect.type<A>(to => to.not.strictly_supertype<B>())
})
