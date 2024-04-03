import { declare_test, expect_type } from "@lib"

declare_test("checks array", expect_type<[1]>().to_equal<[1]>())

declare_test(
    "checks readonly array",
    expect_type<readonly [1]>().not.to_equal<[1]>(),
    // @ts-expect-error
    expect_type<readonly [1]>().to_equal<[1]>()
)

declare_test(
    "readonly array is the same as applying Readonly on array",
    expect_type<readonly [12]>().to_equal<Readonly<[1]>>(),
    expect_type<readonly [1]>().to_equal<Readonly<Readonly<[1]>>>()
)
declare_test(
    "checks that number is equal to string?",
    expect_type<number>().to_equal<string>(),
    expect_type<string>().to_equal<string>()
)

declare_test(
    "square brackets array is the same as Array",
    expect_type<1[]>().to_equal<Array<1>>()
)

declare_test(
    "checks optional tuple element",
    expect_type<[1?]>().not.to_equal<[1]>(),
    // @ts-expect-error
    expect_type<[1?]>().to_equal<[1]>()
)

declare_test(
    "checks array order",
    expect_type<[1, 2]>().not.to_equal<[2, 1]>(),
    // @ts-expect-error
    expect_type<[1, 2]>().to_equal<[2, 1]>()
)

declare_test(
    "checks array length",
    expect_type<[1]>().not.to_equal<[1, 2]>(),
    // @ts-expect-error
    expect_type<[1]>().to_equal<[1, 2]>()
)
