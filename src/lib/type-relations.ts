import {
    TheType_IsAny,
    𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦,
    𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦,
    𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦,
    𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦
} from "./compiler-messages"
import { Texts } from "./texts"

// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts
// Shamelessly stolen under the MIT license.

// // Conditional returns can enforce identical types.
// // See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650

export type Compute_Resembles<L, R> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["are_both_any"], R> | true
            : 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["is_any_but_not"], R> | false
        : IsAny<R> extends 1
          ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["is_not_any_but"], R> | false
          : [L] extends [R]
            ? [R] extends [L]
                ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["equals"], R> | true
                : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["not_assignable_from"], R>
            : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦<L, Texts["not_assignable_to"], R>
export type Compute_Equals<L, R> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["are_both_any"], R> | true
            : 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["is_any_but_not"], R> | false
        : IsAny<R> extends 1
          ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["is_not_any_but"], R> | false
          : [L] extends [R]
            ? [R] extends [L]
                ? Any extends TestExact<L, R>
                    ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["equals"], R> | true
                    : 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["not_exactly"], R> | false
                : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["not_assignable_from"], R>
            : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗘𝗤𝗨𝗔𝗟𝗦<L, Texts["not_assignable_to"], R>

export type Compute_AssignsFrom<L, R> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<L, Texts["are_both_any"], R> | true
            : 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<L, Texts["is_any_but_not"], R> | false
        : IsAny<R> extends 1
          ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<L, Texts["is_not_any_but"], R> | false
          : [R] extends [L]
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<L, Texts["assignable_from"], R> | true
            : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘𝗦<L, Texts["not_assignable_from"], R>

export type Compute_AssignsTo<L, R> =
    IsAny<R> extends 1
        ? IsAny<L> extends 1
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<L, Texts["are_both_any"], R> | true
            : 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<L, Texts["is_not_any_but"], R> | false
        : IsAny<L> extends 1
          ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<L, Texts["is_not_any_but"], R> | false
          : [L] extends [R]
            ? 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<L, Texts["assignable_to"], R> | true
            : false | 𝗔𝗦𝗦𝗘𝗥𝗧_𝗦𝗨𝗕𝗧𝗬𝗣𝗘𝗦<L, Texts["not_assignable_to"], R>

export type Assert_IsAny<T> =
    IsAny<T> extends 1
        ? true | TheType_IsAny<T, Texts["is_any"]>
        : false | TheType_IsAny<T, Texts["is_not_any"]>

export type IsAny<T> = Any extends T ? ([T] extends [Any] ? 1 : 0) : 0
export type TestExact<Left, Right> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? Any
        : never
// Give "any" its own class

export class Any {
    private _!: true
}
