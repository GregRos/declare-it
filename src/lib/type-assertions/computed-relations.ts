import { 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥 } from "./compiler-messages"
import { Texts } from "./texts"
import { IsAny } from "./type-relations"

export type Compute_SubtypeDifference<L, R> =
    IsAny<L> extends 1
        ? IsAny<R> extends 1
            ? never
            : 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
        : IsAny<R> extends 1
          ? 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["is_not_any_but"], R>
          : L extends object
            ? R extends object
                ? {
                      [P in keyof L]: P extends keyof R
                          ? Compute_SubtypeDifference<L[P], R[P]>
                          : L[P]
                  }
                : 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["an_object_unlike"], R>
            : 𝗧𝗢_𝗦𝗨𝗕𝗧𝗬𝗣𝗘_𝗘𝗥𝗥𝗢𝗥<L, Texts["not_an_object_unlike"], R>
