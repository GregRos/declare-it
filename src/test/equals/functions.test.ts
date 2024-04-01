import { the_type } from "@lib"

it("does not check parameter names", () => {
    the_type<(a: 1) => void>().equals<(b: 1) => void>(true)
})

it("checks parameter order", () => {
    the_type<(a: 1, b: 2) => void>().equals<(b: 2, a: 1) => void>(false)
})

it("checks parameter types", () => {
    the_type<(a: 1) => void>().equals<(a: 2) => void>(false)
    // @ts-expect-error
    the_type<(a: 1) => void>().equals<(a: 2) => void>(true)
})

it("checks return type", () => {
    the_type<() => 1>().equals<() => 2>(false)
    // @ts-expect-error
    the_type<() => 1>().equals<() => 2>(true)
})

it("checks this parameter", () => {
    the_type<(this: string) => void>().equals<(this: number) => void>(false)
})

it("doesn't tell call signature from function type", () => {
    the_type<() => void>().equals<{ (): void }>(true)
})

it("tells optional parameter from disjunction with undefined", () => {
    the_type<(a?: 1) => void>()
        .equals<(a: 1 | undefined) => void>(false)
        .equals<(a?: 1 | undefined) => void>(true)
})

it("tells apart Function and specific function types, even with any", () => {
    the_type<Function>()
        .equals<() => void>(false)
        .equals<(...x: any) => any>(false)
        .equals<Function>(true)
})
