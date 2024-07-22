import { Txt } from "./texts.js"

// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts
// Shamelessly stolen under the MIT license.

// // Conditional returns can enforce identical types.
// // See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650

export type Compute_ToResemble<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? F & [Txt["the_types"], L, R, Txt["are_both_any"]]
            : F & [Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F & [Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [L] extends [R]
            ? [R] extends [L]
                ? T & [Txt["the_type"], L, Txt["resembles"], R]
                : F & [Txt["the_type"], L, Txt["not_assignable_from"], R]
            : F & [Txt["the_type"], L, Txt["not_assignable_to"], R]
export type Compute_ToEqual<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? F & [Txt["the_types"], L, R, Txt["are_both_any"]]
            : F & [Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F & [Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [L] extends [R]
            ? [R] extends [L]
                ? Any extends Compute_AreIdentical<L, R>
                    ? T & [Txt["the_type"], L, Txt["equals"], R]
                    : F & [Txt["the_type"], L, Txt["not_exactly"], R]
                : F & [Txt["the_type"], L, Txt["not_assignable_from"], R]
            : F & [Txt["the_type"], L, Txt["not_assignable_to"], R]

export type Compute_ToSupertype<L, R, T, F> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? F & [Txt["the_types"], L, Txt["are_both_any"], R]
            : F & [Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F & [Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [R] extends [L]
            ? T & [Txt["the_type"], L, Txt["assignable_from"], R]
            : F & [Txt["the_type"], L, Txt["not_assignable_from"], R]

export type Compute_ToSubtype<L, R, T, F> =
    IsAny<R> extends 1
        ? IsAny<L> extends 1
            ? [Txt["the_types"], L, R, Txt["are_both_any"]] & F
            : [Txt["the_type"], L, Txt["is_not_any_unlike"], R] & F
        : IsAny<L> extends 1
          ? [Txt["the_type"], L, Txt["is_not_any_unlike"], R] & F
          : [L] extends [R]
            ? [Txt["the_type"], L, Txt["assignable_to"], R] & T
            : [Txt["the_type"], L, Txt["not_assignable_to"], R] & F

export type Assert_IsAny<X, T, F> =
    IsAny<X> extends 1 ? [X, Txt["is_any"]] & T : [X, Txt["is_not_any"]] & F

export type IsAny<T> = Any extends T ? ([T] extends [Any] ? 1 : 0) : 0
export type Compute_AreIdentical<Left, Right> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? Any
        : never

// Give "any" its own class

export class Any {
    private _!: true
}
export type Compute_SubtypeDifference<L, R> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? never
            : [L, Txt["is_not_any_unlike"], R]
        : IsAny<R> extends 1
          ? [L, Txt["is_not_any_unlike"], R]
          : L extends object
            ? R extends object
                ? {
                      [P in keyof R]: P extends keyof L
                          ? Compute_SubtypeDifference<L[P], R[P]>
                          : [Txt["expected_type"], R[P]]
                  }
                : [L, Txt["an_object_unlike"], R]
            : [L] extends [R]
              ? 1
              : [L, Txt["not_assignable_to"], R]
