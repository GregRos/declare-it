import { expect_type, the_type, type_test } from "@lib"

it("tells apart literal types", () => {
    the_type<1>().equals<2>(false)
})

it("tells apart literal types from other types", () => {
    the_type<1>().equals<number>(false)
})

it("tells apart any from other types", () => {
    the_type<any>()
        .equals<number>(false)
        .equals<string>(false)
        .equals<unknown>(false)
        .equals<never>(false)
        .equals<1>(false)
        .equals<void>(false)
})

it("tells apart unknown from other types", () => {
    the_type<unknown>()
        .equals<number>(false)
        .equals<string>(false)
        .equals<any>(false)
        .equals<never>(false)
        .equals<1>(false)
        .equals<void>(false)
})

type_test(
    "tells apart unknown from other types",
    expect_type<unknown>().not.to_equal<number>()
)
it("tells apart never from other types", () => {
    the_type<never>()
        .equals<number>(false)
        .equals<string>(false)
        .equals<any>(false)
        .equals<unknown>(false)
        .equals<1>(false)
        .equals<void>(false)
})

it("tells apart void from other types", () => {
    the_type<void>()
        .equals<number>(false)
        .equals<string>(false)
        .equals<any>(false)
        .equals<unknown>(false)
        .equals<never>(false)
        .equals<1>(false)
        .equals<undefined>(false)
})
