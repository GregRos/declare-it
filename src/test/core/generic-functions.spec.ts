import { declare, type } from "@lib/index.js"

declare.test("type arg name is ignored", expect => {
    expect(type<<T>() => number>).to_equal(type<<U>() => number>)
})

declare.test("empty constraints are ignored", expect => {
    expect(type<<T extends unknown>() => number>).to_equal(
        type<<U>() => number>
    )
})

declare.test("FALSE POSITIVE: only TO_EQUAL sees unused type args", expect => {
    type UnusedGeneric = <T>() => number
    type NoGeneric = () => number
    expect(type<UnusedGeneric>).not.to_equal(type<NoGeneric>)
    expect(type<UnusedGeneric>).to_resemble(type<NoGeneric>)
    expect(type<UnusedGeneric>).to_subtype(type<NoGeneric>)
    expect(type<UnusedGeneric>).to_supertype(type<NoGeneric>)
    expect(type<UnusedGeneric>).not.to_strictly_subtype(type<NoGeneric>)
    expect(type<UnusedGeneric>).not.to_strictly_supertype(type<NoGeneric>)
})

declare.test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart different unconstrained type args",
    expect => {
        type Generic2 = <T, S>() => S
        type Generic1 = <T>() => T
        expect(type<Generic2>).not.to_equal(type<Generic1>)
        expect(type<Generic2>).to_resemble(type<Generic1>)
        expect(type<Generic2>).to_subtype(type<Generic1>)
        expect(type<Generic2>).to_supertype(type<Generic1>)
        expect(type<Generic2>).not.to_strictly_subtype(type<Generic1>)
        expect(type<Generic2>).not.to_strictly_supertype(type<Generic1>)
    }
)

declare.test("disjoint constraints make disjoint types", expect => {
    type Generic1 = <T extends 1>() => T
    type Generic2 = <T extends 2>() => T
    expect(type<Generic1>).not.to_equal(type<Generic2>)
    expect(type<Generic1>).not.to_resemble(type<Generic2>)
    expect(type<Generic1>).not.to_subtype(type<Generic2>)
    expect(type<Generic1>).not.to_supertype(type<Generic2>)
    expect(type<Generic1>).not.to_strictly_subtype(type<Generic2>)
    expect(type<Generic1>).not.to_strictly_supertype(type<Generic2>)
})

declare.test("(<T extends 1>() => T) ⊂ (() => 1)", expect => {
    type Generic = <T extends 1>() => T
    type NonGeneric = () => 1
    expect(type<Generic>).not.to_equal(type<NonGeneric>)
    expect(type<Generic>).not.to_resemble(type<NonGeneric>)
    expect(type<Generic>).to_subtype(type<NonGeneric>)
    expect(type<Generic>).not.to_supertype(type<NonGeneric>)
    expect(type<Generic>).to_strictly_subtype(type<NonGeneric>)
    expect(type<Generic>).not.to_strictly_supertype(type<NonGeneric>)
})

declare.test(
    "FALSE POSITIVE: Mutual constraints are ignored, except by TO_EQUAL",
    expect => {
        type Cons = <T extends S, S>() => T
        type Uncons = <T, S>() => T
        expect(type<Cons>).not.to_equal(type<Uncons>)
        expect(type<Cons>).to_resemble(type<Uncons>)
        expect(type<Cons>).to_subtype(type<Uncons>)
        expect(type<Cons>).to_supertype(type<Uncons>)
        expect(type<Cons>).not.to_strictly_subtype(type<Uncons>)
        expect(type<Cons>).not.to_strictly_supertype(type<Uncons>)
    }
)

declare.test(
    "FALSE POSITIVE: Only TO_EQUAL sees different defaults",
    expect => {
        type Default1 = <T = 1>() => T
        type Default2 = <T = 2>() => T

        expect(type<Default1>).not.to_equal(type<Default2>)
        expect(type<Default1>).to_resemble(type<Default2>)
        expect(type<Default1>).to_subtype(type<Default2>)
        expect(type<Default1>).to_supertype(type<Default2>)
        expect(type<Default1>).not.to_strictly_subtype(type<Default2>)
        expect(type<Default1>).not.to_strictly_supertype(type<Default2>)
    }
)
