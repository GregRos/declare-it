function findfw() {
    try {
        const ava = require("ava")
        return (title: string) => ava.test(title, t => t.pass())
    } catch (e) {}
    try {
        const mocha = require("mocha")
        return (title: string) => mocha.it(title, () => {})
    } catch (e) {}
    try {
        const jest = require("jest")
        return (title: string) => jest.it(title, () => {})
    } catch (e) {}
    try {
        const jasmine = require("jasmine")
        return (title: string) => jasmine.it(title, () => {})
    } catch (e) {}
    return undefined
}
export const findfwRegisterTest = findfw()
