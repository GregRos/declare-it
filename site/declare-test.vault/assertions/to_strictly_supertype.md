$$ L \supset R $$
This is the **proper supertype** relation, with special handling for [[the any type]]. 

A type `L` is a strict supertype of `R` if it’s assignable from it, but not the other way around. The types must not [[to_resemble|resemble]] each other.

That is, the following code should compile:
```ts
let a: L = null! as R
```
But the following code should not compile:
```ts
let b: R = null! as L
```
