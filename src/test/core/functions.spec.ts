import { declare_test } from "@lib/index"

declare_test(
    "parameter names don't matter: ((x: 1) => void) ≡ ((y: 1) => void)",
    expect => {
        expect = expect_type<(x: 1) => void>().to_equal<(y: 1) => void>()
        expect = expect_type<(x: 1) => void>().to_resemble<(y: 1) => void>()
        expect = expect_type<(x: 1) => void>().to_subtype<(y: 1) => void>()
        expect = expect_type<(x: 1) => void>().to_supertype<(y: 1) => void>()
        expect =
            expect_type<(x: 1) => void>().not.to_strictly_subtype<
                (y: 1) => void
            >()
        expect =
            expect_type<(x: 1) => void>().not.to_strictly_supertype<
                (y: 1) => void
            >()
    }
)

declare_test("reflexivity: (() => void) ≡ (() => void)", expect => {
    expect = expect_type<() => void>().to_equal<() => void>()
    expect = expect_type<() => void>().to_resemble<() => void>()
    expect = expect_type<() => void>().to_subtype<() => void>()
    expect = expect_type<() => void>().to_supertype<() => void>()
    expect = expect_type<() => void>().not.to_strictly_subtype<() => void>()
    expect = expect_type<() => void>().not.to_strictly_supertype<() => void>()
})

declare_test("((a: 1) => void) ⊈ (() => void)", expect => {
    expect = expect_type<(a: 1) => void>().not.to_equal<() => void>()
    expect = expect_type<(a: 1) => void>().not.to_resemble<() => void>()
    expect = expect_type<(a: 1) => void>().not.to_subtype<() => void>()
    expect = expect_type<(a: 1) => void>().to_supertype<() => void>()
    expect = expect_type<(a: 1) => void>().not.to_strictly_subtype<() => void>()
    expect = expect_type<(a: 1) => void>().to_strictly_supertype<() => void>()
})

declare_test("(() => void) ⊆ ((a: 1) => void)", expect => {
    expect = expect_type<() => void>().to_subtype<(a: 1) => void>()
    expect = expect_type<() => void>().not.to_supertype<(a: 1) => void>()
    expect =
        expect_type<() => void>().not.to_strictly_supertype<(a: 1) => void>()
    expect = expect_type<() => void>().to_strictly_subtype<(a: 1) => void>()
    expect = expect_type<() => void>().not.to_resemble<(a: 1) => void>()
    expect = expect_type<() => void>().not.to_equal<(a: 1) => void>()
})

declare_test("(() => 1) ⊂ (() => number)", expect => {
    expect = expect_type<() => 1>().to_subtype<() => number>()
    expect = expect_type<() => 1>().not.to_supertype<() => number>()
    expect = expect_type<() => 1>().not.to_strictly_supertype<() => number>()
    expect = expect_type<() => 1>().to_strictly_subtype<() => number>()
    expect = expect_type<() => 1>().not.to_resemble<() => number>()
    expect = expect_type<() => 1>().not.to_equal<() => number>()
})

declare_test("(() => 1) ⊂ ((...args: 1[]) => void)", expect => {
    expect = expect_type<() => 1>().to_subtype<(...args: 1[]) => void>()
    expect = expect_type<() => 1>().not.to_supertype<(...args: 1[]) => void>()
    expect =
        expect_type<() => 1>().not.to_strictly_supertype<
            (...args: 1[]) => void
        >()
    expect =
        expect_type<() => 1>().to_strictly_subtype<(...args: 1[]) => void>()
    expect = expect_type<() => 1>().not.to_resemble<(...args: 1[]) => void>()
    expect = expect_type<() => 1>().not.to_equal<(...args: 1[]) => void>()
})

declare_test("((x: number) => 1) ⊂ ((x: 1) => 1)", expect => {
    expect = expect_type<(x: number) => 1>().to_subtype<(x: 1) => 1>()
    expect = expect_type<(x: number) => 1>().not.to_supertype<(x: 1) => 1>()
    expect =
        expect_type<(x: number) => 1>().not.to_strictly_supertype<
            (x: 1) => number
        >()
    expect = expect_type<(x: number) => 1>().to_strictly_subtype<(x: 1) => 1>()
    expect = expect_type<(x: number) => 1>().not.to_resemble<(x: 1) => 1>()
    expect = expect_type<(x: number) => 1>().not.to_equal<(x: 1) => 1>()
})

declare_test("(this: number) => void ⊈ (this: string) => void", expect => {
    expect =
        expect_type<(this: number) => void>().not.to_equal<
            (this: string) => void
        >()
    expect =
        expect_type<(this: number) => void>().not.to_resemble<
            (this: string) => void
        >()
    expect =
        expect_type<(this: number) => void>().not.to_subtype<
            (this: string) => void
        >()
    expect =
        expect_type<(this: number) => void>().not.to_supertype<
            (this: string) => void
        >()
    expect =
        expect_type<(this: number) => void>().not.to_strictly_subtype<
            (this: string) => void
        >()
    expect =
        expect_type<(this: number) => void>().not.to_strictly_supertype<
            (this: string) => void
        >()
})

