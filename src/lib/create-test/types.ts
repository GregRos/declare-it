import { FancyTestTitleText } from "../type-assertions/texts"

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

export type RegisterTestFunction = (
    title: string,
    ...assertions: [AssertionInfo, ...AssertionInfo[]]
) => void

export type FrameworkTestFunction = (title: string) => void
