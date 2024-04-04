function getTestOrIt(obj: any) {
    if ("test" in obj) {
        return obj.test
    }
    if ("it" in obj) {
        return obj.it
    }
    return undefined
}

function findfw() {
    if ("it" in globalThis) {
        const it = getTestOrIt(globalThis)
        return (title: string) => it(title, () => {})
    }
    try {
        const ava = require("ava")
        const it = getTestOrIt(ava)
        return (title: string) => it(title, (t: any) => t.pass())
    } catch (e) {}
    try {
        const mocha = require("mocha")
        const it = getTestOrIt(mocha)
        return (title: string) => it(title, () => {})
    } catch (e) {}
    try {
        const jest = require("jest")
        const it = getTestOrIt(jest)
        return (title: string) => it(title, () => {})
    } catch (e) {}
    try {
        const jasmine = require("jasmine")
        const it = getTestOrIt(jasmine)
        return (title: string) => it(title, () => {})
    } catch (e) {}
    console.log("????")
    return undefined
}
export const fwTestFunction = findfw()
