import type { Txt } from "../type-assertions/messages.js"

export interface AssertionInfo {
    name: string
    customMessage?: string
}
export type TestFunction = <TestText extends string>(
    title: TestText,
    ...assertions: [Txt.FancyTestTitleText<TestText>, ...Txt.FancyTestTitleText<TestText>[]]
) => void

export type RegisterTestFunction = (title: string, assertionCount: number) => void

export type FrameworkTestFunction = (title: string, f: () => void) => void
