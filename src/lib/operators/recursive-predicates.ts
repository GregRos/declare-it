import type { Decrement } from "./decrement"
import type { Is_Any, Is_Function, IsSimplePrimitive } from "./predicates"

type TargetDepth = 10
/**
 * Recursively checks whether `L` is a subtype of `R` and vice versa.
 *
 * - Used for overcome deeply nested `any` types.
 */
export type Is_Recursive_Subtype_Considering_Any<
    L,
    R,
    Depth extends number = TargetDepth
> =
    Is_Any<L> extends 1
        ? Is_Any<R> extends 1
            ? 1 // Both are any --- equal
            : 0 // L is any, R is not any --- not equal
        : Is_Any<R> extends 1
          ? 0 // L is not any, R is any --- not equal
          : 1 extends IsSimplePrimitive<R> | IsSimplePrimitive<L>
            ? 1
            : 1 extends Is_Function<L> | Is_Function<R>
              ? 1
              : Depth extends 0
                ? 1 // depth is reached --- handle elsewhere
                : {
                      [K in keyof R & (string | number)]: K extends keyof L &
                          (string | number)
                          ? Is_Recursive_Subtype_Considering_Any<
                                L[K],
                                R[K],
                                Decrement<Depth>
                            >
                          : 1
                  }[keyof R & (string | number)]

export type Is_Recursive_Supertype_Considering_Any<
    L,
    R,
    Depth extends number = TargetDepth
> = Is_Recursive_Subtype_Considering_Any<R, L, Depth>

export type Is_Recursive_Resembles_Considering_Any<
    L,
    R,
    Depth extends number = TargetDepth
> =
    Is_Any<L> extends 1
        ? Is_Any<R> extends 1
            ? 1 // Both are any --- equal
            : 0 // L is any, R is not any --- not equal
        : Is_Any<R> extends 1
          ? 0 // L is not any, R is any --- not equal
          : 1 extends IsSimplePrimitive<L> | IsSimplePrimitive<R>
            ? 1 // L and R are simple primitives --- handled elsewhere
            : Depth extends 0
              ? 1 // depth is reached --- handle elsewhere
              : {
                    [K in keyof (L | R)]: K extends keyof L
                        ? K extends keyof R
                            ? Is_Recursive_Resembles_Considering_Any<
                                  L[K],
                                  R[K],
                                  Decrement<Depth>
                              >
                            : 0
                        : 0
                }[keyof (L | R)]
