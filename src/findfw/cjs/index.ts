function getTestOrIt(obj: any) {
    if ("test" in obj) {
        return obj.test
    }
    if ("it" in obj) {
        return obj.it
    }
    return undefined
}
function getFw(name: string) {
    const fws = []
    try {
        switch (name) {
            case "global":
                return getTestOrIt(globalThis)
            case "ava":
                const avaTest = getTestOrIt(require("ava"))
                return (title: string) => avaTest(title, (t: any) => t.pass())
            case "mocha":
                return getTestOrIt(require("mocha"))
            case "jest":
                return getTestOrIt(require("jest"))
            case "jasmine":
                return getTestOrIt(require("jasmine"))
            case "console":
                return console.log
        }
    } catch (e) {
        return false
    }
    throw new Error(`Unknown test framework: ${name}`)
}

function getFws(names: string[]) {
    const entries = []
    for (const name of names) {
        const fw = getFw(name)
        entries.push([
            name,
            (title: string) =>
                fw(title, () => {
                    /* pass */
                })
        ])
    }
    return Object.fromEntries(entries)
}

export const detectedFrameworks = getFws([
    "global",
    "ava",
    "mocha",
    "jest",
    "jasmine",
    "console"
])
