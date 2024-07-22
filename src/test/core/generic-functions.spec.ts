import { declare_test } from "@lib/index"

declare_test("type arg name is ignored", expect => {
    expect.type<<T>() => number>(t => t.to_equal<<U>() => number>())
})

declare_test("empty constraints are ignored", expect => {
    expect.type<<T extends unknown>() => number>(t =>
        t.to_equal<<U>() => number>()
    )
})

declare_test("FALSE POSITIVE: only TO_EQUAL sees unused type args", expect => {
    type UnusedGeneric = <T>() => number
    type NoGeneric = () => number
    expect.type<UnusedGeneric>(t => t.not.to_equal<NoGeneric>())
    expect.type<UnusedGeneric>(t => t.to_resemble<NoGeneric>())
    expect.type<UnusedGeneric>(t => t.to_subtype<NoGeneric>())
    expect.type<UnusedGeneric>(t => t.to_supertype<NoGeneric>())
    expect.type<UnusedGeneric>(t => t.not.to_strictly_subtype<NoGeneric>())
    expect.type<UnusedGeneric>(t => t.not.to_strictly_supertype<NoGeneric>())
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart different unconstrained type args",
    expect => {
        type Generic2 = <T, S>() => S
        type Generic1 = <T>() => T
        expect.type<Generic2>(t => t.not.to_equal<Generic1>())
        expect.type<Generic2>(t => t.to_resemble<Generic1>())
        expect.type<Generic2>(t => t.to_subtype<Generic1>())
        expect.type<Generic2>(t => t.to_supertype<Generic1>())
        expect.type<Generic2>(t => t.not.to_strictly_subtype<Generic1>())
        expect.type<Generic2>(t => t.not.to_strictly_supertype<Generic1>())
    }
)

declare_test("disjoint constraints make disjoint types", expect => {
    type Generic1 = <T extends 1>() => T
    type Generic2 = <T extends 2>() => T
    expect.type<Generic1>(t => t.not.to_equal<Generic2>())
    expect.type<Generic1>(t => t.not.to_resemble<Generic2>())
    expect.type<Generic1>(t => t.not.to_subtype<Generic2>())
    expect.type<Generic1>(t => t.not.to_supertype<Generic2>())
    expect.type<Generic1>(t => t.not.to_strictly_subtype<Generic2>())
    expect.type<Generic1>(t => t.not.to_strictly_supertype<Generic2>())
})

declare_test("(<T extends 1>() => T) ⊂ (() => 1)", expect => {
    type Generic = <T extends 1>() => T
    type NonGeneric = () => 1
    expect.type<Generic>(t => t.not.to_equal<NonGeneric>())
    expect.type<Generic>(t => t.not.to_resemble<NonGeneric>())
    expect.type<Generic>(t => t.to_subtype<NonGeneric>())
    expect.type<Generic>(t => t.not.to_supertype<NonGeneric>())
    expect.type<Generic>(t => t.to_strictly_subtype<NonGeneric>())
    expect.type<Generic>(t => t.not.to_strictly_supertype<NonGeneric>())
})

declare_test(
    "FALSE POSITIVE: Mutual constraints are ignored, except by TO_EQUAL",
    expect => {
        type Cons = <T extends S, S>() => T
        type Uncons = <T, S>() => T
        expect.type<Cons>(t => t.not.to_equal<Uncons>())
        expect.type<Cons>(t => t.to_resemble<Uncons>())
        expect.type<Cons>(t => t.to_subtype<Uncons>())
        expect.type<Cons>(t => t.to_supertype<Uncons>())
        expect.type<Cons>(t => t.not.to_strictly_subtype<Uncons>())
        expect.type<Cons>(t => t.not.to_strictly_supertype<Uncons>())
    }
)

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL sees different defaults",
    expect => {
        type Default1 = <T = 1>() => T
        type Default2 = <T = 2>() => T

        expect.type<Default1>(t => t.not.to_equal<Default2>())
        expect.type<Default1>(t => t.to_resemble<Default2>())
        expect.type<Default1>(t => t.to_subtype<Default2>())
        expect.type<Default1>(t => t.to_supertype<Default2>())
        expect.type<Default1>(t => t.not.to_strictly_subtype<Default2>())
        expect.type<Default1>(t => t.not.to_strictly_supertype<Default2>())
    }
)
