import type { EC, EternityChallengeCompletionGoals, EternityChallengeDescriptions, EternityChallengeReward, EternityChallengeSecondaryUnlock } from "@/types/game_data/EternityChallenges";
import Decimal from "break_infinity.js";

const eternityChallengeDescriptions: EternityChallengeDescriptions = {
  1: `Time Dimensions are disabled.`,
  2: `Infinity Dimensions are disabled.`,
  3: `Antimatter Dimensions 5-8 don't produce anything. Dimensional Sacrifice is disabled.`,
  4: `All Infinity multipliers and generators are disabled. The goal must be reached within a certain number of Infinities or else you will fail the Challenge.`,
  5: `Antimatter Galaxy cost increase scaling starts immediately (normally at 100 Galaxies). Dimension Boost costs scaling is massively increased.`,
  6: `You can't gain Antimatter Galaxies normally, but the cost of upgrading your max Replicanti Galaxies is massively reduced.`,
  7: `1st Time Dimension produces 8th Infinity Dimensions, and 1st Infinity Dimension produces 7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.`,
  8: `You can only upgrade Infinity Dimensions 50 times and Replicanti upgrades 40 times. Infinity Dimension and Replicanti upgrade autobuyers are disabled.`,
  9: `You can't buy Tickspeed upgrades. Infinity Power instead multiplies Time Dimensions with greatly reduced effect.`,
  10: `Time Dimensions and Infinity Dimensions are disabled. You gain an immense boost from Infinities to Antimatter Dimensions (Infinities^950 (Infinities^1000 on web)).`,
  11: `All dimension multipliers and powers are disabled except for the multipliers from Infinity Power and Dimension Boosts (to Antimatter Dimensions).`,
  12: `The game runs ×1,000 slower. The goal must be reached within a certain amount of time or you will fail the Challenge.`
};

const eternityChallengeSecondaryUnlockRequirements: EternityChallengeSecondaryUnlock = {
  1: (completions: number) => new Decimal(20000).plus(completions * 20000).toString(),
  2: (completions: number) => new Decimal(1300).plus(completions * 150).toString(),
  3: (completions: number) => new Decimal(17300).plus(completions * 1250).toString(),
  4: (completions: number) => new Decimal(1e8).plus(completions * 2.5e7).toString(),
  5: (completions: number) => new Decimal(160).plus(completions * 14).toString(),
  6: (completions: number) => new Decimal(40).plus(completions * 5).toString(),
  7: (completions: number) => new Decimal("1e500000").times(new Decimal("1e300000").pow(completions)).toString(),
  8: (completions: number) => new Decimal("1e4000").times(new Decimal("1e1000").pow(completions)).toString(),
  9: (completions: number) => new Decimal("1e17500").times(new Decimal("1e2000").pow(completions)).toString(),
  10: (completions: number) => new Decimal("1e100").times(new Decimal("1e20").pow(completions)).toString(),
  // eslint-disable-next-line no-unused-vars
  11: (completions: number) => `Use only the Antimatter Dimension path (TS71, 81, 91, 101)`,
  // eslint-disable-next-line no-unused-vars
  12: (completions: number) => `Use only the Time Dimension path (TS73, 83, 93, 103)`,
};

const eternityChallengeRewards: EternityChallengeReward = {
  "1": {
    reward: "Time Dimension multiplier based on time spent this Eternity",
    formula: "×`max(time in this eternity / 10, 0.9) ^ 0.3 + (completions * 0.05)`",
  },
  "2": {
    reward: "1st Infinity Dimension multiplier based on Infinity Power, capping at ×1e100",
    formula: "×`Infinity Power ^ 1.5 / (700 - completions * 100)`"
  },
  "3": {
    reward: "Increase the multiplier for buying 10 Antimatter Dimensions",
    formula: "+`completions * 0.72`"
  },
  "4": {
    reward: "Infinity Dimension multiplier based on unspent Infinity Points, capping at ×1e200",
    formula: "×`Infinity Points ^ 0.003 + completions * 0.002`"
  },
  "5": {
    reward: "Distant Galaxy cost scaling starts later",
    formula: "+`completions * 5`"
  },
  "6": {
    reward: "Further reduce Antimatter Dimension cost multiplier growth",
    formula: "-`completions * 0.2`"
  },
  "7": {
    reward: "1st Time Dimension produces 8th Infinity Dimensions",
    formula: "`(TD1 production ^ completions * 0.2) - 1` per second"
  },
  "8": {
    reward: "Infinity Power strengthens Replicanti Galaxies",
    formula: "`max(0, (log10(log10(Infinity Power) + 1) ^ 0.03 * completions) - 1)`%"
  },
  "9": {
    reward: "Infinity Dimension multiplier based on Time Shards, capping at 1e400",
    formula: "×`Time Shards ^ completions * 0.1`"
  },
  "10": {
    reward: "Time Dimension multiplier based on Infinities (affected by TS31)",
    formula: "×`(infinities * 2.783e-6) ^ (0.4 + 0.1 * completions)`"
  },
  "11": {
    reward: "Further reduce Tickspeed cost multiplier growth",
    formula: "-`completions * 0.07`"
  },
  "12": {
    reward: "Infinity Dimension cost multipliers are reduced",
    formula: "×`1 - completions * 0.008`"
  }
};

