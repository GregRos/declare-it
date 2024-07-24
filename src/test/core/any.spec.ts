import { declare, type, type_of } from "@lib/index"

declare.test("any is only equal to any", expect => {
    expect(type<any>).to_equal(type<any>)
    expect(type<any>).to_resemble(type<any>)
    expect(type<any>).to_subtype(type<any>)
    expect(type<any>).to_supertype(type<any>)
    expect(type<any>).not.to_strictly_subtype(type<any>)
    expect(type<any>).not.to_strictly_supertype(type<any>)
})

declare.test("{a: any} ≡ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any }
    expect(type)
    expect(type<A>).to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).to_strictly_supertype(type<B>)
})

declare.test("{a: any} ⊈ {a: 1}", expect => {
    type A = { a: any }
    type B = { a: 1 }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_subtype(type<B>)
    expect(type<A>).not.to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)

    expect(type<B>).not.to_equal(type<A>)
    expect(type<B>).not.to_resemble(type<A>)
    expect(type<B>).not.to_subtype(type<A>)
    expect(type<B>).not.to_supertype(type<A>)
    expect(type<B>).not.to_strictly_subtype(type<A>)
})

declare.test("{a: any, b: any} ⊂ {a: any}", expect => {
    type A = { a: any }
    type B = { a: any; b: any }
    expect(type<B>).to_subtype(type<A>)
    expect(type<B>).not.to_supertype(type<A>)
    expect(type<B>).to_strictly_subtype(type<A>)
    expect(type<B>).not.to_strictly_supertype(type<A>)
    expect(type<B>).not.to_equal(type<A>)
    expect(type<B>).not.to_resemble(type<A>)
})

declare.test("3 level nested", expect => {
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
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_subtype(type<B>)
    expect(type<A>).not.to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})

declare.test("5 level nested", expect => {
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
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_subtype(type<B>)
    expect(type<A>).not.to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
    // @ts-expect-error
    expect(type<B>).to_equal(type<A>)
    // @ts-expect-error
    expect(type<B>).to_resemble(type<A>)
    // @ts-expect-error
    expect(type<B>).to_subtype(type<A>)
    // @ts-expect-error
    expect(type<B>).to_supertype(type<A>)
    // @ts-expect-error
    expect(type<B>).to_strictly_subtype(type<A>)
    // @ts-expect-error
    expect(type<B>).to_strictly_supertype(type<A>)
})

declare.test("two identical disj types", expect => {
    // this caused lots of issues in the past
    type A = { a: any } | { a: 1 }
    type B = { a: 1 } | { a: any }
    expect(type<A>).to_subtype(type<A>)
    expect(type<B>).to_supertype(type<A>)
    expect(type<B>).not.to_strictly_subtype(type<A>)
    expect(type<B>).not.to_strictly_supertype(type<A>)
    expect(type<B>).to_equal(type<A>)
    expect(type<B>).to_resemble(type<A>)
})

declare.skip("two differnt disj types", expect => {
    type A = { a: any } | { b: 1 }
    type B = { a: 1 } | { b: any }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).to_resemble(type<B>)
    expect(type<A>).to_subtype(type<B>)
    expect(type<A>).to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})
