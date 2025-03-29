// Give "any" its own class

class Any {
    private _!: true
}
/** Checks whether `Subject` is `any`. */
export type IsAny<Subject, T = 1, F = 0> = Any extends Subject
    ? [Subject] extends [Any]
        ? T
        : F
    : F
/**
 * Checks whether the keyof of the input types are the same. Used to overcome a
 * false positive of {@see Are_Types_Identical} involving numeric vs number
 * keys.
 *
 * @template Left The left type. Symmetric.
 * @template Right The right type. Symmetric.
 * @template T Returned if the keys are identical. Default: 1.
 * @template F Returned if the keys are not identical. Default: never.
 */

export type Are_Types_Key_Identical<
    Left,
    Right,
    T = 1,
    F = never
> = Are_Types_Identical<keyof Left, keyof Right, T, F> /**
 * Checks if two types are identical.
 *
 * - ℹ️ Referenced by jcalz at https://stackoverflow.com/a/53808212/1333004
 * - ⚠️ Two known false positives.
 *
 * @template Left The left type. Symmetric.
 * @template Right The right type. Symmetric.
 * @template T Returned if the types are identical. Default: 1.
 * @template F Returned if the types are not identical. Default: never.
 */

export type Are_Types_Identical<Left, Right, T = 1, F = never> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? T
        : F
export type IsFunction<T> = [T] extends [Function] ? 1 : 0
