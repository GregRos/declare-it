import { declare, type } from "@lib"
type Single = [1]
type Double = [1, 2]

declare.test("[1] ⊆ [1]", expect => {
    expect(type<[1]>).to_equal(type<[1]>)
    expect(type<[1]>).to_resemble(type<[1]>)
    expect(type<[1]>).to_subtype(type<[1]>)
    expect(type<[1]>).to_supertype(type<[1]>)
    expect(type<[1]>).not.to_strictly_subtype(type<[1]>)
    expect(type<[1]>).not.to_strictly_supertype(type<[1]>)
})

declare.test("[1, 2] ⊈ [2, 1]", expect => {
    expect(type<[1, 2]>).not.to_equal(type<[2, 1]>)
    expect(type<[1, 2]>).not.to_resemble(type<[2, 1]>)
    expect(type<[1, 2]>).not.to_subtype(type<[2, 1]>)
    expect(type<[1, 2]>).not.to_supertype(type<[2, 1]>)
    expect(type<[1, 2]>).not.to_strictly_subtype(type<[2, 1]>)
    expect(type<[1, 2]>).not.to_strictly_supertype(type<[2, 1]>)
})

declare.test("bff2f1[] ⊂ reafdonly 1[]", expect => {
    const a = type<1[]>
    expect(type<1[]>).to_subtype(type<1[]>)
    expect(type<1[]>).not.to_supertype(type<readonly 1[]>)
    expect(type<1[]>).not.to_strictly_supertype(type<readonly 1[]>)
    expect(type<1[]>).to_strictly_subtype(type<readonly 1[]>)
    expect(type<1[]>).not.to_resemble(type<readonly 1[]>)
    expect(type<1[]>).not.to_equal(type<readonly 1[]>)
})

declare.test("readonly 1[] ≡ Readonly<1[]>", expect => {
    expect(type<readonly [1]>).to_equal(type<Readonly<[1]>>)
    expect(type<readonly [1]>).to_equal(type<Readonly<Readonly<[1]>>>)
})

declare.test("1[] ≡ Array<1>", expect => {
    expect(type<1[]>).to_equal(type<Array<1>>)
})

declare.test("[1] ⊂ [1?]", expect => {
    expect(type<[1]>).to_subtype(type<[1?]>)
    expect(type<[1]>).not.to_supertype(type<[1?]>)
    expect(type<[1]>).not.to_strictly_supertype(type<[1?]>)
    expect(type<[1]>).to_strictly_subtype(type<[1?]>)
    expect(type<[1]>).not.to_resemble(type<[1?]>)
    expect(type<[1]>).not.to_equal(type<[1?]>)
})

declare.test("[1] ⊂ 1[]", expect => {
    const a = type<1[]>
    expect(type<[1]>).to_subtype(type<1[]>)
    expect(type<[1]>).not.to_supertype(type<1[]>)
    expect(type<[1]>).not.to_strictly_supertype(type<1[]>)
    expect(type<[1]>).to_strictly_subtype(type<1[]>)
    expect(type<[1]>).not.to_resemble(type<1[]>)
    expect(type<[1]>).not.to_equal(type<1[]>)
})

declare.test("[1] ⊂ [1, ...1[]]", expect => {
    expect(type<[1]>).to_subtype(type<[1, ...1[]]>)
    expect(type<[1]>).not.to_supertype(type<[1, ...1[]]>)
    expect(type<[1]>).not.to_strictly_supertype(type<[1, ...1[]]>)
    expect(type<[1]>).to_strictly_subtype(type<[1, ...1[]]>)
    expect(type<[1]>).not.to_resemble(type<[1, ...1[]]>)
    expect(type<[1]>).not.to_equal(type<[1, ...1[]]>)
})

declare.test("[1, 1?] ⊄ [1, ...1[]]", expect => {
    expect(type<[1, 1?]>).not.to_subtype(type<[1, ...1[]]>)
    expect(type<[1, 1?]>).not.to_supertype(type<[1, ...1[]]>)
    expect(type<[1, 1?]>).not.to_strictly_supertype(type<[1, ...1[]]>)
    expect(type<[1, 1?]>).not.to_strictly_subtype(type<[1, ...1[]]>)
    expect(type<[1, 1?]>).not.to_resemble(type<[1, ...1[]]>)
    expect(type<[1, 1?]>).not.to_equal(type<[1, ...1[]]>)
})

declare.test("[1, 1?] ⊂ [1, 1?, 1?]", expect => {
    expect(type<[1, 1?]>).to_subtype(type<[1, 1?, 1?]>)
    expect(type<[1, 1?]>).not.to_supertype(type<[1, 1?, 1?]>)
    expect(type<[1, 1?]>).not.to_strictly_supertype(type<[1, 1?, 1?]>)
    expect(type<[1, 1?]>).to_strictly_subtype(type<[1, 1?, 1?]>)
    expect(type<[1, 1?]>).not.to_resemble(type<[1, 1?, 1?]>)
    expect(type<[1, 1?]>).not.to_equal(type<[1, 1?, 1?]>)
})

declare.test("[1 | undefined] ⊂ [1?]", expect => {
    expect(type<[1?]>).to_supertype(type<[1 | undefined]>)
    expect(type<[1?]>).to_strictly_supertype(type<[1 | undefined]>)
    expect(type<[1?]>).not.to_subtype(type<[1 | undefined]>)
    expect(type<[1?]>).not.to_strictly_subtype(type<[1 | undefined]>)
    expect(type<[1?]>).not.to_resemble(type<[1 | undefined]>)
    expect(type<[1?]>).not.to_equal(type<[1 | undefined]>)
})

declare.test(
    "readonly array is the same as applying Readonly on array",
    expect => {
        expect(type<readonly [1]>).to_equal(type<Readonly<[1]>>)
        expect(type<readonly [1]>).to_equal(type<Readonly<Readonly<[1]>>>)
    }
)
