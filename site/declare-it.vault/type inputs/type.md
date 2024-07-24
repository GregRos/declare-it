This is generic function lets you specify a type to be the subject of an assertion. Instead of calling this function, you just instantiate it using the type you want, e.g. `type<number>`. 

To perform an assertion you need to acquire the [[tests/expect]] function, which is provided as an argument to your [[declare|test case]]. Here is how it looks like:

```ts
import {type, declare} from "declare-it"

declare.it("number is number", expect => {
    expect(type<number>).to_equal(type<number>)
})
```

