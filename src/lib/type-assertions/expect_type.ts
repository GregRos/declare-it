import { nonRuntimeFunctionExecuted } from "../create-test/errors.js"
import { AssertionInfo } from "../create-test/types.js"
import {
    Compute_ToSupertype,
    Compute_ToSubtype,
    Compute_ToEqual,
    Compute_ToResemble,
    type Compute_AreIdentical,
    type Any
} from "./type-relations.js"

declare class ExpectingBase<Subject> {
    keyof(): Expecting𝗧𝗬𝗣𝗘<keyof Subject>
}

/** Provides positive type assertions for the subject type {@link Subject}. */
declare class Expecting𝗧𝗬𝗣𝗘<Subject> extends ExpectingBase<Subject> {
    private constructor()
    __Subject: Subject
    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type is equal to the {@link Reference}
     * type. This makes sure the type isn't narrower or broader than what you
     * intend.
     *
     * ### Definition: Equality
     *
     * _Two types are **equal** if they can be interchanged with each other in
     * all contexts._
     *
     * This assertion is extremely strict. In practice, checking it involves the
     * following assertions:
     *
     * 1. {@link to_subtype} - The {@link Subject} type is a subtype of the
     *    {@link Reference} type. That is, it's assignable to it.
     * 2. {@link to_supertype} - The {@link Subject} type is a supertype of the
     *    {@link Reference} type. That is, it can be assigned from it.
     * 3. Both {@link Reference} and {@link Subject} are reducible to types with
     *    identical representations.
     *
     * For a less strict assertion that does something similar, see
     * {@link to_resemble}, which only makes the first two assertions.
     *
     * @example
     *     declare_test("number is not equal to 1", check => {
     *     // Obvious cases:
     *     check = expect_type<number>().to_equal<1>() // ERROR
     *     check = expect_type<number>().to_equal<number>() // OK
     *     const obj = {}
     *     check = expect_type<typeof obj.toString>()
     *
     *     // A stricter relationship than assignability:
     *     check = expect_type<{readonly A: number}>.to_equal<{a: number}>() // ERROR
     *     })
     *
     * @returns `never` if the assertion is fulfilled and a descriptive error
     *   object otherwise.
     */
    to_equal<Reference>(): Compute_ToEqual<Subject, Reference, 1, unknown>
    /**
     * ## 🧩 During compilation
     *
     * Returns an object used to make negative assertions regarding the type
     * {@link Subject}.
     */
    readonly not: NotExpecting𝗧𝗬𝗣𝗘<Subject>

    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type is similar and compatible to the
     * {@link Reference} type. This makes sure the type isn't narrower or broader
     * than what you intend. However, it's not as strict as {@link to_equal}
     *
     * ### Definition: Resemblance
     *
     * _Two types **resemble** each other if one is assignable to the other and
     * vice versa._
     *
     * This assertion is less strict than {@link to_equal} and will allow for
     * some differences between the two types, =following TypeScript's lax
     * assignability rules.
     *
     * It combines the two assertions:
     *
     * 1. {@link to_subtype} - The expected type is a subtype of the reference type.
     *    That is, it's assignable to it.
     * 2. {@link to_supertype} - The expected type is a supertype of the reference
     *    type. That is, it can be assigned from it.
     *
     * ## ⚠️ At runtime
     *
     * Cannot be called during runtime.
     */
    to_resemble<Reference>(): Compute_ToResemble<Subject, Reference, 1, unknown>

    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type is a subtype of the {@link Reference}
     * type and can be assigned to it.
     *
     * This makes sure the type isn't broader than what you intend.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     */
    to_subtype<Reference>(): Compute_ToSubtype<Subject, Reference, 1, unknown>

    to_strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        unknown
    > extends 1
        ? Compute_ToResemble<Subject, Reference, unknown, 1>
        : Compute_ToSubtype<Subject, Reference, 1, unknown>
    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type is a supertype of the
     * {@link Reference} type and can be assigned from it.
     *
     * This makes sure the type isn't narrower than what you intend.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     */
    to_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        unknown
    >
    to_strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        unknown
    > extends 1
        ? Compute_ToResemble<Subject, Reference, unknown, 1>
        : Compute_ToSupertype<Subject, Reference, 1, unknown>
}

