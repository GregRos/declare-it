import type { RegisterMode } from "what-the-test"

export function formatTodo(title: string) {
    return `✏️ ${title} (todo)`
}
export function formatSkip(title: string) {
    return `✖️ ${title} (skipped)`
}
export function formatPass(title: string) {
    return `✅ ${title}`
}
export function logToConsole(mode: RegisterMode) {
    return (text: string) => {
        switch (mode) {
            case "pass":
                console.log(formatPass(text))
                break
            case "skip":
                console.log(formatSkip(text))
                break
            case "todo":
                console.log(formatTodo(text))
                break
            default:
                throw new Error(`Unknown mode: ${mode}`)
        }
    }
}
