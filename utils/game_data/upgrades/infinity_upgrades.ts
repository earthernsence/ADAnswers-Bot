import { InfinityUpgrade } from "@/types/game_data/upgrades/InfinityUpgrade";

interface IInfinityUpgrades {
  [key: string]: InfinityUpgrade
}

export const InfinityUpgrades: IInfinityUpgrades = {
  "timeMult": new InfinityUpgrade({
    id: 11,
    name: "Time Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on time played",
    formula: "`(time played in minutes / 2) ^ 0.15`",
    cost: 1
  }),
  "18mult": new InfinityUpgrade({
    id: 21,
    name: "1st & 8th Antimatter Dimension Multiplier",
    effect: "1st and 8th Antimatter Dimensions gain a multiplier based on Infinities",
    formula: "`infinities * 0.2 + 1` (affected by TS31)",
    requirement: "Time Multiplier",
    cost: 1
  }),
};