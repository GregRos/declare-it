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
                transpileOnly: true
            }
        ]
    },
    rootDir: ".",
    testMatch: ["<rootDir>/src/test/**/*.spec.ts"],
    // Should be set via --coverage option
    collectCoverage: false,
    collectCoverageFrom: ["<rootDir>/src/lib/**/*.ts"],
    coverageDirectory: "<rootDir>/coverage",
    moduleNameMapper: {
        "^@lib/(.*)$": "<rootDir>/dist/cjs/$1",
        "^@lib$": "<rootDir>/dist/cjs/index.js",
    },

    globals: {
        defaults: {}
    }
}

export default config;
