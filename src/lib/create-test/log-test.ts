import type { RegisterMode } from "what-the-test"

export function logToConsole(mode: RegisterMode) {
    return (text: string) => {
        switch (mode) {
            case "pass":
                console.log(`✔️ ${text}`)
                break
            case "skip":
                console.log(`⚠️ ${text}`)
                break
            case "todo":
                console.log(`✏️ ${text}`)
                break
            default:
                throw new Error(`Unknown mode: ${mode}`)
        }
    }
}
