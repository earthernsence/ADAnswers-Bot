import type {
  EternityChallengeCompletionGoals,
  EternityChallengeDescriptions,
  EternityChallengeRewards,
  EternityChallengeSecondaryUnlock
} from "@/types/game_data/challenges/EternityChallenges";
import Decimal from "break_infinity.js";
import { DoublyLinkedList } from "@/types/DoublyLinkedList";
import EternityChallenge from "./EternityChallenge";
import { pluralise } from "@/utils/utils_commands";

// Considering the game isn't going to receive any more content updates, I feel okay
// about hardcoding all of this. Even if something does change, you know exactly where it is.
// This file is, admittedly, a bit of a mess, but I tried to cut down on as much common-ground
// stuff as I could.

export const eternityChallengeDescriptions: EternityChallengeDescriptions = {
  1: `Time Dimensions are disabled.`,
  2: `Infinity Dimensions are disabled.`,
  3: `Antimatter Dimensions 5-8 don't produce anything. Dimensional Sacrifice is disabled.`,
  4: `All Infinity multipliers and generators are disabled. The goal must be reached within a certain number of Infinities or else you will fail the Challenge.`,
  5: `Antimatter Galaxy cost increase scaling starts immediately (normally at 100 Galaxies). Dimension Boost costs scaling is massively increased.`,
  6: `You can't gain Antimatter Galaxies normally, but the cost of upgrading your max Replicanti Galaxies is massively reduced.`,
  7: `1st Time Dimension produces 8th Infinity Dimensions, and 1st Infinity Dimension produces 7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.`,
  8: `You can only upgrade Infinity Dimensions 50 times and Replicanti upgrades 40 times. Infinity Dimension and Replicanti upgrade autobuyers are disabled.`,
  9: `You can't buy Tickspeed upgrades. Infinity Power instead multiplies Time Dimensions with greatly reduced effect.`,
  10: `Time Dimensions and Infinity Dimensions are disabled. You gain an immense boost from Infinities to Antimatter Dimensions (Infinities^950).`,
  11: `All dimension multipliers and powers are disabled except for the multipliers from Infinity Power and Dimension Boosts (to Antimatter Dimensions).`,
  12: `The game runs ×1,000 slower. The goal must be reached within a certain amount of time or you will fail the Challenge.`
};

export const eternityChallengeSecondaryUnlockRequirements: EternityChallengeSecondaryUnlock = {
  1: (completions: number) => new Decimal(20000).plus(completions * 20_000).toString(),
  2: (completions: number) => new Decimal(1300).plus(completions * 150).toString(),
  3: (completions: number) => new Decimal(17300).plus(completions * 1_250).toString(),
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
  12: (completions: number) => `Use only the Time Dimension path (TS73, 83, 93, 103)`
};

