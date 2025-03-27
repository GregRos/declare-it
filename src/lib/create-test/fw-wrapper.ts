import type { RegisterMode, TestEnv } from "what-the-test"

/**
 * Builds the test title for unit tests
 *
 * @param title
 * @param mode
 * @returns
 */
function formatAssertionCountTitle(title: string, mode: RegisterMode) {
    return `💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: ${title}`
}

/** No-op for test registration */
function getTestFunc() {
    return () => {}
}

/** Appends test messsages gives test title */
export class FwWrapper {
    constructor(readonly fw: TestEnv) {}

    test(title: string) {
        this.fw.test(formatAssertionCountTitle(title, "pass"), getTestFunc())
    }

    skip(title: string) {
        this.fw.test.skip(formatAssertionCountTitle(title, "skip"), getTestFunc())
    }

    todo(title: string) {
        this.fw.test.todo(title, () => {})
    }
}
