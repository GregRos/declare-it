/* eslint-disable no-inner-declarations */
import { logToConsole } from "./emitters/console-emitter.js"

import type { TestFrameworkName } from "what-the-test"
import { findTestFramework, getTestFramework } from "what-the-test"
import { FwWrapper } from "./emitters/fw-wrapper.js"
import { unknownFrameworkSpecifier } from "./errors.js"
import type { ExpectFunction } from "./type-assertions/expect_type.js"
import { Txt } from "./type-assertions/messages.js"

/** The main namespace for declare-it tests and configuration. */
export namespace declare {
    let fwWrapper: any = new FwWrapper(findTestFramework()!)

    /**
     * Specifies how to emit or register type-only tests during runtime.
     *
     * Accepts one of the following values:
     *
     * - `false`: Do not emit or register type-only tests.
     * - `"auto"`: Automatically detect the test framework, fallback to "console".
     * - `"console"`: Emit messages to the console.
     * - `"ava"`: Register type-only tests with AVA.
     * - `"jest"`: Register type-only tests with Jest.
     * - `"mocha"`: Register type-only tests with Mocha.
     * - `"jasmine"`: Register type-only tests with Jasmine.
     */
    export function setup(
        mode: TestFrameworkName | "console" | "auto" | false
    ): void {
        if (!mode) {
            fwWrapper = false
        } else if (mode === "auto") {
            fwWrapper = new FwWrapper(findTestFramework()!)
        } else if (mode === "console") {
            fwWrapper = {
                test: logToConsole("pass"),
                skip: logToConsole("skip"),
                todo: logToConsole("todo")
            } as any
        } else if (typeof mode === "string") {
            fwWrapper = new FwWrapper(getTestFramework(mode)!)
        } else {
            throw unknownFrameworkSpecifier(mode)
        }
    }

    const testFunctionInterface = {
        /**
         * Declares a skipped type-only test and registers it with your test
         * framework. All assertions in the test function will automatically
         * pass.
         *
         * @param title The test title.
         * @param test The test function.
         */
        skip<TestText extends string>(
            title: TestText,
            test: (check: ExpectFunction<TestText, 1>) => void | Promise<void>
        ): void {
            if (fwWrapper) {
                fwWrapper.skip(title)
            }
        },
        /**
         * Notes that a type-only test should be implemented. Reported to your
         * test framework if it supports it.
         *
         * @param title The test title.
         */
        todo<TestText extends string>(title: TestText): void | Promise<void> {
            if (fwWrapper) {
                fwWrapper.todo(title)
            }
        }
    }

    /**
     * Declares a type-only test using the **declare-it** framework.
     *
     * - ❗ The test function is never executed. It's for type checking only.
     * - ❗ Registers the test with a test framework if available.
     * - ℹ️ The test function can be async.
     *
     * @param title The test title. Used for reporting failures.
     * @param test A test function that receives the `expect` argument, which
     *   can be used to test type declarations.
     */
    function test_<TestText extends string>(
        title: TestText,
        test: (check: ExpectFunction<TestText>) => void | Promise<void>
    ): void {
        if (fwWrapper) {
            fwWrapper.test(title)
        }
    }

    /**
     * Allows writing type-only assertions without declaring a test.
     *
     * - 🚨 The test function is never executed. It's for type checking only.
     * - ❗ No test is registered with a test framework.
     * - ❗ The title is hard-coded as `𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦`.
     * - ℹ️ The test function can be async.
     *
     * @param test A test environment that can make type assertions.
     */
    function assert_(
        _: (expect: ExpectFunction<Txt.Msg["anonymous"]>) => void
    ): void {}

    export const test = Object.assign(test_, testFunctionInterface)
    export const it = Object.assign(test_, testFunctionInterface)
    export const xit = testFunctionInterface.skip
    export const assert = assert_
}
