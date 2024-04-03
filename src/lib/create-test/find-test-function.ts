import { logTestCase } from "./log-test"
import { FrameworkTestFunction, RegisterTestFunction } from "./types"

function* tryRequireUntilSuccess<T>(modules: string[]): any {
    for (const module of modules) {
        try {
            yield require(module)
        } catch (error: any) {
            if (error.code !== "MODULE_NOT_FOUND") {
                throw error
            }
        }
    }
}

function getTestFunctionFrom(x: any) {
    switch ("function") {
        case typeof x.it:
            return x.it
        case typeof x.test:
            return x.test
        default:
            return undefined
    }
}

export function wrapFrameworkTestFunction(
    frameworkFunction: FrameworkTestFunction
): RegisterTestFunction {
    return (title, ...assertions) =>
        frameworkFunction(
            `💭 𝗗𝗘𝗖𝗟𝗔𝗥𝗘 𝗧𝗘𝗦𝗧: ${title} \x1b[32m(${assertions.length} asserts)\x1b[0m`
        )
}

function getEmptyTestFunction(): FrameworkTestFunction {
    const fromGlobalThis = getTestFunctionFrom(globalThis)
    if (fromGlobalThis) {
        return fromGlobalThis
    }
    if (typeof globalThis.require === "function") {
        const testFunctions = [
            ...tryRequireUntilSuccess(["jest", "ava", "mocha", "jasmine"])
        ]
            .map(getTestFunctionFrom)
            .find(f => f)
        if (testFunctions) {
            return testFunctions
        }
    }
    console.warn(
        "⚠️  \x1b[1mDECLARE TEST:\x1b[0m No test function found. Emitting tests to console."
    )
    return logTestCase
}

export function getRegisterTestFunction(): RegisterTestFunction {
    const itFunction = getEmptyTestFunction()
    return wrapFrameworkTestFunction(itFunction)
}
