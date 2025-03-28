The [[expect]] function you get from `declare-it` works similarly to the `expect` function from the test frameworks you’re familiar with. It comes with basic type assertions:

| Description   | Math            | Positive         | Negative             |
| ------------- | --------------- | ---------------- | -------------------- |
| Equivalence   | $L \equiv R$    | [[to_equal]]     | [[not.to_equal]]     |
| Compatibility | $L \approx R$   | [[to_resemble]]  | [[not.to_resemble]]  |
| Subtyping     | $L \subseteq R$ | [[to_subtype]]   | [[not.to_subtype]]   |
| Supertyping   | $L \supseteq R$ | [[to_supertype]] | [[not.to_supertype]] |
