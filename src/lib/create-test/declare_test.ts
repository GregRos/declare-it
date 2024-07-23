import { FancyTestTitleText } from "../type-assertions/texts.js"
import { logToConsole } from "./log-test.js"
import {
    TestFunction,
    RegisterTestFunction,
    FrameworkTestFunction
} from "./types.js"
import { findTestFramework, getTestFramework } from "what-the-test"
import {
    DeclareTestError,
    formatErrorText,
    noTestFunction,
    testFrameworkNotDetected,
    unknownSetupSpecifier,
    unknownTestFamework
} from "./errors.js"
import type { TestEnv, TestFrameworkName } from "what-the-test"

let registerFrameworkTest: RegisterTestFunction | false =
    wrapFrameworkTestFunction(findTestFramework()!.test)

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
export function declare_setup(
    mode: TestFrameworkName | "console" | "auto"
): void
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
    setupValue:
        | FrameworkTestFunction
        | false
        | TestFrameworkName
        | "console"
        | "auto" = "auto"
): void {
    if (!setupValue) {
        registerFrameworkTest = false
    } else if (typeof setupValue === "function") {
        registerFrameworkTest = wrapFrameworkTestFunction(setupValue)
    } else if (setupValue === "auto") {
        registerFrameworkTest = wrapFrameworkTestFunction(
            findTestFramework()!.test
        )
    } else if (setupValue === "console") {
        registerFrameworkTest = logToConsole
    } else if (typeof setupValue === "string") {
        registerFrameworkTest = wrapFrameworkTestFunction(
            getTestFramework(setupValue)!.test
        )
    } else {
        throw unknownSetupSpecifier(setupValue)
    }
}
declare_setup("auto")

export function declare_test<TestText extends string>(
    title: TestText,
    test: (check: FancyTestTitleText<TestText> | 1) => void
): void {
    if (!test) {
        throw noTestFunction(title)
    }
    let count = 0
    test({
        type: () => count++,
        type_of: () => count++
    } as any)
    if (registerFrameworkTest) {
        try {
            registerFrameworkTest(title, count)
        } catch (e: any) {
            console.error(
                formatErrorText(
                    `Exception while registering test '${title}: ${e.message}`
                )
            )
        }
    }
}

function wrapFrameworkTestFunction(
    fw: (title: string, fn: () => void) => void
): RegisterTestFunction {
    return (title, assertionCount) =>
        fw(
            `💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧 (${assertionCount.toString().padEnd(1, " ")}×✔): ${title}`,
            () => {
                if (assertionCount === 0) {
                    throw new DeclareTestError(
                        "Test has no compile-time assertions!"
                    )
                }
            }
        )
}
