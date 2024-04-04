import { declare_test, expect_type } from "@lib"

declare_test("checks disjunction type", check => {
    check = expect_type<1 | 2>().to_equal<1 | 2>()
    check = expect_type<1 | 2>().not.to_equal<1 | 3>()
    // @ts-expect-error
    check = expect_type<1 | 2>().to_equal<1>()
})
declare_test("checks conjunction type", check => {
    check = expect_type<1 & 2>().to_equal<1 & 2>()
    check = expect_type<1 & 2>().to_equal<1 & 3>()
    // @ts-expect-error
    check = expect_type<1 & 2>().to_equal<1>()
})
declare_test(
    "disjunction type is the same if both operands are the same literal type",
    check => {
        check = expect_type<1 | 1>().to_equal<1>()
        check = expect_type<1 | 1>().not.to_equal<2>()
    }
)
declare_test(
    "conjunction type is the same if both operands are the same literal type",
    check => {
        check = expect_type<1 & 1>().to_equal<1>()
        check = expect_type<1 & 1>().not.to_equal<2>()
    }
)
