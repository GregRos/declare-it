import { declare } from "@lib/index"

declare.test(
    "parameter names don't matter: ((x: 1) => void) ≡ ((y: 1) => void)",
    expect => {
        expect.type<(x: 1) => void>(to => to.equal<(y: 1) => void>())
        expect.type<(x: 1) => void>(to => to.resemble<(y: 1) => void>())
        expect.type<(x: 1) => void>(to => to.subtype<(y: 1) => void>())
        expect.type<(x: 1) => void>(to => to.supertype<(y: 1) => void>())
        expect.type<(x: 1) => void>(t =>
            t.not.strictly_subtype<(y: 1) => void>()
        )
        expect.type<(x: 1) => void>(t =>
            t.not.strictly_supertype<(y: 1) => void>()
        )
    }
)

declare.test("reflexivity: (() => void) ≡ (() => void)", expect => {
    expect.type<() => void>(to => to.equal<() => void>())
    expect.type<() => void>(to => to.resemble<() => void>())
    expect.type<() => void>(to => to.subtype<() => void>())
    expect.type<() => void>(to => to.supertype<() => void>())
    expect.type<() => void>(to => to.not.strictly_subtype<() => void>())
    expect.type<() => void>(to => to.not.strictly_supertype<() => void>())
})

declare.test("((a: 1) => void) ⊈ (() => void)", expect => {
    expect.type<(a: 1) => void>(to => to.not.equal<() => void>())
    expect.type<(a: 1) => void>(to => to.not.resemble<() => void>())
    expect.type<(a: 1) => void>(to => to.not.subtype<() => void>())
    expect.type<(a: 1) => void>(to => to.supertype<() => void>())
    expect.type<(a: 1) => void>(to => to.not.strictly_subtype<() => void>())
    expect.type<(a: 1) => void>(to => to.strictly_supertype<() => void>())
})

declare.test("(() => void) ⊆ ((a: 1) => void)", expect => {
    expect.type<() => void>(to => to.subtype<(a: 1) => void>())
    expect.type<() => void>(to => to.not.supertype<(a: 1) => void>())
    expect.type<() => void>(to => to.not.strictly_supertype<(a: 1) => void>())
    expect.type<() => void>(to => to.strictly_subtype<(a: 1) => void>())
    expect.type<() => void>(to => to.not.resemble<(a: 1) => void>())
    expect.type<() => void>(to => to.not.equal<(a: 1) => void>())
})

declare.test("(() => 1) ⊂ (() => number)", expect => {
    expect.type<() => 1>(to => to.subtype<() => number>())
    expect.type<() => 1>(to => to.not.supertype<() => number>())
    expect.type<() => 1>(to => to.not.strictly_supertype<() => number>())
    expect.type<() => 1>(to => to.strictly_subtype<() => number>())
    expect.type<() => 1>(to => to.not.resemble<() => number>())
    expect.type<() => 1>(to => to.not.equal<() => number>())
})

declare.test("(() => 1) ⊂ ((...args: 1[]) => void)", expect => {
    expect.type<() => 1>(to => to.subtype<(...args: 1[]) => void>())
    expect.type<() => 1>(to => to.not.supertype<(...args: 1[]) => void>())
    expect.type<() => 1>(t =>
        t.not.strictly_supertype<(...args: 1[]) => void>()
    )
    expect.type<() => 1>(to => to.strictly_subtype<(...args: 1[]) => void>())
    expect.type<() => 1>(to => to.not.resemble<(...args: 1[]) => void>())
    expect.type<() => 1>(to => to.not.equal<(...args: 1[]) => void>())
})

