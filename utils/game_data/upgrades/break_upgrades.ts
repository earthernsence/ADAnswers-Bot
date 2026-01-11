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
  "currentAMMult": new BreakInfinityUpgrade({
    id: 12,
    name: "Current Antimatter Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on current antimatter",
    formula: "`log(AM) + 1 ^ 0.5`",
    cost: 5e4
  }),
  "galaxyBoost": new BreakInfinityUpgrade({
    id: 13,
    name: "Galaxy Effect Boost",
    effect: "All Galaxies are 50% stronger",
    cost: 5e11
  }),
  "infinitiedMult": new BreakInfinityUpgrade({
    id: 21,
    name: "AD Multiplier from Infinities",
    effect: "Antimatter Dimensions gain a multiplier based on Infinities",
    formula: "`log10(infinities) * 10`",
    cost: 1e5
  }),
  "achievementMult": new BreakInfinityUpgrade({
    id: 22,
    name: "Achievement Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on Achievements completed",
    formula: "`max(((achievements completed - 30) ^ 3) / 40, 1)`",
    cost: 1e6
  }),
  "slowestChallengeMult": new BreakInfinityUpgrade({
    id: 23,
    name: "Slowest Challenge Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on slowest challenge run",
    formula: "`50 / slowest challenge run in minutes` (minimum x1)",
    cost: 1e7
  }),
  "infinitiedGen": new BreakInfinityUpgrade({
    id: 31,
    name: "Infinity Generation",
    effect: "Passively generate Infinities based on your fastest Infinity",
    formula: "1 infinity (affected by multipliers) every `best infinity in milliseconds * 5`",
    cost: 2e7
  }),
  "autobuyMaxDimboosts": new BreakInfinityUpgrade({
    id: 32,
    name: "Dimboost Autobuyer Improvement",
    effect: "Unlock the buy max Dimension Boost Autobuyer mode",
    cost: 5e9
  }),
  "autobuyerSpeed": new BreakInfinityUpgrade({
    id: 33,
    name: "Autobuyer Improvement",
    effect: "Autobuyers unlocked or improved by Normal Challenges work twice as fast",
    cost: 1e15
  }),
  "tickspeedCostMult": new BreakInfinityUpgrade({
    id: 41,
    name: "Tickspeed Cost Multiplier Reduction",
    effect: "Reduce post-infinity Tickspeed Upgrade cost multiplier scaling",
    cost: 5e6,
    increment: 5,
    formula: "`-x`, where x is the number of purchases of this upgrade (max 8)",
  }),
  "dimCostMult": new BreakInfinityUpgrade({
    id: 42,
    name: "Dimension Cost Multiplier Reduction",
    effect: "Reduce post-infinity Antimatter Dimension cost multiplier scaling",
    cost: 1e7,
    increment: 5e3,
    formula: "`-x`, where x is the number of purchases of this upgrade (max 7)"
  }),
  "ipGen": new BreakInfinityUpgrade({
    id: 43,
    name: "Infinity Point Generation",
    effect: "Generate a percentage of your best IP/min from your last 10 Infinities, works offline",
    cost: 1e7,
    increment: 10,
    formula: "`(x * 5)%`, where x is the number of purchases of this upgrade (max 10)"
  })
};