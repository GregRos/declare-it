---
prettier-format: "true"
---

# declare-test

[![Node.js CI](https://github.com/GregRos/declare-test/actions/workflows/push.yaml/badge.svg)](https://github.com/GregRos/declare-test/actions/workflows/main.yaml)
[![npm](https://img.shields.io/npm/v/declare-test)](https://www.npmjs.com/package/declare-test)

**declare-test** is a TypeScript library for testing type declarations at compile-time, to make sure they work as expected.

🧪 Write tests for types using compile-time assertions!
🚨 Detailed and conspicuous failure messages during compilation!
🏗️ Optional integration with a runtime test framework!
🧐 Rigorously tested!
💡 A familiar yet visually distinct API!<sup>to make it stand out from runtime tests</sup>
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
	"checks that 1 is a subtype of number",
	expect_type<1>().to_extend<number>(),
)
```

Now run `tsc`, or just wait until something automatically compiles it for you. 
```typescript
import { declare_test, expect_type } from "declare-test"

// Note that we don't give it a closure, just a bunch of assertions.
declare_test(
	"checks that number is assignable from 1",
	expect_type<1>().to_extend<number>(),
)
```

Since `declare-test` is a *compile-time only test framework*, your test runner is actually the TypeScript compiler, and **your test passes if your code compiles!**

> **PROTIP:** You don’t have the execute the compiled code, and if you do it won’t test anything.

Let’s see how a failed test looks like. Change the `to_extend` assertion to `to_equal` instead:
```typescript
import { declare_test, expect_type } from "declare-test"

declare_test(
	"checks that number is equal to 1",
	expect_type<1>().to_equal<number>(),
)
```

And try to compile it again. Surprise! You get a compilation error with special formatting. Here is how you it looks like:
```
Argument of type '𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<1, "𝗡𝗢𝗧 𝗘𝗫𝗧𝗘𝗡𝗗𝗘𝗗 𝗕𝗬", number>' is not assignable to parameter of type '"❌ 𝗧𝗘𝗦𝗧: checks that number is equal to 1"'
```

The error is a bit confusing. The key is **to focus on the types involved**, rather than the error. They tell you which assertion failed and which test it failed.
## Decoding failures
Let’s take a look at the first type:
```typescript
𝗧𝗢_𝗘𝗤𝗨𝗔𝗟_𝗘𝗥𝗥𝗢𝗥<number, "𝗡𝗢𝗧 𝗔 𝗦𝗨𝗕𝗧𝗬𝗣𝗘 𝗢𝗙", 1>
```
It spells out:
1. The **assertion that failed** – `to_equal`
2. The **type arguments** of the assertion – `number` and a`1`
3. The **reason for the failure** – `number` is not a subtype of `1`. 

Meanwhile, the 2nd type is just the title of the failed test as a string:
```
❌ 𝗧𝗘𝗦𝗧: checks that number is equal to 1
```
# Keeping track of tests
`declare-test` encodes tests as type checking problems and lets the compiler do its thing. That means the only test runner you need is the TypeScript compiler!

While that’s cool and all, TypeScript doesn’t tell you about tests that passed. It would be nice to have a reassuringly long list of all the tests it performed on your behalf.

Worry not! You can get that by **running the compiled code!** While **running the code doesn’t test anything,** it will tell your runtime test framework of the tests that were executed during compilation.

This works by finding whatever function your testing environment uses to define tests and using it to register empty tests with the titles you wrote. 

`declare-test`  knows about frameworks like:
- `jest`
- `ava`
- `jasmine`
- `mocha`

Here is an example using `jest`:
![[Pasted image 20240403024114.png]]

If `declare-test` can’t find a test framework, it will just log the titles of the tests to the console. Here is how that looks like:
![[Pasted image 20240403024104.png]]

You can also explicitly tell `declare-test` which function to use. You can do that using `declare_setup`. You just call it with the function `declare-test` should use to register its “tests”. It should be a function that takes a single string parameter, which is the test title.

Here is an example:
```typescript
import {declare_setup} from "declare-test"
import {test} from "ava"
declare_setup(title => test(title, t => t.pass())
```
# Assertions
The library comes with several compile-time type assertions. 

## Starting an assertion
You can start an assertion using the functions:
- `expect_type`, which just takes a type parameter.
- `expect_type_of`, which accepts a value parameter that’s used to determine the type to check.

```typescript
declare_test(
	"string extends never",
	expect_type<string>().to_extend<never>(),
	expect_type_of("hello world").to_extend<never>()
)
```


You can start an assertion using either `expect_type<T>()` or `expect_type_of(expr)`.

## `to_equal`
Checks whether a type is equal to another type. In principle, two types being equal means that one type can be replaced by the other in all circumstances.

