The namespace that lets you define test cases. You use `declare.it` in the same way you’d use the `it` function of your test framework. You can use it as part of test suites defined using `describe` as well.

If you’re not using a test framework, `declare-it` will just output test titles to the console.
# declare.it
The `declare.it` function declares a standard test case. 

|                     |                                              |
| ------------------- | -------------------------------------------- |
| **📝 compile time** | Creates a scope for compile-time assertions. |
| **🚀 At run time**  | Adds the test case to the runtime un         |
|                     |                                              |

```ts
import {declare, type, type_of} from "declare-it"

declare.it("1 is 1", expect => {
    expect(type<1>).to_equal(type<1>)
})

declare.it("type of expression 1 is number", expect => {
    expect(type_of(1)).to_equal(type<number>)
})
```
# declare.it.skip
Skips the test case. This causes the compile-time test to always pass, while the runtime test will be added as skipped using functions like `it.skip`, `xit`, and so on.

Here is how it can be used. The following is also one of the test cases that involve [[any type]] but fail all the checks. 

```ts
declare.it.skip("any is the devil", expect => {
    type A = { a: any } | { b: 1 }
    type B = { a: 1 } | { b: any }
    expect(type<A>).not.to_equal(type<B>)
    expect(type<A>).not.to_resemble(type<B>)
    expect(type<A>).not.to_subtype(type<B>)
    expect(type<A>).not.to_supertype(type<B>)
    expect(type<A>).not.to_strictly_subtype(type<B>)
    expect(type<A>).not.to_strictly_supertype(type<B>)
})
```
# declare.xit
See [[#declare.it.skip]].
# declare.test.todo
Registers a test title as [todo](https://jestjs.io/docs/api#testtodoname), as seen in `jest`. If the framework doesn’t support this kind of test declaration, `skip` will be used instead with a formatted title.
```ts
declare.it.todo("check stuff")
```
