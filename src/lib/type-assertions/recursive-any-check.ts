import type { Decrement } from "../operators/decrement"
import type { IsSimplePrimitive } from "../operators/is-primitive"
import type { IsAny, IsFunction } from "./type-relations"

type TargetDepth = 10
export type IsRecursiveSubtypeConsideringAny<
    L,
    R,
    Depth extends number = TargetDepth
> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 1 // Both are any --- equal
            : 0 // L is any, R is not any --- not equal
        : IsAny<R> extends 1
          ? 0 // L is not any, R is any --- not equal
          : 1 extends IsSimplePrimitive<R> | IsSimplePrimitive<L>
            ? 1
            : 1 extends IsFunction<L> | IsFunction<R>
              ? 1
              : Depth extends 0
                ? 1 // depth is reached --- handle elsewhere
                : {
                      [K in keyof R & (string | number)]: K extends keyof L &
                          (string | number)
                          ? IsRecursiveSubtypeConsideringAny<
                                L[K],
                                R[K],
                                Decrement<Depth>
                            >
                          : 1
                  }[keyof R & (string | number)]

export type IsRecursiveSupertypeConsideringAny<
    L,
    R,
    Depth extends number = TargetDepth
> = IsRecursiveSubtypeConsideringAny<R, L, Depth>

export type IsRecursiveResemblesConsiderAny<
    L,
    R,
    Depth extends number = TargetDepth
> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? 1 // Both are any --- equal
            : 0 // L is any, R is not any --- not equal
        : IsAny<R> extends 1
          ? 0 // L is not any, R is any --- not equal
          : 1 extends IsSimplePrimitive<L> | IsSimplePrimitive<R>
            ? 1 // L and R are simple primitives --- handled elsewhere
            : Depth extends 0
              ? 1 // depth is reached --- handle elsewhere
              : {
                    [K in keyof (L | R)]: K extends keyof L
                        ? K extends keyof R
                            ? IsRecursiveResemblesConsiderAny<
                                  L[K],
                                  R[K],
                                  Decrement<Depth>
                              >
                            : 0
                        : 0
                }[keyof (L | R)]
