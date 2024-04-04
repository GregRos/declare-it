import { declare_test, expect_type } from "@lib"

declare_test("checks array", expect_type<[1]>().to_equal<[1]>())

declare_test("checks readonly array", check => {
    check = expect_type<readonly [1]>().not.to_equal<[1]>()
    // @ts-expect-error
    check = expect_type<readonly [1]>().to_equal<[1]>()
})
declare_test(
    "readonly array is the same as applying Readonly on array",
    check => {
        check = expect_type<readonly [1]>().to_equal<Readonly<[1]>>()
        check = expect_type<readonly [1]>().to_equal<Readonly<Readonly<[1]>>>()
    }
)
declare_test("square brackets array is the same as Array", check => {
    check = expect_type<1[]>().to_equal<Array<1>>()
})
declare_test("checks optional tuple element", check => {
    check = expect_type<[1?]>().not.to_equal<[1]>()
    // @ts-expect-error
    check = expect_type<[1?]>().to_equal<[1]>()
})
declare_test("checks array order", check => {
    check = expect_type<[1, 2]>().not.to_equal<[2, 1]>()
    // @ts-expect-error
    check = check = expect_type<[1, 2]>().to_equal<[2, 1]>()
})
declare_test("checks array length", check => {
    check = expect_type<[1]>().not.to_equal<[1, 2]>()
    // @ts-expect-error
    check = check = expect_type<[1]>().to_equal<[1, 2]>()
})
