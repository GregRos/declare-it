type Primitive = string | number | boolean | null | undefined | symbol | bigint

export type IsSimplePrimitive<Subject, T = 1, F = 0> = Subject extends Subject &
    Primitive
    ? T
    : F
