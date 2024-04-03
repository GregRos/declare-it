import { declare_test, expect_type } from "@lib.js"

declare_test(
    "tells apart literal types from other types.js",
    expect_type<1>().not.to_equal<number>()
)

declare_test(
    "tells apart unknown from other types.js",
    expect_type<unknown>().not.to_equal<number>(),
    expect_type<unknown>().not.to_equal<string>(),
    expect_type<unknown>().not.to_equal<never>(),
    expect_type<unknown>().not.to_equal<void>(),
    expect_type<unknown>().not.to_equal<1>(),
    expect_type<unknown>().not.to_equal<undefined>()
)

declare_test(
    "tells apart never from other types.js",
    expect_type<never>().not.to_equal<number>(),
    expect_type<never>().not.to_equal<string>(),
    expect_type<never>().not.to_equal<unknown>(),
    expect_type<never>().not.to_equal<void>(),
    expect_type<never>().not.to_equal<1>(),
    expect_type<never>().not.to_equal<undefined>()
)

declare_test(
    "tells apart void from other types.js",
    expect_type<void>().not.to_equal<number>(),
    expect_type<void>().not.to_equal<string>(),
    expect_type<void>().not.to_equal<unknown>(),
    expect_type<void>().not.to_equal<never>(),
    expect_type<void>().not.to_equal<1>(),
    expect_type<void>().not.to_equal<undefined>()
)

declare_test(
    "tells apart undefined from other types.js",
    expect_type<undefined>().not.to_equal<number>(),
    expect_type<undefined>().not.to_equal<string>(),
    expect_type<undefined>().not.to_equal<unknown>(),
    expect_type<undefined>().not.to_equal<never>(),
    expect_type<undefined>().not.to_equal<void>(),
    expect_type<undefined>().not.to_equal<1>()
)

declare_test(
    "tells apart null from other types.js",
    expect_type<null>().not.to_equal<number>(),
    expect_type<null>().not.to_equal<string>(),
    expect_type<null>().not.to_equal<unknown>(),
    expect_type<null>().not.to_equal<never>(),
    expect_type<null>().not.to_equal<void>(),
    expect_type<null>().not.to_equal<undefined>(),
    expect_type<null>().not.to_equal<1>()
)
