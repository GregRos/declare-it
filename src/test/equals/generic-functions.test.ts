import { the_type } from "@lib"

it("checks type parameters", () => {
    the_type<<T>() => void>().equals<() => void>(false)
})

it("does not check type parameter names", () => {
    the_type<<T>() => void>().equals<<U>() => void>(true)
})

it("checks type parameter number", () => {
    the_type<<T, U>() => void>().equals<<T>() => void>(false)
    // @ts-expect-error
    the_type<<T, U>() => void>().equals<<T>() => void>(true)
})

it("checks type parameter default", () => {
    the_type<<T = 1>() => void>().equals<<T>() => void>(false)
    // @ts-expect-error
    the_type<<T = 1>() => void>().equals<<T = 2>() => void>(true)
    the_type<<T, S = T>() => void>().equals<<X, Y = X>() => void>(true)
})

it("checks type parameter constraints", () => {
    the_type<<T extends 1>() => void>()
        .equals<<T extends 2>() => void>(false)
        // @ts-expect-error
        .equals<<T extends 2>() => void>(true)
    the_type<<T extends 1, U extends T>() => void>().equals<
        <T extends 1, U extends 2>() => void
    >(false)
})

it("doesn't tell apart empty constraints from unconstrained", () => {
    the_type<<T extends unknown>() => void>()
        .equals<<T>() => void>(true)
        .equals<<T extends any>() => void>(true)
})

it("tells apart overloaded call signatures from function types", () => {
    the_type<() => void>().equals<{ (): void; (): 1 }>(false)
})
