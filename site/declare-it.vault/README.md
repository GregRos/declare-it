# declare-it

`declare-it` is a TypeScript library for writing compile-time tests for your type declarations. It helps you by registering your compile-time tests with your test framework so they appear alongside other tests.

```bash
yarn add -D declare-it
```

`declare-it` only supports simple, direct assertions on specific types together with their negations:

-   A ≡ B — `to_equal` — Type **A** is equal to type **B**.

-   A ⊆ B — `to_subtype` — Type **A** is a subtype of **B**.

-   A ⊇ B — `to_supertype` — Type **A** is a supertype of **B**.

Here is how using it looks like:

```ts
import { declare, type } from "declare-it"
declare.it("number is number", expect => {
    expect(type<number>).to_equal(type<number>)
    expect(type<number>).not.to_equal(type<boolean>)
})
```

You declare test cases using `declare.it` or `declare.test`, just like you would with normal tests. Your code will compile only if your tests pass. You can also place your tests inside the `describe` blocks defined by other frameworks, though there is no `declare.describe` function.

Each test case receives an `expect` function as an argument. This is what you use to make assertions. The inputs to this function are created using either `type` or `type_of`. You use `type` when you want to specify a specific type explicitly, using the following DSL-like syntax:

```ts
expect(type<5>).to_subtype(type<number>)
```

Note that you don’t actually call the `type` function, you just specify its type parameter. It’s a bit weird, but it works quite well.

You use `type_of` when you want to make an assertion about the type of an expression. It’s best to provide it expressions that have a predetermined type, rather than ones where the type can be inferred, such as the return types of methods.

You will usually use it as an input to `expect` and compare it to an explicitly specified type:

```ts
expect(type_of(thing.method())).to_equal(type<string>)
```

If an assertion fails, the message will include the name of the test and what was the cause for the failure. It doesn’t go into too much detail, but it’s a much finer and more specific test than using `ts-expect-error` comments.

The error messages are a bit weird, but they’re also distinctive and concise. They’re all assignability errors, with the actual reason for the failure – as well as the name of the test – being encoded into one of the types.

Here is an example, though the specific message can change and shouldn’t be considered part of the library’s API.

```
Argument of type '() => [2, 1]' is not assignable to parameter of type '["❌ 𝘁𝗵𝗲 𝘁𝘆𝗽𝗲 ❮", [1, 2], "❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝘀𝘂𝗯𝘁𝘆𝗽𝗲 ❮", [2, 1], "❯ 𝗔𝗧 𝗧𝗘𝗦𝗧 ⸨ [1, 2] ⊈ [2, 1] ⸩"]'.
```

# Test registration

`declare-it` registers its tests with whatever unit testing framework it detects. Here is how that looks like, using `jest`:

```
 PASS  src/test/core/tuples.spec.ts
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1] ⊆ [1] (7 ms)
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1, 2] ⊈ [2, 1]
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: 1[] ⊂ readonly 1[]
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: readonly 1[] ≡ Readonly<1[]>
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: 1[] ≡ Array<1>
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1] ⊂ [1?]
```

**Note that this is a convenience feature** designed to help you keep track of tests. No testing actually takes place during runtime. Your real test runner is the TypeScript compiler and its test process is just **compiling your code.**

In fact, you don’t even need to run any code for testing to take place, and doing so is purely optional.

# Skipping tests

You can mark tests as skipped. This is currently only possible by modifying the code – you can’t filter out specific tests dynamically.

To do this, you need to replace `declare.it` calls with `declare.it.skip`. All assertions involving `declare-it`’s `expect` will automatically pass and the test will be registered as skipped with your unit testing framework.

```ts
declare.it.skip("this is not ready yet", expect => {
    expect(type_of(obj.method())).to_equal(type<number>)
}
```

Note that this doesn’t affect any other code inside the test case, so even if you do this, code might fail to compile due to other reasons.
