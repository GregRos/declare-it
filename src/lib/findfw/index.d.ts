import { MaybeFrameworkTestFunction, TestFrameworkName } from "./types"

export declare const detectedFrameworks: {
    [key in TestFrameworkName]: MaybeFrameworkTestFunction
}
