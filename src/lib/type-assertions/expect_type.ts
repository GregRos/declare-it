import { Txt } from "./messages.js"
import type {
    Ask_Left_IdenticalTo_Right,
    Ask_Left_Resembles_Right,
    Ask_Left_SubtypeOf_Right,
    Ask_Left_SupertypeOf_Right
} from "./questions.js"
export type InputType<T> = {
    (_: never): T
}
export interface ExpectFunction<Test extends string> {
    <Subject>(subjType: InputType<Subject>): EXPECT_TYPE<Test, Subject>
}

/**
 * Compile-time construct for making positive type assertions on `Subject` in a type-only test.
 *
 * - ℹ️ Returned by the `expect` function when defining a test using `declare.it`.
 * - ⚠️ Can only be used within the `declare.it` callback.
 * - ⚠️ **This class doesn't exist at runtime.** It's a compile-time only construct.
 *
 * @template Test The title of the test where the assertion is made.
 * @template Subject The type to be checked.
 */
export declare class EXPECT_TYPE<Test extends string, Subject> {
    /**
     * Returns a compile-time construct with the same members as {@link EXPECT_TYPE}, for making
     * negative type assertions.
     *
     * @example
     *     expect(type<string>).not.to_equal(type<number>)
     */
    readonly not: NOT_EXPECTING_TYPE<Test, Subject>
    /**
     * # L ≡ R❔
     *
     * Asks whether the **subject type** is strictly equal and equivalent to the **input type**.
     *
     * - ✅ Very strict. Use {@link to_resemble} for a looser check.
     * - ✅ Practically no false positives.
     * - ✅ Symmetric – if `Subject ≡ Input` then `Input ≡ Subject`.
     * - ⚠️ **Will fail loudly** on expressions with type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that quotes the test title and includes the types involved.
     *
     * @template L The left type. Symmetric.
     * @template R The right type. Symmetric.
     * @template T OR'd into the message if the check passes.
     * @template F OR'd into the message if the check fails.
     * @template Test The test title. Can be set to 0 if it doesn't matter (default).
     */ to_equal<Input>(
        refType: Ask_Left_IdenticalTo_Right<
            Subject,
            Input,
            InputType<Input>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    to_resemble<Reference>(
        refType: Ask_Left_Resembles_Right<
            Subject,
            Reference,
            InputType<Reference>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    to_subtype<Reference>(
        refType: Ask_Left_SubtypeOf_Right<
            Subject,
            Reference,
            InputType<Reference>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    to_supertype<Reference>(
        refType: Ask_Left_SupertypeOf_Right<
            Subject,
            Reference,
            InputType<Reference>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: "Y" extends Ask_Left_SubtypeOf_Right<Subject, Reference, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Reference,
                  never,
                  InputType<Reference>,
                  Txt.FancyTestTitleText<Test>
              >
            : Txt.FancyTestTitleText<Test>
    ): EXPECT_TYPE<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: "Y" extends Ask_Left_SupertypeOf_Right<Subject, Reference, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Reference,
                  never,
                  InputType<Reference>,
                  Txt.FancyTestTitleText<Test>
              >
            : Txt.FancyTestTitleText<Test>
    ): EXPECT_TYPE<Test, Subject>
}

export declare class NOT_EXPECTING_TYPE<Test extends string, Subject> {
    private constructor()
    readonly not: EXPECT_TYPE<Test, Subject>

    to_equal<Reference>(
        refType: Ask_Left_IdenticalTo_Right<
            Subject,
            Reference,
            never,
            InputType<Reference>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    to_resemble<Reference>(
        refType: Ask_Left_Resembles_Right<
            Subject,
            Reference,
            never,
            InputType<Reference>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    to_subtype<Reference>(
        refType: Ask_Left_SubtypeOf_Right<
            Subject,
            Reference,
            never,
            InputType<Reference>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    to_supertype<Reference>(
        refType: Ask_Left_SupertypeOf_Right<
            Subject,
            Reference,
            never,
            InputType<Reference>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    to_strictly_subtype<Reference>(
        refType: "Y" extends Ask_Left_SubtypeOf_Right<Subject, Reference, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Reference,
                  InputType<Reference>,
                  never,
                  Txt.FancyTestTitleText<Test>
              >
            : InputType<Reference>
    ): NOT_EXPECTING_TYPE<Test, Subject>

    to_strictly_supertype<Reference>(
        refType: "Y" extends Ask_Left_SupertypeOf_Right<Subject, Reference, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Reference,
                  InputType<Reference>,
                  never,
                  Txt.FancyTestTitleText<Test>
              >
            : InputType<Reference>
    ): NOT_EXPECTING_TYPE<Test, Subject>
}
