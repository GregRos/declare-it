]$$L\approx R$$
This is the **mutual assignability** relation, with special handling for [[the any type]].

Two types `L`, `R` are said to *resemble* each other if one can be assigned to the other and vice versa. That is, the following code must compile:
```ts
let a: L = null! as R
let b: R = null! as L
```
In TypeScript, this is actually quite a loose relation, with many types that aren’t [[to_equal|more strictly]] equal – not interchangeable in many contexts – still being assignable to each other.

It’s still useful for cases where [[to_equal]] gives false negatives or if you want to check the general shape of a type, with some leeway.
# False Positives
## ⚠️  readonly keys
A major example is `readonly` keys, which are ignored when considering assignability. It even has an [open issue](https://github.com/microsoft/TypeScript/issues/18770).

```ts
let obj: {key: number) = null! as {readonly key: number}
```
## ⚠️ generic functions
In most cases, functions with type parameters are mutually assignable to those without, even though they are different.
```ts
let a: () => 1 = <T>() => 1
```
## ⚠️ string vs number keys
Objects with number keys are mutually assignable to objects with numeric string keys. 
```ts
let a: {1: 1} = {"1": 1}
```