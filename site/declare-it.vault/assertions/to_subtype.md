$$ L \subseteq R $$
This is the **assignable-to** relation, with special handling for [[any type]]. 

A type `L` **subtypes** another type `R` if it’s assignable to it. That is, if the following code compiles, provided `R` doesn’t use [[any type]].
```ts
// using satisifes:
null! as L satisfies R

// using assignment:
let a: R = null! as L
```



