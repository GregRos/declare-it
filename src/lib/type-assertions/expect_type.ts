import { nonRuntimeFunctionExecuted } from "../create-test/errors.js"
import { AssertionInfo } from "../create-test/types.js"
import type { FancyTestTitleText, Txt } from "./texts.js"
import {
    Compute_ToSupertype,
    Compute_ToSubtype,
    Compute_ToEqual,
    Compute_ToResemble,
    type Compute_AreIdentical,
    type Any
} from "./type-relations.js"

export declare class Asserts<TestText extends string> {
    private constructor()
    type<Subject>(
        f: (
            x: Expecting𝗧𝗬𝗣𝗘<FancyTestTitleText<TestText>, Subject>
        ) => FancyTestTitleText<TestText>
    ): void
    type_of<Subject>(
        subject: Subject
    ): (f: (x: Expecting𝗧𝗬𝗣𝗘<TestText, Subject>) => TestText) => void
}

/** Provides positive type assertions for the subject type {@link Subject}. */
declare class Expecting𝗧𝗬𝗣𝗘<TestText, Subject> {
    private constructor()
    __Subject: Subject

    not: NotExpecting𝗧𝗬𝗣𝗘<TestText, Subject>

    to_equal<Reference>(): Compute_ToEqual<
        Subject,
        Reference,
        TestText,
        "🔴 FAIL"
    >

    to_resemble<Reference>(): Compute_ToResemble<
        Subject,
        Reference,
        TestText,
        "🔴 𝐭𝐨_𝐫𝐞𝐬𝐞𝐦𝐛𝐥𝐞"
    >

    to_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        TestText,
        "🔴 𝐭𝐨_𝐬𝐮𝐛𝐭𝐲𝐩𝐞"
    >

    to_strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        TestText
    > extends 1
        ? Compute_ToResemble<
              Subject,
              Reference,
              "🔴 𝐭𝐨_𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲_𝐬𝐮𝐛𝐭𝐲𝐩𝐞",
              TestText
          >
        : Compute_ToSubtype<
              Subject,
              Reference,
              TestText,
              "🔴 𝐭𝐨_𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲_𝐬𝐮𝐛𝐭𝐲𝐩𝐞"
          >

    to_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        TestText,
        "🔴 𝐭𝐨_𝐬𝐮𝐩𝐞𝐫𝐭𝐲𝐩𝐞"
    >

    to_strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        TestText
    > extends 1
        ? Compute_ToResemble<
              Subject,
              Reference,
              "🔴 𝐭𝐨_𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲_𝐬𝐮𝐩𝐞𝐫𝐭𝐲𝐩𝐞",
              TestText
          >
        : Compute_ToSupertype<
              Subject,
              Reference,
              TestText,
              "🔴 𝐭𝐨_𝐬𝐭𝐫𝐢𝐜𝐭𝐥𝐲_𝐬𝐮𝐩𝐞𝐫𝐭𝐲𝐩𝐞"
          >
}

/** Provides negative type assertions for the subject type {@link Subject}. */
declare class NotExpecting𝗧𝗬𝗣𝗘<TestText, Subject> {
    private constructor()
    readonly not: Expecting𝗧𝗬𝗣𝗘<TestText, Subject>

    to_equal<Reference>(): Compute_ToEqual<
        Subject,
        Reference,
        "🔴 FAIL",
        TestText
    >

    to_resemble<Reference>(): Compute_ToResemble<
        Subject,
        Reference,
        "🔴 FAIL",
        TestText
    >

    to_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        "🔴 FAIL",
        TestText
    >

    to_strictly_subtype<Reference>(): Compute_ToSubtype<
        Subject,
        Reference,
        1,
        0
    > extends 1
        ? Compute_ToResemble<Subject, Reference, TestText, "🔴 FAIL">
        : Compute_ToSubtype<Subject, Reference, "🔴 FAIL", TestText>

    to_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        "🔴 FAIL",
        TestText
    >

    to_strictly_supertype<Reference>(): Compute_ToSupertype<
        Subject,
        Reference,
        1,
        0
    > extends 1
        ? Compute_ToResemble<Subject, Reference, TestText, "🔴 FAIL">
        : Compute_ToSupertype<Subject, Reference, "🔴 FAIL", TestText>
}
