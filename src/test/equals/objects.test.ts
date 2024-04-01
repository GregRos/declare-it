import { the_type } from "@lib"

it("checks readonly key", () => {
    the_type<{ readonly a: 1 }>().equals<{ a: 1 }>(false)
    // @ts-expect-error
    the_type<{ readonly a: 1 }>().equals<{ a: 1 }>(true)
})

it("checks optional key", () => {
    the_type<{ a?: 1 }>().equals<{ a: 1 }>(false)
    // @ts-expect-error
    the_type<{ a?: 1 }>().equals<{ a: 1 }>(true)
})

it("does not check key order", () => {
    the_type<{ a: 1; b: 2 }>().equals<{ b: 2; a: 1 }>(true)
    // @ts-expect-error
    the_type<{ a: 1; b: 2 }>().equals<{ b: 2; a: 1 }>(false)
})

it("does not check number vs numeric keys", () => {
    the_type<{ 1: 1 }>().equals<{ "1": 1 }>(true)
})

it("does not check disjunction order", () => {
    the_type<{ a: 1 } | { b: 2 }>().equals<{ b: 2 } | { a: 1 }>(true)
    // @ts-expect-error
    the_type<{ a: 1 } | { b: 2 }>().equals<{ b: 2 } | { a: 1 }>(false)
})

it("does not check intersection order", () => {
    the_type<{ a: 1 } & { b: 2 }>().equals<{ b: 2 } & { a: 1 }>(true)
    // @ts-expect-error
    the_type<{ a: 1 } & { b: 2 }>().equals<{ b: 2 } & { a: 1 }>(false)
})

it("doesn't tell method from function property", () => {
    the_type<{ a(): void }>().equals<{ a: () => void }>(true)
})

it("doesn't tell generic method from function property", () => {
    the_type<{ a<T>(): void }>().equals<{ a: <T>() => void }>(true)
})
