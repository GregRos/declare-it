import { Txt } from "./messages.js"
import type {
    Ask_Left_EqualTo_Right,
    Ask_Left_Resembles_Right,
    Ask_Left_SubtypeOf_Right,
    Ask_Left_SupertypeOf_Right
} from "./questions.js"
export type Type_Ref<T> = {
    (_: never): T
}
/** The type of `declare-it`'s `expect` function. */
export interface ExpectFunction<
    Test extends string,
    Skipped extends 1 | 0 = 0
> {
    <L>(
        subjType: Type_Ref<L>
    ): __expect<Test, L, Skipped extends 1 ? unknown : never>
}

/**
 * Used to combine multiple assertions on the same type.
 *
 * @template Test Keeps track of the test title.
 * @template L The type to be checked.
 * @template Skipped Keeps track of skipped test.
 */
export declare abstract class __and<
    Test extends string,
    L,
    Skipped extends never | unknown = never
> {
    readonly and: __expect<Test, L, Skipped>
}

/**
 * Compile-time construct for making positive type assertions on `L` in a
 * type-only test.
 *
 * - ℹ️ Returned by the `expect` function when defining a test using `declare.it`.
 * - ⚠️ Can only be used within the `declare.it` callback.
 *
 * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
 *
 * @template Test The title of the test where the assertion is made.
 * @template L The type to be checked.
 */
export declare abstract class __expect<
    Test extends string,
    L,
    Skipped extends never | unknown = never
> {
    /** 🚨 **NOT CALLABLE** 🚨 */
    private constructor()
    static DOES_NOT_EXIST_AT_RUNTIME: true
    static COMPILE_TIME_ONLY: true
    /**
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
     *
     * Returns a compile-time construct with the same members as
     * {@link __expect}, for making negative type assertions.
     *
     * @example
     *     expect(type<string>).not.to_equal(type<number>)
     */
    readonly not: __expect_not<Test, L>
    /**
     * # L ≡ R❕
     *
     * Asserts that the `L` type is **equal and interchangeable with** the `R`
     * type.
     *
     * - ✅ Very strict. Use {@link to_resemble} for a looser check.
     * - ✅ Practically no false positives.
     * - ✅ Symmetric – if `L ≡ R` then `R ≡ L`.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
     *
     * @param r_type A {@link TypeSpecifier}
     */
    to_equal<R>(
        type_ref: Ask_Left_EqualTo_Right<
            L,
            R,
            Type_Ref<R>,
            Skipped,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L ≈ R❕
     *
     * Asserts that the `L` type **does_resemble** the `R` type. That means
     * they're assignable to each other.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules. Use {@link to_equal}
     *   for a stricter check.
     * - ✅ Symmetric – if `L ≈ R` then `R ≈ L`.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_resemble<R>(
        type_ref: Ask_Left_Resembles_Right<
            L,
            R,
            Type_Ref<R>,
            Skipped,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L ⊆ R❕
     *
     * Asserts that the `L` type is **a subtype and assignable to** the `R`
     * type.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     *   🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_subtype<R>(
        type_ref: Ask_Left_SubtypeOf_Right<
            L,
            R,
            Type_Ref<R>,
            Skipped,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L ⊇ R❕
     *
     * Asserts that the `L` type is **a supertype and assignable from** the `R`
     * type.
     *
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     *   🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_supertype<R>(
        type_ref: Ask_Left_SupertypeOf_Right<
            L,
            R,
            Type_Ref<R>,
            Skipped,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>
}
/**
 * Compile-time construct for making negative type assertions on `L` in a
 * type-only test.
 *
 * - ℹ️ Returned by the `not` property of {@link __expect}.
 * - ⚠️ Can only be used within the `declare.it` callback.
 *
 * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
 *
 * @template Test The title of the test where the assertion is made.
 * @template L The type to be checked.
 */
export declare abstract class __expect_not<
    Test extends string,
    L,
    Skipped extends never | unknown = never
> {
    private constructor()
    static DOES_NOT_EXIST_AT_RUNTIME: true
    static COMPILE_TIME_ONLY: true
    /**
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
     *
     * Returns a compile-time construct with the same members as
     * {@link __expect_not}, for making positive type assertions.
     */
    readonly not: __and<Test, L, Skipped>

    /**
     * # L !≡ R❕
     *
     * Asserts that the `L` type is **not equal or interchangeable with** the
     * `R` type.
     *
     * - ✅ Inverted form of {@link __expect.to_equal}.
     * - ✅ Fails only for identical types.
     * - ✅ Practically no false positives.
     * - ✅ Symmetric: if `L !≡ R` then `R !≡ L`.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_equal<R>(
        type_ref: Ask_Left_EqualTo_Right<
            L,
            R,
            Skipped,
            Type_Ref<R>,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L !≈ R❕
     *
     * Asserts that the `L` type **does not resemble** the `R` type. That means
     * one isn't assignable to the other.
     *
     * - ✅ Inverted form of {@link __expect.to_resemble}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Symmetric: if `L !≈ R` then `R !≈ L`.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
     *     expect(type<() => number>).not.to_resemble(
     *         type<(x?: number) => number>
     *     )
     */
    to_resemble<R>(
        type_ref: Ask_Left_Resembles_Right<
            L,
            R,
            Skipped,
            Type_Ref<R>,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L ⊈ R❕
     *
     * Asserts that the `L` type is **not a subtype or assignable to** the `R`
     * type.
     *
     * - ✅ Inverted form of {@link __expect.to_subtype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_subtype<R>(
        type_ref: Ask_Left_SubtypeOf_Right<
            L,
            R,
            Skipped,
            Type_Ref<R>,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>

    /**
     * # L ⊉ R❕
     *
     * Asserts that the `L` type is **not a supertype or assignable from** the
     * `R` type.
     *
     * - ✅ Inverted form of {@link __expect.to_supertype}.
     * - ✅ Overcomes most _common_ false positives.
     * - ✅ Based on TypeScript's loose assignability rules.
     * - ❗ Considers `any` to only be assignable to itself.
     * - ⚠️ **May error** on expressions with unbound type parameters.
     * - ℹ️ If the assertion fails, a formatted compile-time error is produced.
     * - ℹ️ The message is a tuple that includes the test title and the types
     *   involved.
     *
     * 🚨 **DO NOT CALL OUTSIDE OF TYPE-ONLY TEST** 🚨
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
    to_supertype<R>(
        type_ref: Ask_Left_SupertypeOf_Right<
            L,
            R,
            Skipped,
            Type_Ref<R>,
            Txt.FancyTestTitleText<Test>
        >
    ): __and<Test, L, Skipped>
}
