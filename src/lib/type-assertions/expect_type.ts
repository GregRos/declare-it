import { AssertionInfo } from "../create-test/types.js"
import {
    ComputeToExtendBy,
    Compute_ToExtend,
    Compute_ToEqual,
    Compute_ToResemble
} from "./type-relations.js"

class ExpectType<Expected> {
    /**
     * **During compilation,** asserts that the asserted type {@link Expected} is
     * _**equal**_ to the referenced type {@link Reference}.
     *
     * @returns
     */
    to_equal<Reference>(): Compute_ToEqual<
        Expected,
        Reference,
        never,
        unknown
    > {
        return true as any
    }

    get not() {
        return new ExpectTypeNot<Expected>()
    }

    to_resemble<U>(): Compute_ToResemble<Expected, U, never, unknown> {
        return {
            name: "not to_resemble"
        } satisfies AssertionInfo as any
    }

    to_extend<U>(): Compute_ToExtend<Expected, U, never, unknown> {
        return {
            name: "not to_assign_to"
        } satisfies AssertionInfo as any
    }

    to_extend_by<U>(): ComputeToExtendBy<Expected, U, never, unknown> {
        return true as any
    }
}

class ExpectTypeNot<Expected> {
    get not() {
        return new ExpectType<Expected>()
    }
    to_equal<U>(): Compute_ToEqual<Expected, U, unknown, never> {
        return {
            name: "not to_equal"
        } satisfies AssertionInfo as any
    }
    get awaited() {
        return new ExpectType<Awaited<Expected>>()
    }
    to_resemble<U>(): Compute_ToResemble<Expected, U, unknown, never> {
        return {
            name: "not to_resemble"
        } satisfies AssertionInfo as any
    }

    to_extend<U>(): Compute_ToExtend<Expected, U, unknown, never> {
        return { name: "not to_assign_to" } satisfies AssertionInfo as any
    }

    to_extend_by<U>(): ComputeToExtendBy<Expected, U, unknown, never> {
        return { name: "not to_be_extended" } satisfies AssertionInfo as any
    }
}

/** **At compile time,** begins an assertion about an input type {@link Expected}. */
export function expect_type<Expected = any>(): ExpectType<Expected> {
    return new ExpectType()
}
