import { declare_test, expect_type } from "@lib.js"

declare_test(
    "checks disjunction type",
    expect_type<1 | 2>().to_equal<1 | 2>(),
    expect_type<1 | 2>().not.to_equal<1 | 3>(),
    // @ts-expect-error
    expect_type<1 | 2>().to_equal<1>()
)

declare_test(
    "checks conjunction type",
    expect_type<1 & 2>().to_equal<1 & 2>(),
    expect_type<1 & 2>().to_equal<1 & 3>(),
    // @ts-expect-error
    expect_type<1 & 2>().to_equal<1>()
)

declare_test(
    "disjunction type is the same if both operands are the same literal type",
    expect_type<1 | 1>().to_equal<1>(),
    expect_type<1 | 1>().not.to_equal<2>()
)

declare_test(
    "conjunction type is the same if both operands are the same literal type",
    expect_type<1 & 1>().to_equal<1>(),
    expect_type<1 & 1>().not.to_equal<2>()
)
