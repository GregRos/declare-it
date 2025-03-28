export namespace Txt {
    export type w = {
        exactly: `𝗘𝗫𝗔𝗖𝗧𝗟𝗬`
        any: `𝒂𝒏𝒚`
        are_both: `𝗔𝗥𝗘 𝗕𝗢𝗧𝗛`
        equal: `𝗘𝗤𝗨𝗔𝗟`
        equals: `𝗘𝗤𝗨𝗔𝗟𝗦`
        subtype: `𝗦𝗨𝗕-𝗧𝗬𝗣𝗘`
        supertype: `𝗦𝗨𝗣𝗘𝗥-𝗧𝗬𝗣𝗘`
        resemble: `𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘`
        not: `𝗡𝗢𝗧`
        test: `𝗧𝗘𝗦𝗧`
        at: `𝗔𝗧`
        the: `𝗧𝗛𝗘`
        type: `𝗧𝗬𝗣𝗘`
        types: `𝗧𝗬𝗣𝗘𝗦`
        does: `𝗗𝗢𝗘𝗦`
    }
    export type s = {
        ">": ")"
        "<": "("
        space: `                                                   `
    }
    export type Msg = {
        anonymous: `𝗔𝗡𝗢𝗡𝗬𝗠𝗢𝗨𝗦`

        SPACE: `${s["space"]}`
        ">>": `${s[">"]} ${s["space"]}`
        not_exactly: `${s[">"]} ${w["not"]} ${w["exactly"]} ${s["<"]}`
        // does not subtype:
        does_not_subtype: `${s[">"]} ${w["does"]} ${w["not"]} ${w["subtype"]} ${s["<"]}`
        equals: `${s[">"]} ${w["does"]} ${w["equal"]} ${s["<"]}`
        are_both_any: `${s[">"]} 𝗮𝗿𝗲 ${w["are_both"]} ${w["any"]}`

        does_subtype: `${s[">"]} ${w["does"]} ${w["subtype"]} ${s["<"]}`
        does_supertype: `${s[">"]} ${w["does"]} ${w["supertype"]} ${s["<"]}`
        does_resemble: `${s[">"]} ${w["does"]} ${w["resemble"]} ${s["<"]}`

        // lower case: not a supertype of
        doeS_not_supertype: `${s[">"]} ${w["does"]} ${w["not"]} ${w["supertype"]} ${s["<"]}`
        // lower case: equals any unlike, lower case sans serif bol
        is_any_unlike: `${s[">"]} ${w["does"]} ${w["equal"]} ${w["any"]} 𝘂𝗻𝗹𝗶𝗸𝗲 ${s["<"]}`
        is_not_any_unlike: `${s[">"]} ${w["does"]} ${w["not"]} 𝗲𝗾𝘂𝗮𝗹 ${w["any"]} 𝘂𝗻𝗹𝗶𝗸𝗲 ${s["<"]}`
        is_any: `${s[">"]} ${w["equals"]} ${w["any"]}`
        is_not_any: `${s[">"]} ${w["does"]} ${w["not"]} ${w["equal"]} ${w["any"]}`
        // lower case:
        the_type: `${w["the"]} ${w["type"]} ${s["<"]}`
        the_types: `${w["the"]} ${w["types"]} ${s["<"]}`
    }

    export type FancyTestTitleText<T extends string> = `❌ ${w["at"]} 𝗧𝗘𝗦𝗧 “${T}” ❱➤ `
}
