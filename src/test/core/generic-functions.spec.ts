import { declare_test } from "@lib/index"

declare_test("type arg name is ignored", expect => {
    expect = expect_type<<T>() => number>().to_equal<<U>() => number>()
})

declare_test("empty constraints are ignored", expect => {
    expect =
        expect_type<<T extends unknown>() => number>().to_equal<
            <U>() => number
        >()
})

declare_test("FALSE POSITIVE: only TO_EQUAL sees unused type args", expect => {
    type UnusedGeneric = <T>() => number
    type NoGeneric = () => number
    expect = expect_type<UnusedGeneric>().not.to_equal<NoGeneric>()
    expect = expect_type<UnusedGeneric>().to_resemble<NoGeneric>()
    expect = expect_type<UnusedGeneric>().to_subtype<NoGeneric>()
    expect = expect_type<UnusedGeneric>().to_supertype<NoGeneric>()
    expect = expect_type<UnusedGeneric>().not.to_strictly_subtype<NoGeneric>()
    expect = expect_type<UnusedGeneric>().not.to_strictly_supertype<NoGeneric>()
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart different unconstrained type args",
    expect => {
        type Generic2 = <T, S>() => S
        type Generic1 = <T>() => T
        expect = expect_type<Generic2>().not.to_equal<Generic1>()
        expect = expect_type<Generic2>().to_resemble<Generic1>()
        expect = expect_type<Generic2>().to_subtype<Generic1>()
        expect = expect_type<Generic2>().to_supertype<Generic1>()
        expect = expect_type<Generic2>().not.to_strictly_subtype<Generic1>()
        expect = expect_type<Generic2>().not.to_strictly_supertype<Generic1>()
    }
)

declare_test("disjoint constraints make disjoint types", expect => {
    type Generic1 = <T extends 1>() => T
    type Generic2 = <T extends 2>() => T
    expect = expect_type<Generic1>().not.to_equal<Generic2>()
    expect = expect_type<Generic1>().not.to_resemble<Generic2>()
    expect = expect_type<Generic1>().not.to_subtype<Generic2>()
    expect = expect_type<Generic1>().not.to_supertype<Generic2>()
    expect = expect_type<Generic1>().not.to_strictly_subtype<Generic2>()
    expect = expect_type<Generic1>().not.to_strictly_supertype<Generic2>()
})

declare_test("(<T extends 1>() => T) ⊂ (() => 1)", expect => {
    type Generic = <T extends 1>() => T
    type NonGeneric = () => 1
    expect = expect_type<Generic>().not.to_equal<NonGeneric>()
    expect = expect_type<Generic>().not.to_resemble<NonGeneric>()
    expect = expect_type<Generic>().to_subtype<NonGeneric>()
    expect = expect_type<Generic>().not.to_supertype<NonGeneric>()
    expect = expect_type<Generic>().to_strictly_subtype<NonGeneric>()
    expect = expect_type<Generic>().not.to_strictly_supertype<NonGeneric>()
})

declare_test(
    "FALSE POSITIVE: Mutual constraints are ignored, except by TO_EQUAL",
    expect => {
        type Constrained = <T extends S, S>() => T
        type Unconstrained = <T, S>() => T
        expect = expect_type<Constrained>().not.to_equal<Unconstrained>()
        expect = expect_type<Constrained>().to_resemble<Unconstrained>()
        expect = expect_type<Constrained>().to_subtype<Unconstrained>()
        expect = expect_type<Constrained>().to_supertype<Unconstrained>()
        expect =
            expect_type<Constrained>().not.to_strictly_subtype<Unconstrained>()
        expect =
            expect_type<Constrained>().not.to_strictly_supertype<Unconstrained>()
    }
)

declare_test("FALSE POSITIVE: Only TO_EQUAL sees different defaults", () => {
    type Default1 = <T = 1>() => T
    type Default2 = <T = 2>() => T
    expect_type<Default1>().not.to_equal<Default2>()
    expect_type<Default1>().to_resemble<Default2>()
    expect_type<Default1>().to_subtype<Default2>()
    expect_type<Default1>().to_supertype<Default2>()
    expect_type<Default1>().not.to_strictly_subtype<Default2>()
    expect_type<Default1>().not.to_strictly_supertype<Default2>()
})
