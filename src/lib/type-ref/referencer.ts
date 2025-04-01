import { Type_Ref } from "./reference"

/**
 * The type of the type reference function.
 *
 * @example
 *     // Recommended usage:
 *     type<string> // references the type `string`
 *     type<number> // references the type `number`
 *
 *     // Also fine:
 *     type<string>()
 *     type<number>()
 */

export interface Type_Referencer {
    /**
     * Produces a {@link Type_Ref} to the type `T` when called.
     *
     * It's recommended to use the `type<T>` syntax instead.
     *
     * @example
     *     type<string>() // references the type `string`
     *     type<number>() // references the type `number`
     */
    <T>(): Type_Ref<T>
    /**
     * Produces a {@link Type_Ref} to the type `T` when _instantiated_.
     *
     * This is a function, but it should not be invoked.
     *
     * @example
     *     type<string> // references the type `string`
     *     type<number> // references the type `number`
     *     type<{}> // references the type `{}`
     *
     * @template T The type to reference.
     */
    <T>(_not_callable_: never): T
}
/**
 * Explicitly references a type to be used in a type-only test.
 *
 * @example
 *     // Recommended usage:
 *     type<string> // references the type `string`
 *     type<number> // references the type `number`
 *     type<{}> // references the type `{}`
 *
 *     // Also fine:
 *     type<string>()
 *     type<number>()
 *
 * @template T The type to reference.
 */
export const type = function type<T>() {
    return null! as T
} as Type_Referencer
/**
 * Produces a {@link Type_Ref} by inferring the type of a value when called.
 *
 * @template T The type of the value. Don't specify this type. It's inferred.
 * @param _infer_from_ The value to infer the type of.
 * @returns A {@link Type_Ref} to the type of the value.
 */
export function type_of<T>(_infer_from_: T) {
    return null! as Type_Ref<T>
}
