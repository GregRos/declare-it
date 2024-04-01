import {
    Assert_AssignsFrom,
    Assert_AssignsTo,
    Assert_Equals,
    Assert_IsAny
} from "./type-relations"

export interface Expecting<TheType> {
    /**
     * A compile-time assertion that `TheType` is strictly equal to the input `Operand` type.
     *
     *
     * Specifying `false` instead checks that the type is not equal to the input type.
     * @param truth True to check
     */
    equals<Operand>(truth: Assert_Equals<TheType, Operand>): Expecting<TheType>
    assigns_to<Operand>(
        truth: Assert_AssignsTo<TheType, Operand>
    ): Expecting<TheType>
    assigns_from<Operand>(
        truth: Assert_AssignsFrom<TheType, Operand>
    ): Expecting<TheType>
    is_any(truth: Assert_IsAny<TheType>): Expecting<TheType>
}
