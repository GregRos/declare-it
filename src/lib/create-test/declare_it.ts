import { FancyTestTitleText } from "../type-assertions/texts.js"
import { expect_type } from "../type-assertions/expect_type.js"
import { logToConsole } from "./log-test.js"
import {
    TestFunction,
    RegisterTestFunction,
    FrameworkTestFunction
} from "./types.js"
import { fwTestFunction } from "../findfw/index.js"
let registerFrameworkTest: RegisterTestFunction | false =
    wrapFrameworkTestFunction(fwTestFunction ? fwTestFunction : logToConsole)

/**
 * **At runtime**, disables the test registration functionality.
 *
 * This is useful if you don't like that feature.
 *
 * @param mode - Set to `false` to disable test registration.
 */
export function declare_setup(mode: false): void
/**
 * **At runtime**, will force logging compile-time test cases to the console.
 *
 * @param mode - Set to `"console"` to log test cases to the console.
 */
export function declare_setup(mode: "console"): void
/**
 * **At runtime**, setups up the function that {@link declare_test} uses to
 * register tests. If not called, the library will try to find the function
 * dynamically.
 *
 * Takes a callback that should accept a test title. The callback should
 * register a test that always passes.
 *
 * @example
 *     declare_setup((name) => it(name, () => {}))
 *     declare_setup((name) => test(name, () => {})
 *
 * @param fwTestFunction - The test registration function to use. Must accept a
 *   single string argument.
 */
export function declare_setup(fwTestFunction: FrameworkTestFunction): void
export function declare_setup(
    frameworkTestFunction: FrameworkTestFunction | false | "console"
): void {
    registerFrameworkTest = !frameworkTestFunction
        ? false
        : wrapFrameworkTestFunction(
              frameworkTestFunction === "console"
                  ? logToConsole
                  : frameworkTestFunction
          )
}

/**
 * **At compile-time**, declares a test that will validate one or more type
 * assertions through type checking, reporting any errors as compilation errors
 * containing the test's name
 *
 * Use this to define compile-time tests for your types.
 *
 * **At runtime**, will try to register the test title with a runtime test
 * framework. If it fails, it will log test titles and the number of assertions
 * to the console.
 *
 * @example
 *     declare_test(
 *         "checks array",
 *         expect_type<[1]>().to_equal<[1]>(),
 *         expect_type<[1]>().not.to_equal<readonly [1]>()
 *     )
 *
 * @param title The test title.
 * @param assertions One or more assertions defined using {@link expect_type}.
 */
export function declare_test<TestText extends string>(
    name: TestText,
    ...assertions: [
        FancyTestTitleText<TestText>,
        ...FancyTestTitleText<TestText>[]
    ]
): void {
    if (registerFrameworkTest) {
        try {
            registerFrameworkTest(name, ...(assertions as [any, ...any[]]))
        } catch (e: any) {
            console.error(
                `⛔ DECLARE-TEST: Exception while registering test ⛔`,
                e
            )
        }
    }
}
function wrapFrameworkTestFunction(
    frameworkFunction: FrameworkTestFunction
): RegisterTestFunction {
    return (title, ...assertions) =>
        frameworkFunction(
            `💭 𝗗𝗘𝗖𝗟𝗔𝗥𝗘 𝗧𝗘𝗦𝗧: ${title} \x1b[32m(${assertions.length} asserts)\x1b[0m`
        )
}
