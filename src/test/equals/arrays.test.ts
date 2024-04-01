import { the_type } from "@lib"

it("checks readonly array", () => {
    the_type<readonly [1]>().equals<[1]>(false)

    // @ts-expect-error
    the_type<readonly [1]>().equals<[1]>(true)
})

it("readonly array is the same as applying Readonly on array", () => {
    the_type<readonly [1]>()
        .equals<Readonly<[1]>>(true)
        .equals<Readonly<Readonly<[1]>>>(true)
})

it("square brackets array is the same as Array", () => {
    the_type<1[]>().equals<Array<1>>(true)
})

it("checks optional tuple element", () => {
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
