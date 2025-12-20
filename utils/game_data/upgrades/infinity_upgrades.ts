import { InfinityUpgrade } from "@/types/game_data/upgrades/InfinityUpgrade";

interface IInfinityUpgrades {
  [key: string]: InfinityUpgrade
}

export const InfinityUpgrades: IInfinityUpgrades = {
  "timeMult": new InfinityUpgrade({
    id: 11,
    name: "Time Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on time played",
    cost: 1,
    formula: "`(time played in minutes / 2) ^ 0.15`",
    requirement: "None"
  })
};