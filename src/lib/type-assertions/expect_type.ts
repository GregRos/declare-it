import type { T } from "hotscript"
import { nonRuntimeFunctionExecuted } from "../create-test/errors.js"
import { AssertionInfo } from "../create-test/types.js"
import type { FancyTestTitleText, Txt } from "./texts.js"
import {
    Compute_ToSupertype,
    Compute_ToSubtype,
    Compute_ToEqual,
    Compute_ToResemble,
    type Compute_StandardIdentical,
    type Any,
    type IsAny
} from "./type-relations.js"

export interface TypeFunc<Text extends string> {
    <T>(): T
}

export interface ExpectFunc<Text extends string> {
    <T>(type: () => T): {
        to_equal<S>(compared: () => Compute_ToEqual<T, S, S, Text>): void
    }
}

export declare class Asserts<TestText extends string> {
    private constructor()
    type<Subject>(
        f: (
            x: Expecting𝗧𝗬𝗣𝗘<FancyTestTitleText<TestText>, Subject>
        ) => IsAny<TestText> extends 1 ? any : FancyTestTitleText<TestText>
    ): void
    type_of<Subject>(
        subject: Subject,
        f: (
            x: Expecting𝗧𝗬𝗣𝗘<FancyTestTitleText<TestText>, Subject>
        ) => IsAny<TestText> extends 1 ? any : FancyTestTitleText<TestText>
    ): void
}

/** Provides positive type assertions for the subject type {@link Subject}. */
export declare class Expecting𝗧𝗬𝗣𝗘<TestText, Subject> {
    private constructor()

    not: NotExpecting𝗧𝗬𝗣𝗘<TestText, Subject>

    equal<Reference>(): Compute_ToEqual<Subject, Reference, TestText, unknown>

    resemble<Reference>(): Compute_ToResemble<
        Subject,
        Reference,
        TestText,
        unknown
    >

    subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        TestText,
        unknown
    >

    strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        TestText
    > extends 1
        ? Compute_ToResemble<Subject, Reference, unknown, TestText>
        : Compute_ToSubtype<Subject, Reference, TestText, unknown>

    supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        TestText,
        unknown
    >

    strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        TestText
    > extends 1
        ? Compute_ToResemble<Subject, Reference, unknown, TestText>
        : Compute_ToSupertype<Subject, Reference, TestText, unknown>
}

/** Provides negative type assertions for the subject type {@link Subject}. */
declare class NotExpecting𝗧𝗬𝗣𝗘<TestText, Subject> {
    private constructor()
    readonly not: Expecting𝗧𝗬𝗣𝗘<TestText, Subject>

    equal<Reference>(): Compute_ToEqual<Subject, Reference, unknown, TestText>

    resemble<Reference>(): Compute_ToResemble<
        Subject,
        Reference,
        unknown,
        TestText
    >

    subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        unknown,
        TestText
    >

    strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        0
    > extends 1
        ? Compute_ToResemble<Subject, Reference, TestText, unknown>
        : Compute_ToSubtype<Subject, Reference, unknown, TestText>

    supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        unknown,
        TestText
    >

    strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        0
    > extends 1
        ? Compute_ToResemble<Subject, Reference, TestText, unknown>
        : Compute_ToSupertype<Subject, Reference, unknown, TestText>
}
