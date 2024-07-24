import type { RegisterMode, TestEnv } from "what-the-test"
import { DeclareItError } from "./errors"

function formatAssertionCountTitle(
    assertionCount: number,
    title: string,
    mode: RegisterMode
) {
    const symbolBasedOnMode =
        mode === "pass"
            ? "✔"
            : mode === "skip"
              ? "❓"
              : mode === "todo"
                ? "✏️"
                : "❌"
    return `💭 𝗧𝗬𝗣𝗘-𝗢𝗡𝗟𝗬 𝗧𝗘𝗦𝗧 (${assertionCount.toString().padStart(2, " ")}×${symbolBasedOnMode} ): ${title}`
}

function getFuncBasedOnAssertionCount(assertionCount: number) {
    return () => {
        if (assertionCount === 0) {
            throw new DeclareItError("Test has no compile-time assertions!")
        }
    }
}
export class FwWrapper {
    constructor(readonly fw: TestEnv) {}

    test(title: string, assertionCount: number) {
        this.fw.test(
            formatAssertionCountTitle(assertionCount, title, "pass"),
            getFuncBasedOnAssertionCount(assertionCount)
        )
    }

    skip(title: string, assertionCount: number) {
        this.fw.test.skip(
            formatAssertionCountTitle(assertionCount, title, "skip"),
            getFuncBasedOnAssertionCount(assertionCount)
        )
    }

    todo(title: string) {
        this.fw.test.todo(title, () => {})
    }
}
