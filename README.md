# declare-it
[![npm version](https://img.shields.io/npm/v/declare-it.svg)](https://www.npmjs.com/package/declare-it)
[![npm downloads](https://img.shields.io/npm/dm/declare-it.svg)](https://www.npmjs.com/package/declare-it)
[![GitHub Workflow Status](https://github.com/gregros/declare-it/actions/workflows/push.yaml/badge.svg)](https://github.com/gregros/declare-it/actions/workflows/push.yaml)

Test your TypeScript type declarations with style! 

Plugs into your favorite runtime test framework.

- 👷‍♂️ Write actual test cases, with titles and everything!

- 📐 **Simple** but **incredibly accurate** type assertions

- 🧼 A clean and legible API, with a dash of DevEx magic.

- 📜 Human-readable compile-time errors!

- 🪄 Keeps track of tests by registering them with your test framework!

- 💁‍♀️ No plugins or configuration required!

Here’s what it looks like:

```ts
import {declare, type, type_of} from "declare-it"

declare.it("tests basic math", expect => {
    expect( type<1> ).to_subtype( type<number> )

    expect(
//  ↓ type being compared:
        type<1> 
//  ↓ type assertion:
    ).to_subtype( 
//  ↓ comparing against:
        type<number> 
//  ↓ chain another assertion:
    ).and.to_subtype(
//  ↓ infer the type of a value:
        type_of(val)
    )
})
```

Get it now!

```bash
yarn add -D declare-it
```

```bash
npm install --save-dev declare-it
```
# Declaring test cases
You declare test cases using the `declare.it` function, which takes a callback that has one parameter.

This is your `expect` function. It’s what you use to make assertions about types. Every `expect` function belongs to a test case and knows its title.

```ts
declare.it("your test title", expect => {
    expect(...).to_equal(...)
})
```

**These test cases don’t actually execute at runtime.** Your test runner is the compiler, and it “runs” your tests by compiling your code.

That also means these test cases can contain any code you want. They can be async too. It doesn’t matter; it just has to compile.

```ts
declare.it("side-effects?", async expect => {
    let x = await callSomeFunction()
    
    expect(type_of(x)).to_equal(type<1>)
})
```
# Referencing types
When using **declare-it**, to make assertions about types you need to reference them in a special way. 

There are two options:

- Using the explicit `type<YourType>`
- Using inferred `type_of(yourValue)`

So either specify the type explicitly:

```ts
type<number>
type<1>
type<string>
```

Or infer it from a variable:

```ts
type_of(variable)
```

Just don’t use it with literals:

```ts
type_of("hello world")
```

Literals don’t have declared types, so the type you get might not be what you expect. 
# Being assertive
**declare-it**’s type assertions all work and look the same. They’re methods on the `expect` object you get by calling:

```ts
expect( 
    type<SomeType> 
)
```

They all start with `to_`, such as:
```ts
// Inside a declare.it clause:
expect( 
    type<1> 
).to_subtype( 
    type<number> 
)
```

They can all be inverted by using `.not`, like this:

```ts
// Inside a declare.it clause:
expect( 
    type<1> 
).not.to_subtype( 
    type<string> 
)
```

And you can also chain them by tacking `.and` like this:

```ts
// Inside a declare.it clause:
expect( 
    type<1> 
).to_subtype( 
    type<number> 
).and.to_subtype( 
    type<unknown> 
)
```

You can do both, but you’ll need to prefix every inverted assertion with `not.` for the sake of readability:

```ts
// Inside a declare.it clause:
expect( 
    type<1> 
).not.to_subtype(
    type<2> 
).and.not.to_subtype( 
    type<3> 
)
```

Let’s take a look at the assertions you can make.
# to_equal [ L ≡ R ]
This the strictest assertion **declare-it** has in its arsenal. It checks if two types are **interchangeable**. 

It will only pass if you can replace one type with another *in all contexts*. Any code that compiles using one of them has to also compile with the other. 

That means identical modifiers on properties:
```ts
expect(
    type<{a: 1}>
).not.to_equal(
    type<{readonly a: 1}>
).and.not.to_equal(
    type<{a: 1}>
)
```

Identical key declarations:
```ts
expect(
    type<{1: 1}>
).not.to_equal(
    type<{"1": 1}>
)
```

Identical call signatures:
```ts
expect(
    type<() => 1>
).not.to_equal(
    type< <T>() => 1 >
)
```

And everything else!
# to_subtype [ L ⊆ R ]
This assertion checks if one type `L` is a **subtype of** another type `R`. This means:

- `L` has all of the *structure* of `R`, like members, call signatures, and so on. 
- A value of type `L` can be assigned to a variable of type `R`.
- And finally, you can use `L` instead of `R` in generic type constraints.

That means this code has to compile:

```ts
const right: R = null! as L
```

But this code has to compile too:
```ts
type Subtype_Of<L extends R, R> = null
type L_Subtypes_R = Subtype_Of<L, R>
```

This is an extremely useful assertion. By constructing the right type to compare against, you can make all kinds of complex statements about the type being tested.

For example, you can check your type has a specific property using:

```ts
expect(
    type<TestedType>
).to_subtype(
    type< {yourKey: YourValue } >
)
```
## Negation [ L ⊈ R ]
The negation is also quite useful, as it lets you make sure a type *doesn’t* have some structure you don’t want, like an indexer:

```ts
expect(...).not.to_subtype(
    type<{
        [x: string]: unknown
    }>
)
```

You can also use it to make sure one of your methods *isn’t* callable with a set of types:

```ts
expect(
    type<TestedType>
).not.to_subtype(
    type<{
        method(x: number): unknown
    }>
)
```
# to_supertype [ L ⊇ R ]
This assertion checks the opposite — that `L` is a supertype of `R`. This means:

- `R` has all of the structure of `L`
- A value of type `R` is assignable to a variable of type `L`
- You can use `R` instead of `L` to satisfy type constraints.

It’s basically the same check as `to_subtype`, but with the operands inverted. 
# to_resemble [ L ≈ R ]
This combines the two previous assertions. It can also be written as:

Or as:

```ts
expect(
    type<YourType>
).to_subtype(
    type<OtherType>
).and.to_supertype(
    type<OtherType>
)
```

In other words, it lets you check whether two types **are mutual subtypes of each other**, having the same structure.

In particular, the following code has to compile:

```ts
const right: R = null! as L
const left: L = null! as R
```

As well as the following code:

```ts
type L_Subtypes_R = Subtype_Of<L, R>
type R_Subtypes_L = Subtype_Of<R, L>
```

Which tells you that the right-hand type is assignable to the left-hand one. However, it’s not as strict or accurate as `to_equal`. 
## Negation [ L ≉ R ]
The negation — `not.to_resemble` — means two types aren’t the same. One way to use it is to check that a type isn’t `any`:

```ts
expect(
    type<X>
).not.to_resemble(
    type<any>
)
```
# Dealing with failure
Here’s what TypeScript says when an assertion fails:

```
src/test/core/primitives.spec.ts:14:33 - error TS2345: 
Argument of type 
'{ (): (_: never) => number; (_: never): number; }' 
is not assignable to parameter of type 
'["                                              ", 
"❌ 𝗔𝗧 𝗧𝗘𝗦𝗧 “1 ⊂ number” ❱➤ 
𝗧𝗛𝗘 𝗧𝗬𝗣𝗘 (", 1, ") 𝗗𝗢𝗘𝗦 𝗡𝗢𝗧 𝗦𝗨𝗣𝗘𝗥-𝗧𝗬𝗣𝗘 (", number, ")                                                    "]'.
```

It’s a failure message with some garbage at the start! Let’s take a closer look, without the unnecessary characters:

```
❌ 𝗔𝗧 𝗧𝗘𝗦𝗧 “1 ⊂ number” ❱➤ 
𝗧𝗛𝗘 𝗧𝗬𝗣𝗘 (", 1, ") 𝗗𝗢𝗘𝗦 𝗡𝗢𝗧 𝗦𝗨𝗣𝗘𝗥-𝗧𝗬𝗣𝗘 (", number, ")
```

Here we can see:

1. A big red ❌, always reassuring.
2. Bold text 😮
3. The name of the test where the failure happened.
4. Badass Unicode arrow thingy.
5. The `L` type — the one that went into the `expect` function.
6. The `R` type — the one that went into the assertion function.
7. A description of the problem.

And of course, you also have the trace pointing to the line where the failure occurred.

Use this information wisely! 
# Automagic registration
**declare-it** comes with a bonus feature. It will actually talk to your test framework — provided you have one — and tell it about the tests you’re making.

The tests still run as part of compilation, but you’ll have a pretty list so you can feel proud of yourself for writing them. Here’s how it looks like in Jest:

```
 PASS  src/test/core/any.spec.ts
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: any is only equal to any (1 ms)
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: {a: any} ≡ {a: any}
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: {a: any} ⊈ {a: 1}
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: {a: any, b: any} ⊂ {a: any}
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: 3 level nested
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: 5 level nested
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: two identical disj types
  √ 💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: two differnt disj types
```

Automagic registration will examine your environment, try to import various packages, and generally look around. If it doesn’t find anything, it will print the same messages to the console.

Automagic registration uses the [what-the-test](https://github.com/gregros/what-the-test) package, which currently supports:

- Jasmine
- Mocha
- Jest
- Ava
## Manual configuration
If the automagic stuff doesn’t work out, you can always configure `declare-it` manually using the `declare.setup` function:

```ts
import {declare} from "declare-it"

// Emit to the console:
declare.setup("console")

// Don't emit at all:
declare.setup(false)

// Use ava:
declare.setup("ava")

// Use jest:
declare.setup("jest")
```
# Skipping tests
You can skip compile-time tests in a similar way to how you might skip runtime test. 

Just prefix the test case declaration with `.skip`:

```ts
declare.it.skip(
    "this is a skipped test, so no error", expect => {
    expect(type<number>).to_equal(type<string>)
})
```

It will make your assertions always pass! It will also register the test as skipped with your test framework.

