$$ L \subseteq R $$
This is the **assignable-to** relation, with special handling for [[the any type]]. 

A type `L` **subtypes** another type `R` if it’s assignable to it. That is, if the following code compiles:
```ts
let a: R = null! as L
```
This is quite a loose relation. 


