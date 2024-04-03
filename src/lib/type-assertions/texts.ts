export type Texts = {
    not_exactly: `𝗡𝗢𝗧 𝗘𝗫𝗔𝗖𝗧𝗟𝗬`
    not_assignable_to: `𝗗𝗢𝗘𝗦 𝗡𝗢𝗧 𝗘𝗫𝗧𝗘𝗡𝗗`
    equals: `𝗘𝗤𝗨𝗔𝗟𝗦`
    are_both_any: `𝗔𝗥𝗘 𝗕𝗢𝗧𝗛 𝒂𝒏𝒚`
    assignable_to: `𝗘𝗫𝗧𝗘𝗡𝗗𝗦`
    assignable_from: `𝗘𝗫𝗧𝗘𝗡𝗗𝗘𝗗 𝗕𝗬`
    not_assignable_from: `𝗡𝗢𝗧 𝗘𝗫𝗧𝗘𝗡𝗗𝗘𝗗 𝗕𝗬`
    is_any_but_not: `𝗜𝗦 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_not_any_but: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_any: `𝗜𝗦 𝒂𝒏𝒚`
    is_not_any: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚`
    the_type: `𝗧𝗛𝗘 𝗧𝗬𝗣𝗘`
    TEST: `𝗧𝗘𝗦𝗧`
}

export type FancyTestTitleText<T extends string> = `❌ ${Texts["TEST"]}: ${T}`
