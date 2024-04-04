import { declare_test, expect_type } from "@lib"

declare_test("checks object", expect_type<{ a: 1 }>().to_equal<{ a: 1 }>())

declare_test("checks object with multiple keys", check => {
    check = expect_type<{ a: 1; b: 2 }>().to_equal<{ a: 1; b: 2 }>()
})
declare_test("checks object with different key types", check => {
    check = expect_type<{ a: 1; b: "2" }>().to_equal<{ a: 1; b: "2" }>()
})
declare_test("checks readonly key", check => {
    check = expect_type<{ readonly a: 1 }>().not.to_equal<{ a: 1 }>()
    // @ts-expect-error
    check = expect_type<{ readonly a: 1 }>().to_equal<{ a: 1 }>()
})
declare_test("checks optional key", check => {
    check = expect_type<{ a?: 1 }>().not.to_equal<{ a: 1 }>()
    // @ts-expect-error
    check = expect_type<{ a?: 1 }>().to_equal<{ a: 1 }>()
})
declare_test("does not check key order", check => {
    check = expect_type<{ a: 1; b: 2 }>().to_equal<{ b: 2; a: 1 }>()
    // @ts-expect-error
    check = expect_type<{ a: 1; b: 2 }>().not.to_equal<{ b: 2; a: 1 }>()
})
declare_test("does not check number vs numeric keys", check => {
    check = expect_type<{ 1: 1 }>().to_equal<{ "1": 1 }>()
})
declare_test("does not check disjunction order", check => {
    check = expect_type<{ a: 1 } | { b: 2 }>().to_equal<{ b: 2 } | { a: 1 }>()
    // @ts-expect-error
    check = expect_type<{ a: 1 } | { b: 2 }>().not.to_equal<
        { b: 2 } | { a: 1 }
    >()
})
declare_test("does not check intersection order", check => {
    check = expect_type<{ a: 1 } & { b: 2 }>().to_equal<{ b: 2 } & { a: 1 }>()
    // @ts-expect-error
    check = expect_type<{ a: 1 } & { b: 2 }>().not.to_equal<
        { b: 2 } & { a: 1 }
    >()
})
declare_test("doesn't tell method from function property.js", check => {
    check = expect_type<{ a(): void }>().to_equal<{ a: () => void }>()
})
declare_test("doesn't tell generic method from function property.js", check => {
    check = expect_type<{ a<T>(): void }>().to_equal<{ a: <T>() => void }>()
})
