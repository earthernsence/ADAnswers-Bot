import { BreakInfinityUpgrade } from "@/types/game_data/upgrades/BreakInfinityUpgrade";

interface IBreakUpgrades {
  [key: string]: BreakInfinityUpgrade
}

export const BreakInfinityUpgrades: IBreakUpgrades = {
  "totalAMMult": new BreakInfinityUpgrade({
    id: 11,
    name: "Total Antimatter Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on total Antimatter",
    formula: "`log(AM) + 1 ^ 0.5`",
    cost: 1e4
  }),
  "tickspeedCostMult": new BreakInfinityUpgrade({
    id: 41,
    name: "Tickspeed Cost Multiplier Reduction",
    effect: "Reduce post-infinity Tickspeed Upgrade cost multiplier scaling",
    cost: 5e6,
    increment: 5,
    formula: "`-x`, where x is the number of purchases of this upgrade (max 8)",
  })
};