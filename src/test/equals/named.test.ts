import { declare_test, expect_type } from "@lib"

{
    type A = 1
    type B = 1
    declare_test("checks named type", expect_type<A>().to_equal<B>())
}

{
    type A = {
        a: A
    }
    type B = {
        a: B
    }
    declare_test("checks named type in recursive type", check => {
        expect_type<A>().to_equal<B>()
    })
}
