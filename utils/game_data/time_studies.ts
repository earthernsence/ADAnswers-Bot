import type { TimeStudies } from "@/types/game_data/TimeStudy";

const TS_REQUIREMENT_TYPE = {
  AT_LEAST_ONE: "At least one of",
  ONE: "",
  NONE: "None",
  OR: (one: number, two: number) => `TS${one} or TS${two}`,
  TRIAD: (a: number, b: number, c: number) => `TS${a}, TS${b}, and TS${c}`
};

export const timeStudies: TimeStudies = {
  "11": {
    id: 11,
    effect: "Tickspeed affects 1st Time Dimension with reduced effect",
    formula: "`reciprocal((((Tickspeed / 1000) ^ 0.005) * 0.95) + (((Tickspeed / 1000) ^ 0.0003) * 0.05))`",
    cost: 1,
    reqType: TS_REQUIREMENT_TYPE.NONE,
    prerequisites: [],
    type: "normal"
  },
  "10": {
    id: 10,
    effect: "Unlock a secret achievement",
    cost: 0,
    reqType: TS_REQUIREMENT_TYPE.NONE,
    prerequisites: [],
    type: "forbidden"
  },
  "21": {
    id: 21,
    effect: `Improve Replicanti multiplier formula to (log2(x) ^ 2) + x ^ 0.032`,
    cost: 3,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [11],
    type: "normal",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/387799188848640013/426601079774642186/replicanti_formula.png"
  },
  "22": {
    id: 22,
    effect: "Replicanti interval limit 50ms -> 1ms",
    cost: 2,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [11],
    type: "normal"
  },
  "31": {
    id: 31,
    effect: `Powers up bonuses that are based on your Infinities`,
    formula: `\`(Bonuses ^ 4)\``,
    cost: 3,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [21],
    type: "normal"
  },
  "32": {
    id: 32,
    effect: "You gain more Infinities based on Dimension Boosts",
    formula: "×`dimension boosts`",
    cost: 2,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [22],
    type: "normal"
  },
  "33": {
    id: 33,
    effect: "You keep half of your Replicanti Galaxies on Infinity",
    cost: 2,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [22],
    type: "normal"
  },
  "41": {
    id: 41,
    effect: "All Galaxies give a ×1.2 multiplier to Infinity Points gained",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [31],
    type: "normal"
  },
  "42": {
    id: 42,
    effect: "Antimatter Galaxy requirement increases by 52 8th Dimensions instead of 60",
    cost: 6,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [32],
    type: "normal"
  },
  "51": {
    id: 51,
    effect: "You gain ×1e15 more Infinity Points",
    cost: 3,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: [41, 42],
    type: "normal"
  },
  "61": {
    id: 61,
    effect: "You gain ×15 more Eternity Points",
    cost: 3,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [51],
    type: "normal"
  },
  "62": {
    id: 62,
    effect: "You gain Replicanti 3 times faster",
    cost: 3,
    prerequisites: [42],
    additionalPrerequisites: ["1 or more EC5 completion"],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "normal"
  },
  // Dimension path studies
  "71": {
    id: 71,
    effect: "Dimensional Sacrifice affects all other Antimatter Dimensions with reduced effect",
    formula: "`sacrifice bonus ^ 0.25`",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [61],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch is purchased"
  },
  "72": {
    id: 72,
    effect: "Dimensional Sacrifice affects 4th Infinity Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.04`",
    cost: 6,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [61],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch is purchased"
  },
  "73": {
    id: 73,
    effect: "Dimensional Sacrifice affects 3rd Time Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.005`",
    cost: 5,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [61],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch is purchased"
  },
  "81": {
    id: 81,
    effect: "Base Dimension Boost power becomes ×10",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [71],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch"
  },
  "82": {
    id: 82,
    effect: "Dimension Boosts affect Infinity Dimensions",
    formula: "`1.0000109 ^ (dimboosts ^ 2)`",
    cost: 6,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [72],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch is purchased"
  },
  "83": {
    id: 83,
    effect: "Dimension Boost multiplier based on tick upgrades gained from TDs",
    formula: "`1.0004 ^ tickspeed upgrades from TDs`",
    cost: 5,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [73],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch is purchased"
  },
  "91": {
    id: 91,
    effect: "Antimatter Dimension multiplier based on time spent in this Eternity",
    formula: "`10 ^ (min(total minutes in Eternity, 20) * 15)`",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [81],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch"
  },
  "92": {
    id: 92,
    effect: "Infinity Dimension multiplier based on fastest Eternity time",
    formula: "`2 ^ (60 / max(best eternity time in seconds, 2))`",
    cost: 5,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [82],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch is purchased"
  },
  "93": {
    id: 93,
    effect: "Time Dimension multiplier based on tick upgrades gained",
    formula: "`tickspeed upgrades gained ^ 0.25`",
    cost: 7,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [83],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch is purchased"
  },
  "101": {
    id: 101,
    effect: "Antimatter Dimension multiplier equal to Replicanti amount",
    formula: "`replicanti`",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [91],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch is purchased"
  },
  "102": {
    id: 102,
    effect: "Replicanti Galaxies boost Replicanti multiplier",
    formula: "`5 ^ replicanti galaxies`",
    cost: 6,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [92],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch is purchased"
  },
  "103": {
    id: 103,
    effect: "Time Dimension multiplier equal to Replicanti Galaxy amount",
    formula: "`replicanti galaxies`",
    cost: 6,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [93],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch is purchased"
  },
  "111": {
    id: 111,
    effect: "Make the Infinity Point formula better",
    formula: "`log(x / 307.8)` -> `log(x / 285)`",
    cost: 12,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: [101, 102, 103],
    type: "normal"
  },
  // Pace path studies
  "121": {
    id: 121,
    effect: `You gain more EP based on how fast your last ten Eternities were`,
    formula: "`250 / average time per eternity`, capped at 50",
    cost: 9,
    prerequisites: [111],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "active",
    exclusiveWith: "Passive or Idle branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516858452489011200/unknown.png"
  },
  "122": {
    id: 122,
    effect: `You gain ×35 more Eternity Points`,
    cost: 9,
    prerequisites: [111],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "passive",
    exclusiveWith: "Active or Idle branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516858452489011200/unknown.png"
  },
  "123": {
    id: 123,
    effect: "You gain more Eternity Points based on time spent this Eternity",
    formula: "`sqrt(time in this eternity in seconds * 1.39)`",
    cost: 9,
    prerequisites: [111],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "idle",
    exclusiveWith: "Active or Passive branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516858452489011200/unknown.png"
  },
  "131": {
    id: 131,
    effect: "Automatic Replicanti Galaxies are disabled, but you can get 50% more",
    cost: 5,
    prerequisites: [121],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "active",
    exclusiveWith: "Passive or Idle branch is purchased"
  },
  "132": {
    id: 132,
    effect: "Replicanti Galaxies are 40% stronger",
    cost: 5,
    prerequisites: [122],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "passive",
    exclusiveWith: "Active or Idle branch is purchased"
  },
  "133": {
    id: 133,
    effect: "Replicanti are ×10 slower until 1.8e308 but Replicanti Galaxies are 50% stronger",
    cost: 5,
    prerequisites: [123],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "idle",
    exclusiveWith: "Active or Passive branch is purchased"
  },
  "141": {
    id: 141,
    effect: "Multiplier to Infinity Points, which decays over this Infinity",
    formula: `
    \`scaled infinity = (time in this infinity in seconds * 10) + 1\`
    \`capped infinity = min(scaled infinity ^ 0.125, 500)\`
    \`this infinity multiplier = 1e15 ^ log(scaled infinity) * capped infinity\`
    multiplier: ×\`1e45 / this infinity multiplier\``,
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [131],
    type: "active",
    exclusiveWith: "Passive or Idle branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516856522589077504/unknown.png"
  },
  "142": {
    id: 142,
    effect: "You gain ×1e25 more Infinity Points",
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [132],
    type: "passive",
    exclusiveWith: "Active or Idle branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516856522589077504/unknown.png"
  },
  "143": {
    id: 143,
    effect: "Multiplier to Infinity Points, which increases over this Infinity",
    formula: `
    \`scaled infinity = (time in this infinity in seconds * 10) + 1\`
    \`capped infinity = min(scaled infinity ^ 0.125, 500)\`
    \`this infinity multiplier = 1e15 ^ log(scaled infinity) * capped infinity\`
    multiplier: \`×this infinity multiplier\``,
    cost: 4,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [133],
    type: "idle",
    exclusiveWith: "Active or Passive branch is purchased",
    hasGraph: true,
    graph: "https://cdn.discordapp.com/attachments/351476683016241166/516856522589077504/unknown.png"
  },
  "151": {
    id: 151,
    effect: "×1e4 multiplier on all Time Dimensions`",
    cost: 8,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: [141, 142, 143],
    type: "normal"
  },
  "161": {
    id: 161,
    effect: "×1e616 multiplier on all Antimatter Dimensions`",
    cost: 7,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [151],
    type: "normal"
  },
  "162": {
    id: 162,
    effect: "×1e11 multiplier on all Infinity Dimensions`",
    cost: 7,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [151],
    type: "normal"
  },
  "171": {
    id: 171,
    effect: "Time Shard requirement for the next Tickspeed upgrade goes up slower",
    formula: "`×1.33` ➜ `×1.25`",
    cost: 15,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: [161, 162],
    type: "normal"
  },
  "181": {
    id: 181,
    effect: "You gain 1% of your Infinity Points gained on crunch each second",
    cost: 200,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [171],
    type: "normal",
    exclusiveWith: "you have not completed EC1, 2, and 3 at least once",
    isBestWaifu: "yes, TS181 is the best waifu"
  },
  "191": {
    id: 191,
    effect: "After Eternity you permanently keep 5% of your Infinities as Banked Infinities",
    cost: 400,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [181],
    type: "normal",
    exclusiveWith: "you have not completed EC10 at least once"
  },
  "192": {
    id: 192,
    effect: "Replicanti can go beyond 1.8e308, but growth slows down at higher amounts",
    cost: 730,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [181],
    type: "normal",
    exclusiveWith: "you have not completed EC10 at least once"
  },
  "193": {
    id: 193,
    effect: "Antimatter Dimension multiplier based on Eternities",
    formula: "×`1e13000 ^ eternities / 1e6`, capping at ×1e13000",
    cost: 300,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [181],
    type: "normal",
    exclusiveWith: "you have not completed EC10 at least once"
  },
  "201": {
    id: 201,
    effect: "Pick a second path from the Dimension Split",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [192],
    type: "normal",
  },
  "211": {
    id: 211,
    effect: "Dimension Boost requirement scaling is reduced by 5",
    cost: 120,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [191],
    type: "normal",
  },
  "212": {
    id: 212,
    effect: "All Galaxies are stronger based on your Time Shards",
    formula: "`log2(time shards) ^ 0.005`",
    cost: 150,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [191],
    type: "normal",
  },
  "213": {
    id: 213,
    effect: "You gain Replicanti 20 times faster",
    cost: 200,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [193],
    type: "normal",
  },
  "214": {
    id: 214,
    effect: "Dimensional Sacrifice boosts the 8th Antimatter Dimension even more",
    formula: `
    \`boost = total sacrifice boost\`
    \`first part = boost ^ 7.6\` (clamped at a max exponent of 44000)
    \`second part = boost ^ 1.05\` (clamped at a max exponent of 120000)
    final multiplier: \`first part * second part\` (capped at 1e164000)
    `,
    cost: 120,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [193],
    type: "normal",
  },
  "221": {
    id: 221,
    effect: "Time Dimension multiplier based on Dimension Boosts",
    formula: "`1.0025 ^ dimension boosts`",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [211],
    type: "light",
    exclusiveWith: "TS222 is purchased"
  },
  "222": {
    id: 222,
    effect: "Dimension Boost costs scale by another 2 less",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [211],
    type: "dark",
    exclusiveWith: "TS221 is purchased"
  },
  "223": {
    id: 223,
    effect: "Distant Galaxy cost scaling starts 7 Galaxies later",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [212],
    type: "light",
    exclusiveWith: "TS224 is purchased"
  },
  "224": {
    id: 224,
    effect: `Distant Galaxy cost scaling starts later (1 per 2000 Dim Boosts)`,
    formula: "`floor(boosts / 2000)`",
    cost: 900,
    prerequisites: [212],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    exclusiveWith: "TS223 is purchased",
    type: "dark"
  },
  "225": {
    id: 225,
    effect: "You gain extra Replicanti Galaxies based on your Replicanti amount",
    formula: "`floor(log10(replicanti) / 1000)`",
    cost: 900,
    prerequisites: [213],
    reqType: TS_REQUIREMENT_TYPE.ONE,
    exclusiveWith: "TS226 is purchased",
    type: "light"
  },
  "226": {
    id: 226,
    effect: "You gain extra Replicanti Galaxies based on their max",
    formula: "`floor(max replicanti galaxy upgrades bought / 15)`",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [213],
    type: "dark",
    exclusiveWith: "TS225 is purchased"
  },
  "227": {
    id: 227,
    effect: "Dimensional Sacrifice affects 4th Time Dimension with reduced effect",
    formula: "`max(log10(sacrifice boost) ^ 10, 1)`",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [214],
    type: "light",
    exclusiveWith: "TS228 is purchased"
  },
  "228": {
    id: 228,
    effect: "Dimensional Sacrifice formula scales better",
    formula: "`AD1^0.011` -> `AD1^0.013`",
    cost: 900,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: [214],
    type: "dark",
    exclusiveWith: "TS227 is purchased"
  },
  "231": {
    id: 231,
    effect: "Dimension Boosts are stronger based on their amount",
    formula: "`dimension boosts ^ 0.3`",
    cost: 500,
    // We're about to do something really fucking stupid
    reqType: TS_REQUIREMENT_TYPE.OR(221, 222),
    prerequisites: [221, 222],
    type: "light",
    exclusiveWith: "TS232 is purchased"
  },
  "232": {
    id: 232,
    effect: "All Galaxies are stronger based on Antimatter Galaxies",
    formula: "`(1 + galaxies / 1000) ^ 0.2`",
    cost: 500,
    reqType: TS_REQUIREMENT_TYPE.OR(223, 224),
    prerequisites: [223, 224],
    type: "dark",
    exclusiveWith: "TS231 is purchased"
  },
  "233": {
    id: 233,
    effect: "Max Replicanti Galaxy upgrade is cheaper based on current Replicanti",
    formula: "`replicanti ^ 0.3`",
    cost: 500,
    reqType: TS_REQUIREMENT_TYPE.OR(225, 226),
    prerequisites: [225, 226],
    type: "light",
    exclusiveWith: "TS234 is purchased"
  },
  "234": {
    id: 234,
    effect: "Dimensional Sacrifice applies to 1st Antimatter Dimension",
    cost: 500,
    reqType: TS_REQUIREMENT_TYPE.OR(227, 228),
    prerequisites: [227, 228],
    type: "dark",
    exclusiveWith: "TS233 is purchased"
  },
  "301": {
    id: 301,
    effect: "Time Study 231 improves the effect of Time Study 221",
    formula: "`(TS221's effect) ^ (TS231's effect - 1)`",
    cost: 12,
    reqType: TS_REQUIREMENT_TYPE.TRIAD(221, 222, 231),
    prerequisites: [221, 222, 231],
    type: "triad",
    isTriad: true
  },
  "302": {
    id: 302,
    effect: "Distant Galaxy scaling threshold starts another 3000 Antimatter Galaxies later",
    cost: 12,
    reqType: TS_REQUIREMENT_TYPE.TRIAD(223, 224, 232),
    prerequisites: [223, 224, 232],
    type: "triad",
    isTriad: true
  },
  "303": {
    id: 303,
    effect: "Gain 50% more extra Replicanti Galaxies from Time Studies 225 and 226",
    cost: 12,
    reqType: TS_REQUIREMENT_TYPE.TRIAD(225, 226, 233),
    prerequisites: [225, 226, 233],
    type: "triad",
    isTriad: true
  },
  "304": {
    id: 304,
    effect: "Dimensional Sacrifice multiplier is squared",
    cost: 12,
    reqType: TS_REQUIREMENT_TYPE.TRIAD(227, 228, 234),
    prerequisites: [227, 228, 234],
    type: "triad",
    isTriad: true
  }
};