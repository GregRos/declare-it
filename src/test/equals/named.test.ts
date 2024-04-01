import { the_type } from "@lib"

it("Identical aliases don't matter", () => {
    type A = 1
    type B = 1
    the_type<A>().equals<B>(true)
})
it("does not check type name even in recursive types", () => {
    type C = {
        a: C
    }
    type D = {
        a: D
    }
    the_type<C>().equals<D>(true)
})
