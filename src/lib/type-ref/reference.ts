/**
 * The type of a `declare-it` type reference.
 *
 * Produced by the `type` and `type_of` operators.
 *
 * @example
 *     type<string> satisfies Type_Ref<string>
 *     type<number> satisfies Type_Ref<number>
 *
 *     const v = 1 as number
 *     type_of(v) satisfies Type_Ref<number>
 *     const u = "foo" as string
 *     type_of(u) satisfies Type_Ref<string>
 */
export type Type_Ref<T> = {
    (_: never): T
}
