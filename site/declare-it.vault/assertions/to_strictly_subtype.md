$$ L \subset R $$
This is the **proper subtype** relation, with special handling for [[the any type]]. 

A type `L` is a strict subtype of `R` if it’s assignable to it, but not the other way around. The types must not [[to_resemble|resemble]] each other.

That is, the following code should compile, provided `L` and `R` doesn’t use [[the any type]].
```ts
null! as L satisfies R
// @ts-expect-error
null! as R satisifes L

let R: R = null! as L
// @ts-expect-error
let L: L = null! as R
```

