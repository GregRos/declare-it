import { the_type } from "@lib"
it("empty", () => {})
// @ts-expect-error
the_type<string>().is_any(true)
the_type<any>().is_any(true)
// @ts-expect-error
the_type<unknown>().is_any(true)
