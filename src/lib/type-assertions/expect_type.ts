import { Txt } from "./messages.js"
import type {
    Ask_Left_EqualTo_Right,
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
 * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
 *
 * Compile-time construct for making positive type assertions on `Subject` in a type-only test.
 *
 * - ℹ️ Returned by the `expect` function when defining a test using `declare.it`.
 * - ⚠️ Can only be used within the `declare.it` callback.
 *
 * @template Test The title of the test where the assertion is made.
 * @template Subject The type to be checked.
 */
export declare class EXPECT_TYPE<Test extends string, Subject> {
    private constructor()
    static DOES_NOT_EXIST_AT_RUNTIME: true
    static COMPILE_TIME_ONLY: true
    /**
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
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
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **equal and interchangeable with** the `Input` type.
     *
     * - ✅ Very strict. Use {@link to_resemble} for a looser check.
     * - ✅ Practically no false positives.
     * - ✅ Symmetric – if `Subject ≡ Input` then `Input ≡ Subject`.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).to_equal(type<1>)
     *     expect(type<{a: 1}>).to_equal(type<{a: 1}>)
     *     expect(type<any>).to_equal(type<any>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).to_equal(type<2>)
     *     expect(type<any>).to_equal(type<1>)
     *     expect(type<() => () => any)>.to_equal(type<() => any)
     *     expect(type<{readonly a: 1}>).to_equal(type<{a: 1}>)
     *     expect(type<() => any>).to_equal(type<(x?: any) => any>)
     *     expect(type<{1: 1}>).to_equal(type<{"1": 1}>)
     */
    to_equal<Input>(
        input: Ask_Left_EqualTo_Right<
            Subject,
            Input,
            InputType<Input>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    /**
     * # L ≈ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type **resembles** the `Input` type. That means they're assignable
     * to each other.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules. Use {@link to_equal} for a stricter check.
     * - ✅ Symmetric – if `Subject ≈ Input` then `Input ≈ Subject`.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).to_resemble(type<1>)
     *     expect(type<any>).to_resemble(type<any>)
     *     expect(type<{ readonly a: 1 }>).to_resemble(type<{ a: 1 }>)
     *     expect(type<() => number>).to_resemble(type<(x?: number) => number>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).to_resemble(type<1 | 2>)
     *     expect(type<1>).to_resemble(type<2>)
     *     expect(type<any>).to_resemble(type<1>)
     *     expect(type<{ a: any }>).to_resemble(type<{ a: 1 }>)
     */
    to_resemble<Input>(
        input: Ask_Left_Resembles_Right<
            Subject,
            Input,
            InputType<Input>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    /**
     * # L ⊆ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **a subtype and assignable to** the `Input` type.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ✅ Not proper – A type is assignable to itself. See {@link to_properly_subtype} for that.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).to_subtype(type<1>)
     *     expect(type<1>).to_subtype(type<1 | 2>)
     *     expect(type<1 | 2>).to_subtype(type<number>)
     *     expect(type<any>).to_subtype(type<any>)
     *     expect(type<{ a: 1; b: 1 }>).to_subtype(type<{ a: 1 }>)
     *     expect(type<() => number>).to_subtype(type<(x: number) => number>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).to_subtype(type<2>)
     *     expect(type<1 | 2>).to_subtype(type<1>)
     *     expect(type<1 | 2>).to_subtype(type<1 | 3>)
     *     expect(type<1 | 2>).to_subtype(type<any>)
     *     expect(type<{ a: 1; b: 1 }>).to_subtype(type<{ a: 1 }>)
     *     expect(type<{ a: any }>).to_subtype(type<{ a: 1 }>)
     */
    to_subtype<Input>(
        input: Ask_Left_SubtypeOf_Right<
            Subject,
            Input,
            InputType<Input>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    /**
     * # L ⊇ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **a supertype and assignable from** the `Input` type.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ✅ Not proper – A type is assignable to itself. See {@link to_properly_supertype} for that.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).to_supertype(type<1>)
     *     expect(type<1 | 2>).to_supertype(type<1>)
     *     expect(type<number>).to_supertype(type<1 | 2>)
     *     expect(type<any>).to_supertype(type<any>)
     *     expect(type<{ a: 1 }>).to_supertype(type<{ a: 1; b: 1 }>)
     *     expect(type<(x: number) => number>).to_supertype(type<() => number>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).to_supertype(type<2>)
     *     expect(type<1>).to_supertype(type<1 | 2>)
     *     expect(type<1>).to_supertype(type<1 | 3>)
     *     expect(type<1>).to_supertype(type<any>)
     *     expect(type<{ a: any }>).to_supertype(type<{ a: 1 }>)
     */
    to_supertype<Input>(
        input: Ask_Left_SupertypeOf_Right<
            Subject,
            Input,
            InputType<Input>,
            never,
            Txt.FancyTestTitleText<Test>
        >
    ): EXPECT_TYPE<Test, Subject>

    /**
     * # L ⊂ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **a proper subtype of** the `Input` type. That means
     * `Subject` is assignable to `Input`, but not the other way around.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules, making the assertion _more strict_.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ Combines {@link to_subtype} and {@link NOT_EXPECTING_TYPE.to_resemble}.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).to_properly_subtype(type<1 | 2>)
     *     expect(type<1 | 2>).to_properly_subtype(type<number>)
     *     expect(type<{ a: 1; b: 1 }>).to_properly_subtype(type<{ a: 1 }>)
     *     expect(type<() => number>).to_properly_subtype(type<(x: number) => number>)
     *     expect(type<1>).to_properly_subtype(type<1 | 2>)
     *
     *     // ✖️ FAILING
     *     expect(type<any>).to_properly_subtype(type<any>)
     *     expect(type<1 | 2>).to_properly_subtype(type<1>)
     *     expect(type<1>).to_properly_subtype(type<1>)
     *     expect(type<() => 1>).to_properly_subtype(type<(x?: 1) => 1>)
     *     expect(type<1 | 2>).to_properly_subtype(type<1 | 3>)
     *     expect(type<any>).to_properly_subtype(type<any>)
     *     expect(type<{ a: any }>).to_properly_subtype(type<{ a: 1 }>)
     */
    to_properly_subtype<Input>(
        input: "Y" extends Ask_Left_SubtypeOf_Right<Subject, Input, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Input,
                  never,
                  InputType<Input>,
                  Txt.FancyTestTitleText<Test>
              >
            : Txt.FancyTestTitleText<Test>
    ): EXPECT_TYPE<Test, Subject>

    /**
     * # L ⊃ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **a proper supertype of** the `Input` type. That means
     * `Subject` is assignable from `Input`, but not the other way around.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules, making the assertion _more strict_.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ Combines {@link to_supertype} with {@link NOT_EXPECTING_TYPE.to_resemble}.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1 | 2>).to_properly_supertype(type<1>)
     *     expect(type<number>).to_properly_supertype(type<1 | 2>)
     *     expect(type<any>).to_properly_supertype(type<any>)
     *     expect(type<{ a: 1 }>).to_properly_supertype(type<{ a: 1; b: 1 }>)
     *     expect(type<(x: number) => number>).to_properly_supertype(type<() => number>)
     *
     *     // ✖️ FAILING
     *     expect(type<1 | 2>).to_properly_supertype(type<1>)
     *     expect(type<1>).to_properly_supertype(type<1>)
     *     expect(type<1 | 2>).to_properly_supertype(type<1 | 3>)
     *     expect(type<any>).to_properly_supertype(type<any>)
     *     expect(type<{ a: any }>).to_properly_supertype(type<{ a: 1 }>)
     */
    to_properly_supertype<Input>(
        input: "Y" extends Ask_Left_SupertypeOf_Right<Subject, Input, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Input,
                  never,
                  InputType<Input>,
                  Txt.FancyTestTitleText<Test>
              >
            : Txt.FancyTestTitleText<Test>
    ): EXPECT_TYPE<Test, Subject>
}
/**
 * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
 *
 * Compile-time construct for making negative type assertions on `Subject` in a type-only test.
 *
 * - ℹ️ Returned by the `not` property of {@link EXPECT_TYPE}.
 * - ⚠️ Can only be used within the `declare.it` callback.
 *
 * @template Test The title of the test where the assertion is made.
 * @template Subject The type to be checked.
 */
export declare class NOT_EXPECTING_TYPE<Test extends string, Subject> {
    private constructor()
    static DOES_NOT_EXIST_AT_RUNTIME: true
    static COMPILE_TIME_ONLY: true
    /**
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Returns a compile-time construct with the same members as {@link NOT_EXPECTING_TYPE}, for
     * making positive type assertions.
     */
    readonly not: EXPECT_TYPE<Test, Subject>

    /**
     * # L !≡ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **not equal or interchangeable with** the `Input` type.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_equal}.
     * - ✅ Fails only for identical types.
     * - ✅ Practically no false positives.
     * - ✅ Symmetric: if `Subject !≡ Input` then `Input !≡ Subject`.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).not.to_equal(type<2>)
     *     expect(type<1>).not.to_equal(type<any>)
     *     expect(type<{ readonly a: 1 }>).not.to_equal(type<{ a: 1 }>)
     *     expect(type<any>).not.to_equal(type<1>)
     *     expect(type<() => () => any>).not.to_equal(type<() => any>)
     *     expect(type<{ 1: 1 }>).not.to_equal(type<{ "1": 1 }>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).not.to_equal(type<1>)
     *     expect(type<any>).not.to_equal(type<any>)
     *     expect(type<{ a: 1 }>).not.to_equal(type<{ a: 1; b: 1 }>)
     *     expect(type<() => number>).not.to_equal(type<() => number>)
     */
    to_equal<Input>(
        input: Ask_Left_EqualTo_Right<
            Subject,
            Input,
            never,
            InputType<Input>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    /**
     * # L !≈ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type **does not resemble** the `Input` type. That means one isn't
     * assignable to the other.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_resemble}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Symmetric: if `Subject !≈ Input` then `Input !≈ Subject`.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).not.to_resemble(type<1 | 2>)
     *     expect(type<1>).not.to_resemble(type<2>)
     *     expect(type<any>).not.to_resemble(type<1>)
     *     expect(type<{ a: any }>).not.to_resemble(type<{ a: 1 }>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).not.to_resemble(type<1>)
     *     expect(type<any>).not.to_resemble(type<any>)
     *     expect(type<{ readonly a: 1 }>).not.to_resemble(type<{ a: 1 }>)
     *     expect(type<() => number>).not.to_resemble(type<(x?: number) => number>)
     */
    to_resemble<Input>(
        input: Ask_Left_Resembles_Right<
            Subject,
            Input,
            never,
            InputType<Input>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    /**
     * # L ⊈ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **not a subtype or assignable to** the `Input` type.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_subtype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ✅ Not proper – A type is assignable to itself. See {@link to_properly_subtype} for that.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1 | 2>).not.to_subtype(type<1>)
     *     expect(type<string>).not.to_subtype(type<number>)
     *     expect(type<1>).not.to_subtype(type<any>)
     *     expect(type<{ a: 1 }>).not.to_subtype(type<{ a: 1; b: 1 }>)
     *
     *     // ✖️ FAILING
     *     expect(type<2>).not.to_subtype(type<2>)
     *     expect(type<1>).not.to_subtype(type<1 | 2>)
     *     expect(type<1 | 2>).not.to_subtype(type<number>)
     */
    to_subtype<Input>(
        input: Ask_Left_SubtypeOf_Right<
            Subject,
            Input,
            never,
            InputType<Input>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    /**
     * # L ⊉ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **not a supertype or assignable from** the `Input` type.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_supertype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ✅ Not proper – A type is assignable to itself. See {@link to_properly_supertype} for that.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).not.to_supertype(type<1 | 2>)
     *     expect(type<string>).not.to_supertype(type<number>)
     *     expect(type<1>).not.to_supertype(type<any>)
     *     expect(type<{ a: 1; b: 1 }>).not.to_supertype(type<{ a: 1 }>)
     *
     *     // ✖️ FAILING
     *     expect(type<2>).not.to_supertype(type<2>)
     *     expect(type<1 | 2>).not.to_supertype(type<1>)
     *     expect(type<number>).not.to_supertype(type<1 | 2>)
     */
    to_supertype<Input>(
        input: Ask_Left_SupertypeOf_Right<
            Subject,
            Input,
            never,
            InputType<Input>,
            Txt.FancyTestTitleText<Test>
        >
    ): NOT_EXPECTING_TYPE<Test, Subject>

    /**
     * # L ⊄ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **not a proper subtype of** the `Input` type. That means
     * either `Subject` is not assignable to `Input` **or** both types are assignable to each
     * other.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_properly_subtype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules, making the assertion _more strict_.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ Combines {@link to_subtype} and {@link EXPECT_TYPE.to_resemble}.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1 | 2>).not.to_properly_subtype(type<1>)
     *     expect(type<1>).not.to_properly_subtype(type<1>)
     *     expect(type<number>).not.to_properly_subtype(type<1 | 2>)
     *     expect(type<any>).not.to_properly_subtype(type<any>)
     *     expect(type<{ a: any }>).not.to_properly_subtype(type<{ a: 1 }>)
     *
     *     // ✖️ FAILING
     *     expect(type<1>).not.to_properly_subtype(type<1 | 2>)
     *     expect(type<{ a: 1; b: 1 }>).not.to_properly_subtype(type<{ a: 1 }>)
     */
    to_properly_subtype<Input>(
        input: "Y" extends Ask_Left_SubtypeOf_Right<Subject, Input, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Input,
                  InputType<Input>,
                  never,
                  Txt.FancyTestTitleText<Test>
              >
            : InputType<Input>
    ): NOT_EXPECTING_TYPE<Test, Subject>

    /**
     * # L ⊅ R❔
     *
     * 🚨 **DOES NOT EXIST AT RUNTIME** 🚨
     *
     * Asserts that the `Subject` type is **not a proper supertype of** the `Input` type. That means
     * either `Subject` is not assignable from `Input` **or** both types are assignable to each
     * other.
     *
     * - ✅ Inverted form of {@link EXPECT_TYPE.to_properly_supertype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules, making the assertion _more strict_.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ Combines {@link to_supertype} and {@link EXPECT_TYPE.to_resemble}.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types involved.
     *
     * @example
     *     // ☑️ PASSING
     *     expect(type<1>).not.to_properly_supertype(type<1 | 2>)
     *     expect(type<1>).not.to_properly_supertype(type<1>)
     *     expect(type<1 | 2>).not.to_properly_supertype(type<number>)
     *     expect(type<any>).not.to_properly_supertype(type<any>)
     */
    to_properly_supertype<Input>(
        input: "Y" extends Ask_Left_SupertypeOf_Right<Subject, Input, "Y", "N">
            ? Ask_Left_Resembles_Right<
                  Subject,
                  Input,
                  InputType<Input>,
                  never,
                  Txt.FancyTestTitleText<Test>
              >
            : InputType<Input>
    ): NOT_EXPECTING_TYPE<Test, Subject>
}
