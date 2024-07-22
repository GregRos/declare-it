import { declare_test } from "@lib"
type Single = [1]
type Double = [1, 2]

declare_test("[1] ⊆ [1]", expect => {
    expect = expect_type<[1]>().to_equal<[1]>()
    expect = expect_type<[1]>().to_resemble<[1]>()
    expect = expect_type<[1]>().to_subtype<[1]>()
    expect = expect_type<[1]>().to_supertype<[1]>()
    expect = expect_type<[1]>().not.to_strictly_subtype<[1]>()
    expect = expect_type<[1]>().not.to_strictly_supertype<[1]>()
})

declare_test("[1, 2] ⊈ [2, 1]", expect => {
    expect = expect_type<[1, 2]>().not.to_equal<[2, 1]>()
    expect = expect_type<[1, 2]>().not.to_resemble<[2, 1]>()
    expect = expect_type<[1, 2]>().not.to_subtype<[2, 1]>()
    expect = expect_type<[1, 2]>().not.to_supertype<[2, 1]>()
    expect = expect_type<[1, 2]>().not.to_strictly_subtype<[2, 1]>()
    expect = expect_type<[1, 2]>().not.to_strictly_supertype<[2, 1]>()
})

declare_test("1[] ⊂ readonly 1[]", expect => {
    expect = expect_type<1[]>().to_subtype<readonly 1[]>()
    expect = expect_type<1[]>().not.to_supertype<readonly 1[]>()
    expect = expect_type<1[]>().not.to_strictly_supertype<readonly 1[]>()
    expect = expect_type<1[]>().to_strictly_subtype<readonly 1[]>()
    expect = expect_type<1[]>().not.to_resemble<readonly 1[]>()
    expect = expect_type<1[]>().not.to_equal<readonly 1[]>()
})

declare_test("readonly 1[] ≡ Readonly<1[]>", expect => {
    expect = expect_type<readonly [1]>().to_equal<Readonly<[1]>>()
    expect = expect_type<readonly [1]>().to_equal<Readonly<Readonly<[1]>>>()
})

declare_test("1[] ≡ Array<1>", expect => {
    expect = expect_type<1[]>().to_equal<Array<1>>()
})

declare_test("[1] ⊂ [1?]", expect => {
    expect = expect_type<[1]>().to_subtype<[1?]>()
    expect = expect_type<[1]>().not.to_supertype<[1?]>()
    expect = expect_type<[1]>().not.to_strictly_supertype<[1?]>()
    expect = expect_type<[1]>().to_strictly_subtype<[1?]>()
    expect = expect_type<[1]>().not.to_resemble<[1?]>()
    expect = expect_type<[1]>().not.to_equal<[1?]>()
})

declare_test("[1] ⊂ 1[]", expect => {
    expect = expect_type<[1]>().to_subtype<1[]>()
    expect = expect_type<[1]>().not.to_supertype<1[]>()
    expect = expect_type<[1]>().not.to_strictly_supertype<1[]>()
    expect = expect_type<[1]>().to_strictly_subtype<1[]>()
    expect = expect_type<[1]>().not.to_resemble<1[]>()
    expect = expect_type<[1]>().not.to_equal<1[]>()
})

declare_test("[1] ⊂ [1, ...1[]]", expect => {
    expect = expect_type<[1]>().to_subtype<[1, ...1[]]>()
    expect = expect_type<[1]>().not.to_supertype<[1, ...1[]]>()
    expect = expect_type<[1]>().not.to_strictly_supertype<[1, ...1[]]>()
    expect = expect_type<[1]>().to_strictly_subtype<[1, ...1[]]>()
    expect = expect_type<[1]>().not.to_resemble<[1, ...1[]]>()
    expect = expect_type<[1]>().not.to_equal<[1, ...1[]]>()
})

declare_test("[1, 1?] ⊄ [1, ...1[]]", expect => {
    expect = expect_type<[1, 1?]>().not.to_subtype<[1, ...1[]]>()
    expect = expect_type<[1, 1?]>().not.to_supertype<[1, ...1[]]>()
    expect = expect_type<[1, 1?]>().not.to_strictly_supertype<[1, ...1[]]>()
    expect = expect_type<[1, 1?]>().not.to_strictly_subtype<[1, ...1[]]>()
    expect = expect_type<[1, 1?]>().not.to_resemble<[1, ...1[]]>()
    expect = expect_type<[1, 1?]>().not.to_equal<[1, ...1[]]>()
})

declare_test("[1, 1?] ⊂ [1, 1?, 1?]", expect => {
    expect = expect_type<[1, 1?]>().to_subtype<[1, 1?, 1?]>()
    expect = expect_type<[1, 1?]>().not.to_supertype<[1, 1?, 1?]>()
    expect = expect_type<[1, 1?]>().not.to_strictly_supertype<[1, 1?, 1?]>()
    expect = expect_type<[1, 1?]>().to_strictly_subtype<[1, 1?, 1?]>()
    expect = expect_type<[1, 1?]>().not.to_resemble<[1, 1?, 1?]>()
    expect = expect_type<[1, 1?]>().not.to_equal<[1, 1?, 1?]>()
})

declare_test("[1 | undefined] ⊂ [1?]", expect => {
    expect = expect_type<[1?]>().to_supertype<[1 | undefined]>()
    expect = expect_type<[1?]>().to_strictly_supertype<[1 | undefined]>()
    expect = expect_type<[1?]>().not.to_subtype<[1 | undefined]>()
    expect = expect_type<[1?]>().not.to_strictly_subtype<[1 | undefined]>()
    expect = expect_type<[1?]>().not.to_resemble<[1 | undefined]>()
    expect = expect_type<[1?]>().not.to_equal<[1 | undefined]>()
})

declare_test(
    "readonly array is the same as applying Readonly on array",
    expect => {
        expect = expect_type<readonly [1]>().to_equal<Readonly<[1]>>()
        expect = expect_type<readonly [1]>().to_equal<Readonly<Readonly<[1]>>>()
    }
)
