# declare-it
`declare-it` is a TypeScript library for writing compile-time tests for your type declarations. 

```bash
yarn add -D declare-it
```

Here is how using it looks like:

```ts
import {declare, type} from "declare-it"
declare.it("number is number", expect => {
    expect(type<number>).to_equal(type<number>)
    expect(type<number>).not.to_equal(type<boolean>)
})
```

`declare-it` works together with whatever unit testing framework you happen to be using, registering its compile-time tests so they show up during the testing process. 

```
 PASS  src/test/core/tuples.spec.ts
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1] ⊆ [1] (7 ms)
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1, 2] ⊈ [2, 1]
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: bff2f1[] ⊂ reafdonly 1[]
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: readonly 1[] ≡ Readonly<1[]>
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: 1[] ≡ Array<1>
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: [1] ⊂ [1?]                            
```

**Note that no testing actually takes place during runtime.** These tests are only registered so you can keep track of them in the same way as normal unit tests. Because these are compile-time tests, your actual test runner is the TypeScript compiler. 

Since the TypeScript compiler wasn’t really designed to run tests, failed tests will show up as compilation errors. A lot of work has gone into making these messages as clear and legible as possible, while standing out from normal compilation errors. Here is an example:

```
Argument of type '() => 5' is not assignable to parameter of type '["❌ 𝘁𝗵𝗲 𝘁𝘆𝗽𝗲 ❮", 5, "❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝘀𝘂𝗯𝘁𝘆𝗽𝗲 ❮", 6, "❯ 𝗔𝗧 𝗧𝗘𝗦𝗧 ⸨ 5 is not 6 ⸩"]'.

17     expect(type<UnusedGeneric>).to_equal(type<5>)
```

To read this, ignore the first type. The message is encoded into the second type as an array. It includes the actual type (the first argument) and the actual (second argument). It also includes the test title at the end.

```
["❌ 𝘁𝗵𝗲 𝘁𝘆𝗽𝗲 ❮", 5, "❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝘀𝘂𝗯𝘁𝘆𝗽𝗲 ❮", 6, "❯ 𝗔𝗧 𝗧𝗘𝗦𝗧 ⸨ 5 is not 6 ⸩"]
```

`declare-it` supports the following assertions, and you can negate an assertion using `.not`.

- `to_equal`
- `to_resemble`
- `to_subtype`
- `to_supertype`
- `to_strictly_subtype`
- `to_strictly_supertype`

You can mark a test to be skipped using:
 
```ts
declare.it.skip("my skipped test", expect => {
    expect(type<5>).to_equal(type<6>)
})
```

This will cause all compile-time assertions inside the test to pass. The skipped test will appear in your testing process.