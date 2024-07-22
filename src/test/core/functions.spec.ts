import { declare_test } from "@lib/index"

declare_test(
    "parameter names don't matter: ((x: 1) => void) ≡ ((y: 1) => void)",
    expect => {
        expect.type<(x: 1) => void>(t => t.to_equal<(y: 1) => void>())
        expect.type<(x: 1) => void>(t => t.to_resemble<(y: 1) => void>())
        expect.type<(x: 1) => void>(t => t.to_subtype<(y: 1) => void>())
        expect.type<(x: 1) => void>(t => t.to_supertype<(y: 1) => void>())
        expect.type<(x: 1) => void>(t =>
            t.not.to_strictly_subtype<(y: 1) => void>()
        )
        expect.type<(x: 1) => void>(t =>
            t.not.to_strictly_supertype<(y: 1) => void>()
        )
    }
)

declare_test("reflexivity: (() => void) ≡ (() => void)", expect => {
    expect.type<() => void>(t => t.to_equal<() => void>())
    expect.type<() => void>(t => t.to_resemble<() => void>())
    expect.type<() => void>(t => t.to_subtype<() => void>())
    expect.type<() => void>(t => t.to_supertype<() => void>())
    expect.type<() => void>(t => t.not.to_strictly_subtype<() => void>())
    expect.type<() => void>(t => t.not.to_strictly_supertype<() => void>())
})

declare_test("((a: 1) => void) ⊈ (() => void)", expect => {
    expect.type<(a: 1) => void>(t => t.not.to_equal<() => void>())
    expect.type<(a: 1) => void>(t => t.not.to_resemble<() => void>())
    expect.type<(a: 1) => void>(t => t.not.to_subtype<() => void>())
    expect.type<(a: 1) => void>(t => t.to_supertype<() => void>())
    expect.type<(a: 1) => void>(t => t.not.to_strictly_subtype<() => void>())
    expect.type<(a: 1) => void>(t => t.to_strictly_supertype<() => void>())
})

declare_test("(() => void) ⊆ ((a: 1) => void)", expect => {
    expect.type<() => void>(t => t.to_subtype<(a: 1) => void>())
    expect.type<() => void>(t => t.not.to_supertype<(a: 1) => void>())
    expect.type<() => void>(t => t.not.to_strictly_supertype<(a: 1) => void>())
    expect.type<() => void>(t => t.to_strictly_subtype<(a: 1) => void>())
    expect.type<() => void>(t => t.not.to_resemble<(a: 1) => void>())
    expect.type<() => void>(t => t.not.to_equal<(a: 1) => void>())
})

declare_test("(() => 1) ⊂ (() => number)", expect => {
    expect.type<() => 1>(t => t.to_subtype<() => number>())
    expect.type<() => 1>(t => t.not.to_supertype<() => number>())
    expect.type<() => 1>(t => t.not.to_strictly_supertype<() => number>())
    expect.type<() => 1>(t => t.to_strictly_subtype<() => number>())
    expect.type<() => 1>(t => t.not.to_resemble<() => number>())
    expect.type<() => 1>(t => t.not.to_equal<() => number>())
})

declare_test("(() => 1) ⊂ ((...args: 1[]) => void)", expect => {
    expect.type<() => 1>(t => t.to_subtype<(...args: 1[]) => void>())
    expect.type<() => 1>(t => t.not.to_supertype<(...args: 1[]) => void>())
    expect.type<() => 1>(t =>
        t.not.to_strictly_supertype<(...args: 1[]) => void>()
    )
    expect.type<() => 1>(t => t.to_strictly_subtype<(...args: 1[]) => void>())
    expect.type<() => 1>(t => t.not.to_resemble<(...args: 1[]) => void>())
    expect.type<() => 1>(t => t.not.to_equal<(...args: 1[]) => void>())
})

