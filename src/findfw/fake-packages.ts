declare module "ava" {
    export function test(title: string, testFunction: (t: any) => void): void
}
