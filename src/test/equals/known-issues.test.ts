import { the_type } from "@lib"

it("FALSE NEGATIVE: Object intersection and resulting object not equal", () => {
    the_type<{ a: 1 } & { b: 1 }>().equals<{ a: 1; b: 2 }>(false)
})

it("FALSE NEGATIVE: Disjunction between identical object types not equal to type", () => {
    the_type<{ a: 1 } | { a: 1 }>().equals<{ a: 1 }>(false)
})

it("FALSE NEGATIVE: Conjunction between identical object types not equal to type", () => {
    the_type<{ a: 1 } & { a: 1 }>().equals<{ a: 1 }>(false)
})

it("FALSE NEGATIVE: Multiple identical call signatures and function type not equal", () => {
    the_type<() => void>().equals<{ (): void; (): void }>(false)
})

it("FALSE POSITIVE: Assumes intersection order doesn't matter for call signature types", () => {
    the_type<{ (): 1 } & { (): 2 }>().equals<{ (): 2 } & { (): 1 }>(true)
})
