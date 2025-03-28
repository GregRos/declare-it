import { declare, type } from "@lib/index.js"

declare.test("string indexer does not match real property", expect => {
    expect(type<{ [x: string]: 1 }>).not.to_subtype(type<{ a: 1 }>)
})

declare.test("literal indexer does match real property", expect => {
    expect(type<{ [x in "a"]: 1 }>).to_subtype(type<{ a: 1 }>)
})

declare.test("numeric indexer matches tuple", expect => {
    expect(type<{ [x: number]: 1 }>).to_subtype(type<[1]>)
})

declare.test("subtype checks callable with", expect => {
    expect(type<(a: number | string) => void>).to_subtype(type<(a: string) => void>)
})
