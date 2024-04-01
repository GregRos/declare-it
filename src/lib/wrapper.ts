import {
    Assert_IsAny,
    Compute_AssignsFrom,
    Compute_AssignsTo,
    Compute_Equals,
    Compute_Resembles
} from "./type-relations"

class Assertions<TheType> {
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
