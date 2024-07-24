export type Txt = {
    at: `𝗔𝗧`
    close: ""
    not_exactly: `❯ 𝗻𝗼𝘁 𝗲𝘅𝗮𝗰𝘁𝗹𝘆 ❮`
    // does not subtype:
    not_assignable_to: `❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝘀𝘂𝗯𝘁𝘆𝗽𝗲 ❮`
    equals: `❯ 𝗱𝗼𝗲𝘀 𝗲𝗾𝘂𝗮𝗹 ❮`
    are_both_any: `❯ 𝗮𝗿𝗲 𝗯𝗼𝘁𝗵 𝒂𝒏𝒚`
    assignable_to: `❯ 𝗱𝗼𝗲𝘀 𝘀𝘂𝗯𝘁𝘆𝗽𝗲 ❮`
    assignable_from: `❯ 𝗱𝗼𝗲𝘀 𝘀𝘂𝗽𝗲𝗿𝘁𝘆𝗽𝗲 ❮`
    resembles: `❯ 𝗱𝗼𝗲𝘀 𝗿𝗲𝘀𝗲𝗺𝗯𝗹𝗲 ❮`
    fail: `🔴 𝗙𝗔𝗜𝗟`
    pass: `🟢 𝗣𝗔𝗦𝗦`
    // lower case: not a supertype of
    not_assignable_from: `❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝘀𝘂𝗽𝗲𝗿𝘁𝘆𝗽𝗲 ❮`
    // lower case: equals any unlike, lower case sans serif bol
    is_any_unlike: `❯ 𝗱𝗼𝗲𝘀 𝗲𝗾𝘂𝗮𝗹 𝒂𝒏𝒚 𝘂𝗻𝗹𝗶𝗸𝗲 ❮`
    is_not_any_unlike: `❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗲𝗾𝘂𝗮𝗹 𝒂𝒏𝒚 𝘂𝗻𝗹𝗶𝗸𝗲 ❮`
    is_any: `❯ 𝗲𝗾𝘂𝗮𝗹𝘀 𝒂𝒏𝒚`
    is_not_any: `❯ 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗲𝗾𝘂𝗮𝗹 𝒂𝒏𝒚`
    // lower case:
    the_type: `𝘁𝗵𝗲 𝘁𝘆𝗽𝗲 ❮`
    the_types: `𝘁𝗵𝗲 𝘁𝘆𝗽𝗲𝘀 ❮`
    TEST: `𝗧𝗘𝗦𝗧`
    an_object_unlike: "𝗔𝗡 object 𝗨𝗡𝗟𝗜𝗞𝗘"
    not_an_object_but: "𝗡𝗢𝗧 𝗔𝗡 object, 𝗕𝗨𝗧"
    only_left: "𝗢𝗡𝗟𝗬 𝗟𝗘𝗙𝗧"
    only_right: "𝗢𝗡𝗟𝗬 𝗥𝗜𝗚𝗛𝗧"
    expected_type: "𝗘𝗫𝗣𝗘𝗖𝗧𝗘𝗗 𝗧𝗬𝗣𝗘"
}

export type HasPropertyUnlike<Prop extends string> = `𝗛𝗔𝗦 𝗣𝗥𝗢𝗣𝗘𝗥𝗧𝗬 '${Prop}',`

export type FancyTestTitleText<T extends string> =
    `❌ 𝗔𝗧 ${Txt["TEST"]} ⸨ ${T} ⸩`
