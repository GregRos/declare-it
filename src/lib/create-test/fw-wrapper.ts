import type { TestEnv } from "what-the-test"

function formatTestTitle(title: string) {
    return `💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: ${title}`
}

/** No-op for test registration */
function getTestFunc() {
    return () => {}
}

/** Registers tests with a test framework. */
export class FwWrapper {
    constructor(readonly fw: TestEnv) {}

    test(title: string) {
        this.fw.test(formatTestTitle(title), getTestFunc())
    }

    skip(title: string) {
        this.fw.test.skip(formatTestTitle(title), getTestFunc())
    }

    todo(title: string) {
        this.fw.test.todo(title, () => {})
    }
}
