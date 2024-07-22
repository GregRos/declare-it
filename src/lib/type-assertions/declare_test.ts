import type { Asserts } from "./expect_type2"
import { declare_test as declare_test_impl } from "../create-test/declare_test"
declare function declare_fun<const Title>(
    title: Title,
    tests: (check: Asserts<Title>) => void | Promise<void>
): void

export const declare_test = declare_test_impl as any as typeof declare_fun
