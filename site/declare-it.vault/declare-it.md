[[declare-it]] is a TypeScript library for testing type definitions during compile time, in a way that integrates with an existing test framework.

```ts
yarn add declare-it
```
# Features
- 🗳️ Organize assertions into test cases, with the ability to skip them.

- 🐰 Formatted, clear, and concise error messages in your IDE.

- 📝 Legible assertion style that remains distinct.

- 🐜 Covers many, many edge cases that trip up other tools.

- 🧪 Comprehensively tested.

- ⛔ Supports negating assertions using `.not`

- 📃 Registers tests with runtime framework or prints them.

- 👻 Handles even the dreaded [[any type]], even in nested situations.
# Example
Here is how using [[declare-it]] looks like:

```ts
import {declare, type, type_of} from "declare-it"

declare.it("[1, 1] not subtype of [1]", expect => {
    expect( type<[1, 1]> ).not.to_subtype( type<[1]> )
})

declare.it("[1] equals [1] | [1]", expect => {
    expect( type<[1]> ).to_equal( type<[1] | [1]> )
})
```

And here are the error messages it outputs:

![[Pasted image 20240724164658.png]]