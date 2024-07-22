export type Txt = {
    not_exactly: `𝗡𝗢𝗧 𝗘𝗫𝗔𝗖𝗧𝗟𝗬`
    to_equal: `𝗧𝗢 𝗘𝗤𝗨𝗔𝗟:`
    to_resemble: `𝗧𝗢_𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘:`
    to_subtype: `𝗧𝗢 𝗦𝗨𝗕𝗧𝗬𝗣𝗘:`
    to_supertype: `𝗧𝗢 𝗦𝗨𝗣𝗘𝗥𝗧𝗬𝗣𝗘`
    not_assignable_to: `𝗗𝗢𝗘𝗦 𝗡𝗢𝗧 𝗘𝗫𝗧𝗘𝗡𝗗`
    equals: `𝗘𝗤𝗨𝗔𝗟𝗦`
    are_both_any: `𝗔𝗥𝗘 𝗕𝗢𝗧𝗛 𝒂𝒏𝒚`
    assignable_to: `𝗘𝗫𝗧𝗘𝗡𝗗𝗦`
    assignable_from: `𝗘𝗫𝗧𝗘𝗡𝗗𝗘𝗗 𝗕𝗬`
    resembles: `𝗥𝗘𝗦𝗘𝗠𝗕𝗟𝗘𝗦`
    fail: `🔴 𝗙𝗔𝗜𝗟`
    pass: `🟢 𝗣𝗔𝗦𝗦`
    not_assignable_from: `𝗡𝗢𝗧 𝗘𝗫𝗧𝗘𝗡𝗗𝗘𝗗 𝗕𝗬`
    is_any_unlike: `𝗜𝗦 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_not_any_unlike: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚, 𝗨𝗡𝗟𝗜𝗞𝗘`
    is_any: `𝗜𝗦 𝒂𝒏𝒚`
    is_not_any: `𝗜𝗦 𝗡𝗢𝗧 𝒂𝒏𝒚`
    the_type: `𝗧𝗛𝗘 𝗧𝗬𝗣𝗘`
    the_types: `𝗧𝗛𝗘 𝗧𝗬𝗣𝗘𝗦`
    TEST: `𝗧𝗘𝗦𝗧`
    an_object_unlike: "𝗔𝗡 object 𝗨𝗡𝗟𝗜𝗞𝗘"
    not_an_object_but: "𝗡𝗢𝗧 𝗔𝗡 object, 𝗕𝗨𝗧"
    only_left: "𝗢𝗡𝗟𝗬 𝗟𝗘𝗙𝗧"
    only_right: "𝗢𝗡𝗟𝗬 𝗥𝗜𝗚𝗛𝗧"
    expected_type: "𝗘𝗫𝗣𝗘𝗖𝗧𝗘𝗗 𝗧𝗬𝗣𝗘"
}

export type HasPropertyUnlike<Prop extends string> = `𝗛𝗔𝗦 𝗣𝗥𝗢𝗣𝗘𝗥𝗧𝗬 '${Prop}',`

export type FancyTestTitleText<T extends string> = `❌ ${Txt["TEST"]}: ${T}`