/** Provides negative type assertions for the subject type {@link Subject}. */
declare class NotExpecting𝗧𝗬𝗣𝗘<Subject> extends ExpectingBase<Subject> {
    private constructor()
    readonly not: Expecting𝗧𝗬𝗣𝗘<Subject>

    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type **is not equal** to the
     * {@link Reference} type.
     *
     * ### Definition: Equality
     *
     * _Two types are **equal** if they can be interchanged with each other in
     * all contexts._
     *
     * As the {@link Expecting𝗧𝗬𝗣𝗘.to_equal} assertion is extremely narrow,
     * this one is extremely broad. Any of the following can be true for the
     * assertion to hold:
     *
     * 1. {@link to_subtype} - The expected type **is not** a subtype of the
     *    reference type. That is, it's not assignable to it.
     * 2. {@link to_supertype} - The {@link Subject} type **is not** a supertype of
     *    the {@link Reference} type. That is, it can't be assigned from it.
     * 3. The types are not interchangeable in all contexts.
     *
     * For a less broad assertion that does something similar, see
     * {@link to_resemble}, which allows the first two assertions.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     *
     * @example
     *     declare_test("number is not equal to 1", (check) => {
     *     check = expect_type<number>().to_equal<1>() // ERROR
     *     check = expect_type<{readonly A: number}>.to_equal<{a: number}>() // ERROR
     *     })
     *
     * @returns `never` if the assertion is fulfilled and a descriptive error
     *   object otherwise.
     */
    to_equal<U>(): Compute_ToEqual<Subject, U, unknown, 1>
    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type **is not similar** the
     * {@link Reference} type. This makes sure the type isn't compatible with a
     * specific, undesirable type.
     *
     * But is not as strict as {@link to_equal}.
     *
     * ### Definition: Resemblance
     *
     * _Two types **resemble** each other if one is assignable to the other and
     * vice versa._
     *
     * This assertion is less broad than {@link to_equal} and will allow for some
     * similarity between the two types, following TypeScript's lax
     * assignability rules.
     *
     * For it to hold, at least one of the following must also hold:
     *
     * 1. {@link to_subtype} - The expected type **is not** a subtype of the
     *    reference type. That is, it's assignable to it.
     * 2. {@link to_supertype} - The expected type **is not** a supertype of the
     *    reference type. That is, it can be assigned from it.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     */
    to_resemble<U>(): Compute_ToResemble<Subject, U, unknown, 1>
    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type **is not** a subtype of the
     * {@link Reference} type and can be assigned to it. This makes sure the type
     * is sufficiently broad.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     */
    to_subtype<Reference>(): Compute_ToSubtype<Subject, Reference, unknown, 1>

    to_strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        unknown
    > extends 1
        ? Compute_ToResemble<Subject, Reference, 1, unknown>
        : Compute_ToSubtype<Subject, Reference, unknown, 1>
    /**
     * ## 🧩 During compilation
     *
     * Asserts that the {@link Subject} type **is not** a supertype of the
     * {@link Reference} type and can be assigned to it. This makes sure the
     * {@link Subject} type is unrelated to the {@link Reference} type.
     *
     * ## ⚠️ At runtime
     *
     * Throws an exception if actually invoked.
     */
    to_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        unknown,
        1
    >

    to_strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        unknown
    > extends 1
        ? Compute_ToResemble<Subject, Reference, 1, unknown>
        : Compute_ToSupertype<Subject, Reference, unknown, 1>
}

/**
 * ### 🛠️ During compilation
 *
 * Begins an assertion about the type {@link Expected}. Use this function makes
 * sure experssions are of the correct type during compilation.
 *
 * This function should never be allowed to execute. If it does, it will throw
 * an error.
 */
export function expect_type<Expected = any>(): Expecting𝗧𝗬𝗣𝗘<Expected> {
    throw nonRuntimeFunctionExecuted("expect_type")
}

export function expect_type_of<Expected>(
    something: Expected
): Expecting𝗧𝗬𝗣𝗘<Expected> {
    throw nonRuntimeFunctionExecuted("expect_type_of")
}
