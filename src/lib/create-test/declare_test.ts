import { FancyTestTitleText } from "../type-assertions/texts.js"
import { expect_type } from "../type-assertions/expect_type.js"
import { logToConsole } from "./log-test.js"
import {
    TestFunction,
    RegisterTestFunction,
    FrameworkTestFunction
} from "./types.js"
import { detectedFrameworks } from "../findfw/index.js"
import {
    formatErrorText,
    noTestFunction,
    testFrameworkNotDetected,
    unknownSetupSpecifier,
    unknownTestFamework
} from "./errors.js"
import { TestFrameworkName } from "../findfw/types.js"

const frameworks = {
    ...detectedFrameworks,
    get default() {
        const priorities = [
            "global",

            "ava",
            "mocha",
            "jest",
            "jasmine",
            "console"
        ] as TestFrameworkName[]
        return priorities
            .map((key: TestFrameworkName) => detectedFrameworks[key])
            .find(Boolean) as FrameworkTestFunction
    }
}

let registerFrameworkTest: RegisterTestFunction | false =
    wrapFrameworkTestFunction(frameworks.default)

/**
 * ### ▶️ At runtime
 *
 * Disables logging test titles.
 *
 * @param mode - Set to `false` to disable test registration.
 */
export function declare_setup(mode: false): void
/**
 * ### ▶️ At runtime
 *
 * Forces logging test titles using a specific framework, or to the console.
 *
 * @param mode - Set to a framework name, `"global"` to use the global scope, or
 *   `"console"` to log to the console.
 */
export function declare_setup(mode: TestFrameworkName | "console"): void
/**
 * ### ▶️ At runtime
 *
 * Accepts a callback that {@link declare_test} will use to register declared
 * tests. If not called, the library will try to register tests dynamcially.
 *
 * The callback should accept a test title and register a test with that title
 * that always passes.
 *
 * @example
 *     declare_setup(name => it(name, () => {}))
 *
 * @example
 *     declare_setup((name) => test(name, () => {})
 *
 * @param fwTestFunction - The test registration function to use. Must accept a
 *   single string argument.
 */
export function declare_setup(fwTestFunction: FrameworkTestFunction): void
export function declare_setup(
    setupValue: FrameworkTestFunction | false | TestFrameworkName | "console"
): void {
    if (!setupValue) {
        registerFrameworkTest = false
    } else if (typeof setupValue === "function") {
        registerFrameworkTest = wrapFrameworkTestFunction(setupValue)
    } else if (typeof setupValue === "string") {
        if (!(setupValue in detectedFrameworks)) {
            throw unknownTestFamework(setupValue)
        }
        const detected = detectedFrameworks[setupValue]
        if (!detected) {
            throw testFrameworkNotDetected(setupValue)
        }
        registerFrameworkTest = wrapFrameworkTestFunction(detected)
    } else {
        throw unknownSetupSpecifier(setupValue)
    }
}
declare_setup("global")
/**
 * ### 🧩 During compilation
 *
 * Declares a test that validates one or more type assertions through type
 * checking. Failed tests are reported as compilation errors containing the
 * test's name.
 *
 * Received a title and a **_test function_** that takes a single argument,
 * `check`, which is called the _validation instrument_. This should be used to
 * validate type assertions made using {@link expect_type} through assignment.
 *
 * _**The test function is never executed and so can contain any code.**_
 *
 * ### ▶️ At runtime
 *
 * Registers the test title with a runtime test framework. If no test framework
 * is detected, one can be configured using {@link declare_setup}. Otherwise test
 * titles will be logged to the console.
 *
 * @example
 *     declare_test("string literals are strings", check => {
 *         check = expect_type<"a">().to_subtype<string>()
 *         check = expect_type<"a">().to_equal<"a">()
 *     })
 *
 * @param title The test title.
 * @param test The test function. This function is never executed.
 */
export function declare_test<TestText extends string>(
    name: TestText,
    test: (check: FancyTestTitleText<TestText> | 1) => void
): void {
    if (!test) {
        throw noTestFunction(name)
    }
    if (registerFrameworkTest) {
        try {
            registerFrameworkTest(name)
        } catch (e: any) {
            console.error(
                formatErrorText(
                    `Exception while registering test: ${e.message}`
                )
            )
        }
    }
}

export const declare_it = declare_test

function wrapFrameworkTestFunction(
    frameworkFunction: FrameworkTestFunction
): RegisterTestFunction {
    return title => frameworkFunction(`💭 𝗗𝗘𝗖𝗟𝗔𝗥𝗘 𝗧𝗘𝗦𝗧: ${title}`)
}
