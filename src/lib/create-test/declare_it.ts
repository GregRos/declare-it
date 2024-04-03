import { FancyTestTitleText } from "../type-assertions/texts.js"
import { getRegisterTestFunction } from "./find-test-function.js"
import { expect_type } from "../type-assertions/expect_type.js"
import { logTestCase } from "./log-test.js"
import { TestFunction, RegisterTestFunction } from "./types.js"
let registerFrameworkTest: any | false = getRegisterTestFunction()

/**
 * Disables the test registration function. This will cause {@link declare_it}
 * and {@link declare_test} not to register any tests or log them to the
 * console.
 *
 * This is useful if you don't like that feature.
 *
 * @param mode - Set to `false` to disable test registration.
 */
export function declare_setup(mode: false): void
/**
 * Will cause test cases to be logged to the console instead of being registered
 * with a test framework.
 *
 * @param mode - Set to `"console"` to log test cases to the console.
 */
export function declare_setup(mode: "console"): void
/**
 * Setups up the function used by {@link declare_it} and {@link declare_test} to
 * register tests at runtime.
 *
 * Takes a callback that should accept a test title and a number of
 * {@link AssertionInfo} objects.
 *
 * If you don't call this, `declare-test` will try to find the test function
 * dynamically. If that doesn't work, it will log tests to the console.
 *
 * @example
 *     declare_setup((name) => it(name, () => {}))
 *     declare_setup((name) => test(name, () => {})
 *
 * @param yourItFunction - The test registration function to use. Must be a
 *   function that takes a string and a number of assertions.
 */
export function declare_setup(yourItFunction: (title: string) => void): void
export function declare_setup(
    yourItFunction: RegisterTestFunction | false | "console"
): void {
    registerFrameworkTest =
        yourItFunction === "console" ? logTestCase : yourItFunction
}

/**
 * Defines a test case with the given title and registers it with the test
 * framework if possible. If not, will log test titles to the console.
 *
 * You give it a title and a list of assertions to check. If one of the
 * assertions fails, your test won't compile.
 *
 * @param title The test title.
 * @param assertion The first assertion to check, defined using
 *   {@link expect_type}
 * @param assertions The rest of the assertions to check.
 */
export const declare_it: TestFunction = <TestText extends string>(
    title: TestText,
    ...assertions: [
        FancyTestTitleText<TestText>,
        ...FancyTestTitleText<TestText>[]
    ]
): void => {
    if (registerFrameworkTest) {
        try {
            registerFrameworkTest(title, ...assertions)
        } catch (e: any) {
            console.error(
                `⛔ DECLARE-TEST: Exception while registering test ⛔`,
                e
            )
        }
    }
}

/**
 * Defines a test case with the given title and registers it with the test
 * framework if possible. If not, will log test titles to the console.
 *
 * You give it a title and a list of assertions to check. If one of the
 * assertions fails, your test won't compile.
 *
 * @param title The test title.
 * @param assertion The first assertion to check, defined using
 *   {@link expect_type}
 * @param assertions The rest of the assertions to check.
 */
export function declare_test<TestText extends string>(
    name: TestText,
    assertion: FancyTestTitleText<TestText>,
    ...assertions: FancyTestTitleText<TestText>[]
): void {
    declare_it(name, assertion, ...assertions)
}
