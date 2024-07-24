import { Txt } from "./texts.js"
import type { SymmetricExclude } from "../operators/symmetric-difference.js"
import type { Decrement, IsFunction } from "type-plus"
import type { IsSimplePrimitive } from "../operators/is-primitive.js"
import type { IsRecursiveSubtypeConsideringAny } from "./recursive-any-check.js"

// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts

// See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type Primitive = string | number | boolean | null | undefined | symbol | bigint
type _getAnyKeys<
    Key extends string,
    T,
    Depth extends number = 4
> = PropertyKey &
    IsSimplePrimitive<
        T,
        IsAny<T, never, Key>,
        Depth extends 0
            ? never
            : {
                  [K in keyof T]: K extends string | number
                      ? _getAnyKeys<`${Key}.${K}`, T[K], Decrement<Depth>>
                      : never
              }[keyof T]
    >

type getAnyKeys<Prefix extends string, T> = _getAnyKeys<Prefix, T>
export type Compute_ToResemble<L, R, T, F, Test = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [Test, Txt["the_types"], L, R, Txt["are_both_any"]]
            : F | [Test, Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F | [Test, Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [L, IsRecursiveSubtypeConsideringAny<L, R>] extends [R, 1]
            ? [R, IsRecursiveSubtypeConsideringAny<R, L>] extends [L, 1]
                ? T | [Test, Txt["the_type"], L, Txt["resembles"], R]
                : F | [Test, Txt["the_type"], L, Txt["not_assignable_from"], R]
            : F | [Test, Txt["the_type"], L, Txt["not_assignable_to"], R]

export type Compute_ToEqual<L, R, T, F, Test = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [Test, Txt["the_types"], L, R, Txt["are_both_any"]]
            : F | [Test, Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F | [Test, Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [L, null] extends [R, null]
            ? [R, null] extends [L, null]
                ? ["Y", "Y"] extends [
                      Compute_StandardIdentical<L, R>,
                      Compute_KeyTypeIdentical<L, R>
                  ]
                    ? T | [Test, Txt["the_type"], L, Txt["equals"], R]
                    : F | [Test, Txt["the_type"], L, Txt["not_exactly"], R]
                : F | [Test, Txt["the_type"], L, Txt["not_assignable_from"], R]
            : F | [Test, Txt["the_type"], L, Txt["not_assignable_to"], R]

export type Compute_ToSupertype<L, R, T, F, Test = 0> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? T | [Test, Txt["the_types"], L, Txt["are_both_any"], R]
            : F | [Test, Txt["the_type"], L, Txt["is_any_unlike"], R]
        : IsAny<R> extends 1
          ? F | [Test, Txt["the_type"], L, Txt["is_not_any_unlike"], R]
          : [R, IsRecursiveSubtypeConsideringAny<R, L>] extends [L, 1]
            ? T | [Test, Txt["the_type"], L, Txt["assignable_from"], R]
            : F | [Test, Txt["the_type"], L, Txt["not_assignable_from"], R]

export type Compute_ToSubtype<L, R, T, F, Test = 0> =
    IsAny<R> extends 1
        ? IsAny<L> extends 1
            ? [Test, Txt["the_types"], L, R, Txt["are_both_any"]] | T
            : [Test, Txt["the_type"], L, Txt["is_not_any_unlike"], R] | F
        : IsAny<L> extends 1
          ? [Test, Txt["the_type"], L, Txt["is_not_any_unlike"], R] | F
          : [L, IsRecursiveSubtypeConsideringAny<L, R>] extends [R, 1]
            ? [Test, Txt["the_type"], L, Txt["assignable_to"], R] | T
            : [Test, Txt["the_type"], L, Txt["not_assignable_to"], R] | F

export type Compute_IsAny<X, T, F, Test = 0> =
    IsAny<X> extends 1 ? [X, Txt["is_any"]] & T : [X, Txt["is_not_any"]] | F

export type IsAny<Subject, T = 1, F = 0> = Any extends Subject
    ? [Subject] extends [Any]
        ? T
        : F
    : F
export type Compute_StandardIdentical<Left, Right> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? "Y"
        : never

export type Compute_KeyTypeIdentical<Left, Right> = Compute_StandardIdentical<
    keyof Left,
    keyof Right
>

// Give "any" its own class

export class Any {
    private _!: true
}
