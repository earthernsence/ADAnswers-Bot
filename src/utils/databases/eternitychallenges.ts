import { EC, StringIndexedStringObjectType } from "../types";
import Decimal from "break_infinity.js";

export const ECDescriptions: StringIndexedStringObjectType = {
  "1": `Time Dimensions are disabled.`,
  "2": `Infinity Dimensions are disabled.`,
  "3": `Antimatter Dimensions 5-8 don't produce anything. Dimensional Sacrifice is disabled.`,
  "4": `All Infinity multipliers and generators are disabled. The goal must be reached within a certain number of Infinities or else you will fail the Challenge.`,
  "5": `Antimatter Galaxy cost increase scaling starts immediately (normally at 100 Galaxies). Dimension Boost costs scaling is massively increased.`,
  "6": `You can't gain Antimatter Galaxies normally, but the cost of upgrading your max Replicanti Galaxies is massively reduced.`,
  "7": `1st Time Dimension produces 8th Infinity Dimensions, and 1st Infinity Dimension produces 7th Antimatter Dimensions. Tickspeed also directly applies to Infinity and Time Dimensions.`,
  "8": `You can only upgrade Infinity Dimensions 50 times and Replicanti upgrades 40 times. Infinity Dimension and Replicanti upgrade autobuyers are disabled.`,
  "9": `You can't buy Tickspeed upgrades. Infinity Power instead multiplies Time Dimensions with greatly reduced effect.`,
  "10": `Time Dimensions and Infinity Dimensions are disabled. You gain an immense boost from Infinities to Antimatter Dimensions (Infinities^950 (Infinities^1000 on web)).`,
  "11": `All dimension multipliers and powers are disabled except for the multipliers from Infinity Power and Dimension Boosts (to Antimatter Dimensions).`,
  "12": `The game runs ×1,000 slower. The goal must be reached within a certain amount of time or you will fail the Challenge.`
};

interface Reward {
  [key: string]: {
    reward: string;
    formula: string;
  }
}

