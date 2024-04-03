async function findfw() {
    try {
        const ava = await import("ava")
        return (title: string) => ava.test(title, t => t.pass())
    } catch (e) {}
    try {
        const mocha = await import("mocha")
        return (title: string) => mocha.it(title, () => {})
    } catch (e) {}
    try {
        const jest = await import("jest")
        return (title: string) => jest.it(title, () => {})
    } catch (e) {}
    try {
        const jasmine = await import("jasmine")
        return (title: string) => jasmine.it(title, () => {})
    } catch (e) {}
    return undefined
}
export const fwTestFunction = await findfw()
