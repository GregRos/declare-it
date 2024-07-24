The [[type input]] is a type that can be used for type assertions. Due to technical considerations, the actual type being asserted can’t be used. Instead, `declare-it` uses an encoding.

The current encoding is `() => T`, but this can change and shouldn’t be considered part of the package’s interface. For your purposes, the exact encoding doesn’t matter.

