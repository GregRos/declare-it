import { the_type } from "@lib"

it("disjunction type is different from non-disjunction", () => {
    the_type<1 | 2>().equals<1>(false).equals<2>(false)
})

it("impossible conjunction is never", () => {
    the_type<1 & 2>().equals<never>(true).equals<1>(false).equals<2>(false)
})

it("disjunction type is the same if both operands are the same literal type", () => {
    the_type<1 | 1>().equals<1>(true)
})

it("conjunction type is the same if both operands are the same literal type", () => {
    the_type<1 & 1>().equals<1>(true)
})
