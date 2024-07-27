$$ L \supset R $$
This is the **proper supertype** relation, with special handling for [[any type]]. 

A type `L` is a strict supertype of `R` if it’s assignable from it, but not the other way around. The types must not [[to_resemble|resemble]] each other.

That is, the following code should compile, provided `L` and `R` doesn’t use [[any type]].
```ts
// SATISFIES:
null! as R satisfies L
// @ts-expect-error
null! as L satisifes R

// ASSIGNMENT:
let L: L = null! as R
// @ts-expect-error
let R: R = null! as L
```
