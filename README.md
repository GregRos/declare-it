# the-type-is-right
[![Node.js CI](https://github.com/GregRos/the-type-is-right/actions/workflows/push.yaml/badge.svg)](https://github.com/GregRos/the-type-is-right/actions/workflows/main.yaml)
[![Coverage Status](https://coveralls.io/repos/github/GregRos/the-type-is-right/badge.svg?branch=master)](https://coveralls.io/github/GregRos/preszr?branch=master)
[![npm](https://img.shields.io/npm/v/the-type-is-right)](https://www.npmjs.com/package/the-type-is-right)

**The Type Is Right** is a TypeScript library for asserting stuff about type declarations for testing purposes.

In other words:
- It’s a TypeScript library you compile-time type assertions.
- 
# Install
```bash
yarn add the-type-is-right
```
```bash
npm install --save-dev the-type-is-right
```
# Use
```typescript
import {the_type} from "the-type-is-right"

the_type<string>().equals<number>(false)
the_type<string>().equals<"a">(false)
the_type<string>().equals<any>(false)
the_type<string>().equals<string>(true)

the_type<string>().assigns_from<"a">()
the_type_of()
```

# What is 

**the type is right** is a small library for compile-time type assertions. These type assertions have been carefully engineered to perfection, giving you the ideal set of tools to make sure that 

- It doesn’t perform any runtime assertions or validation
- 