export const eternityChallengeRewards: EternityChallengeRewards = {
  "1": {
    reward: "Time Dimension multiplier based on time spent this Eternity",
    formula: "×`max(time in this eternity / 10, 0.9) ^ 0.3 + (completions * 0.05)`"
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

export const eternityChallengeCompletionGoals: EternityChallengeCompletionGoals = {
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
  12: (completions: number) => new Decimal("1e110000").times(new Decimal("1e12000").pow(completions)).toString()
};

export const eternityChallengeSecondaryUnlockCurrency: { [key: number]: string } = {
  1: "Eternities",
  2: "Tickspeed upgrades from Time Dimensions",
  3: "8th Antimatter Dimensions",
  4: "Infinities",
  5: "Antimatter Galaxies",
  6: "Replicanti Galaxies",
  7: "Antimatter",
  8: "Infinity Points",
  9: "Infinity Power",
  10: "Eternity Points",
  11: "",
  12: ""
};

export const eternityChallengeTimeTheoremCost: { [key: number]: number } = {
  1: 30,
  2: 35,
  3: 40,
  4: 70,
  5: 130,
  6: 85,
  7: 115,
  8: 115,
  9: 415,
  10: 550,
  11: 1,
  12: 1
};

// eslint-disable-next-line no-unused-vars
export const eternityChallengeCompletionRequirements: { [key: number]: (completion: number) => string } = {
  4: (completions: number) => {
    const infinities = 16 - completions * 4;
    return `${infinities} Infinities or less`;
  },
  12: (completions: number) => {
    const seconds = 1 - completions * 0.2;
    const realTimeMinutes = ((seconds * 1000) / 60).toFixed(1);

    return `${seconds.toFixed(1)} ${pluralise("second", seconds)} or less (${realTimeMinutes} real-time minutes)`;
  }
};

export const eternityChallenges: Record<number, Record<number, EternityChallenge>> = {
  1: {
    1: new EternityChallenge({
      challenge: 1,
      completion: 1,
      recommendedTheorems: 130,
      recommendedTree: "11,22,32,42,51,61,infinity,111,active,151,161,171|1!"
    }),
    2: new EternityChallenge({
      challenge: 1,
      completion: 2,
      recommendedTheorems: 140,
      recommendedTree: "11,21,22,32,42,51,61,infinity,111,active,151-171|1!",
      note: "Get 60,000 Eternities before attempting this Challenge in order to boost the second Eternity Upgrade."
    }),
    3: new EternityChallenge({
      challenge: 1,
      completion: 3,
      recommendedTheorems: 147,
      recommendedTree: "11,21,22,32,33,42,51,61,62,infinity,111,active,151-171|1!"
    }),
    4: new EternityChallenge({
      challenge: 1,
      completion: 4,
      recommendedTheorems: 163,
      recommendedTree: "11-62,infinity,111,active,151-171|1!"
    }),
    5: new EternityChallenge({
      challenge: 1,
      completion: 5,
      recommendedTheorems: 175,
      recommendedTree: "11-62,infinity,111,active,151-171|1!"
    })
  },
  2: {
    1: new EternityChallenge({
      challenge: 2,
      completion: 1,
      recommendedTheorems: 135,
      recommendedTree: "11,22,32,42,51,61,time,111,active,151,161,171|2!"
    }),
    2: new EternityChallenge({
      challenge: 2,
      completion: 2,
      recommendedTheorems: 157,
      recommendedTree: "11-62,time,111,active,151-171|2!"
    }),
    3: new EternityChallenge({
      challenge: 2,
      completion: 3,
      recommendedTheorems: 182,
      recommendedTree: "11-62,time,111,active,151-171|2!"
    }),
    4: new EternityChallenge({
      challenge: 2,
      completion: 4,
      recommendedTheorems: 200,
      recommendedTree: "11-62,time,111,active,151-171|2!"
    }),
    5: new EternityChallenge({
      challenge: 2,
      completion: 5,
      recommendedTheorems: 240,
      recommendedTree: "11-62,time,111,active,151-171|2!"
    })
  },
  3: {
    1: new EternityChallenge({
      challenge: 3,
      completion: 1,
      recommendedTheorems: 140,
      recommendedTree: "11,22,32,42,51,61,antimatter,111,passive,151-171|3!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    2: new EternityChallenge({
      challenge: 3,
      completion: 2,
      recommendedTheorems: 155,
      recommendedTree: "11-62,antimatter,111,active,151-171|3!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    3: new EternityChallenge({
      challenge: 3,
      completion: 3,
      recommendedTheorems: 163,
      recommendedTree: "11-62,infinity,111,active,151-171|3!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    4: new EternityChallenge({
      challenge: 3,
      completion: 4,
      recommendedTheorems: 182,
      recommendedTree: "11-62,infinity,111,active,151-171|3!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    5: new EternityChallenge({
      challenge: 3,
      completion: 5,
      recommendedTheorems: 200,
      recommendedTree: "11-62,infinity,111,active,151-171|3!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    })
  },
  4: {
    1: new EternityChallenge({
      challenge: 4,
      completion: 1,
      recommendedTheorems: 142,
      recommendedTree: "11,22,32,33,42,51,61,time,111,idle|4!",
      note: `Fail once for Achievement 114 ("You're a mistake"). Add TS21 at 145 total TT.`
    }),
    2: new EternityChallenge({
      challenge: 4,
      completion: 2,
      recommendedTheorems: 170,
      recommendedTree: "11,22,32,42,51,61,time,111,idle,151,162,171|4!",
      note: "Add TS33 at 172 total TT. At 173 total TT, add TS62 instead."
    }),
    3: new EternityChallenge({
      challenge: 4,
      completion: 3,
      recommendedTheorems: 175,
      recommendedTree: "11,22,32,33,42,51,61,62,time,111,idle,151,162,171|4!"
    }),
    4: new EternityChallenge({
      challenge: 4,
      completion: 4,
      recommendedTheorems: 245,
      recommendedTree: "11-62,time,111,idle,151-171|4!"
    }),
    5: new EternityChallenge({
      challenge: 4,
      completion: 5,
      recommendedTheorems: 370,
      recommendedTree: "11,22,32,42,51,61,time,111,idle,151,162,171,181|4!",
      note: "TS181 required."
    })
  },
  5: {
    1: new EternityChallenge({
      challenge: 5,
      completion: 1,
      recommendedTheorems: 147,
      recommendedTree: "11,21,22,32,42,51|5!"
    }),
    2: new EternityChallenge({
      challenge: 5,
      completion: 2,
      recommendedTheorems: 182,
      recommendedTree: "11,22,32,42,51,61,infinity,111|5!"
    }),
    3: new EternityChallenge({
      challenge: 5,
      completion: 3,
      recommendedTheorems: 200,
      recommendedTree: "11,22,32,42,51,61,infinity,111,active|5!"
    }),
    4: new EternityChallenge({
      challenge: 5,
      completion: 4,
      recommendedTheorems: 215,
      recommendedTree: "11,21,22,32,42,51,61,62,infinity,111,active,151|5!",
      note: "Add TS33 at 218 total Time Theorems."
    }),
    5: new EternityChallenge({
      challenge: 5,
      completion: 5,
      recommendedTheorems: 245,
      recommendedTree: "11,21,22,32,33,42,51,61,62,infinity,111,active,151-171|5!",
      note: "Add TS31 and TS41 at 252 total Time Theorems."
    })
  },
  6: {
    1: new EternityChallenge({
      challenge: 6,
      completion: 1,
      recommendedTheorems: 160,
      recommendedTree: "11,22,32,33,42,51,61,62,infinity,111,active,33|6!",
      note: "1e15 times last crunch. Remember to buy DimBoosts & manually purchase Replicanti Galaxies! Add TS21 at 163 total Time Theorems."
    }),
    2: new EternityChallenge({
      challenge: 6,
      completion: 2,
      recommendedTheorems: 175,
      recommendedTree: "11,21,22,32,42,51,61,62,infinity,111,active,151,162|6!",
      note: "Remember to buy DimBoosts & manually purchase Replicanti Galaxies!"
    }),
    3: new EternityChallenge({
      challenge: 6,
      completion: 3,
      recommendedTheorems: 200,
      recommendedTree: "11,21,22,32,33,42,51,61,62,infinity,111,active,151-171|6!",
      note: "Remember to buy DimBoosts & manually purchase Replicanti Galaxies!"
    }),
    4: new EternityChallenge({
      challenge: 6,
      completion: 4,
      recommendedTheorems: 264,
      recommendedTree: "11-62,infinity,111,active,151-171|6!",
      note: "Remember to buy DimBoosts & manually purchase Replicanti Galaxies!"
    }),
    5: new EternityChallenge({
      challenge: 6,
      completion: 5,
      recommendedTheorems: 320,
      recommendedTree: "11-62,infinity,111,active,151-171|6!",
      note: "Get Eternity Upgrade 5 (1e40 EP) beforehand. Remember to buy DimBoosts & manually purchase Replicanti Galaxies!"
    })
  },
  7: {
    1: new EternityChallenge({
      challenge: 7,
      completion: 1,
      recommendedTheorems: 166,
      recommendedTree: "11,21,22,32,42,51,61,62,antimatter,111|7!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    2: new EternityChallenge({
      challenge: 7,
      completion: 2,
      recommendedTheorems: 193,
      recommendedTree: "11-62,antimatter,111,active|7!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    3: new EternityChallenge({
      challenge: 7,
      completion: 3,
      recommendedTheorems: 215,
      recommendedTree: "11-62,antimatter,111,active,151,161,162|7!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    4: new EternityChallenge({
      challenge: 7,
      completion: 4,
      recommendedTheorems: 264,
      recommendedTree: "11-62,antimatter,111,active,151-171|7!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    }),
    5: new EternityChallenge({
      challenge: 7,
      completion: 5,
      recommendedTheorems: 858,
      recommendedTree: "11-62,antimatter,111,active,151-181,193,214|7!",
      note: "To unlock the challenge, use the Time Dimension path, and then switch to the specified tree."
    })
  },
  8: {
    1: new EternityChallenge({
      challenge: 8,
      completion: 1,
      recommendedTheorems: 200,
      recommendedTree: "11,22,32,42,51,61,time,111,idle,151,162|8!",
      // eslint-disable-next-line @stylistic/max-len
      note: "Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151,162. Upgrades: 0 RG, 9% chance, remaining on interval for Replicanti - all ID purchases on ID1."
    }),
    2: new EternityChallenge({
      challenge: 8,
      completion: 2,
      recommendedTheorems: 310,
      recommendedTree: "11-62,time,111,idle,151-171|8!",
      // eslint-disable-next-line @stylistic/max-len
      note: "Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151-171. Upgrades: 0 RG, 9% chance, remaining on interval for Replicanti - all ID purchases on ID1."
    }),
    3: new EternityChallenge({
      challenge: 8,
      completion: 3,
      recommendedTheorems: 450,
      recommendedTree: "11-62,time,111,idle,151-181|8!",
      // eslint-disable-next-line @stylistic/max-len
      note: "Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151-181. Upgrades: 4 RG, 9% chance, remaining on interval for Replicanti - all ID purchases on ID1."
    }),
    4: new EternityChallenge({
      challenge: 8,
      completion: 4,
      recommendedTheorems: 600,
      recommendedTree: "11-62,time,111,idle,151-181|8!",
      // eslint-disable-next-line @stylistic/max-len
      note: "Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151-181. Upgrades: 5 RG, 9% chance, remaining on interval for Replicanti - all ID purchases on ID1."
    }),
    5: new EternityChallenge({
      challenge: 8,
      completion: 5,
      recommendedTheorems: 825,
      recommendedTree: "11-62,time,111,idle,151-181|8!",
      note: "This is much faster than 8x3 or 8x4. Upgrades: 0 RG, 9% chance, remaining on interval for Replicanti - all ID purchases on ID1."
    })
  },
  9: {
    1: new EternityChallenge({
      challenge: 9,
      completion: 1,
      recommendedTheorems: 522,
      recommendedTree: "11,22,32,42,51,61,time,111,active,151-171|9!",
      note: "Can be done with less theorems, though it will probably be slower. It may be difficult to reach 522 total Time Theorems!"
    }),
    2: new EternityChallenge({
      challenge: 9,
      completion: 2,
      recommendedTheorems: 575,
      recommendedTree: "11-62,time,111,active,151-171|9!",
      note: "Can be done with less theorems, though it will probably be slower. It may be difficult to reach 575 total Time Theorems!"
    }),
    3: new EternityChallenge({
      challenge: 9,
      completion: 3,
      recommendedTheorems: 660,
      recommendedTree: "11-62,time,111,active,151-171|9!",
      note: "Can be done with less theorems, though it will probably be slower. It may be difficult to reach 660 total Time Theorems!"
    }),
    4: new EternityChallenge({
      challenge: 9,
      completion: 4,
      recommendedTheorems: 760,
      recommendedTree: "11-62,time,111,active,151-181|9!",
      note: "Can be done with less theorems, though it will probably be slower. It may be difficult to reach 760 total Time Theorems!"
    }),
    5: new EternityChallenge({
      challenge: 9,
      completion: 5,
      recommendedTheorems: 830,
      recommendedTree: "11-62,time,111,active,151-181|9!"
    })
  },
  10: {
    1: new EternityChallenge({
      challenge: 10,
      completion: 1,
      recommendedTheorems: 858,
      recommendedTree: "11-62,antimatter,111,active,151,161,171,181|10!",
      note: "Farm 150M Infinities inside the challenge."
    }),
    2: new EternityChallenge({
      challenge: 10,
      completion: 2,
      recommendedTheorems: 1820,
      recommendedTree: "11-62,antimatter,111,active,151-181,191,193,211,214|10!",
      note: "10M+ Banked Infinities recommended."
    }),
    3: new EternityChallenge({
      challenge: 10,
      completion: 3,
      recommendedTheorems: 2050,
      recommendedTree: "11-62,antimatter,111,active,151-181,192,193,214|10!",
      note: "20M+ Banked Infinities recommended."
    }),
    4: new EternityChallenge({
      challenge: 10,
      completion: 4,
      recommendedTheorems: 2740,
      recommendedTree: "11-62,antimatter,111,active,151-181,191,192,193,211,213,214|10!",
      note: "30M+ Banked Infinities recommended."
    }),
    5: new EternityChallenge({
      challenge: 10,
      completion: 5,
      recommendedTheorems: 3615,
      recommendedTree: "11-62,antimatter,111,active,151-181,192,193,213,214,225,233|10!",
      note: "45M+ Banked Infinities recommended."
    })
  },
  11: {
    1: new EternityChallenge({
      challenge: 11,
      completion: 1,
      recommendedTheorems: 2886,
      recommendedTree: "11-62,antimatter,111,active,151-181,191,193,211,214|11!",
      note: "Get Achievement 126 prior to completing any EC11. You may also want Achievement 125, but it is only worth unlocking on mobile (takes ~1hr on PC compared to instantly on mobile) and only saves a few minutes."
    }),
    2: new EternityChallenge({
      challenge: 11,
      completion: 2,
      recommendedTheorems: 4870,
      recommendedTree: "11-62,antimatter,111,passive,151-193,211,213,222,225,231,233|11!",
      note: "Get Achievement 126 prior to completing any EC11. You may also want Achievement 125, but it is only worth unlocking on mobile (takes ~1hr on PC compared to instantly on mobile) and only saves a few minutes."
    }),
    3: new EternityChallenge({
      challenge: 11,
      completion: 3,
      recommendedTheorems: 5950,
      recommendedTree: "11-62,antimatter,111,passive,151-193,211-213,222,223,225,231,233|11!",
      note: "Get Achievement 126 prior to completing any EC11. You may also want Achievement 125, but it is only worth unlocking on mobile (takes ~1hr on PC compared to instantly on mobile) and only saves a few minutes."
    }),
    4: new EternityChallenge({
      challenge: 11,
      completion: 4,
      recommendedTheorems: 5950,
      recommendedTree: "11-62,antimatter,111,idle,151-193,211-213,222,223,225,231,233|11!",
      note: "Get Achievement 126 prior to completing any EC11. You may also want Achievement 125, but it is only worth unlocking on mobile (takes ~1hr on PC compared to instantly on mobile) and only saves a few minutes."
    }),
    5: new EternityChallenge({
      challenge: 11,
      completion: 5,
      recommendedTheorems: 5950,
      recommendedTree: "11-62,antimatter,111,idle,151-193,211-213,222,223,225,231,233|11!",
      note: "This takes around 1h 45m. Get Achievement 126 prior to completing any EC11. You may also want Achievement 125, but it is only worth unlocking on mobile (takes ~1hr on PC compared to instantly on mobile) and only saves a few minutes."
    })
  },
  12: {
    1: new EternityChallenge({
      challenge: 12,
      completion: 1,
      recommendedTheorems: 9500,
      recommendedTree: "11-62,time,111,passive,151-181,191,193,211,212,213,214,222,224,226,228,232,234|12!",
      note: "Enable Auto-Eternity."
    }),
    2: new EternityChallenge({
      challenge: 12,
      completion: 2,
      recommendedTheorems: 10_000,
      recommendedTree: "11-62,time,111,passive,151-181,191,193,211,212,213,214,222,224,226,228,232,234|12!",
      note: "Enable Auto-Eternity."
    }),
    3: new EternityChallenge({
      challenge: 12,
      completion: 3,
      recommendedTheorems: 10_000,
      recommendedTree: "11-62,time,111,passive,151-181,191,193,211,212,213,214,222,224,226,228,232,234|12!",
      note: "Enable Auto-Eternity."
    }),
    4: new EternityChallenge({
      challenge: 12,
      completion: 4,
      recommendedTheorems: 10_700,
      recommendedTree: "11-62,time,111,passive,151-181,191,193,211,212,213,214,222,224,226,227,232,234|12!",
      note: "Enable Auto-Eternity."
    }),
    5: new EternityChallenge({
      challenge: 12,
      completion: 5,
      recommendedTheorems: 12_000,
      recommendedTree: "11-62,time,111,passive,151-181,191,193,211,212,213,214,222,224,226,227,232,234|12!",
      note: "Enable Auto-Eternity. Can be done with less theorems, though it will probably be slower. It may be difficult to reach 12,000 total Time Theorems! It is also worth banking ~1e8 Infinities. This can be done earlier with the When Will It Be Enough achievement (Achievement 134)."
    })
  }
};

// eslint-disable-next-line @stylistic/max-len
export const order = [
  "1x1",
  "2x1",
  "1x2",
  "3x1",
  "4x1",
  "5x1",
  "1x3",
  "3x2",
  "2x2",
  "6x1",
  "1x4",
  "3x3",
  "7x1",
  "4x2",
  "4x3",
  "6x2",
  "1x5",
  "5x2",
  "2x3",
  "3x4",
  "7x2",
  "5x3",
  "8x1",
  "3x5",
  "6x3",
  "2x4",
  "5x4",
  "7x3",
  "2x5",
  "5x5",
  "4x4",
  "6x4",
  "7x4",
  "8x2",
  "6x5",
  "4x5",
  "8x3",
  "9x1",
  "9x2",
  "8x4",
  "9x3",
  "9x4",
  "8x5",
  "9x5",
  "10x1",
  "7x5",
  "10x2",
  "10x3",
  "10x4",
  "10x5",
  "11x1",
  "11x2",
  "11x3",
  "11x4",
  "11x5",
  "12x1",
  "12x2",
  "12x3",
  "12x4",
  "12x5"
];
export const orderAsString: string = order.join(", ");

export const orderAsDoublyLinkedList: DoublyLinkedList<EternityChallenge> = new DoublyLinkedList<EternityChallenge>();

for (const challenge of order) {
  const values = challenge.split("x").map(Number);

  orderAsDoublyLinkedList.insertAtEnd(eternityChallenges[values[0]][values[1]]);
}
