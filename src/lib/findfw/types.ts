export type TestFrameworkName =
    | "ava"
    | "mocha"
    | "jest"
    | "jasmine"
    | "global"
    | "console"

export type FrameworkTestFunction = (title: string) => void
export type MaybeFrameworkTestFunction = FrameworkTestFunction | false
export type DetectedFrameworks = {
    [key in TestFrameworkName]: MaybeFrameworkTestFunction
}
