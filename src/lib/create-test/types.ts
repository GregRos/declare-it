import { FancyTestTitleText } from "../type-assertions/texts.js"

export interface AssertionInfo {
    name: string
    customMessage?: string
}
export type TestFunction = <TestText extends string>(
    title: TestText,
    ...assertions: [
        FancyTestTitleText<TestText>,
        ...FancyTestTitleText<TestText>[]
    ]
) => void

export type RegisterTestFunction = (title: string) => void

export type FrameworkTestFunction = (title: string) => void
