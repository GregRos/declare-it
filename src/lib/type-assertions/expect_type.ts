import { AssertionInfo } from "../create-test/types.js"
import {
    ComputeToExtendBy,
    Compute_ToExtend,
    Compute_ToEqual,
    Compute_ToResemble
} from "./type-relations.js"

declare class ExpectType<Expected> {
    /**
     * **During compilation,** asserts that the asserted type {@link Expected} is
     * _**equal**_ to the referenced type {@link Reference}.
     *
     * @returns
     */
    to_equal<Reference>(): Compute_ToEqual<Expected, Reference, never, unknown>

    readonly not: ExpectTypeNot<Expected>

    to_resemble<U>(): Compute_ToResemble<Expected, U, never, unknown>

    to_extend<U>(): Compute_ToExtend<Expected, U, never, unknown>

    to_extend_by<U>(): ComputeToExtendBy<Expected, U, never, unknown>
}

declare class ExpectTypeNot<Expected> {
    readonly not: ExpectType<Expected>
    to_equal<U>(): Compute_ToEqual<Expected, U, unknown, never>

    to_resemble<U>(): Compute_ToResemble<Expected, U, unknown, never>

    to_extend<U>(): Compute_ToExtend<Expected, U, unknown, never>

    to_extend_by<U>(): ComputeToExtendBy<Expected, U, unknown, never>
}

export function expect_type<Expected = any>(): ExpectType<Expected> {
    return null!
}
