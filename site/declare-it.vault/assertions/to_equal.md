$$L \equiv R$$
Two types, `L` and `R`, are said to be equal if you can replace one with the other in all contexts. In other words, they are equivalent and interchangeable.
```ts
declare_test("1 is 1", expect => {
    expect.type<1>(t => t.to_equal<1>())
})
```
This relation is much stronger than [[to_resemble|assignability]], and should be used when you want to check that the given type exactly matches some other expected type. 

It’s the only relation that can handle types containing `any`.
# False Negative
his relation can be overly sensitive and will fail in some cases when two types are equivalent but have different shapes, commonly when type operators or call signatures are involved. 

There aren’t many of these, but examples include:

| Left                          |              | Right                  |
| ----------------------------- | ------------ | ---------------------- |
| `{a: 1} & {b: 2}`             | should equal | `{a: 1; b: 2}`         |
| <code>{a: 1} \| {a: 1}</code> | should equal | <code>{a: 1}</code>    |
| `{(): void}`                  | should equal | `{(): void; (): void}` |
# False Positive
There is one known false positive — almost all the false positives of [[to_resemble]] are eliminated.

| Left                |                 | Right               |
| ------------------- | --------------- | ------------------- |
| `{(): 1} & {(): 2}` | shouldn’t equal | `{(): 2} & {(): 1}` |
