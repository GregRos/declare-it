import { Texts } from "./texts"
import { Compute_Equals } from "./type-relations"

type HasTrue<T> = true extends T ? true : T

class Asses<T> {
    is_equal_to<U>(): Compute_Equals<T, U, never, unknown> {
        return true as any
    }

    get not() {
        return new AntiAsses2<T>()
    }
}

class AntiAsses2<T> {
    to_equal<U>(): Compute_Equals<T, U, unknown, never> {
        return false as any
    }
}

export function expect_type<T>(): Asses<T> {
    return new Asses()
}

export function type_test<TestText extends string>(
    name: TestText,
    ...checks: `${Texts["TEST"]}: ${TestText}`[]
) {
    it(name, () => {})
}
