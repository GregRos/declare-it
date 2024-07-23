import { declare_test } from "@lib/index"

declare_test("type arg name is ignored", expect => {
    expect.type<<T>() => number>(to => to.equal<<U>() => number>())
})

declare_test("empty constraints are ignored", expect => {
    expect.type<<T extends unknown>() => number>(t =>
        t.equal<<U>() => number>()
    )
})

declare_test("FALSE POSITIVE: only TO_EQUAL sees unused type args", expect => {
    type UnusedGeneric = <T>() => number
    type NoGeneric = () => number
    expect.type<UnusedGeneric>(to => to.not.equal<NoGeneric>())
    expect.type<UnusedGeneric>(to => to.resemble<NoGeneric>())
    expect.type<UnusedGeneric>(to => to.subtype<NoGeneric>())
    expect.type<UnusedGeneric>(to => to.supertype<NoGeneric>())
    expect.type<UnusedGeneric>(to => to.not.strictly_subtype<NoGeneric>())
    expect.type<UnusedGeneric>(to => to.not.strictly_supertype<NoGeneric>())
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart different unconstrained type args",
    expect => {
        type Generic2 = <T, S>() => S
        type Generic1 = <T>() => T
        expect.type<Generic2>(to => to.not.equal<Generic1>())
        expect.type<Generic2>(to => to.resemble<Generic1>())
        expect.type<Generic2>(to => to.subtype<Generic1>())
        expect.type<Generic2>(to => to.supertype<Generic1>())
        expect.type<Generic2>(to => to.not.strictly_subtype<Generic1>())
        expect.type<Generic2>(to => to.not.strictly_supertype<Generic1>())
    }
)

declare_test("disjoint constraints make disjoint types", expect => {
    type Generic1 = <T extends 1>() => T
    type Generic2 = <T extends 2>() => T
    expect.type<Generic1>(to => to.not.equal<Generic2>())
    expect.type<Generic1>(to => to.not.resemble<Generic2>())
    expect.type<Generic1>(to => to.not.subtype<Generic2>())
    expect.type<Generic1>(to => to.not.supertype<Generic2>())
    expect.type<Generic1>(to => to.not.strictly_subtype<Generic2>())
    expect.type<Generic1>(to => to.not.strictly_supertype<Generic2>())
})

declare_test("(<T extends 1>() => T) ⊂ (() => 1)", expect => {
    type Generic = <T extends 1>() => T
    type NonGeneric = () => 1
    expect.type<Generic>(to => to.not.equal<NonGeneric>())
    expect.type<Generic>(to => to.not.resemble<NonGeneric>())
    expect.type<Generic>(to => to.subtype<NonGeneric>())
    expect.type<Generic>(to => to.not.supertype<NonGeneric>())
    expect.type<Generic>(to => to.strictly_subtype<NonGeneric>())
    expect.type<Generic>(to => to.not.strictly_supertype<NonGeneric>())
})

declare_test(
    "FALSE POSITIVE: Mutual constraints are ignored, except by TO_EQUAL",
    expect => {
        type Cons = <T extends S, S>() => T
        type Uncons = <T, S>() => T
        expect.type<Cons>(to => to.not.equal<Uncons>())
        expect.type<Cons>(to => to.resemble<Uncons>())
        expect.type<Cons>(to => to.subtype<Uncons>())
        expect.type<Cons>(to => to.supertype<Uncons>())
        expect.type<Cons>(to => to.not.strictly_subtype<Uncons>())
        expect.type<Cons>(to => to.not.strictly_supertype<Uncons>())
    }
)

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL sees different defaults",
    expect => {
        type Default1 = <T = 1>() => T
        type Default2 = <T = 2>() => T

        expect.type<Default1>(to => to.not.equal<Default2>())
        expect.type<Default1>(to => to.resemble<Default2>())
        expect.type<Default1>(to => to.subtype<Default2>())
        expect.type<Default1>(to => to.supertype<Default2>())
        expect.type<Default1>(to => to.not.strictly_subtype<Default2>())
        expect.type<Default1>(to => to.not.strictly_supertype<Default2>())
    }
)