export const ECRewards: Reward = {
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

interface Unlock {
  [key: string]: Function;
}

// These are based on the number of completions *currently*
const SecondaryUnlocks: Unlock = {
  "1": (completion: number): number => 20000 + 20000 * completion,
  "2": (completion: number): number => 1300 + 150 * completion,
  "3": (completion: number): number => 17300 + 1250 * completion,
  "4": (completion: number): number => 1e8 + 2.5e7 * completion,
  "5": (completion: number): number => 160 + 14 * completion,
  "6": (completion: number): number => 40 + 5 * completion,
  "7": (completion: number): string => `1e${new Decimal("1e500000").times(new Decimal("1e300000").pow(completion)).exponent}`,
  "8": (completion: number): string => `1e${new Decimal("1e4000").times(new Decimal("1e1000").pow(completion)).exponent}`,
  "9": (completion: number): string => `1e${new Decimal("1e17500").times(new Decimal("1e2000").pow(completion)).exponent}`,
  "10": (completion: number): string => `1e${new Decimal("1e100").times(new Decimal("1e20").pow(completion)).exponent}`,
};

const ECGoals = {
  "1": (completion: number) => `1e${new Decimal("1e1800").times(new Decimal(1e200).pow(completion)).exponent}`,
};

export function findEC(challenge: number, completion: number): EC {
  return EternityChallenges[(challenge - 1) * 5 + (completion - 1)];
}


export const EternityChallenges: EC[] = [
  // EC1
  {
    challenge: 1,
    completion: 1,
    tt: 130,
    ip: `\`${ECGoals[1](0)}\``,
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,171|1`",
    unlock: {
      currency: "Eternities",
      amount: SecondaryUnlocks["1"](0),
      tt: 30,
    }
  },
  {
    challenge: 1,
    completion: 2,
    tt: 140,
    ip: `\`${ECGoals[1](1)}\``,
    note: "`Get 60,000 Eternities before trying.`",
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: SecondaryUnlocks["1"](1),
      tt: 30,
    }
  },
  {
    challenge: 1,
    completion: 3,
    tt: 147,
    ip: `\`${ECGoals[1](2)}\``,
    note: null,
    tree: "`11,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: SecondaryUnlocks["1"](2),
      tt: 30,
    }
  },
  {
    challenge: 1,
    completion: 4,
    tt: 163,
    ip: `\`${ECGoals[1](3)}\``,
    note: null,
    tree: "`11,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171,21,33,31,41|1`",
    unlock: {
      currency: "Eternities",
      amount: SecondaryUnlocks["1"](3),
      tt: 30,
    }
  },
  {
    challenge: 1,
    completion: 5,
    tt: 176,
    ip: `\`${ECGoals[1](4)}\``,
    note: null,
    tree: "`11,21,22,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|1`",
    unlock: {
      currency: "Eternities",
      amount: SecondaryUnlocks["1"](4),
      tt: 30,
    }
  },
  // EC2
  {
    challenge: 2,
    completion: 1,
    tt: 135,
    ip: "`1e975`",
    note: null,
    tree: "`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: SecondaryUnlocks["2"](0),
      tt: 35,
    }
  },
  {
    challenge: 2,
    completion: 2,
    tt: 157,
    ip: "`1e1150`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: SecondaryUnlocks["2"](1),
      tt: 35,
    }
  },
  {
    challenge: 2,
    completion: 3,
    tt: 182,
    ip: "`1e1325`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: SecondaryUnlocks["2"](2),
      tt: 35,
    }
  },
  {
    challenge: 2,
    completion: 4,
    tt: 208,
    ip: "`1e1500`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: SecondaryUnlocks["2"](3),
      tt: 35,
    }
  },
  {
    challenge: 2,
    completion: 5,
    tt: 240,
    ip: "`1e1675`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
    unlock: {
      currency: "Tickspeed upgrades from Time Dimensions",
      amount: SecondaryUnlocks["2"](4),
      tt: 35,
    }
  },
  // EC3
  {
    challenge: 3,
    completion: 1,
    tt: 140,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: SecondaryUnlocks["3"](0),
      tt: 40,
    }
  },
  {
    challenge: 3,
    completion: 2,
    tt: 155,
    ip: "`1e675`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,71,81,91,101,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: SecondaryUnlocks["3"](1),
      tt: 40,
    }
  },
  {
    challenge: 3,
    completion: 3,
    tt: 165,
    ip: "`1e750`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: SecondaryUnlocks["3"](2),
      tt: 40,
    }
  },
  {
    challenge: 3,
    completion: 4,
    tt: 182,
    ip: "`1e825`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: SecondaryUnlocks["3"](3),
      tt: 40,
    }
  },
  {
    challenge: 3,
    completion: 5,
    tt: 208,
    ip: "`1e900`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|3`",
    unlock: {
      currency: "8th Antimatter Dimensions",
      amount: SecondaryUnlocks["3"](4),
      tt: 40,
    }
  },
  // EC4
  {
    challenge: 4,
    completion: 1,
    tt: 145,
    ip: "`1e2750`",
    note: "`Fail once for achievement`",
    tree: "`11,21,22,32,33,42,51,61,73,83,93,103,111,123,133,143|4`",
    completionReqs: "16 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: SecondaryUnlocks["4"](0),
      tt: 70,
    }
  },
  {
    challenge: 4,
    completion: 2,
    tt: 170,
    ip: "`1e3300`",
    note: null,
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171|4`",
    completionReqs: "12 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: SecondaryUnlocks["4"](1),
      tt: 70,
    }
  },
  {
    challenge: 4,
    completion: 3,
    tt: 176,
    ip: "`1e3850`",
    note: null,
    tree: "`11,21,22,32,42,51,61,62,73,83,93,103,111,123,133,143,151,162,171|4`",
    completionReqs: "8 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: SecondaryUnlocks["4"](2),
      tt: 70,
    }
  },
  {
    challenge: 4,
    completion: 4,
    tt: 252,
    ip: "`1e4400`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|4`",
    completionReqs: "4 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: SecondaryUnlocks["4"](3),
      tt: 70,
    }
  },
  {
    challenge: 4,
    completion: 5,
    tt: 370,
    ip: "`1e4950`",
    note: "`TS181 required`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,162,171,181|4`",
    completionReqs: "0 Infinities or less",
    unlock: {
      currency: "Infinities",
      amount: SecondaryUnlocks["4"](4),
      tt: 70,
    }
  },
  // EC5
  {
    challenge: 5,
    completion: 1,
    tt: 147,
    ip: "`1e750`",
    note: null,
    tree: "`11,21,22,32,42,51|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: SecondaryUnlocks["5"](0),
      tt: 130,
    }
  },
  {
    challenge: 5,
    completion: 2,
    tt: 182,
    ip: "`1e1150`",
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: SecondaryUnlocks["5"](1),
      tt: 130,
    }
  },
  {
    challenge: 5,
    completion: 3,
    tt: 200,
    ip: "`1e1550`",
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: SecondaryUnlocks["5"](2),
      tt: 130,
    }
  },
  {
    challenge: 5,
    completion: 4,
    tt: 220,
    ip: "`1e1950`",
    note: null,
    tree: "`11,21,22,31,32,33,42,51,61,62,72,82,92,102,111,121,131,141,151|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: SecondaryUnlocks["5"](3),
      tt: 130,
    }
  },
  {
    challenge: 5,
    completion: 5,
    tt: 252,
    ip: "`1e2350`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|5`",
    unlock: {
      currency: "Antimatter Galaxies",
      amount: SecondaryUnlocks["5"](4),
      tt: 130,
    }
  },
  // EC6
  {
    challenge: 6,
    completion: 1,
    tt: 161,
    ip: "`1e850`",
    note: "`1e15 times last crunch, wait for RGs (+TS33 at 163 TT)`. Remember to buy DimBoosts!`",
    tree: "`11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,33|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: SecondaryUnlocks["6"](0),
      tt: 85,
    }
  },
  {
    challenge: 6,
    completion: 2,
    tt: 176,
    ip: "`1e1100`",
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,32,42,51,61,62,72,82,92,102,111,121,131,141,151,162|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: SecondaryUnlocks["6"](1),
      tt: 85,
    }
  },
  {
    challenge: 6,
    completion: 3,
    tt: 208,
    ip: "`1e1350`",
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: SecondaryUnlocks["6"](2),
      tt: 85,
    }
  },
  {
    challenge: 6,
    completion: 4,
    tt: 252,
    ip: "`1e1600`",
    note: "`Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: SecondaryUnlocks["6"](3),
      tt: 85,
    }
  },
  {
    challenge: 6,
    completion: 5,
    tt: 320,
    ip: "`1e1850`",
    note: "`Get eternity upgrade 5 (1e40 EP). Remember to buy DimBoosts!`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|6`",
    unlock: {
      currency: "Replicanti Galaxies",
      amount: SecondaryUnlocks["6"](4),
      tt: 85,
    }
  },
  // EC7
  {
    challenge: 7,
    completion: 1,
    tt: 167,
    ip: "`1e2000`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,32,42,51,61,62,71,81,91,101,111|7`",
    unlock: {
      currency: "Antimatter",
      amount: SecondaryUnlocks["7"](0),
      tt: 115,
    }
  },
  {
    challenge: 7,
    completion: 2,
    tt: 193,
    ip: "`1e2530`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141|7`",
    unlock: {
      currency: "Antimatter",
      amount: SecondaryUnlocks["7"](1),
      tt: 115,
    }
  },
  {
    challenge: 7,
    completion: 3,
    tt: 220,
    ip: "`1e3060`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162|7`",
    unlock: {
      currency: "Antimatter",
      amount: SecondaryUnlocks["7"](2),
      tt: 115,
    }
  },
  {
    challenge: 7,
    completion: 4,
    tt: 252,
    ip: "`1e3590`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171|7`",
    unlock: {
      currency: "Antimatter",
      amount: SecondaryUnlocks["7"](3),
      tt: 115,
    }
  },
  {
    challenge: 7,
    completion: 5,
    tt: 895,
    ip: "`1e4120`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,193,214|7`",
    unlock: {
      currency: "Antimatter",
      amount: SecondaryUnlocks["7"](4),
      tt: 115,
    }
  },
  // EC8
  {
    challenge: 8,
    completion: 1,
    tt: 207,
    ip: "`1e1300`",
    // eslint-disable-next-line max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151,161,162. Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,161,162|8`",
    unlock: {
      currency: "Infinity Points",
      amount: SecondaryUnlocks["8"](0),
      tt: 115,
    }
  },
  {
    challenge: 8,
    completion: 2,
    tt: 320,
    ip: "`1e2200`",
    // eslint-disable-next-line max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti. Then buy the rest of the tree: 133,143,151,161,162,171. Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171|8`",
    unlock: {
      currency: "Infinity Points",
      amount: SecondaryUnlocks["8"](1),
      tt: 115,
    }
  },
  {
    challenge: 8,
    completion: 3,
    tt: 450,
    ip: "`1e3100`",
    // eslint-disable-next-line max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151,161,162,171,181. Spend your upgrades on: 4 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: SecondaryUnlocks["8"](2),
      tt: 115,
    }
  },
  {
    challenge: 8,
    completion: 4,
    tt: 600,
    ip: "`1e4000`",
    // eslint-disable-next-line max-len
    note: "`Buy the challenge once, then respec your tree and buy everything up until TS123. Start the challenge and wait for replicanti and max RG. Then buy the rest of the tree: 133,143,151,161,162,171,181. Spend your upgrades on: 5 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: SecondaryUnlocks["8"](3),
      tt: 115,
    }
  },
  {
    challenge: 8,
    completion: 5,
    tt: 825,
    ip: "`1e4900`",
    note: "`Spend your upgrades on: 0 RG, 9% chance, remaining on interval - all on ID1.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181|8`",
    unlock: {
      currency: "Infinity Points",
      amount: SecondaryUnlocks["8"](4),
      tt: 115,
    }
  },
  // EC9
  {
    challenge: 9,
    completion: 1,
    tt: 522,
    ip: "`1e1750`",
    note: "`Can be done with less TT.`",
    tree: "`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: SecondaryUnlocks["9"](0),
      tt: 415,
    }
  },
  {
    challenge: 9,
    completion: 2,
    tt: 575,
    ip: "`1e2000`",
    note: "`Can be done with less TT.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: SecondaryUnlocks["9"](1),
      tt: 415,
    }
  },
  {
    challenge: 9,
    completion: 3,
    tt: 660,
    ip: "`1e2250`",
    note: "`Can be done with less TT.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: SecondaryUnlocks["9"](2),
      tt: 415,
    }
  },
  {
    challenge: 9,
    completion: 4,
    tt: 760,
    ip: "`1e2500`",
    note: "`Can be done with less TT.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171|9`",
    unlock: {
      currency: "Infinity Power",
      amount: SecondaryUnlocks["9"](3),
      tt: 415,
    }
  },
  {
    challenge: 9,
    completion: 5,
    tt: 830,
    ip: "`1e2750`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181|9`",
    unlock: {
      currency: "Infinity Power",
      amount: SecondaryUnlocks["9"](4),
      tt: 415,
    }
  },
  // EC10
  {
    challenge: 10,
    completion: 1,
    tt: 895,
    ip: "`1e3000`",
    note: "`Farm 150M infinities inside the challenge.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181|10`",
    unlock: {
      currency: "Eternity Points",
      amount: SecondaryUnlocks["10"](0),
      tt: 550,
    }
  },
  {
    challenge: 10,
    completion: 2,
    tt: 1900,
    ip: "`1e3300`",
    note: "`10M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,193,211,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: SecondaryUnlocks["10"](1),
      tt: 550,
    }
  },
  {
    challenge: 10,
    completion: 3,
    tt: 2050,
    ip: "`1e3600`",
    note: "`20M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,192,193,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: SecondaryUnlocks["10"](2),
      tt: 550,
    }
  },
  {
    challenge: 10,
    completion: 4,
    tt: 3650,
    ip: "`1e3900`",
    note: "`30M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,192,193,213,214|10`",
    unlock: {
      currency: "Eternity Points",
      amount: SecondaryUnlocks["10"](3),
      tt: 550,
    }
  },
  {
    challenge: 10,
    completion: 5,
    tt: 5200,
    ip: "`1e4200`",
    note: "`40M+ Banked Infinities recommended.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,213,214,225,228,233|10`",
    unlock: {
      currency: "Eternity Points",
      amount: SecondaryUnlocks["10"](4),
      tt: 550,
    }
  },
  // EC11
  {
    challenge: 11,
    completion: 1,
    tt: 5600,
    ip: "`1e450`",
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,212,213,222,225,231,233|11`",
    unlock: {
      currency: "",
      amount: "Use only the Antimatter Dimension path (the 71 path)",
      tt: 1,
    }
  },
  {
    challenge: 11,
    completion: 2,
    tt: 5600,
    ip: "`1e650`",
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,121,131,141,151,161,162,171,181,191,192,193,211,212,213,222,225,231,233|11`",
    unlock: {
      currency: "",
      amount: "Use only the Antimatter Dimension path (the 71 path)",
      tt: 1,
    }
  },
  {
    challenge: 11,
    completion: 3,
    tt: 5950,
    ip: "`1e850`",
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: "Use only the Antimatter Dimension path (the 71 path)",
      tt: 1,
    }
  },
  {
    challenge: 11,
    completion: 4,
    tt: 5950,
    ip: "`1e1050`",
    note: "`Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: "Use only the Antimatter Dimension path (the 71 path)",
      tt: 1,
    }
  },
  {
    challenge: 11,
    completion: 5,
    tt: 5950,
    ip: "`1e1250`",
    note: "`This takes around 1h 45m. Get the Popular Music - achievement first (if you need help with it use /achievements Popular Music).`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,71,81,91,101,111,123,133,143,151,161,162,171,181,191,192,193,211,212,213,222,223,225,231,233|11`",
    unlock: {
      currency: "",
      amount: "Use only the Antimatter Dimension path (the 71 path)",
      tt: 1,
    }
  },
  // EC12
  {
    challenge: 12,
    completion: 1,
    tt: 9800,
    ip: "`1e110,000`",
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    unlock: {
      currency: "",
      amount: "Use only the Time Dimension path (the 73 path)",
      tt: 1,
    }
  },
  {
    challenge: 12,
    completion: 2,
    tt: 9800,
    ip: "`1e122,000`",
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.8 seconds or less (13.3 real-time minutes)",
    unlock: {
      currency: "",
      amount: "Use only the Time Dimension path (the 73 path)",
      tt: 1,
    }
  },
  {
    challenge: 12,
    completion: 3,
    tt: 10750,
    ip: "`1e134,000`",
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.6 seconds or less (10 real-time minutes)",
    unlock: {
      currency: "",
      amount: "Use only the Time Dimension path (the 73 path)",
      tt: 1,
    }
  },
  {
    challenge: 12,
    completion: 4,
    tt: 11200,
    ip: "`1e146,000`",
    note: "`Enable Auto-Eternity.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.4 seconds or less (6.6 real-time minutes)",
    unlock: {
      currency: "",
      amount: "Use only the Time Dimension path (the 73 path)",
      tt: 1,
    }
  },
  {
    challenge: 12,
    completion: 5,
    tt: 12350,
    ip: "`1e158,000`",
    note: "`Enable Auto-Eternity. Can be done earlier if you have the When Will It Be Enough - achievement.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,122,132,142,151,161,162,171,181,191,193,211,212,213,214,222,224,226,227,232,234|12`",
    completionReqs: "0.2 seconds or less (3.3 real-time minutes)",
    unlock: {
      currency: "",
      amount: "Use only the Time Dimension path (the 73 path)",
      tt: 1,
    }
  },
];

