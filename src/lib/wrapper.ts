import {
    Assert_IsAny,
    Compute_AssignsFrom,
    Compute_AssignsTo,
    Compute_Equals,
    Compute_Resembles
} from "./type-relations"

class Assertions<TheType> {
    /**
     * Checks whether the type {@link TheType} is strictly equal to the given
     * {@link Operand} type.
     *
     * **Tip:** Types are strictly equal if one can be replaced by the other in
     * all contexts.
     *
     * - May differ from your expectations in unusual cases.
     * - Usually errors during compile time if the expressions involve type
     *   parameters.
     *
     * @example
     *
     * @param truth The expected truth value of the assertion.
     * @returns The same instance of {@link Assertions} for chaining.
     */
    equals<Operand>(
        truth: Compute_Equals<TheType, Operand>
    ): Assertions<TheType> {
        return this
    }

    resembles<Operand>(
        truth: Compute_Resembles<TheType, Operand>
    ): Assertions<TheType> {
        return this
    }
    assigns_to<Operand>(
        truth: Compute_AssignsTo<TheType, Operand>
    ): Assertions<TheType> {
        return this
    }
    assigns_from<Operand>(
        truth: Compute_AssignsFrom<TheType, Operand>
    ): Assertions<TheType> {
        return this
    }
    is_any(truth: Assert_IsAny<TheType>): Assertions<TheType> {
        return this
    }
}

/** Lets you make sure a type is what you expect it to be. */
export function the_type<TheType>(): Assertions<TheType> {
    return new Assertions()
}

export function the_type_of<Something>(x: Something): Assertions<Something> {
    return new Assertions()
}

export function checks(name: string, ...checks: any[]) {
    return
}
