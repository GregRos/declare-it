$$ L \supseteq R $$
This is the **assignable-from** relation, with special handling for [[the any type]]. 

A type `L` **supertypes** another type `R` if it’s from it. That is, if the following code compiles:
```ts
let a: L = null! as R
```
This is quite a loose relation. 


