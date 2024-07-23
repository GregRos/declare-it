import { declare } from "@lib"
type Single = [1]
type Double = [1, 2]

declare.test("[1] ⊆ [1]", expect => {
    expect.type<[1]>(to => to.equal<[1]>())
    expect.type<[1]>(to => to.resemble<[1]>())
    expect.type<[1]>(to => to.subtype<[1]>())
    expect.type<[1]>(to => to.supertype<[1]>())
    expect.type<[1]>(to => to.not.strictly_subtype<[1]>())
    expect.type<[1]>(to => to.not.strictly_supertype<[1]>())
})

declare.test("[1, 2] ⊈ [2, 1]", expect => {
    expect.type<[1, 2]>(to => to.not.equal<[2, 1]>())
    expect.type<[1, 2]>(to => to.not.resemble<[2, 1]>())
    expect.type<[1, 2]>(to => to.not.subtype<[2, 1]>())
    expect.type<[1, 2]>(to => to.not.supertype<[2, 1]>())
    expect.type<[1, 2]>(to => to.not.strictly_subtype<[2, 1]>())
    expect.type<[1, 2]>(to => to.not.strictly_supertype<[2, 1]>())
})

declare.test("1[] ⊂ readonly 1[]", expect => {
    expect.type<1[]>(to => to.subtype<readonly 1[]>())
    expect.type<1[]>(to => to.not.supertype<readonly 1[]>())
    expect.type<1[]>(to => to.not.strictly_supertype<readonly 1[]>())
    expect.type<1[]>(to => to.strictly_subtype<readonly 1[]>())
    expect.type<1[]>(to => to.not.resemble<readonly 1[]>())
    expect.type<1[]>(to => to.not.equal<readonly 1[]>())
})

declare.test("readonly 1[] ≡ Readonly<1[]>", expect => {
    expect.type<readonly [1]>(to => to.equal<Readonly<[1]>>())
    expect.type<readonly [1]>(to => to.equal<Readonly<Readonly<[1]>>>())
})

declare.test("1[] ≡ Array<1>", expect => {
    expect.type<1[]>(to => to.equal<Array<1>>())
})

declare.test("[1] ⊂ [1?]", expect => {
    expect.type<[1]>(to => to.subtype<[1?]>())
    expect.type<[1]>(to => to.not.supertype<[1?]>())
    expect.type<[1]>(to => to.not.strictly_supertype<[1?]>())
    expect.type<[1]>(to => to.strictly_subtype<[1?]>())
    expect.type<[1]>(to => to.not.resemble<[1?]>())
    expect.type<[1]>(to => to.not.equal<[1?]>())
})

declare.test("[1] ⊂ 1[]", expect => {
    expect.type<[1]>(to => to.subtype<1[]>())
    expect.type<[1]>(to => to.not.supertype<1[]>())
    expect.type<[1]>(to => to.not.strictly_supertype<1[]>())
    expect.type<[1]>(to => to.strictly_subtype<1[]>())
    expect.type<[1]>(to => to.not.resemble<1[]>())
    expect.type<[1]>(to => to.not.equal<1[]>())
})

declare.test("[1] ⊂ [1, ...1[]]", expect => {
    expect.type<[1]>(to => to.subtype<[1, ...1[]]>())
    expect.type<[1]>(to => to.not.supertype<[1, ...1[]]>())
    expect.type<[1]>(to => to.not.strictly_supertype<[1, ...1[]]>())
    expect.type<[1]>(to => to.strictly_subtype<[1, ...1[]]>())
    expect.type<[1]>(to => to.not.resemble<[1, ...1[]]>())
    expect.type<[1]>(to => to.not.equal<[1, ...1[]]>())
})

declare.test("[1, 1?] ⊄ [1, ...1[]]", expect => {
    expect.type<[1, 1?]>(to => to.not.subtype<[1, ...1[]]>())
    expect.type<[1, 1?]>(to => to.not.supertype<[1, ...1[]]>())
    expect.type<[1, 1?]>(to => to.not.strictly_supertype<[1, ...1[]]>())
    expect.type<[1, 1?]>(to => to.not.strictly_subtype<[1, ...1[]]>())
    expect.type<[1, 1?]>(to => to.not.resemble<[1, ...1[]]>())
    expect.type<[1, 1?]>(to => to.not.equal<[1, ...1[]]>())
})

declare.test("[1, 1?] ⊂ [1, 1?, 1?]", expect => {
    expect.type<[1, 1?]>(to => to.subtype<[1, 1?, 1?]>())
    expect.type<[1, 1?]>(to => to.not.supertype<[1, 1?, 1?]>())
    expect.type<[1, 1?]>(to => to.not.strictly_supertype<[1, 1?, 1?]>())
    expect.type<[1, 1?]>(to => to.strictly_subtype<[1, 1?, 1?]>())
    expect.type<[1, 1?]>(to => to.not.resemble<[1, 1?, 1?]>())
    expect.type<[1, 1?]>(to => to.not.equal<[1, 1?, 1?]>())
})

declare.test("[1 | undefined] ⊂ [1?]", expect => {
    expect.type<[1?]>(to => to.supertype<[1 | undefined]>())
    expect.type<[1?]>(to => to.strictly_supertype<[1 | undefined]>())
    expect.type<[1?]>(to => to.not.subtype<[1 | undefined]>())
    expect.type<[1?]>(to => to.not.strictly_subtype<[1 | undefined]>())
    expect.type<[1?]>(to => to.not.resemble<[1 | undefined]>())
    expect.type<[1?]>(to => to.not.equal<[1 | undefined]>())
})

declare.test(
    "readonly array is the same as applying Readonly on array",
    expect => {
        expect.type<readonly [1]>(to => to.equal<Readonly<[1]>>())
        expect.type<readonly [1]>(to => to.equal<Readonly<Readonly<[1]>>>())
    }
)
