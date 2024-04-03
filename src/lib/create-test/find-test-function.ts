import { logToConsole } from "./log-test.js"
import { FrameworkTestFunction, RegisterTestFunction } from "./types.js"

function getEmptyTestFunction(): FrameworkTestFunction {
    return logToConsole
}

export function getRegisterTestFunction(): RegisterTestFunction {
    const itFunction = getEmptyTestFunction()
    return wrapFrameworkTestFunction(itFunction)
}
