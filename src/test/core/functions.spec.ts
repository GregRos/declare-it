import { declare, type } from "@lib/index"

declare.test(
    "parameter names don't matter: ((x: 1) => void) ≡ ((y: 1) => void)",
    expect => {
        expect(type<(x: 1) => void>).to_equal(type<(y: 1) => void>)
        expect(type<(x: 1) => void>).to_resemble(type<(y: 1) => void>)
        expect(type<(x: 1) => void>).to_subtype(type<(y: 1) => void>)
        expect(type<(x: 1) => void>).to_supertype(type<(y: 1) => void>)
        expect(type<(x: 1) => void>).not.to_strictly_subtype(
            type<(y: 1) => void>
        )
        expect(type<(x: 1) => void>).not.to_strictly_supertype(
            type<(y: 1) => void>
        )
    }
)

declare.test("reflexivity: (() => void) ≡ (() => void)", expect => {
    expect(type<() => void>).to_equal(type<() => void>)
    expect(type<() => void>).to_resemble(type<() => void>)
    expect(type<() => void>).to_subtype(type<() => void>)
    expect(type<() => void>).to_supertype(type<() => void>)
    expect(type<() => void>).not.to_strictly_subtype(type<() => void>)
    expect(type<() => void>).not.to_strictly_supertype(type<() => void>)
})

declare.test("((a: 1) => void) ⊈ (() => void)", expect => {
    expect(type<(a: 1) => void>).not.to_equal(type<() => void>)
    expect(type<(a: 1) => void>).not.to_resemble(type<() => void>)
    expect(type<(a: 1) => void>).not.to_subtype(type<() => void>)
    expect(type<(a: 1) => void>).to_supertype(type<() => void>)
    expect(type<(a: 1) => void>).not.to_strictly_subtype(type<() => void>)
    expect(type<(a: 1) => void>).to_strictly_supertype(type<() => void>)
})

declare.test("(() => void) ⊆ ((a: 1) => void)", expect => {
    expect(type<() => void>).to_subtype(type<(a: 1) => void>)
    expect(type<() => void>).not.to_supertype(type<(a: 1) => void>)
    expect(type<() => void>).not.to_strictly_supertype(type<(a: 1) => void>)
    expect(type<() => void>).to_strictly_subtype(type<(a: 1) => void>)
    expect(type<() => void>).not.to_resemble(type<(a: 1) => void>)
    expect(type<() => void>).not.to_equal(type<(a: 1) => void>)
})

declare.test("(() => 1) ⊂ (() => number)", expect => {
    expect(type<() => 1>).to_subtype(type<() => number>)
    expect(type<() => 1>).not.to_supertype(type<() => number>)
    expect(type<() => 1>).not.to_strictly_supertype(type<() => number>)
    expect(type<() => 1>).to_strictly_subtype(type<() => number>)
    expect(type<() => 1>).not.to_resemble(type<() => number>)
    expect(type<() => 1>).not.to_equal(type<() => number>)
})

declare.test("(() => 1) ⊂ ((...args: 1[]) => void)", expect => {
    expect(type<() => 1>).to_subtype(type<(...args: 1[]) => void>)
    expect(type<() => 1>).not.to_supertype(type<(...args: 1[]) => void>)
    expect(type<() => 1>).not.to_strictly_supertype(
        type<(...args: 1[]) => void>
    )
    expect(type<() => 1>).to_strictly_subtype(type<(...args: 1[]) => void>)
    expect(type<() => 1>).not.to_resemble(type<(...args: 1[]) => void>)
    expect(type<() => 1>).not.to_equal(type<(...args: 1[]) => void>)
})

declare.test("((x: number) => 1) ⊂ ((x: 1) => 1)", expect => {
    expect(type<(x: number) => 1>).to_subtype(type<(x: 1) => 1>)
    expect(type<(x: number) => 1>).not.to_supertype(type<(x: 1) => 1>)
    expect(type<(x: number) => 1>).not.to_strictly_supertype(
        type<(x: 1) => number>
    )
    expect(type<(x: number) => 1>).to_strictly_subtype(type<(x: 1) => 1>)
    expect(type<(x: number) => 1>).not.to_resemble(type<(x: 1) => 1>)
    expect(type<(x: number) => 1>).not.to_equal(type<(x: 1) => 1>)
})

declare.test("(this: number) => void ⊈ (this: string) => void", expect => {
    expect(type<(this: number) => void>).not.to_equal(
        type<(this: string) => void>
    )
    expect(type<(this: number) => void>).not.to_resemble(
        type<(this: string) => void>
    )
    expect(type<(this: number) => void>).not.to_subtype(
        type<(this: string) => void>
    )
    expect(type<(this: number) => void>).not.to_supertype(
        type<(this: string) => void>
    )
    expect(type<(this: number) => void>).not.to_strictly_subtype(
        type<(this: string) => void>
    )
    expect(type<(this: number) => void>).not.to_strictly_supertype(
        type<(this: string) => void>
    )
})