declare_test("((x?: 1) => void) ≈ ((x: 1 | undefined) => void)", expect => {
    expect =
        expect_type<(x?: 1) => void>().not.to_equal<
            (x: 1 | undefined) => void
        >()
    expect =
        expect_type<(x?: 1) => void>().to_resemble<(x: 1 | undefined) => void>()
    expect =
        expect_type<(x?: 1) => void>().to_subtype<(x: 1 | undefined) => void>()
    expect =
        expect_type<(x?: 1) => void>().to_supertype<
            (x: 1 | undefined) => void
        >()
    expect =
        expect_type<(x?: 1) => void>().not.to_strictly_subtype<
            (x: 1 | undefined) => void
        >()
    expect =
        expect_type<(x?: 1) => void>().not.to_strictly_supertype<
            (x: 1 | undefined) => void
        >()
})

declare_test("(any function) ⊂ Function", expect => {
    expect = expect_type<() => void>().to_subtype<Function>()
    expect = expect_type<(...args: any) => any>().to_subtype<Function>()
    expect = expect_type<(a: any) => any>().to_strictly_subtype<Function>()
    expect = expect_type<(this: any) => any>().to_strictly_subtype<Function>()
})

declare_test("(({(): 1}) ≡ (() => 1)", expect => {
    type CallSig = { (): 1 }
    type Func = () => 1
    expect = expect_type<CallSig>().to_equal<Func>()
    expect = expect_type<CallSig>().to_resemble<Func>()
    expect = expect_type<CallSig>().to_subtype<Func>()
    expect = expect_type<CallSig>().to_supertype<Func>()
    expect = expect_type<CallSig>().not.to_strictly_subtype<Func>()
    expect = expect_type<CallSig>().not.to_strictly_supertype<Func>()
})

declare_test("({(): 1; (): 2}) ⊂ (() => 1)", expect => {
    type CallSig = { (): 1; (): 2 }
    type Func = () => 1
    expect = expect_type<CallSig>().to_subtype<Func>()
    expect = expect_type<CallSig>().not.to_supertype<Func>()
    expect = expect_type<CallSig>().not.to_strictly_supertype<Func>()
    expect = expect_type<CallSig>().to_strictly_subtype<Func>()
    expect = expect_type<CallSig>().not.to_resemble<Func>()
    expect = expect_type<CallSig>().not.to_equal<Func>()
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart call signature order",
    expect => {
        type SigOrder1 = { (): 1; (): 2 }
        type SigOrder2 = { (): 2; (): 1 }
        expect = expect_type<SigOrder1>().not.to_equal<SigOrder2>()
        expect = expect_type<SigOrder1>().to_resemble<SigOrder2>()
        expect = expect_type<SigOrder1>().to_subtype<SigOrder2>()
        expect = expect_type<SigOrder1>().to_supertype<SigOrder2>()
        expect = expect_type<SigOrder1>().not.to_strictly_subtype<SigOrder2>()
        expect = expect_type<SigOrder1>().not.to_strictly_supertype<SigOrder2>()
    }
)

declare_test(
    "FALSE POSITIVE≡: Order ALWAYS ignored for order-sensitive intersections of call sigs",
    expect => {
        type SigOrder1 = { (): 1 } & { (): 2 }
        type SigOrder2 = { (): 2 } & { (): 1 }
        expect = expect_type<SigOrder1>().to_equal<SigOrder2>()
        expect = expect_type<SigOrder1>().to_resemble<SigOrder2>()
        expect = expect_type<SigOrder1>().to_subtype<SigOrder2>()
        expect = expect_type<SigOrder1>().to_supertype<SigOrder2>()
        expect = expect_type<SigOrder1>().not.to_strictly_subtype<SigOrder2>()
        expect = expect_type<SigOrder1>().not.to_strictly_supertype<SigOrder2>()
    }
)

declare_test(
    "FALSE NEGATIVE≡: Multiple identical call signatures and function type not equal",
    expect => {
        expect = expect_type<() => void>().not.to_equal<{
            (): void
            (): void
        }>()
        expect = expect_type<() => void>().to_resemble<{ (): void; (): void }>()
        expect = expect_type<() => void>().to_subtype<{ (): void; (): void }>()
        expect = expect_type<() => void>().to_supertype<{
            (): void
            (): void
        }>()
        expect = expect_type<() => void>().not.to_strictly_subtype<{
            (): void
            (): void
        }>()
        expect = expect_type<() => void>().not.to_strictly_supertype<{
            (): void
            (): void
        }>()
    }
)