export const ECImages = {
  "1": "https://cdn.discordapp.com/attachments/824678601160917003/980926672423501834/EC1.png",
  "2": "https://cdn.discordapp.com/attachments/824678601160917003/980926672624840765/EC2.png",
  "3": "https://cdn.discordapp.com/attachments/824678601160917003/980926672809373696/EC3.png",
  "4": "https://cdn.discordapp.com/attachments/824678601160917003/980926673061027880/EC4.png",
  "5": "https://cdn.discordapp.com/attachments/824678601160917003/980926673337843762/EC5.png",
  "6": "https://cdn.discordapp.com/attachments/824678601160917003/980926673593700402/EC6.png",
  "7": "https://cdn.discordapp.com/attachments/824678601160917003/980926673891520602/EC7.png",
  "8": "https://cdn.discordapp.com/attachments/824678601160917003/980926674126381096/EC8.png",
  "9": "https://cdn.discordapp.com/attachments/824678601160917003/980926674352889956/EC9.png",
  "10": "https://cdn.discordapp.com/attachments/824678601160917003/980926674734551040/EC10.png",
  "11": "https://cdn.discordapp.com/attachments/824678601160917003/980926703461339186/EC11.png",
  "12": "https://cdn.discordapp.com/attachments/824678601160917003/980926703658479616/EC12.png",
};

// eslint-disable-next-line max-len
export const order = ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"];
export const orderAsString: string = order.join(", ");
export const orderAsECs: Array<EC> = order.map(ec => findEC(Number(ec.split("x")[0]), Number(ec.split("x")[1])));
// eslint-disable-next-line max-len
export const orderWithMultSigns = ["1×1", "2×1", "1×2", "3×1", "4×1", "5×1", "1×3", "3×2", "2×2", "6×1", "1×4", "3×3", "7×1", "4×2", "4×3", "6×2", "1×5", "5×2", "2×3", "3×4", "7×2", "5×3", "8×1", "3×5", "6×3", "2×4", "5×4", "7×3", "2×5", "5×5", "4×4", "6×4", "7×4", "8×2", "6×5", "4×5", "8×3", "9×1", "9×2", "8×4", "9×3", "9×4", "8×5", "9×5", "10×1", "7×5", "10×2", "10×3", "10×4", "10×5", "11×1", "11×2", "11×3", "11×4", "11×5", "12×1", "12×2", "12×3", "12×4", "12×5"];