const eternityChallengeCompletionGoals: EternityChallengeCompletionGoals = {
  1: (completions: number) => new Decimal("1e1800").times(new Decimal(1e200).pow(completions)).toString(),
  2: (completions: number) => new Decimal("1e975").times(new Decimal(1e175).pow(completions)).toString(),
  3: (completions: number) => new Decimal("1e600").times(new Decimal(1e75).pow(completions)).toString(),
  4: (completions: number) => new Decimal("1e2750").times(new Decimal("1e550").pow(completions)).toString(),
  5: (completions: number) => new Decimal("1e750").times(new Decimal("1e400").pow(completions)).toString(),
  6: (completions: number) => new Decimal("1e850").times(new Decimal(1e250).pow(completions)).toString(),
  7: (completions: number) => new Decimal("1e2000").times(new Decimal("1e530").pow(completions)).toString(),
  8: (completions: number) => new Decimal("1e1300").times(new Decimal("1e900").pow(completions)).toString(),
  9: (completions: number) => new Decimal("1e1750").times(new Decimal("1e250").pow(completions)).toString(),
  10: (completions: number) => new Decimal("1e3000").times(new Decimal("1e300").pow(completions)).toString(),
  11: (completions: number) => new Decimal("1e450").times(new Decimal(1e200).pow(completions)).toString(),
  12: (completions: number) => new Decimal("1e110000").times(new Decimal("1e12000").pow(completions)).toString(),
};

