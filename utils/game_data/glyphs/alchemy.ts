import { AlchemyResource } from "./AlchemyResource";

export const alchemyResources: Record<string, AlchemyResource> = {
  // Tier 1 Resources (Non-Effarig base resources)
  power: new AlchemyResource({
    name: "Power",
    unlocksAt: 2,
    effect: "Provide a power to Antimatter Dimensions",
    formula: "^`1 + amount / 200000`",
    tier: 1
  }),
  infinity: new AlchemyResource({
    name: "Infinity",
    unlocksAt: 3,
    effect: "Provide a power to Infinity Dimensions",
    formula: "^`1 + amount / 200000`",
    tier: 1
  }),
  time: new AlchemyResource({
    name: "Time",
    unlocksAt: 4,
    effect: "Provide a power to Time Dimensions",
    formula: "^`1 + amount / 200000`",
    tier: 1
  }),
  replication: new AlchemyResource({
    name: "Replication",
    unlocksAt: 5,
    effect: "Increases Replication speed",
    formula: "x`10 ^ (amount / 1000)`",
    tier: 1
  }),
  dilation: new AlchemyResource({
    name: "Dilation",
    unlocksAt: 6,
    effect: "Increases Dilated Time production",
    formula: "x`10 ^ (amount / 2000)`",
    tier: 1
  }),
  // Tier 2 Resources (combinations of pairs of T1 resources)
  cardinality: new AlchemyResource({
    name: "Cardinality",
    unlocksAt: 8,
    effect: "Replicanti interval increases slower (down from x1.2) per 1.8e308 Replicanti",
    formula: "x`1.2` ➜ x`1 + 0.2 / (1 + amount / 20000)`",
    tier: 2,
    reagents: [
      ["Time", 8],
      ["Replication", 7]
    ]
  }),
  eternity: new AlchemyResource({
    name: "Eternity",
    unlocksAt: 9,
    effect: "Provide a power to Eternity generation",
    formula: "^`1 + amount / 15000`",
    tier: 2,
    reagents: [
      ["Time", 11],
      ["Infinity", 4]
    ]
  }),
  dimensionality: new AlchemyResource({
    name: "Dimensionality",
    unlocksAt: 10,
    effect: "Provide a large multiplier to all Dimensions",
    formula: "x`10 ^ (5 * amount)`",
    tier: 2,
    reagents: [
      ["Power", 10],
      ["Infinity", 5]
    ]
  }),
  inflation: new AlchemyResource({
    name: "Inflation",
    unlocksAt: 11,
    effect: "All Antimatter Dimension multipliers are raised to the 1.05 power if they are above a certain value",
    formula: "`10 ^ (6e9 - 3e5 * amount)`",
    tier: 2,
    reagents: [
      ["Power", 9],
      ["Dilation", 6]
    ]
  }),
  alternation: new AlchemyResource({
    name: "Alternation",
    unlocksAt: 12,
    effect: "Tachyon Galaxies are stronger per 1e1e6 Replicanti",
    formula: "`amount / 200000`%",
    tier: 2,
    reagents: [
      ["Replication", 5],
      ["Dilation", 10]
    ]
  }),
  // Tier 3 Resources (Effarig and combinations of T1/T2 with Effarig)
  effarig: new AlchemyResource({
    name: "Effarig",
    unlocksAt: 7,
    effect: "Increase Relic Shard gain",
    formula: "x`10 ^ (amount / 2500)`",
    tier: 1
  }),
  synergism: new AlchemyResource({
    name: "Synergism",
    unlocksAt: 13,
    effect: "Increase the yield of Alchemy Reactions from 30%",
    formula: "0.3 ➜ `0.3 + 1.3 * sqrt(amount / 25000)`, capped at 100% (after Achievement 175: uncapped)",
    tier: 3,
    reagents: [
      ["Effarig", 3],
      ["Replication", 16],
      ["Infinity", 14]
    ]
  }),
  decoherence: new AlchemyResource({
    name: "Decoherence",
    unlocksAt: 14,
    effect: "Gives a percentage of a refined Glyph's value to all other basic Alchemy Resources",
    formula: "`0.15 * sqrt(amount / 25000)`",
    tier: 3,
    reagents: [
      ["Effarig", 13],
      ["Alternation", 8]
    ]
  }),
  momentum: new AlchemyResource({
    name: "Momentum",
    unlocksAt: 15,
    effect: "Provides a power to all Dimensions that grows over time since resource unlock",
    formula: "^`1 + 0.005 * real-time hours since Momentum unlock` to a maximum of ^`1 + amount / 25000`",
    tier: 3,
    reagents: [
      ["Effarig", 11],
      ["Power", 4],
      ["Time", 20]
    ]
  }),
  // Tier 4 Resources (resources that feed into Reality)
  multiversal: new AlchemyResource({
    name: "Multiversal",
    unlocksAt: 16,
    effect: "Make each Reality simulate more Realities, giving the same rewards as if it were amplified",
    formula: "`32 * ((amount / 25000) ^ 2)`",
    tier: 4,
    reagents: [
      ["Alternation", 16],
      ["Decoherence", 3]
    ]
  }),
  force: new AlchemyResource({
    name: "Force",
    unlocksAt: 17,
    effect: "Multiply Antimatter Dimensions based on Reality Machines",
    formula: "x`RM ^ (5 * amount)`",
    tier: 4,
    reagents: [
      ["Dimensionality", 7],
      ["Momentum", 8]
    ]
  }),
  exponential: new AlchemyResource({
    name: "Exponential",
    unlocksAt: 18,
    effect: "Multiply Infintiy Point gain based on Replicanti",
    formula: "`Replicanti ^ (10 * ((amount / 10000) ^ 2))`",
    tier: 4,
    reagents: [
      ["Inflation", 18],
      ["Synergism", 3]
    ]
  }),
  uncountability: new AlchemyResource({
    name: "Uncountability",
    unlocksAt: 19,
    effect: "Passively generate Realities and Perk Points",
    formula: "`160 * sqrt(amount / 25000)` per second",
    tier: 4,
    reagents: [
      ["Infinity", 20],
      ["Effarig", 6],
      ["Cardinality", 16]
    ]
  }),
  boundless: new AlchemyResource({
    name: "Boundless",
    unlocksAt: 20,
    effect: "Improve Tesseracts",
    formula: "`amount / 80000`",
    tier: 4,
    reagents: [
      ["Eternity", 13],
      ["Inflation", 18]
    ]
  }),
  unpredictability: new AlchemyResource({
    name: "Unpredictability",
    unlocksAt: 21,
    effect: "Give each Alchemy Reaction a chance to happen twice",
    formula: "`amount / (10714.28 + amount)` (caps at 70%)",
    tier: 4,
    reagents: [
      ["Effarig", 15],
      ["Decoherence", 3],
      ["Synergism", 10]
    ]
  }),
  // Tier 5 Resources
  reality: new AlchemyResource({
    name: "Reality",
    unlocksAt: 25,
    effect: "Create a Reality Glyph",
    formula: "Reality Glyph of level `floor(amount)`",
    tier: 5,
    reagents: [
      ["Exponential", 1],
      ["Force", 1],
      ["Uncountability", 1],
      ["Boundless", 1],
      ["Multiversal", 1],
      ["Unpredictability", 1]
    ]
  })
};
