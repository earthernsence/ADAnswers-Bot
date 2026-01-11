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
    increment: 10
  }),
  "galaxyThreshold": new DilationUpgrade({
    id: 12,
    name: "Galaxy Threshold Reduction",
    effect: "Reset Dilated Time and Tachyon Galaxies, but lower their threshold",
    cost: 1e6,
    increment: 100,
    formula: "`-0.8 ^ bought`"
  }),
  "tachyonGain": new DilationUpgrade({
    id: 13,
    name: "Tachyon Gain Multiplier",
    effect: "Triple the amount of Tachyon Particles gained",
    cost: 1e7,
    increment: 20
  }),
  "doubleGalaxies": new DilationUpgrade({
    id: 21,
    name: "Double Galaxies",
    effect: "Gain twice as many Tachyon Galaxies",
    cost: 5e6
  }),
  "tdMultReplicanti": new DilationUpgrade({
    id: 22,
    name: "TD Multiplier from Replicanti",
    effect: "Time Dimensions are affected by Replicanti Multiplier ^0.1",
    cost: 1e9
  }),
  "adMultDT": new DilationUpgrade({
    id: 23,
    name: "AD Multiplier from Dilated Time",
    effect: "Antimatter Dimension multiplier based on Dilated Time, unaffected by Time Dilation",
    cost: 5e7,
    formula: "`dilated time ^ 308`"
  }),
  "ipMultDT": new DilationUpgrade({
    id: 31,
    name: "IP Multiplier from Dilated Time",
    effect: "Gain a multiplier to Infinity Points based on Dilated Time",
    cost: 2e12,
    formula: "`dilated time ^ 1000`"
  }),
  "timeStudySplit": new DilationUpgrade({
    id: 32,
    name: "All Dimension Split Paths",
    effect: "You can buy all three Time Study paths from the Dimension Split",
    cost: 1e10
  }),
  "dilationPenalty": new DilationUpgrade({
    id: 33,
    name: "Dilation Penalty Reduction",
    effect: "Reduce the Dilation penalty (^1.05 after reduction)",
    cost: 1e11,
    formula: "No, this does not make Dilation better than outside of it. It adds a ^1.05 after the main Dilation penalty"
  }),
  "ttGenerator": new DilationUpgrade({
    id: 41,
    name: "Time Theorem Generator",
    effect: "Generate Time Theorems based on Tachyon Particles",
    cost: 1e15,
    formula: "`tachyon particles / 20000` per second"
  })
};