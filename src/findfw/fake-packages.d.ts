declare module "ava" {
    export function test(
        title: string,
        testFunction: (t: { pass(): void }) => void
    ): void
}

declare module "mocha" {
    export function it(title: string, itFunction: () => void): void
}

declare module "jest" {
    export function it(title: string, itFunction: () => void): void
}

declare module "jasmine" {
    export function it(title: string, itFunction: () => void): void
}
