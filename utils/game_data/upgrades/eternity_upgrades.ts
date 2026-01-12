import { EternityUpgrade } from "@/types/game_data/upgrades/EternityUpgrade";

interface IEternityUpgrades {
  [key: string]: EternityUpgrade;
}

export const EternityUpgrades: IEternityUpgrades = {
  idMultEP: new EternityUpgrade({
    id: 1,
    name: "ID Multiplier from Eternity Points",
    effect: `Infinity Dimension multiplier based on unspent Eternity Points`,
    formula: "`eternity points + 1`",
    cost: 5
  }),
  idMultEternities: new EternityUpgrade({
    id: 2,
    name: "ID Multiplier from Eternities",
    effect: `Infinity Dimension multiplier based on Eternities, softcap at 1e5 Eternities`,
    formula: `\
(Softcap around 1e5 Eternities; refer to graph)

eterPreCap = \`clampMax(eternities, 1e5)\`
base = \`eterPreCap / 200 + 1\`
pow = \`log(eterPreCap * 2 + 1) / log(4)\`
multPreCap = \`base ^ pow\`

eterPostCap = \`eternities - 1e5\`
mult1 = \`eterPostCap / 200 + 1\`
mult2 = \`ln(eterPostCap * 2 + 1) / log(4)\`
multPostCap = \`mult1 * mult2\`

final multiplier: \`multPreCap * multPostCap\`
    `,
    cost: 10,
    graph: `https://cdn.discordapp.com/attachments/351479640755404820/990792593120063598/idMultEternities.png`
  }),
  idMultICRecords: new EternityUpgrade({
    id: 3,
    name: "ID Multiplier from Infinity Challenge Records",
    effect: "Infinity Dimensions multiplier based on sum of Infinity Challenge times",
    formula: "`2 ^ (30 / max(0.1, IC times in seconds))`",
    cost: 5e4
  }),
  tdMultAchs: new EternityUpgrade({
    id: 4,
    name: "TD Multiplier from Achievements",
    effect: "Your Achievement bonus affects Time Dimensions",
    cost: 1e16
  }),
  tdMultTheorems: new EternityUpgrade({
    id: 5,
    name: "TD Multiplier from Time Theorems",
    effect: "Time Dimensions are multiplied by your unspent Time Theorems",
    cost: 1e40
  }),
  tdMultDaysPlayed: new EternityUpgrade({
    id: 6,
    name: "TD Multiplier from Days Played",
    effect: "Time Dimensions are multiplied by days played",
    cost: 1e50
  })
};
