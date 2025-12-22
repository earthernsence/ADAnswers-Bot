import { DilationUpgrade } from "@/types/game_data/upgrades/DilationUpgrade";

interface IDilationUpgrades {
  [key: string]: DilationUpgrade
}

export const DilationUpgrades: IDilationUpgrades = {
  "dtGain": new DilationUpgrade({
    id: 11,
    name: "Dilation Gain Multiplier",
    effect: "Double Dilated Time gain",
    cost: 1e5,
    increment: 10,
  }),
  "ttGenerator": new DilationUpgrade({
    id: 41,
    name: "Time Theorem Generator",
    effect: "Generate Time Theorems based on Tachyon Particles",
    cost: 1e15,
    formula: "`tachyon particles / 20000` per second"
  })
};