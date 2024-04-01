import { Expecting } from "./expecting"

export function the_type<T>(x?: T): Expecting<T> {
    return {
        equals(x): Expecting<T> {
            return this
        },
        assigns_to(x): Expecting<T> {
            return this
        },
        assigns_from(x): Expecting<T> {
            return this
        },
        is_any(x): Expecting<T> {
            return this
        }
    }
}
