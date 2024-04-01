import {
    Assert_IsAny,
    Compute_AssignsFrom,
    Compute_AssignsTo,
    Compute_Equals
} from "./type-relations"

export interface Expecting<TheType> {
    /**
     * A compile-time assertion that `TheType` is strictly equal to the input
     * `Operand` type.
     *
     * Specifying `false` instead checks that the type is not equal to the input
     * type.
     *
     * @param truth True to check
     */
    equals<Operand>(truth: Compute_Equals<TheType, Operand>): Expecting<TheType>
    assigns_to<Operand>(
        truth: Compute_AssignsTo<TheType, Operand>
    ): Expecting<TheType>
    assigns_from<Operand>(
        truth: Compute_AssignsFrom<TheType, Operand>
    ): Expecting<TheType>
    is_any(truth: Assert_IsAny<TheType>): Expecting<TheType>
}
