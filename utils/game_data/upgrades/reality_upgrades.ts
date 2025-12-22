import { RealityUpgrade } from "@/types/game_data/upgrades/RealityUpgrade";

interface IRealityUpgrades {
  [key: string]: RealityUpgrade
}

export const RealityUpgrades: IRealityUpgrades = {
  "temporalAmplifier": new RealityUpgrade({
    id: 11,
    name: "Temporal Amplifier",
    effect: "Gain Dilated Time 3 times faster",
    cost: 1,
    increment: 30
  }),
  "effortlessExistence": new RealityUpgrade({
    id: 55,
    name: "Effortless Existence",
    effect: "Unlock the Reality Autobuyer, the Reality Automator command, and the Automator if you haven't done so yet",
    cost: 1e5,
    requirement: "Reach 1e11111 EP"
  })
};