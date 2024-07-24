export class DeclareItError extends Error {
    name = "DeclareItError"
}

export function formatErrorText(message: string) {
    return `⛔ EXPECT_TYPE: ${message} ⛔`
}

export function unknownTestFamework(name: string) {
    return new DeclareItError(
        formatErrorText(`Unknown test framework "${name}"`)
    )
}
export function testFrameworkNotDetected(name: string) {
    return new DeclareItError(
        formatErrorText(`Test framework "${name}" not detected`)
    )
}

export function unknownSetupSpecifier(name: string) {
    return new DeclareItError(
        formatErrorText(`Unknown setup specifier "${name}"`)
    )
}

export function testRegistrationError(message: string) {
    return new DeclareItError(formatErrorText(message))
}

export function noTestFunction(testTitle: string) {
    return new DeclareItError(
        formatErrorText(`No test function provided for ${testTitle}`)
    )
}

export function nonRuntimeFunctionExecuted(name: string) {
    return new DeclareItError(
        formatErrorText(
            `This function ${name} should not be called during runtime.`
        )
    )
}
