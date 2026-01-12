import { InfinityUpgrade } from "@/types/game_data/upgrades/InfinityUpgrade";

interface IInfinityUpgrades {
  [key: string]: InfinityUpgrade;
}

export const InfinityUpgrades: IInfinityUpgrades = {
  timeMult: new InfinityUpgrade({
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
  "27mult": new InfinityUpgrade({
    id: 22,
    name: "2nd & 7th Antimatter Dimension Multiplier",
    effect: "2nd and 7th Antimatter Dimensions gain a multiplier based on Infinities",
    formula: "`infinities * 0.2 + 1` (affected by TS31)",
    cost: 1
  }),
  "36mult": new InfinityUpgrade({
    id: 31,
    name: "3rd & 6th Antimatter Dimension Multiplier",
    effect: "3rd and 6th Antimatter Dimensions gain a multiplier based on Infinities",
    formula: "`infinities * 0.2 + 1` (affected by TS31)",
    requirement: "1st & 8th Antimatter Dimension Multiplier",
    cost: 1
  }),
  "45mult": new InfinityUpgrade({
    id: 32,
    name: "4th & 5th Antimatter Dimension Multiplier",
    effect: "4th and 5th Antimatter Dimensions gain a multiplier based on Infinities",
    formula: "`infinities * 0.2 + 1` (affected by TS31)",
    requirement: "2nd & 7th Antimatter Dimension Multiplier",
    cost: 1
  }),
  resetBoost: new InfinityUpgrade({
    id: 41,
    name: "Dimboost & Galaxy Requirement Reduction",
    effect: "Dimboost and Galaxy requirements are reduced by 9",
    requirement: "3rd & 6th Antimatter Dimension Multiplier",
    cost: 1
  }),
  buy10mult: new InfinityUpgrade({
    id: 12,
    name: "Buy 10 Multiplier Increase",
    effect: "Increase the multiplier for buying 10 Antimatter Dimensions",
    formula: "`2.0` -> `2.2`",
    cost: 1
  }),
  galaxyBoost: new InfinityUpgrade({
    id: 42,
    name: "Galaxy Effect Boost",
    effect: "All Galaxies are twice as strong",
    requirement: "4th & 5th Antimatter Dimension Multiplier",
    cost: 2
  }),
  thisInfinityTimeMult: new InfinityUpgrade({
    id: 13,
    name: "This Infinity Time Multiplier",
    effect: "Antimatter Dimensions gain a multiplier based on time spent in current Infinity",
    formula: "`max((time in this infinity in minutes / 5) ^ 0.25, 1)`",
    cost: 3
  }),
  unspentIPMult: new InfinityUpgrade({
    id: 23,
    name: "Unspent IP Multiplier",
    effect: "Multiplier to 1st Antimatter Dimension based on unspent Infinity Points",
    formula: "`((infinity points / 2) ^ 1.5) + 1`",
    requirement: "This Infinity Time Multiplier",
    cost: 5
  }),
  dimboostMult: new InfinityUpgrade({
    id: 33,
    name: "Dimboost Multiplier Increase",
    effect: "Increase Dimension Boost multiplier",
    formula: "`2.0` -> `2.5`",
    requirement: "Unspent IP Multiplier",
    cost: 7
  }),
  ipGen: new InfinityUpgrade({
    id: 43,
    name: "Infinity Point Generation",
    effect: "Passively generate Infinity Points 10 times slower than your fastest Infinity",
    formula: "1 IP (affected by all IP multipliers) every `fastest infinity in milliseconds * 10`",
    requirement: "Dimboost Multiplier Increase",
    cost: 10
  }),
  skipReset1: new InfinityUpgrade({
    id: 14,
    name: "Free Dimboost 1",
    effect: "Start every reset with 1 Dimension Boost, automatically unlocking the 5th Antimatter Dimension",
    cost: 20
  }),
  skipReset2: new InfinityUpgrade({
    id: 24,
    name: "Free Dimboost 2",
    effect: "Start every reset with 2 Dimension Boosts, automatically unlocking the 6th Antimatter Dimension",
    requirement: "Free Dimboost 1",
    cost: 40
  }),
  skipReset3: new InfinityUpgrade({
    id: 34,
    name: "Free Dimboost 3",
    effect: "Start every reset with 3 Dimension Boosts, automatically unlocking the 7th Antimatter Dimension",
    requirement: "Free Dimboost 2",
    cost: 80
  }),
  skipReset4: new InfinityUpgrade({
    id: 44,
    name: "Free Dimboost 4",
    effect:
      "Start every reset with 4 Dimension Boosts, automatically unlocking the 8th Antimatter Dimension; and an Antimatter Galaxy",
    requirement: "Free Dimboost 3",
    cost: 300
  })
};
