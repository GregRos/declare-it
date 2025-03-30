/** The type of a `declare-it` type reference. */
export type Type_Ref<T> = {
    (_: never): T
}
