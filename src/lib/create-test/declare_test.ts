/* eslint-disable no-inner-declarations */
import { logToConsole } from "./log-test.js"

import type { TestFrameworkName } from "what-the-test"
import { findTestFramework, getTestFramework } from "what-the-test"
import type { ExpectType } from "../type-assertions/expect_type.js"
import { unknownSetupSpecifier } from "./errors.js"
import { FwWrapper } from "./fw-wrapper.js"

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
    let fwWrapper: any = new FwWrapper(findTestFramework()!)

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

    const testFunctionInterface = {
        skip<TestText extends string>(
            title: TestText,
            test: (check: ExpectType<TestText>) => void
        ): void {
            if (fwWrapper) {
                fwWrapper.skip(title)
            }
        },
        todo<TestText extends string>(title: TestText): void {
            if (fwWrapper) {
                fwWrapper.todo(title)
            }
        }
    }

    function test_func<TestText extends string>(
        title: TestText,
        test: (check: ExpectType<TestText>) => void | Promise<void>
    ): void {
        if (fwWrapper) {
            fwWrapper.test(title)
        }
    }

    export const test = Object.assign(test_func, testFunctionInterface)
    export const it = Object.assign(test_func, testFunctionInterface)
    export const xit = testFunctionInterface.skip
}
