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
import { FwWrapper } from "./fw-wrapper.js"
import type { ExpectType } from "../type-assertions/expect_type2.js"

export interface OutputType {
    <T>(): T
}

export const type: OutputType = function type<T>() {
    return null! as T
}

export const type_of = function type_of<T>(x: T) {
    return null! as () => T
}

export namespace declare {
    let fwWrapper: FwWrapper | false = new FwWrapper(findTestFramework()!)

    export function setup(mode: false): void
    export function setup(mode: TestFrameworkName | "console" | "auto"): void
    export function setup(
        setupValue: false | TestFrameworkName | "console" | "auto"
    ): void {
        if (!setupValue) {
            fwWrapper = false
        } else if (setupValue === "auto") {
            fwWrapper = new FwWrapper(findTestFramework()!)
        } else if (setupValue === "console") {
            fwWrapper = {
                test: logToConsole("pass"),
                skip: logToConsole("skip"),
                todo: logToConsole("todo")
            } as any
        } else if (typeof setupValue === "string") {
            fwWrapper = new FwWrapper(getTestFramework(setupValue)!)
        } else {
            throw unknownSetupSpecifier(setupValue)
        }
    }

    function runTestGetAssertions<TestText extends string>(
        title: TestText,
        test: (check: ExpectType<TestText>) => void | Promise<void>
    ) {
        if (!test) {
            throw noTestFunction(title)
        }
        let count = 0
        test({
            type: () => count++,
            type_of: () => count++
        } as any)
        return count
    }

    export function test<TestText extends string>(
        title: TestText,
        test: (check: ExpectType<TestText>) => void | Promise<void>
    ): void {
        const assertions = runTestGetAssertions(title, test)
        if (fwWrapper) {
            fwWrapper.test(title, assertions)
        }
    }

    export function skip<TestText extends string>(
        title: TestText,
        test: (check: ExpectType<TestText>) => void | Promise<void>
    ): void {
        const assertions = runTestGetAssertions(title, test)
        if (fwWrapper) {
            fwWrapper.skip(title, assertions)
        }
    }

    export function todo<TestText extends string>(
        title: TestText,
        test: (check: ExpectType<TestText>) => void | Promise<void>
    ): void {
        const assertions = runTestGetAssertions(title, test)
        if (fwWrapper) {
            fwWrapper.todo(title, assertions)
        }
    }
}
