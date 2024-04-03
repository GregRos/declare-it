---
prettier-format: "true"
---

# declare-test

[![Node.js CI](https://github.com/GregRos/declare-test/actions/workflows/push.yaml/badge.svg)](https://github.com/GregRos/declare-test/actions/workflows/main.yaml)
[![npm](https://img.shields.io/npm/v/declare-test)](https://www.npmjs.com/package/declare-test)

**declare-test** is a TypeScript library for testing type declarations during compilation.

🧪 Write tests for types using compile-time assertions!
🚨 Detailed and conspicuous failure messages during compilation!
🏗️ Optional integration with a runtime test framework!
🧐 Rigorously tested!
💡 A familiar yet visually_distinct API!<sup>to make it stand out from runtime tests</sup>
🗺️ Use it to explore the TypeScript type landscape!

# Install
```bash
yarn add declare-test
```
```bash
npm install --save-dev declare-test
```
# Usage
Let’s write a test to check that `number` is assignable from `1`:
```typescript
import { declare_test, expect_type } from "declare-test"

// Note that we don't give it a closure, just a bunch of assertions.
declare_test(
	"checks that number is assignable from 1",
	expect_type<number>().to_assign_from<1>(),
)
```
Now run `tsc`, or just wait until something automatically compiles it for you. 

In `declare-test`, your test runner is actually the TypeScript compiler, and it will emit a compilation error if one of the tests fails. In this case your code compiles successfully, which means the test passed. 

> **PROTIP:** You don’t have the execute the compiled code, and if you do it won’t test anything.

Let’s change that by asserting that the type `number` is *equal to* the type `1`:
```typescript
import { declare_test, expect_type } from "declare-test"

declare_test(
	"checks that number is equal to 1",
	expect_type<number>().to_equal<1>(),
)
```

Surprise! You get a compilation error, one with emojis and special formatting. Here is how you it looks like:
```
Argument of type '𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<number, "𝗡𝗢𝗧 𝗔 𝗦𝗨𝗕𝗧𝗬𝗣𝗘 𝗢𝗙", string>' is not assignable to parameter of type '"❌ 𝗧𝗘𝗦𝗧: checks that number is equal to 1"'
```

The error itself doesn’t matter — the reason for the failed test is encoded into the types themselves. Let’s break it down.
## Decoding failures
Here is the first type:
```typescript
𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<number, "𝗡𝗢𝗧 𝗔 𝗦𝗨𝗕𝗧𝗬𝗣𝗘 𝗢𝗙", 1>
```
The first type spells out:
1. The **assertion that failed** – `to_equal`
2. The **type arguments** of the assertion – `number` and a`1`
3. The **reason for the failure** – `number` is not a subtype of `1`. 

The second type gives the name of the test that failed, as a string:
```
❌ 𝗧𝗘𝗦𝗧: checks that number is equal to 1
```
# Keeping track of your tests
`declare-test` encodes tests as type checking problems and lets the compiler do its thing. That means the only test runner you need is the TypeScript compiler!

While that’s cool and all, it would still be nice to get a list of the tests that passed.  
Worry not! You can get that by **running the compiled code!** While **running the code doesn’t test anything,** it will inform both you and the test framework you’re using of the tests that the library ran on your behalf before the code compiled.

When you run the compiled code, `declare-test` will try to find a test registration function and use it to register the names of the tests and the number of assertions they contained. 

It knows about frameworks like:
- `jest`
- `ava`
- `jasmine`
- `mocha`

Here is an example using `jest`:
![[Pasted image 20240403024114.png]]

`declare-test` won’t always succeed, though. But if it has trouble, you an always help it along using the `declare_setup` function. 

```typescript
import {setup_declare} from "declare-test"
import {test} from "ava"
setup_declare(test)

```

The function should be compatible with the signature:
```typescript
(testTitle: string, testCallback: () => void) => void
```



While running the compiled code of your tests is optional, 
```typescript
(testTitle: string, testCallback: 
```




But the test code *can* be executed. In fact, it’s even recommended to do so as part of your testing process. That way your test output can be ~~artificially inflated~~ more accurate. Just because some of your tests execute during compile time doesn’t mean they don’t exist.

If you run the code as part of a unit testing workflow,  `declare-test` will automagically try to find what test framework it’s running in. However, it’s not that good at automagic, so you might have to help it along. 

To set things up, you can call `setup_declare` and give it whatever function that’s used in your testing environment to register a test:

```typescript
```

If the code isn’t running in any framework, `declare-test` will just emit the test titles using `console.log`, together with a checkmark:
![[Pasted image 20240403024104.png]]
# Assertions
The library comes with several compile-time type assertions. You can start an assertion using either `expect_type<T>()` or `expect_type_of(expr)`.

## `to_equal`
Checks whether a type is equal to another type. In principle, two types being equal means that one type can be replaced by the other in all circumstances.

