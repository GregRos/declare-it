import { Texts } from "./texts"
import {
    Compute_ToAssignFrom,
    Compute_ToAssignTo,
    Compute_ToEqual,
    Compute_ToResemble
} from "./type-relations"

class ExpectType<T> {
    to_equal<U>(
        x?: Compute_ToEqual<T, U, any, unknown>
    ): Compute_ToEqual<T, U, never, unknown> {
        return true as any
    }

    get not() {
        return new ExpectTypeNot<T>()
    }

    to_resemble<U>(): Compute_ToResemble<T, U, never, unknown> {
        return true as any
    }

    to_assign_to<U>(): Compute_ToAssignTo<T, U, never, unknown> {
        return true as any
    }

    to_assign_from<U>(): Compute_ToAssignFrom<T, U, never, unknown> {
        return true as any
    }
}

class ExpectTypeNot<T> {
    to_equal<U>(
        x?: Compute_ToEqual<T, U, unknown, any>
    ): Compute_ToEqual<T, U, unknown, never> {
        return false as any
    }

    to_resemble<U>(): Compute_ToResemble<T, U, unknown, never> {
        return false as any
    }

    to_assign_to<U>(): Compute_ToAssignTo<T, U, unknown, never> {
        return false as any
    }

    to_assign_from<U>(): Compute_ToAssignFrom<T, U, unknown, never> {
        return false as any
    }
}

export function expect_type<T>(): ExpectType<T> {
    return new ExpectType()
}

export function declare_test<TestText extends string>(
    name: TestText,
    ...checks: `${Texts["TEST"]}: ${TestText}`[]
) {
    it(name, () => {})
}
