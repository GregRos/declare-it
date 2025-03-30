import { Type_Ref } from "./reference"

/** The type of a type reference function. */

export interface Type_Referencer {
    <T>(): Type_Ref<T>
    <T>(_: never): T
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
 * Infers the type of a value, to be used in a type-only test.
 *
 * @template T The type of the value. Normally inferred from the argument.
 * @param value The value to infer the type of.
 * @returns A declare-it reference to the type of the value.
 */
export function type_of<T>(_: T) {
    return null! as (_: never) => T
}
