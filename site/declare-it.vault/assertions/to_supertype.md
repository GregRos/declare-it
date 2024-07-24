$$ L \supseteq R $$
This is the **assignable-from** relation, with special handling for [[the any type]]. 

A type `L` **supertypes** another type `R` if it’s assignable from it. That is, if the following code compiles:
```ts
// using satisfies:
null! as R satisfies L

// using assignment:
let a: L = null! as R
```
This is quite a loose relation. 


