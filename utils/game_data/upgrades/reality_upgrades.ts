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
  "replicativeAmplifier": new RealityUpgrade({
    id: 12,
    name: "Replicative Amplifier",
    effect: "Gain Replicanti 3 times faster",
    cost: 1,
    increment: 30
  }),
  "eternalAmplifier": new RealityUpgrade({
    id: 13,
    name: "Eternal Amplifier",
    effect: "Gain 3 times more Eternities",
    cost: 2,
    increment: 30
  }),
  "superluminalAmplifier": new RealityUpgrade({
    id: 14,
    name: "Superluminal Amplifier",
    effect: "Gain 3 times more Tachyon Particles",
    cost: 2,
    increment: 30
  }),
  "boundlessAmplifier": new RealityUpgrade({
    id: 15,
    name: "Boundless Amplifier",
    effect: "Gain 5 times more Infinities",
    cost: 3,
    increment: 50
  }),
  "cosmicallyDuplicate": new RealityUpgrade({
    id: 21,
    name: "Cosmically Duplicate",
    effect: "Replicanti speed is multiplied based on Replicanti Galaxies",
    cost: 15,
    formula: "`1 + 0.02 * (Replicanti Galaxies)`",
    requirement: "Complete your first Eternity in a Reality without using Replicanti Galaxies"
  }),
  "innumerablyConstruct": new RealityUpgrade({
    id: 22,
    name: "Innumerably Construct",
    effect: "Infinity gain is boosted from Antimatter Galaxy count",
    cost: 15,
    formula: "`1 + (galaxies / 30)`",
    requirement: "Complete your first Infinity in a Reality with at most 1 Antimatter Galaxy"
  }),
  "paradoxicallyAttain": new RealityUpgrade({
    id: 23,
    name: "Paradoxically Attain",
    effect: "Tachyon Particle gain is boosted based on Achievement Multiplier",
    cost: 15,
    formula: "`sqrt(Achievement Multiplier)`",
    requirement: "Get to Eternity without any Automatic Achievements (Your first Reality does not count)"
  }),
  "linguisticallyExpand": new RealityUpgrade({
    id: 24,
    name: "Linguistically Expand",
    effect: "Gain another Glyph slot",
    cost: 15,
    requirement: "Eternity for 1e4000 Eternity Points using only a single Glyph with a level of 3 or more"
  }),
  "existentiallyProlong": new RealityUpgrade({
    id: 25,
    name: "Existentially Prolong",
    effect: "Start every Reality with 100 Eternities (Also applies to current Reality)",
    cost: 15,
    requirement: "Complete your first Eternity with at least 1e400 IP"
  }),
  "boundlessFlow": new RealityUpgrade({
    id: 31,
    name: "The Boundless Flow",
    effect: "Every second, gain 10% of the Infinities you would normally gain from Infinitying",
    cost: 50,
    formula: "`(Infinities gained on Crunch) * 0.1`",
    requirement: "Have at least 1e12 Banked Infinities at once"
  }),
  "knowingExistence": new RealityUpgrade({
    id: 32,
    name: "The Knowing Existence",
    effect: "Eternity Point multiplier based on Reality and Time Theorem count",
    cost: 50,
    formula: "`max(TT - 1e3, 2) ^ log2(min(realities, 1e4))`",
    requirement: "Eternity for 1e70 Eternity Points without any Eternity Challenge 1 completions"
  }),
  "telemechanicalProcess": new RealityUpgrade({
    id: 33,
    name: "The Telemechanical Process",
    effect: "Improve Eternity Autobuyer and unlock autobuyers for Time Dimensions and the x5 EP upgrade",
    cost: 50,
    requirement: "Eternity for 1e4000 EP without Time Dimensions 5-8"
  }),
  "eternalFlow": new RealityUpgrade({
    id: 34,
    name: "The Eternal Flow",
    effect: "Gain Eternities per second equal to your Reality count",
    cost: 50,
    formula: "`(Reality count)`, affected by Eternity multipliers",
    requirement: "Have at least 1e7 Eternities in a single Reality"
  }),
  "paradoxicalForever": new RealityUpgrade({
    id: 35,
    name: "The Paradoxical Forever",
    effect: "Boost Tachyon Particle gain based on the x5 Eternity Point multiplier",
    cost: 50,
    formula: "`max(sqrt(log10(ep mult effect)) / 9, 1)`",
    requirement: "Have 1e10 Eternity Points without purchasing the x5 Eternity Point Upgrade"
  }),
  "disparityOfRarity": new RealityUpgrade({
    id: 41,
    name: "Disparity of Rarity",
    effect: "Improve the Glyph Rarity formula",
    cost: 1500,
    requirement: "Make a new Reality with 4 Glyphs equipped of uncommon or better rarity"
  }),
  "duplicityOfPotency": new RealityUpgrade({
    id: 42,
    name: "Duplicity of Potency",
    effect: "50% chance to get an additional effect on Glyphs",
    cost: 1500,
    requirement: "Make a new Reality with 4 Glyphs equipped, each having at least 2 effects"
  }),
  "measureOfForever": new RealityUpgrade({
    id: 43,
    name: "Measure of Forever",
    effect: "Eternity Count boosts Glyph level",
    cost: 1500,
    formula: "0.45 * log(Eternities) ^ 0.5; see Glyph Level Factors panel for more info",
    requirement: "Make a new Reality with 4 Glyphs equipped, each being level 10 or higher"
  }),
  "scourToEmpower": new RealityUpgrade({
    id: 44,
    name: "Scour to Empower",
    effect: "Unlock Glyph Sacrifice, allowing you to sacrifice glyphs for permanent bonuses",
    cost: 1500,
    requirement: "Have at least 30 Glyphs at once"
  }),
  "parityOfSingularity": new RealityUpgrade({
    id: 45,
    name: "Parity of Singularity",
    effect: "Unlock a second Black Hole",
    cost: 1500,
    requirement: "Exist for 100 days after unlocking the first Black Hole"
  }),
  "cosmicConglomerate": new RealityUpgrade({
    id: 51,
    name: "Cosmic Conglomerate",
    effect: "Move Remote Antimatter Galaxy scaling to 100,000 galaxies",
    cost: 1e5,
    requirement: "Have a total of at least 2,800 Galaxies from all types"
  }),
  "temporalTranscendence": new RealityUpgrade({
    id: 52,
    name: "Temporal Transcendence",
    effect: "Time Dimension multiplier based on days spent in a Reality",
    cost: 1e5,
    formula: "`10 ^ (1 + (2 * log10(time in reality in days + 1)) ^ 1.6)`",
    requirement: "Have at least e28000 Time Shards"
  }),
  "replicativeRapidity": new RealityUpgrade({
    id: 53,
    name: "Replicative Rapidity",
    effect: "Replicanti speed is boosted based on your fastest Reality (game time)",
    cost: 1e5,
    formula: "`15 / clamp(best reality in minutes, 1/12, 15)`",
    requirement: "Make a new Reality in under 15 minutes (game time)"
  }),
  "syntheticSymbolism": new RealityUpgrade({
    id: 54,
    name: "Synthetic Symbolism",
    effect: "Gain another Glyph slot",
    cost: 1e5,
    requirement: "Reality for at least 5000 Machines without Glyphs equipped"
  }),
  "effortlessExistence": new RealityUpgrade({
    id: 55,
    name: "Effortless Existence",
    effect: "Unlock the Reality Autobuyer, the Reality automator command, and the Automator if you haven't done so yet",
    cost: 1e5,
    requirement: "Reach 1e11111 EP"
  })
};