declare_test("((x: number) => 1) ⊂ ((x: 1) => 1)", expect => {
    expect.type<(x: number) => 1>(t => t.to_subtype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(t => t.not.to_supertype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(t =>
        t.not.to_strictly_supertype<(x: 1) => number>()
    )
    expect.type<(x: number) => 1>(t => t.to_strictly_subtype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(t => t.not.to_resemble<(x: 1) => 1>())
    expect.type<(x: number) => 1>(t => t.not.to_equal<(x: 1) => 1>())
})

declare_test("(this: number) => void ⊈ (this: string) => void", expect => {
    expect.type<(this: number) => void>(t =>
        t.not.to_equal<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.to_resemble<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.to_subtype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.to_supertype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.to_strictly_subtype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.to_strictly_supertype<(this: string) => void>()
    )
})

declare_test("((x?: 1) => void) ≈ ((x: 1 | undefined) => void)", expect => {
    expect.type<(x?: 1) => void>(t =>
        t.not.to_equal<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.to_resemble<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.to_subtype<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.to_supertype<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.not.to_strictly_subtype<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.not.to_strictly_supertype<(x: 1 | undefined) => void>()
    )
})

declare_test("(any function) ⊂ Function", expect => {
    expect.type<() => void>(t => t.to_subtype<Function>())
    expect.type<(...args: any) => any>(t => t.to_subtype<Function>())
    expect.type<(a: any) => any>(t => t.to_strictly_subtype<Function>())
    expect.type<(this: any) => any>(t => t.to_strictly_subtype<Function>())
})

declare_test("(({(): 1}) ≡ (() => 1)", expect => {
    type CallSig = { (): 1 }
    type Func = () => 1
    expect.type<CallSig>(t => t.to_equal<Func>())
    expect.type<CallSig>(t => t.to_resemble<Func>())
    expect.type<CallSig>(t => t.to_subtype<Func>())
    expect.type<CallSig>(t => t.to_supertype<Func>())
    expect.type<CallSig>(t => t.not.to_strictly_subtype<Func>())
    expect.type<CallSig>(t => t.not.to_strictly_supertype<Func>())
})

declare_test("({(): 1; (): 2}) ⊂ (() => 1)", expect => {
    type CallSig = { (): 1; (): 2 }
    type Func = () => 1
    expect.type<CallSig>(t => t.to_subtype<Func>())
    expect.type<CallSig>(t => t.not.to_supertype<Func>())
    expect.type<CallSig>(t => t.not.to_strictly_supertype<Func>())
    expect.type<CallSig>(t => t.to_strictly_subtype<Func>())
    expect.type<CallSig>(t => t.not.to_resemble<Func>())
    expect.type<CallSig>(t => t.not.to_equal<Func>())
})

declare_test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart call signature order",
    expect => {
        type SigOrder1 = { (): 1; (): 2 }
        type SigOrder2 = { (): 2; (): 1 }
        expect.type<SigOrder1>(t => t.not.to_equal<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_resemble<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_subtype<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_supertype<SigOrder2>())
        expect.type<SigOrder1>(t => t.not.to_strictly_subtype<SigOrder2>())
        expect.type<SigOrder1>(t => t.not.to_strictly_supertype<SigOrder2>())
    }
)

declare_test(
    "FALSE POSITIVE≡: Order ALWAYS ignored for order-sensitive intersections of call sigs",
    expect => {
        type SigOrder1 = { (): 1 } & { (): 2 }
        type SigOrder2 = { (): 2 } & { (): 1 }
        expect.type<SigOrder1>(t => t.to_equal<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_resemble<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_subtype<SigOrder2>())
        expect.type<SigOrder1>(t => t.to_supertype<SigOrder2>())
        expect.type<SigOrder1>(t => t.not.to_strictly_subtype<SigOrder2>())
        expect.type<SigOrder1>(t => t.not.to_strictly_supertype<SigOrder2>())
    }
)

declare_test(
    "FALSE NEGATIVE≡: Multiple identical call signatures and function type not equal",
    expect => {
        expect.type<() => void>(t =>
            t.not.to_equal<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(t => t.to_resemble<{ (): void; (): void }>())
        expect.type<() => void>(t => t.to_subtype<{ (): void; (): void }>())
        expect.type<() => void>(t =>
            t.to_supertype<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(t =>
            t.not.to_strictly_subtype<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(t =>
            t.not.to_strictly_supertype<{
                (): void
                (): void
            }>()
        )
    }
)
