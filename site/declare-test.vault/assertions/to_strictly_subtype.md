$$ L \subset R $$
This is the **proper subtype** relation, with special handling for [[the any type]]. 

A type `L` is a strict subtype of `R` if it’s assignable to it, but not the other way around. The types must not [[to_resemble|resemble]] each other.

That is, the following code should compile:
```ts
let a: R = null! as L
```
But the following code should not compile:
```ts
let b: L = null! as R
```
