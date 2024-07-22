import { declare_test, expect_type } from "@lib/index"

declare_test("type arg name is ignored", check => {
    check = expect_type<<T>() => number>().to_equal<<U>() => number>()
})

declare_test("empty constraints are ignored", check => {
    check =
        expect_type<<T extends unknown>() => number>().to_equal<
            <U>() => number
        >()
})

declare_test("FALSE POSITIVE: only TO_EQUAL sees unused type args", check => {
    type UnusedGeneric = <T>() => number
    type NoGeneric = () => number
    check = expect_type<UnusedGeneric>().not.to_equal<NoGeneric>()
    check = expect_type<UnusedGeneric>().to_resemble<NoGeneric>()
    check = expect_type<UnusedGeneric>().to_subtype<NoGeneric>()
    check = expect_type<UnusedGeneric>().to_supertype<NoGeneric>()
    check = expect_type<UnusedGeneric>().not.to_strictly_subtype<NoGeneric>()
    check = expect_type<UnusedGeneric>().not.to_strictly_supertype<NoGeneric>()
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart different unconstrained type args",
    check => {
        type Generic2 = <T, S>() => S
        type Generic1 = <T>() => T
        check = expect_type<Generic2>().not.to_equal<Generic1>()
        check = expect_type<Generic2>().to_resemble<Generic1>()
        check = expect_type<Generic2>().to_subtype<Generic1>()
        check = expect_type<Generic2>().to_supertype<Generic1>()
        check = expect_type<Generic2>().not.to_strictly_subtype<Generic1>()
        check = expect_type<Generic2>().not.to_strictly_supertype<Generic1>()
    }
)

declare_test("disjoint constraints make disjoint types", check => {
    type Generic1 = <T extends 1>() => T
    type Generic2 = <T extends 2>() => T
    check = expect_type<Generic1>().not.to_equal<Generic2>()
    check = expect_type<Generic1>().not.to_resemble<Generic2>()
    check = expect_type<Generic1>().not.to_subtype<Generic2>()
    check = expect_type<Generic1>().not.to_supertype<Generic2>()
    check = expect_type<Generic1>().not.to_strictly_subtype<Generic2>()
    check = expect_type<Generic1>().not.to_strictly_supertype<Generic2>()
})

declare_test("(<T extends 1>() => T) ⊂ (() => 1)", check => {
    type Generic = <T extends 1>() => T
    type NonGeneric = () => 1
    check = expect_type<Generic>().not.to_equal<NonGeneric>()
    check = expect_type<Generic>().not.to_resemble<NonGeneric>()
    check = expect_type<Generic>().to_subtype<NonGeneric>()
    check = expect_type<Generic>().not.to_supertype<NonGeneric>()
    check = expect_type<Generic>().to_strictly_subtype<NonGeneric>()
    check = expect_type<Generic>().not.to_strictly_supertype<NonGeneric>()
})

declare_test(
    "FALSE POSITIVE: Mutual constraints are ignored, except by TO_EQUAL",
    check => {
        type Constrained = <T extends S, S>() => T
        type Unconstrained = <T, S>() => T
        check = expect_type<Constrained>().not.to_equal<Unconstrained>()
        check = expect_type<Constrained>().to_resemble<Unconstrained>()
        check = expect_type<Constrained>().to_subtype<Unconstrained>()
        check = expect_type<Constrained>().to_supertype<Unconstrained>()
        check =
            expect_type<Constrained>().not.to_strictly_subtype<Unconstrained>()
        check =
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