export const eternityChallenges: Array<EC> = [
  // EC1
  {
    challenge: 1,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 130,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,171|1`",
    unlock: {
      currency: "Eternities",
      amount: eternityChallengeSecondaryUnlockRequirements["1"](0),
      theorems: 30,
    }
  },
  {
    challenge: 1,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 140,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get 60,000 Eternities before trying.`",
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: eternityChallengeSecondaryUnlockRequirements["1"](1),
      theorems: 30,
    }
  },
  {
    challenge: 1,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 147,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: eternityChallengeSecondaryUnlockRequirements["1"](2),
      theorems: 30,
    }
  },
  {
    challenge: 1,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 163,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: eternityChallengeSecondaryUnlockRequirements["1"](3),
      theorems: 30,
    }
  },
  {
    challenge: 1,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 176,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|1`",
    unlock: {
      currency: "Eternities",
      amount: eternityChallengeSecondaryUnlockRequirements["1"](4),
      theorems: 30,
    }
  },
  // EC2
  {
    challenge: 2,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 135,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["2"](0),
      theorems: 35,
    }
  },
  {
    challenge: 2,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 157,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["2"](1),
      theorems: 35,
    }
  },
  {
    challenge: 2,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 182,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["2"](2),
      theorems: 35,
    }
  },
  {
    challenge: 2,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 208,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["2"](3),
      theorems: 35,
    }
  },
  {
    challenge: 2,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 240,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["2"](4),
      theorems: 35,
    }
  },
  // EC3
  {
    challenge: 3,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 140,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["3"](0),
      theorems: 40,
    }
  },
  {
    challenge: 3,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 155,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,71,81,91,101,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["3"](1),
      theorems: 40,
    }
  },
  {
    challenge: 3,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 165,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["3"](2),
      theorems: 40,
    }
  },
  {
    challenge: 3,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 182,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["3"](3),
      theorems: 40,
    }
  },
  {
    challenge: 3,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 208,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: eternityChallengeSecondaryUnlockRequirements["3"](4),
      theorems: 40,
    }
  },
  // EC4
  {
    challenge: 4,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 145,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Fail once for achievement`",
    tree: "`11,21,22,32,33,42,51,61,73,83,93,103,111,123,133,143|4`",
    completionReqs: "16 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: eternityChallengeSecondaryUnlockRequirements["4"](0),
      theorems: 70,
    }
  },
  {
    challenge: 4,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 170,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171|4`",
    completionReqs: "12 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: eternityChallengeSecondaryUnlockRequirements["4"](1),
      theorems: 70,
    }
  },
  {
    challenge: 4,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 176,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,32,42,51,61,62,73,83,93,103,111,123,133,143,151,162,171|4`",
    completionReqs: "8 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: eternityChallengeSecondaryUnlockRequirements["4"](2),
      theorems: 70,
    }
  },
  {
    challenge: 4,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 252,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|4`",
    completionReqs: "4 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: eternityChallengeSecondaryUnlockRequirements["4"](3),
      theorems: 70,
    }
  },
  {
    challenge: 4,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 370,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`TS181 required`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171,181|4`",
    completionReqs: "0 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: eternityChallengeSecondaryUnlockRequirements["4"](4),
      theorems: 70,
    }
  },
  // EC5
  {
    challenge: 5,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 147,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,32,42,51|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["5"](0),
      theorems: 130,
    }
  },
  {
    challenge: 5,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 182,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["5"](1),
      theorems: 130,
    }
  },
  {
    challenge: 5,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 200,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["5"](2),
      theorems: 130,
    }
  },
  {
    challenge: 5,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 220,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,42,51,61,62,72,82,92,102,111,121,131,141,151|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["5"](3),
      theorems: 130,
    }
  },
  {
    challenge: 5,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 252,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["5"](4),
      theorems: 130,
    }
  },
  // EC6
  {
    challenge: 6,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 161,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`1e15 times last crunch, wait for RGs (+TS33 at 163 theorems)`. Remember to buy DimBoosts!`",
    tree: "`11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,33|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["6"](0),
      theorems: 85,
    }
  },
  {
    challenge: 6,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 176,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,162|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["6"](1),
      theorems: 85,
    }
  },
  {
    challenge: 6,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 208,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["6"](2),
      theorems: 85,
    }
  },
  {
    challenge: 6,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 252,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["6"](3),
      theorems: 85,
    }
  },
  {
    challenge: 6,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 320,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get eternity upgrade 5 (1e40 EP). Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: eternityChallengeSecondaryUnlockRequirements["6"](4),
      theorems: 85,
    }
  },
  // EC7
  {
    challenge: 7,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 167,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,32,42,51,61,62,71,81,91,101,111|7`",
    unlock: {
      currency: "Antimatter",
      amount: eternityChallengeSecondaryUnlockRequirements["7"](0),
      theorems: 115,
    }
  },
  {
    challenge: 7,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 193,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141|7`",
    unlock: {
      currency: "Antimatter",
      amount: eternityChallengeSecondaryUnlockRequirements["7"](1),
      theorems: 115,
    }
  },
  {
    challenge: 7,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 220,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162|7`",
    unlock: {
      currency: "Antimatter",
      amount: eternityChallengeSecondaryUnlockRequirements["7"](2),
      theorems: 115,
    }
  },
  {
    challenge: 7,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 252,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171|7`",
    unlock: {
      currency: "Antimatter",
      amount: eternityChallengeSecondaryUnlockRequirements["7"](3),
      theorems: 115,
    }
  },
  {
    challenge: 7,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 895,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,193,214|7`",
    unlock: {
      currency: "Antimatter",
      amount: eternityChallengeSecondaryUnlockRequirements["7"](4),
      theorems: 115,
    }
  },
  // EC8
  {
    challenge: 8,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 207,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    // eslint-disable-next-line @stylistic/max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151,161,162. Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,161,162|8`",
    unlock: {
      currency: "Infinity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["8"](0),
      theorems: 115,
    }
  },
  {
    challenge: 8,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 320,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    // eslint-disable-next-line @stylistic/max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151,161,162,171. Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|8`",
    unlock: {
      currency: "Infinity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["8"](1),
      theorems: 115,
    }
  },
  {
    challenge: 8,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 450,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    // eslint-disable-next-line @stylistic/max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151,161,162,171,181. Spend your upgrades on: 4 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["8"](2),
      theorems: 115,
    }
  },
  {
    challenge: 8,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 600,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    // eslint-disable-next-line @stylistic/max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151,161,162,171,181. Spend your upgrades on: 5 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["8"](3),
      theorems: 115,
    }
  },
  {
    challenge: 8,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 825,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["8"](4),
      theorems: 115,
    }
  },
  // EC9
  {
    challenge: 9,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 522,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Can be done with less theorems.`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: eternityChallengeSecondaryUnlockRequirements["9"](0),
      theorems: 415,
    }
  },
  {
    challenge: 9,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 575,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Can be done with less theorems.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: eternityChallengeSecondaryUnlockRequirements["9"](1),
      theorems: 415,
    }
  },
  {
    challenge: 9,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 660,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Can be done with less theorems.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: eternityChallengeSecondaryUnlockRequirements["9"](2),
      theorems: 415,
    }
  },
  {
    challenge: 9,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 760,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Can be done with less theorems.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: eternityChallengeSecondaryUnlockRequirements["9"](3),
      theorems: 415,
    }
  },
  {
    challenge: 9,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 830,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181|9`",
    unlock: {
      currency: "Infinity Power",
      amount: eternityChallengeSecondaryUnlockRequirements["9"](4),
      theorems: 415,
    }
  },
  // EC10
  {
    challenge: 10,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 895,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Farm 150M infinities inside the challenge.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181|10`",
    unlock: {
      currency: "Eternity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["10"](0),
      theorems: 550,
    }
  },
  {
    challenge: 10,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 1900,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`10M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,193,211,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["10"](1),
      theorems: 550,
    }
  },
  {
    challenge: 10,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 2050,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`20M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,192,193,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["10"](2),
      theorems: 550,
    }
  },
  {
    challenge: 10,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 3650,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`30M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,192,193,213,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["10"](3),
      theorems: 550,
    }
  },
  {
    challenge: 10,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5200,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`40M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,213,214,225,228,233|10`",
    unlock: {
      currency: "Eternity Points",
      amount: eternityChallengeSecondaryUnlockRequirements["10"](4),
      theorems: 550,
    }
  },
  // EC11
  {
    challenge: 11,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5600,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,212,213,222,225,231,233|11`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["11"](0),
      theorems: 1,
    }
  },
  {
    challenge: 11,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5600,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,212,213,222,225,231,233|11`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["11"](1),
      theorems: 1,
    }
  },
  {
    challenge: 11,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5950,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["11"](2),
      theorems: 1,
    }
  },
  {
    challenge: 11,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5950,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["11"](3),
      theorems: 1,
    }
  },
  {
    challenge: 11,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 5950,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`This takes around 1h 45m. Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["11"](4),
      theorems: 1,
    }
  },
  // EC12
  {
    challenge: 12,
    completion: 1,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 9800,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["12"](0),
      theorems: 1,
    }
  },
  {
    challenge: 12,
    completion: 2,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 9800,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.8 seconds or less (13.3 real-time minutes)",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["12"](1),
      theorems: 1,
    }
  },
  {
    challenge: 12,
    completion: 3,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 10750,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.6 seconds or less (10 real-time minutes)",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["12"](2),
      theorems: 1,
    }
  },
  {
    challenge: 12,
    completion: 4,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 11200,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.4 seconds or less (6.6 real-time minutes)",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["12"](3),
      theorems: 1,
    }
  },
  {
    challenge: 12,
    completion: 5,
    get description() { return eternityChallengeDescriptions[this.challenge]; },
    get reward() { return eternityChallengeRewards[this.challenge]; },
    theorems: 12350,
    get ip() { return eternityChallengeCompletionGoals[this.challenge](this.completion - 1); },
    note: "`Enable Auto-Eternity. Can be done earlier if you have the When Will It Be Enough - achievement.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.2 seconds or less (3.3 real-time minutes)",
    unlock: {
      currency: "",
      amount: eternityChallengeSecondaryUnlockRequirements["12"](4),
      theorems: 1,
    }
  },
];

// eslint-disable-next-line @stylistic/max-len
export const order = ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"];
export const orderAsString: string = order.join(", ");