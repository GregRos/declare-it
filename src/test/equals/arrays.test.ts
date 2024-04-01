import { the_type } from "@lib"

it("checks readonly array", () => {
    the_type<readonly [1]>().equals<[1]>(false)
    // @ts-expect-error
    the_type<readonly [1]>().equals<[1]>(true)
})

it("checks optional array", () => {
    the_type<[1?]>().equals<[1]>(false)
    // @ts-expect-error
    the_type<[1?]>().equals<[1]>(true)
})

it("checks array order", () => {
    the_type<[1, 2]>().equals<[2, 1]>(false)
    // @ts-expect-error
    the_type<[1, 2]>().equals<[2, 1]>(true)
})

it("checks array length", () => {
    the_type<[1]>().equals<[1, 2]>(false)
    // @ts-expect-error
    the_type<[1]>().equals<[1, 2]>(true)
})
