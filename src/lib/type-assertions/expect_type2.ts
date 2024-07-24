import type {
    Compute_ToEqual,
    Compute_ToResemble,
    Compute_ToSubtype,
    Compute_ToSupertype
} from "./type-relations2"

export type InputType<T> = {
    (): T
}

export interface ExpectType<Test extends string> {
    <Subject>(subjType: InputType<Subject>): Expecting𝗧𝗬𝗣𝗘<Test, Subject>
}

export declare class Expecting𝗧𝗬𝗣𝗘<Test, Subject> {
    not: NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>
    to_equal<Reference>(
        refType: Compute_ToEqual<
            Subject,
            Reference,
            InputType<Reference>,
            never
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_resemble<Reference>(
        refType: Compute_ToResemble<
            Subject,
            Reference,
            InputType<Reference>,
            Test
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_subtype<Reference>(
        refType: Compute_ToSubtype<
            Subject,
            Reference,
            InputType<Reference>,
            Test
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_supertype<Reference>(
        refType: Compute_ToSupertype<
            Subject,
            Reference,
            InputType<Reference>,
            Test
        >
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: "Y" extends Compute_ToSubtype<Subject, Reference, "Y", "N">
            ? Compute_ToResemble<Subject, Reference, Test, InputType<Reference>>
            : Test
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: "Y" extends Compute_ToSupertype<Subject, Reference, "Y", "N">
            ? Compute_ToResemble<Subject, Reference, Test, InputType<Reference>>
            : Test
    ): Expecting𝗧𝗬𝗣𝗘<Test, Subject>
}

export declare class NotExpecting𝗧𝗬𝗣𝗘<Test, Subject> {
    private constructor()
    readonly not: Expecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_equal<Reference>(
        refType: Compute_ToEqual<Subject, Reference, Test, InputType<Reference>>
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_resemble<Reference>(
        refType: Compute_ToResemble<
            Subject,
            Reference,
            Test,
            InputType<Reference>
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_subtype<Reference>(
        refType: Compute_ToSubtype<
            Subject,
            Reference,
            Test,
            InputType<Reference>
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_supertype<Reference>(
        refType: Compute_ToSupertype<
            Subject,
            Reference,
            Test,
            InputType<Reference>
        >
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: "Y" extends Compute_ToSubtype<Subject, Reference, "Y", "N">
            ? Compute_ToResemble<
                  Subject,
                  Reference,
                  InputType<Reference>,
                  never
              >
            : InputType<Reference>
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: "Y" extends Compute_ToSupertype<Subject, Reference, "Y", "N">
            ? Compute_ToResemble<Subject, Reference, InputType<Reference>, Test>
            : InputType<Reference>
    ): NotExpecting𝗧𝗬𝗣𝗘<Test, Subject>
}