declare.test("((x: number) => 1) ⊂ ((x: 1) => 1)", expect => {
    expect.type<(x: number) => 1>(to => to.subtype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(to => to.not.supertype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(t =>
        t.not.strictly_supertype<(x: 1) => number>()
    )
    expect.type<(x: number) => 1>(to => to.strictly_subtype<(x: 1) => 1>())
    expect.type<(x: number) => 1>(to => to.not.resemble<(x: 1) => 1>())
    expect.type<(x: number) => 1>(to => to.not.equal<(x: 1) => 1>())
})

declare.test("(this: number) => void ⊈ (this: string) => void", expect => {
    expect.type<(this: number) => void>(t =>
        t.not.equal<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.resemble<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.subtype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.supertype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.strictly_subtype<(this: string) => void>()
    )
    expect.type<(this: number) => void>(t =>
        t.not.strictly_supertype<(this: string) => void>()
    )
})

declare.test("((x?: 1) => void) ≈ ((x: 1 | undefined) => void)", expect => {
    expect.type<(x?: 1) => void>(to =>
        to.not.equal<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(to =>
        to.resemble<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(to => to.subtype<(x: 1 | undefined) => void>())
    expect.type<(x?: 1) => void>(to =>
        to.supertype<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.not.strictly_subtype<(x: 1 | undefined) => void>()
    )
    expect.type<(x?: 1) => void>(t =>
        t.not.strictly_supertype<(x: 1 | undefined) => void>()
    )
})

declare.test("(any function) ⊂ Function", expect => {
    expect.type<() => void>(to => to.subtype<Function>())
    expect.type<(...args: any) => any>(to => to.subtype<Function>())
    expect.type<(a: any) => any>(to => to.strictly_subtype<Function>())
    expect.type<(this: any) => any>(to => to.strictly_subtype<Function>())
})

declare.test("(({(): 1}) ≡ (() => 1)", expect => {
    type CallSig = { (): 1 }
    type Func = () => 1
    expect.type<CallSig>(to => to.equal<Func>())
    expect.type<CallSig>(to => to.resemble<Func>())
    expect.type<CallSig>(to => to.subtype<Func>())
    expect.type<CallSig>(to => to.supertype<Func>())
    expect.type<CallSig>(to => to.not.strictly_subtype<Func>())
    expect.type<CallSig>(to => to.not.strictly_supertype<Func>())
})

declare.test("({(): 1; (): 2}) ⊂ (() => 1)", expect => {
    type CallSig = { (): 1; (): 2 }
    type Func = () => 1
    expect.type<CallSig>(to => to.subtype<Func>())
    expect.type<CallSig>(to => to.not.supertype<Func>())
    expect.type<CallSig>(to => to.not.strictly_supertype<Func>())
    expect.type<CallSig>(to => to.strictly_subtype<Func>())
    expect.type<CallSig>(to => to.not.resemble<Func>())
    expect.type<CallSig>(to => to.not.equal<Func>())
})

declare.test(
    "FALSE POSITIVE: Only TO_EQUAL tells apart call signature order",
    expect => {
        type SigOrder1 = { (): 1; (): 2 }
        type SigOrder2 = { (): 2; (): 1 }
        expect.type<SigOrder1>(to => to.not.equal<SigOrder2>())
        expect.type<SigOrder1>(to => to.resemble<SigOrder2>())
        expect.type<SigOrder1>(to => to.subtype<SigOrder2>())
        expect.type<SigOrder1>(to => to.supertype<SigOrder2>())
        expect.type<SigOrder1>(to => to.not.strictly_subtype<SigOrder2>())
        expect.type<SigOrder1>(to => to.not.strictly_supertype<SigOrder2>())
    }
)

declare.test(
    "FALSE POSITIVE≡: Order ALWAYS ignored for order-sensitive intersections of call sigs",
    expect => {
        type SigOrder1 = { (): 1 } & { (): 2 }
        type SigOrder2 = { (): 2 } & { (): 1 }
        expect.type<SigOrder1>(to => to.equal<SigOrder2>())
        expect.type<SigOrder1>(to => to.resemble<SigOrder2>())
        expect.type<SigOrder1>(to => to.subtype<SigOrder2>())
        expect.type<SigOrder1>(to => to.supertype<SigOrder2>())
        expect.type<SigOrder1>(to => to.not.strictly_subtype<SigOrder2>())
        expect.type<SigOrder1>(to => to.not.strictly_supertype<SigOrder2>())
    }
)

declare.test(
    "FALSE NEGATIVE≡: Multiple identical call signatures and function type not equal",
    expect => {
        expect.type<() => void>(t =>
            t.not.equal<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(to => to.resemble<{ (): void; (): void }>())
        expect.type<() => void>(to => to.subtype<{ (): void; (): void }>())
        expect.type<() => void>(t =>
            t.supertype<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(t =>
            t.not.strictly_subtype<{
                (): void
                (): void
            }>()
        )
        expect.type<() => void>(t =>
            t.not.strictly_supertype<{
                (): void
                (): void
            }>()
        )
    }
)
