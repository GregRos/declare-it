This is generic function lets you specify a type to be the subject of an assertion using the type of an expression.

It works like [[type]], but instead of providing the type explicitly as a type parameter, this function needs to be called and will infer the type from an argument.

Unlike [[type]], this function actually needs to be called. The expected type can be specified using either [[type]] or [[type_of]].

```ts
import {declare, type, type_of} from "declare-it"

declare.it("type of 1 is number", expect => {
    expect(type_of(1)).to_equal(type<number>)
})
```

 
