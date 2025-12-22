import { EternityUpgrade } from "@/types/game_data/upgrades/EternityUpgrade";

interface IEternityUpgrades {
  [key: string]: EternityUpgrade
}

export const EternityUpgrades: IEternityUpgrades = {
  "idMultEP": new EternityUpgrade({
    id: 1,
    name: "ID Multiplier from Eternity Points",
    effect: `Infinity Dimension multiplier based on unspent Eternity Points`,
    formula: "`eternity points + 1`",
    cost: 5
  }),
  "idMultEternities": new EternityUpgrade({
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
  })
};