import { declare_test, expect_type } from "@lib"

declare_test(
    "checks type parameters",
    expect_type<<T>() => void>().not.to_equal<() => void>()
)

declare_test(
    "does not check type parameter names",
    expect_type<<T>() => void>().to_equal<<U>() => void>()
)

declare_test(
    "checks type parameter number",
    expect_type<<T, U>() => void>().not.to_equal<<T>() => void>()
)

declare_test(
    "checks type parameter default",
    expect_type<<T = 1>() => void>().not.to_equal<<T>() => void>(),
    // @ts-expect-error
    expect_type<<T = 1>() => void>().to_equal<<T = 2>() => void>(),
    expect_type<<T, S = T>() => void>().to_equal<<X, Y = X>() => void>()
)

declare_test(
    "checks type parameter constraints",
    expect_type<<T extends 1>() => void>().not.to_equal<
        <T extends 2>() => void
    >(),
    // @ts-expect-error
    expect_type<<T extends 1>() => void>().to_equal<<T extends 2>() => void>(),
    expect_type<<T extends 1, U extends T>() => void>().not.to_equal<
        <T extends 1, U extends 2>() => void
    >()
)

declare_test(
    "doesn't tell apart empty constraints from unconstrained.js",
    expect_type<<T extends unknown>() => void>().to_equal<<T>() => void>()
)

declare_test(
    "doesn't get confused by empty constraints",
    expect_type<
        <T extends S & unknown, S extends unknown>() => void
    >().to_equal<<T extends S, S>() => void>()
)

declare_test(
    "tells apart overloaded call signatures from function types.js",
    expect_type<() => void>().not.to_equal<{ (): void; (): 1 }>()
)
