Without special care, a single `any` can make any check or compile-time assertion always pass, while simultaneously being quite harmful to the users of those type definitions.

This library tries to overcome the problem by checking for `any`, explicitly and even recursively in some cases, and trying to handle it as its own unique type. Under this set of rules, `any` is not a subtype of any type but itself.

This means that, for example, `{a: 1}` does not [[to_resemble|resemble]] `{a: any}` and is not a [[to_subtype|subtype]] of it. However, `{a: any}` **is** a subtype of `{}`. 

That said, because `any` breaks the rules of the language most assertions still struggle with it. The only one that should handle all cases of `any` in this manner is [[to_equal]]. 
