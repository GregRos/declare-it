export class DeclareTestError extends Error {
    name = "DeclareTestError"
    constructor(message: string) {
        super(message)
    }
}

export function formatErrorText(message: string) {
    return `⛔ EXPECT_TYPE: ${message} ⛔`
}

export function unknownTestFamework(name: string) {
    return new DeclareTestError(
        formatErrorText(`Unknown test framework "${name}"`)
    )
}
export function testFrameworkNotDetected(name: string) {
    return new DeclareTestError(
        formatErrorText(`Test framework "${name}" not detected`)
    )
}

export function unknownSetupSpecifier(name: string) {
    return new DeclareTestError(
        formatErrorText(`Unknown setup specifier "${name}"`)
    )
}

export function testRegistrationError(message: string) {
    return new DeclareTestError(formatErrorText(message))
}

export function noTestFunction(testTitle: string) {
    return new DeclareTestError(
        formatErrorText(`No test function provided for ${testTitle}`)
    )
}

export function nonRuntimeFunctionExecuted(name: string) {
    return new DeclareTestError(
        formatErrorText(
            `This function ${name} should not be called during runtime.`
        )
    )
}
