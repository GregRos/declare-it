import { 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺, 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼, 𝗘𝗾𝘂𝗮𝗹𝘀, 𝗜𝘀𝑨𝒏𝒚 } from "./compiler-messages"
import {
    Txt_AreBothAny,
    Txt_AreEqual,
    Txt_IsAny,
    Txt_IsAnyButNot,
    Txt_IsAssignableFrom,
    Txt_IsAssignableTo,
    Txt_IsNotAny,
    Txt_IsNotAnyBut,
    Txt_IsNotAssignableFrom,
    Txt_IsNotAssignableTo,
    Txt_NotExact
} from "./texts"
// Inspired by Alec Larson's work https://github.com/aleclarson/spec.ts
// Shamelessly stolen under the MIT license.

// // Conditional returns can enforce identical types.
// // See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650

export type Assert_Equals<Expected, Target> =
    IsAny<Expected> extends 1
        ? IsAny<Target> extends 1
            ? 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_AreBothAny, Target> | true
            : 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_IsAnyButNot, Target> | false
        : IsAny<Target> extends 1
          ? 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_IsNotAnyBut, Target> | false
          : [Expected] extends [Target]
            ? [Target] extends [Expected]
                ? Any extends TestExact<Expected, Target>
                    ? 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_AreEqual, Target> | true
                    : 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_NotExact, Target> | false
                : false | 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_IsNotAssignableFrom, Target>
            : false | 𝗘𝗾𝘂𝗮𝗹𝘀<Expected, Txt_IsNotAssignableTo, Target>

export type Assert_AssignsFrom<Expected, Target> =
    IsAny<Expected> extends 1
        ? IsAny<Target> extends 1
            ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Expected, Txt_AreBothAny, Target> | true
            : 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Expected, Txt_IsAnyButNot, Target> | false
        : IsAny<Target> extends 1
          ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Expected, Txt_IsNotAnyBut, Target> | false
          : [Target] extends [Expected]
            ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Expected, Txt_IsAssignableFrom, Target> | true
            : false | 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗙𝗿𝗼𝗺<Expected, Txt_IsNotAssignableFrom, Target>

export type Assert_AssignsTo<Expected, Target> =
    IsAny<Target> extends 1
        ? IsAny<Expected> extends 1
            ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Expected, Txt_AreBothAny, Target> | true
            : 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Expected, Txt_IsNotAnyBut, Target> | false
        : IsAny<Expected> extends 1
          ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Expected, Txt_IsNotAnyBut, Target> | false
          : [Expected] extends [Target]
            ? 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Expected, Txt_IsAssignableTo, Target> | true
            : false | 𝗔𝘀𝘀𝗶𝗴𝗻𝘀𝗧𝗼<Expected, Txt_IsNotAssignableTo, Target>

export type Assert_IsAny<T> =
    IsAny<T> extends 1
        ? true | 𝗜𝘀𝑨𝒏𝒚<T, Txt_IsAny>
        : false | 𝗜𝘀𝑨𝒏𝒚<T, Txt_IsNotAny>

export type IsAny<T> = Any extends T ? ([T] extends [Any] ? 1 : 0) : 0
export type TestExact<Left, Right> =
    (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
        ? Any
        : never
// Give "any" its own class

export class Any {
    private _!: true
}
