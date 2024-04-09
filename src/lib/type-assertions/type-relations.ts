import {
    𝗧𝗢_𝗕𝗘_𝗔𝗡𝗬_𝗘𝗥𝗥𝗢𝗥,
    𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥,
    𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥,
    𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥,
    𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥
} from "./compiler-messages.js"
import { Compute_SubtypeDifference } from "./computed-relations.js"
import { Texts } from "./texts.js"

// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts
// Shamelessly stolen under the MIT license.

// // Conditional returns can enforce identical types.
// // See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650

export type Compute_ToResemble<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? F & 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["are_both_any"], R>
            : F & 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_any_but_not"], R>
        : IsAny<R> extends 1
          ? F & 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
          : [L] extends [R]
            ? [R] extends [L]
                ? 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["equals"], R> & T
                : F & 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_assignable_from"], R>
            : F & 𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_assignable_to"], R>
export type Compute_ToEqual<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? F & 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["are_both_any"], R>
            : F & 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_any_but_not"], R>
        : IsAny<R> extends 1
          ? F & 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
          : [L] extends [R]
            ? [R] extends [L]
                ? Any extends Compute_AreIdentical<L, R>
                    ? 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["equals"], R> & T
                    : 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_exactly"], R> & F
                : F & 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_assignable_from"], R>
            : F & 𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_assignable_to"], R>

export type Compute_ToSupertype<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["are_both_any"], R>
            : 𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_any_but_not"], R>
        : IsAny<R> extends 1
          ? 𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
          : [R] extends [L]
            ? 𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["assignable_from"], R> & T
            : 𝗧𝗢_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_assignable_from"], R> & F

export type Compute_ToSubtype<L, R, T, F> =
    IsAny<R> extends 1
        ? IsAny<L> extends 1
            ? 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["are_both_any"], R>
            : 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
        : IsAny<L> extends 1
          ? 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
          : [L] extends [R]
            ? 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["assignable_to"], R> & T
            : Compute_SubtypeDifference<L, R>

export type Assert_IsAny<X, T, F> =
    IsAny<X> extends 1
        ? 𝗧𝗢_𝗕𝗘_𝗔𝗡𝗬_𝗘𝗥𝗥𝗢𝗥<X, Texts["is_any"]> & T
        : 𝗧𝗢_𝗕𝗘_𝗔𝗡𝗬_𝗘𝗥𝗥𝗢𝗥<X, Texts["is_not_any"]> & F

export type IsAny<T> = Any extends T ? ([T] extends [Any] ? 1 : 0) : 0
export type Compute_AreIdentical<Left, Right> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? Any
        : never
// Give "any" its own class

class Any {
    private _!: true
}
