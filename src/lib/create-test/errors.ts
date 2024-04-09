export class ExpectTypeError extends Error {
    name = "ExpectTypeError"
    constructor(message: string) {
        super(message)
    }
}

export function formatErrorText(message: string) {
    return `⛔ EXPECT_TYPE: ${message} ⛔`
}

export function unknownTestFamework(name: string) {
    return new ExpectTypeError(
        formatErrorText(`Unknown test framework "${name}"`)
    )
}
export function testFrameworkNotDetected(name: string) {
    return new ExpectTypeError(
        formatErrorText(`Test framework "${name}" not detected`)
    )
}

export function unknownSetupSpecifier(name: string) {
    return new ExpectTypeError(
        formatErrorText(`Unknown setup specifier "${name}"`)
    )
}

export function testRegistrationError(message: string) {
    return new ExpectTypeError(formatErrorText(message))
}

export function noTestFunction(testTitle: string) {
    return new ExpectTypeError(
        formatErrorText(`No test function provided for ${testTitle}`)
    )
}

export function nonRuntimeFunctionExecuted(name: string) {
    return new ExpectTypeError(
        formatErrorText(
            `This function ${name} should not be called during runtime.`
        )
    )
}
