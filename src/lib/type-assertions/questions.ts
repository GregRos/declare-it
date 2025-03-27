import { Are_Types_Identical, Are_Types_Key_Identical, IsAny } from "./basic-checks.js"
import { Txt } from "./messages.js"
import type { Is_Recursive_Subtype_Considering_Any } from "./recursive-checks.js"
type Msg = Txt.Msg
// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts
// See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650

/**
 * # L ≈ R❔
 *
 * Asks whether `L` is assignable to `R` and vice versa.
 *
 * - ✅ Overcomes most _common_ false positives.
 * - ✅ Based on TypeScript's loose assignability rules. Use {@link Ask_Left_IdenticalTo_Right} for a
 *   stricter check.
 * - ❗ Considers `any` to only be assignable to itself.
 * - ⚠️ **Will fail loudly** on expressions with type parameters.
 * - ℹ️ Produces a compile-time message explaining the result.
 * - ℹ️ The message is encoded as a tuple and includes the test title.
 * - ℹ️ The `T` and `F` types are mixed into the result and can be used to hide the message.
 *
 * @template L The left type. Symmetric.
 * @template R The right type. Symmetric.
 * @template T OR'd into the message if the check passes.
 * @template F OR'd into the message if the check fails.
 * @template Test The test title. Can be set to 0 if it doesn't matter (default).
 */
export type Ask_Left_Resembles_Right<L, R, T, F, Test extends string | 0 = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [`${Test} ${Msg["the_types"]}`, L, R, Msg["are_both_any"], Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_any_unlike"], R, Msg[">>"]]
        : IsAny<R> extends 1
          ? F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_not_any_unlike"], R, Msg[">>"]]
          : [L, Is_Recursive_Subtype_Considering_Any<L, R>] extends [R, 1]
            ? [R, Is_Recursive_Subtype_Considering_Any<R, L>] extends [L, 1]
                ? T | [`${Test} ${Msg["the_type"]}`, L, Msg["resembles"], R, Msg[">>"]]
                : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_from"], R, Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_to"], R, Msg[">>"]]

/**
 * # L ≡ R❔
 *
 * Asks whether `L` is strictly equal and equivalent to `R`.
 *
 * - ✅ Very strict. Use {@link Ask_Left_Resembles_Right} for a looser check.
 * - ✅ Practically no false positives.
 * - ✅ Symmetric: `L` and `R` can be swapped.
 * - ⚠️ **Will fail loudly** on expressions with type parameters.
 * - ℹ️ Produces a compile-time message explaining the result.
 * - ℹ️ The message is encoded as a tuple and includes the test title.
 * - ℹ️ The `T` and `F` types are mixed into the result and can be used to hide the message.
 *
 * @template L The left type. Symmetric.
 * @template R The right type. Symmetric.
 * @template T OR'd into the message if the check passes.
 * @template F OR'd into the message if the check fails.
 * @template Test The test title. Can be set to 0 if it doesn't matter (default).
 */
export type Ask_Left_IdenticalTo_Right<L, R, T, F, Test extends string | 0 = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [`${Test} ${Msg["the_types"]}`, L, R, Msg["are_both_any"], Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_any_unlike"], R, Msg[">>"]]
        : IsAny<R> extends 1
          ? F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_not_any_unlike"], R, Msg[">>"]]
          : [L, null] extends [R, null]
            ? [R, null] extends [L, null]
                ? [1, 1] extends [Are_Types_Identical<L, R>, Are_Types_Key_Identical<L, R>]
                    ? T | [`${Test} ${Msg["the_type"]}`, L, Msg["equals"], R, Msg[">>"]]
                    : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_exactly"], R, Msg[">>"]]
                : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_from"], R, Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_to"], R, Msg[">>"]]

/**
 * # L ⊇ R❔
 *
 * Asks whether `L` is assignable from `R`.
 *
 * - ✅ Overcomes most _common_ false positives.
 * - ❗ Considers `any` to only be assignable to itself.
 * - ⚠️ **Will fail loudly** on expressions with type parameters.
 * - ℹ️ Produces a compile-time message explaining the result.
 * - ℹ️ The message is encoded as a tuple and includes the test title.
 * - ℹ️ The `T` and `F` types are mixed into the result and can be used to hide the message.
 *
 * @template L The supposed supertype.
 * @template R The supposed subtype.
 * @template T OR'd into the message if the check passes.
 * @template F OR'd into the message if the check fails.
 * @template Test A test title. Can be set to 0 if it doesn't matter (default).
 */
export type Ask_Left_SupertypeOf_Right<L, R, T, F, Test extends string | 0 = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [`${Test} ${Msg["the_types"]}`, L, Msg["are_both_any"], R, Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_any_unlike"], R, Msg[">>"]]
        : IsAny<R> extends 1
          ? F | [`${Test} ${Msg["the_type"]}`, L, Msg["is_not_any_unlike"], R, Msg[">>"]]
          : [R, null] extends [L, null]
            ? [R, Is_Recursive_Subtype_Considering_Any<R, L>] extends [L, 1]
                ? T | [`${Test} ${Msg["the_type"]}`, L, Msg["assignable_from"], R, Msg[">>"]]
                : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_from"], R, Msg[">>"]]
            : F | [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_from"], R, Msg[">>"]]
/**
 * # L ⊆ R❔
 *
 * Asks whether `L` is assignable to `R`.
 *
 * - ✅ Overcomes most _common_ false positives.
 * - ❗ Considers `any` to only be assignable to itself.
 * - ⚠️ **Will fail loudly** on expressions with type parameters.
 * - ℹ️ Produces a compile-time message explaining the result.
 * - ℹ️ The message is encoded as a tuple and includes the test title.
 * - ℹ️ The `T` and `F` types are mixed into the result and can be used to hide the message.
 *
 * @template L The subtype.
 * @template R The supertype.
 * @template T OR'd into the message if the check passes.
 * @template F OR'd into the message if the check fails.
 */
export type Ask_Left_SubtypeOf_Right<L, R, T, F, Test extends string | 0 = 0> =
    IsAny<R> extends 1
        ? IsAny<L> extends 1
            ? [`${Test} ${Msg["the_types"]}`, L, R, Msg["are_both_any"], Msg[">>"]] | T
            : [`${Test} ${Msg["the_type"]}`, L, Msg["is_not_any_unlike"], R, Msg[">>"]] | F
        : IsAny<L> extends 1
          ? [`${Test} ${Msg["the_type"]}`, L, Msg["is_not_any_unlike"], R, Msg[">>"]] | F
          : [L, null] extends [R, null]
            ? [L, Is_Recursive_Subtype_Considering_Any<L, R>] extends [R, 1]
                ? [`${Test} ${Msg["the_type"]}`, L, Msg["assignable_to"], R, Msg[">>"]] | T
                : [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_to"], R, Msg[">>"]] | F
            : [`${Test} ${Msg["the_type"]}`, L, Msg["not_assignable_to"], R, Msg[">>"]] | F
