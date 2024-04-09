function getTestOrIt(obj: any) {
    if ("test" in obj) {
        return obj.test
    }
    if ("it" in obj) {
        return obj.it
    }
    return undefined
}
async function getFw(name: string) {
    try {
        switch (name) {
            case "global":
                return getTestOrIt(globalThis)
            case "ava":
                const avaTest = getTestOrIt(await import("ava"))
                return (title: string) => avaTest(title, (t: any) => t.pass())
            case "mocha":
                return getTestOrIt(await import("mocha"))
            case "jest":
                return getTestOrIt(await import("jest"))
            case "jasmine":
                return getTestOrIt(await import("jasmine"))
            case "console":
                return console.log
        }
    } catch (e) {
        return false
    }
    throw new Error(`Unknown test framework: ${name}`)
}

async function getFws(names: string[]) {
    const entries = []
    for (const name of names) {
        const fw = await getFw(name)
        entries.push([name, fw])
    }
    return Object.fromEntries(entries)
}

export const detectedFrameworks = await getFws([
    "global",
    "ava",
    "mocha",
    "jest",
    "jasmine",
    "console"
])
