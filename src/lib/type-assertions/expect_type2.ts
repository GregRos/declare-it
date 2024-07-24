import type {
    Compute_ToEqual,
    Compute_ToResemble,
    Compute_ToSubtype,
    Compute_ToSupertype
} from "./type-relations2"

export type Type = <T>() => T
export type TypeOf = <T>(x: T) => () => T

export interface ExpectType<Test extends string> {
    <Subject>(subjType: () => Subject): Expecting𝗧𝗬𝗣𝗘<Test, Subject>
}

export declare class Expecting𝗧𝗬𝗣𝗘<Test, Subject> {
    not: NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>
    to_equal<Reference>(
        refType: () => Compute_ToEqual<
            Test,
            Subject,
            Reference,
            Reference,
            unknown
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_resemble<Reference>(
        refType: () => Compute_ToResemble<
            Test,
            Subject,
            Reference,
            Reference,
            unknown
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_subtype<Reference>(
        refType: () => Compute_ToSubtype<
            Test,
            Subject,
            Reference,
            Reference,
            never
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_supertype<Reference>(
        refType: () => Compute_ToSupertype<
            Test,
            Subject,
            Reference,
            Reference,
            never
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: () => Compute_ToSubtype<
            string,
            Subject,
            Reference,
            1,
            0
        > extends 1
            ? Compute_ToResemble<Test, Subject, Reference, never, Reference>
            : Compute_ToSubtype<Test, Subject, Reference, Reference, never>
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: () => Compute_ToSupertype<
            string,
            Subject,
            Reference,
            1,
            0
        > extends 1
            ? Compute_ToResemble<Test, Subject, Reference, never, Reference>
            : Compute_ToSupertype<Test, Subject, Reference, Reference, never>
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>
}

export declare class NotExpecting𝗧𝗬𝗣𝗘<Test, Subject> {
    private constructor()
    readonly not: Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_equal<Reference>(
        refType: () => Compute_ToEqual<
            Test,
            Subject,
            Reference,
            unknown,
            Reference
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_resemble<Reference>(
        refType: () => Compute_ToResemble<
            Test,
            Subject,
            Reference,
            never,
            Reference
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_subtype<Reference>(
        refType: () => Compute_ToSubtype<
            Test,
            Subject,
            Reference,
            never,
            Reference
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_supertype<Reference>(
        refType: () => Compute_ToSupertype<
            Test,
            Subject,
            Reference,
            never,
            Reference
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: () => Compute_ToSubtype<
            string,
            Subject,
            Reference,
            1,
            0
        > extends 1
            ? Compute_ToResemble<Test, Subject, Reference, Reference, unknown>
            : Reference
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: () => Compute_ToSupertype<
            string,
            Subject,
            Reference,
            1,
            0
        > extends 1
            ? Compute_ToResemble<Test, Subject, Reference, Reference, never>
            : Reference
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>
}