declare.test("((x?: 1) => void) ≈ ((x: 1 | undefined) => void)", expect => {
    expect(type<(x?: 1) => void>).not.to_equal(type<(x: 1 | undefined) => void>)
    expect(type<(x?: 1) => void>).to_resemble(type<(x: 1 | undefined) => void>)
    expect(type<(x?: 1) => void>).to_subtype(type<(x: 1 | undefined) => void>)
    expect(type<(x?: 1) => void>).to_supertype(type<(x: 1 | undefined) => void>)
    expect(type<(x?: 1) => void>).not.to_strictly_subtype(
        type<(x: 1 | undefined) => void>
    )
    expect(type<(x?: 1) => void>).not.to_strictly_supertype(
        type<(x: 1 | undefined) => void>
    )
})

declare.test("(any function) ⊂ Function", expect => {
    expect(type<() => void>).to_subtype(type<Function>)
    expect(type<(...args: any) => any>).to_subtype(type<Function>)
    expect(type<(a: any) => any>).to_strictly_subtype(type<Function>)
    expect(type<(this: any) => any>).to_strictly_subtype(type<Function>)
})

declare.test("(({(): 1}) ≡ (() => 1)", expect => {
    type CallSig = { (): 1 }
    type Func = () => 1
    expect(type<CallSig>).to_equal(type<Func>)
    expect(type<CallSig>).to_resemble(type<Func>)
    expect(type<CallSig>).to_subtype(type<Func>)
    expect(type<CallSig>).to_supertype(type<Func>)
    expect(type<CallSig>).not.to_strictly_subtype(type<Func>)
    expect(type<CallSig>).not.to_strictly_supertype(type<Func>)
})

declare.test("({(): 1; (): 2}) ⊂ (() => 1)", expect => {
    type CallSig = { (): 1; (): 2 }
    type Func = () => 1
    expect(type<CallSig>).to_subtype(type<Func>)
    expect(type<CallSig>).not.to_supertype(type<Func>)
    expect(type<CallSig>).not.to_strictly_supertype(type<Func>)
    expect(type<CallSig>).to_strictly_subtype(type<Func>)
    expect(type<CallSig>).not.to_resemble(type<Func>)
    expect(type<CallSig>).not.to_equal(type<Func>)
})

declare.test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart call signature order",
    expect => {
        type SigOrder1 = { (): 1; (): 2 }
        type SigOrder2 = { (): 2; (): 1 }
        expect(type<SigOrder1>).not.to_equal(type<SigOrder2>)
        expect(type<SigOrder1>).to_resemble(type<SigOrder2>)
        expect(type<SigOrder1>).to_subtype(type<SigOrder2>)
        expect(type<SigOrder1>).to_supertype(type<SigOrder2>)
        expect(type<SigOrder1>).not.to_strictly_subtype(type<SigOrder2>)
        expect(type<SigOrder1>).not.to_strictly_supertype(type<SigOrder2>)
    }
)

declare.test(
    "FALSE POSITIVE≡: Order ALWAYS ignored for order-sensitive intersections of call sigs",
    expect => {
        type SigOrder1 = { (): 1 } & { (): 2 }
        type SigOrder2 = { (): 2 } & { (): 1 }
        expect(type<SigOrder1>).to_equal(type<SigOrder2>)
        expect(type<SigOrder1>).to_resemble(type<SigOrder2>)
        expect(type<SigOrder1>).to_subtype(type<SigOrder2>)
        expect(type<SigOrder1>).to_supertype(type<SigOrder2>)
        expect(type<SigOrder1>).not.to_strictly_subtype(type<SigOrder2>)
        expect(type<SigOrder1>).not.to_strictly_supertype(type<SigOrder2>)
    }
)

declare.test(
    "FALSE NEGATIVE≡: Multiple identical call signatures and function type not equal",
    expect => {
        expect(type<() => void>).not.to_equal(
            type<{
                (): void
                (): void
            }>
        )
        expect(type<() => void>).to_resemble(type<{ (): void; (): void }>)
        expect(type<() => void>).to_subtype(type<{ (): void; (): void }>)
        expect(type<() => void>).to_supertype(
            type<{
                (): void
                (): void
            }>
        )
        expect(type<() => void>).not.to_strictly_subtype(
            type<{
                (): void
                (): void
            }>
        )
        expect(type<() => void>).not.to_strictly_supertype(
            type<{
                (): void
                (): void
            }>
        )
    }
)
