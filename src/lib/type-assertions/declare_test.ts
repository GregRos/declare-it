import type { Asserts } from "./expect_type"
import { declare_test as declare_test_impl } from "../create-test/declare_test"
declare function declare_fun<const Title extends string>(
    title: Title,
    tests: (check: Asserts<Title>) => void | Promise<void>
): void

export const declare = {
    test<const Title extends string>(
        title: Title,
        expect: (check: Asserts<Title>) => void | Promise<void>
    ) {
        declare_test_impl(title, expect)
    }
}
