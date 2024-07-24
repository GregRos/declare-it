import path from "path";

/** @type {import("jest").Config} */
const config = {
    testEnvironment: "node",
    testPathIgnorePatterns: ["dist"],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/src/test/tsconfig.json",
                transpileOnly: true,
                useESM: true
            }
        ]
    },
    rootDir: ".",
    testMatch: ["<rootDir>/src/test/**/*.spec.ts"],
    // Should be set via --coverage option
    collectCoverage: false,
    extensionsToTreatAsEsm: [".ts"],
    collectCoverageFrom: ["<rootDir>/src/lib/**/*.ts"],
    coverageDirectory: "<rootDir>/coverage",
    moduleNameMapper: {
        "^@lib/(.*)$": "<rootDir>/dist/esm/$1"
    },

    globals: {
        defaults: {}
    }
}

export default config;
