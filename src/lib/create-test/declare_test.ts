/* eslint-disable no-inner-declarations */
import { logToConsole } from "./log-test.js"

import type { TestFrameworkName } from "what-the-test"
import { findTestFramework, getTestFramework } from "what-the-test"
import type { ExpectFunction } from "../type-assertions/expect_type.js"
import { Txt } from "../type-assertions/messages.js"
import { unknownSetupSpecifier } from "./errors.js"
import { FwWrapper } from "./fw-wrapper.js"

export interface TypeSpecifier {
    <T>(): (_: never) => T
    <T>(_: never): T
}

export const type: TypeSpecifier = function type<T>() {
    return null! as T
}

export const type_of = function type_of<T>(x: T) {
    return null! as (_: never) => T
}

export namespace declare {
    let fwWrapper: any = new FwWrapper(findTestFramework()!)

    export function setup(mode: false): void
    export function setup(mode: TestFrameworkName | "console" | "auto"): void
    export function setup(setupValue: false | TestFrameworkName | "console" | "auto"): void {
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
        skip<TestText extends string>(title: TestText, test: (check: ExpectFunction<TestText, 1>) => void | Promise<void>): void {
            if (fwWrapper) {
                fwWrapper.skip(title)
            }
        },
        todo<TestText extends string>(title: TestText): void | Promise<void> {
            if (fwWrapper) {
                fwWrapper.todo(title)
            }
        }
    }

    function test_func<TestText extends string>(title: TestText, test: (check: ExpectFunction<TestText>) => void | Promise<void>): void {
        if (fwWrapper) {
            fwWrapper.test(title)
        }
    }

    function assert_noop(test: (check: ExpectFunction<Txt.Msg["anonymous"]>) => void): void {}

    export const test = Object.assign(test_func, testFunctionInterface)
    export const it = Object.assign(test_func, testFunctionInterface)
    export const xit = testFunctionInterface.skip
    export const assert = assert_noop
}
