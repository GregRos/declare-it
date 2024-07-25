import type { RegisterMode, TestEnv } from "what-the-test"

function formatAssertionCountTitle(title: string, mode: RegisterMode) {
    return `💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧: ${title}`
}

function getTestFunc() {
    return () => {}
}
export class FwWrapper {
    constructor(readonly fw: TestEnv) {}

    test(title: string) {
        this.fw.test(formatAssertionCountTitle(title, "pass"), getTestFunc())
    }

    skip(title: string) {
        this.fw.test.skip(
            formatAssertionCountTitle(title, "skip"),
            getTestFunc()
        )
    }

    todo(title: string) {
        this.fw.test.todo(title, () => {})
    }
}
