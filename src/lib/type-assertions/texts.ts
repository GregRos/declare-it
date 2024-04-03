export type Texts = {
    not_exactly: `𝗡𝗢𝗧 𝗘𝗫𝗔𝗖𝗧𝗟𝗬`
    not_assignable_to: `𝗡𝗢𝗧 𝗔 𝗦𝗨𝗕𝗧𝗬𝗣𝗘 𝗢𝗙`
    equals: `𝗘𝗤𝗨𝗔𝗟𝗦`
    are_both_any: `𝗔𝗥𝗘 𝗕𝗢𝗧𝗛 𝒂𝒏𝒚`
    assignable_to: `𝗔 𝗦𝗨𝗕𝗧𝗬𝗣𝗘 𝗢𝗙`
    assignable_from: `𝗔 𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘 𝗢𝗙`
    not_assignable_from: `𝗡𝗢𝗧 𝗔 𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘 𝗢𝗙`
    is_any_but_not: `𝗜𝗦 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_not_any_but: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_any: `𝗜𝗦 𝒂𝒏𝒚`
    is_not_any: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚`
    the_type: `𝗧𝗛𝗘 𝗧𝗬𝗣𝗘`
    TEST: `𝗧𝗘𝗦𝗧`
}

export type FancyTestTitleText<T extends string> = `❌ ${Texts["TEST"]}: ${T}`
