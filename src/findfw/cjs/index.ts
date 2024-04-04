function findfw() {
    if ("it" in globalThis) {
        console.log("mocha!")
        return (title: string) => it(title, () => {})
    }
    try {
        const ava = require("ava")
        return (title: string) => ava.test(title, (t: any) => t.pass())
    } catch (e) {}
    try {
        const mocha = require("mocha")
        return (title: string) => mocha.it(title, () => {})
    } catch (e) {}
    try {
        console.log("jest!")
        const jest = require("jest")
        return (title: string) => jest.it(title, () => {})
    } catch (e) {}
    try {
        const jasmine = require("jasmine")
        return (title: string) => jasmine.it(title, () => {})
    } catch (e) {}
    console.log("????")
    return undefined
}
export const findfwRegisterTest = findfw()
