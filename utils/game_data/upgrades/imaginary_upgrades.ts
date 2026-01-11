import { ImaginaryUpgrade } from "@/types/game_data/upgrades/ImaginaryUpgrade";

interface IImaginaryUpgrades {
  [key: string]: ImaginaryUpgrade
}

export const ImaginaryUpgrades: IImaginaryUpgrades = {
  "temporalIntensifier": new ImaginaryUpgrade({
    id: 11,
    name: "Temporal Intensifier",
    effect: "Increase Temporal Amplifier multiplier by +0.15",
    cost: 3,
    increment: 60
  }),
  "replicativeIntensifier": new ImaginaryUpgrade({
    id: 12,
    name: "Replicative Intensifier",
    effect: "Increase Replicative Amplifier multiplier by +0.15",
    cost: 4,
    increment: 60
  }),
  "eternalIntensifier": new ImaginaryUpgrade({
    id: 13,
    name: "Eternal Intensifier",
    effect: "Increase Eternal Amplifier multiplier by +0.40",
    cost: 1,
    increment: 40
  }),
  "superluminalIntensifier": new ImaginaryUpgrade({
    id: 14,
    name: "Superluminal Intensifier",
    effect: "Increase Superluminal Amplifier multiplier by +0.15",
    cost: 5,
    increment: 80
  }),
  "boundlessIntensifier": new ImaginaryUpgrade({
    id: 15,
    name: "Boundless Intensifier",
    effect: "Increase Boundless Amplifier multiplier by +0.60",
    cost: 1,
    increment: 30
  }),
  "ellipticMateriality": new ImaginaryUpgrade({
    id: 21,
    name: "Elliptic Materiality",
    effect: "Increase the Reality Machine cap by ×1e100",
    cost: 1e4,
    increment: 500
  }),
  "runicAssurance": new ImaginaryUpgrade({
    id: 22,
    name: "Runic Assurance",
    effect: "Delay Glyph Instability starting level by 200",
    cost: 2e5,
    increment: 500
  }),
  "hyperbolicApeirogon": new ImaginaryUpgrade({
    id: 23,
    name: "Hyperbolic Apeirogon",
    effect: "Multiply Infinity Dimensions by 1e100,000",
    cost: 1e7,
    increment: 800
  }),
  "cosmicFilament": new ImaginaryUpgrade({
    id: 24,
    name: "Cosmic Filament",
    effect: "Increase Galaxy strength",
    cost: 1e9,
    increment: 1000
  }),
  "entropicCondensing": new ImaginaryUpgrade({
    id: 25,
    name: "Entropic Condensing",
    effect: "Increase Singularity gain",
    cost: 8e9,
    increment: 2000
  }),
  "suspicionOfInterference": new ImaginaryUpgrade({
    id: 31,
    name: "Suspicion of Interference",
    effect: "Time Dimension power based on total antimatter",
    cost: 5e7,
    formula: "`1 + (log10(log10(antimatter)) / 100)`",
    requirement: "1e90 total Relic Shards",
    strategy: "This one, you'll probably need Nameless 25 (for the extra Time glyph effect), and a max Reality Glyph. It may take some time to grind the Relic Shards up to 1e90, but it shouldn't be too long."
  }),
  "consequencesOfIllusions": new ImaginaryUpgrade({
    id: 32,
    name: "Consequences of Illusions",
    effect: "Gain free Dimboosts based on Imaginary rebuyable count",
    cost: 5e7,
    formula: "`2e4 * rebuyable count`",
    requirement: "Make a level 9,000 Glyph with a single Glyph level factor weight at 100",
    strategy: "Hint: ||Look closely at the Glyph factors dropdown||\nSolution: ||yertp||"
  }),
  "transienceOfInformation": new ImaginaryUpgrade({
    id: 33,
    name: "Transience of Information",
    effect: "Increase Imaginary Machine Cap based on Imaginary Upgrades purchased",
    cost: 5e7,
    formula: "`1 + (rebuyables / 20) + (one time purchases / 2)`",
    requirement: "Reach 1.80e308 projected Reality Machines within The Nameless Ones' Reality",
    strategy: "Hint: ||Make sure you're using all of Nameless' tricks in the Reality||\nSolution: ||yettt||"
  }),
  "recollectionOfIntrusion": new ImaginaryUpgrade({
    id: 34,
    name: "Recollection of Intrusion",
    effect: "Raise all Dimension per-purchase multipliers to ^1.5",
    cost: 3.5e8,
    requirement: "Reach a tickspeed of 1e7.500e10 / sec within Eternity Challenge 5",
    strategy: "Hint: ||Time Shards are especially helpful, wait a bit to let them build up before entering EC5||\nSolution: ||ytttt/yettt||"
  }),
  "fabricationOfIdeals": new ImaginaryUpgrade({
    id: 35,
    name: "Fabrication of Ideals",
    effect: "Convert Antimatter Dimensions to Continuum and unlock Lai'tela, Celestial of Dimensions",
    cost: 1e9,
    requirement: "Reach 1e1.500e12 antimatter without ever having any 1st Infinity Dimensions",
    // eslint-disable-next-line @stylistic/max-len
    strategy: "Hint: ||remember to disable the two ways you gain IDs: turn off auto-EC and ID autobuyers, then Reality again. If necessary, you can enter EC2, then re-enable auto EC and ID autobuyers. This will need completed Ra and a good amount of other stats!||\nSolution: ||yettt||"
  }),
  "masslessMomentum": new ImaginaryUpgrade({
    id: 41,
    name: "Massless Momentum",
    effect: "Unlock the 2nd Dark Matter Dimension",
    cost: 3.5e9,
    requirement: "Destabilize Lai'tela's Reality in under 30 seconds twice"
  }),
  "chiralOscillation": new ImaginaryUpgrade({
    id: 42,
    name: "Chiral Oscillation",
    effect: "Unlock the 3rd Dark Matter Dimension",
    cost: 6e9,
    requirement: "Automatically condense at least 20 Singularities at once"
  }),
  "dimensionalSymmetry": new ImaginaryUpgrade({
    id: 43,
    name: "Dimensional Symmetry",
    effect: "Unlock the 4th Dark Matter Dimension",
    cost: 1.5e10,
    requirement: "Have 80,000 total Galaxies",
    strategy: "Hint: ||you'll need around 1.5e20 iM, e74-e75 Glyph Sacrifice, 50+% Lai'tela continuum bonus, and near e200 years||\nSolution: ||ydddd||"
  }),
  "deterministicRadiation": new ImaginaryUpgrade({
    id: 44,
    name: "Deterministic Radiation",
    effect: "Unlock Dark Matter Annihilation",
    cost: 2.8e10,
    requirement: "Reach 3,850,000 Tickspeed Continuum without ever having more than 8 Time Studies in this Reality",
    strategy: "Hint: ||Make sure to do something you haven't done in a long time.||\nSolution: ||iiiep + `11,21,31,41,51,61,72,82` + Crunch + auto-ECs||"
  }),
  "vacuumAcceleration": new ImaginaryUpgrade({
    id: 45,
    name: "Vacuum Acceleration",
    effect: "Unlock Autobuyers for repeatable Imaginary Upgrades and generate Imaginary Machines 10 times faster",
    cost: 3e12,
    requirement: "Have a Continuum increase from Dark Matter of at least 100%"
  }),
  "existentialElimination": new ImaginaryUpgrade({
    id: 51,
    name: "Existential Elimination",
    effect: "Annihilation multiplier gain is improved based on Imaginary Machines",
    cost: 1e13,
    formula: "`max((log10(iM) - 10) ^ 3, 1)`",
    requirement: "Reach 1e7.400e12 antimatter with Continuum disabled",
    strategy: "Hint: ||disable Continuum in the Autobuyers tab||\nSolution: ||yeidd or your RM build||"
  }),
  "totalTermination": new ImaginaryUpgrade({
    id: 52,
    name: "Total Termination",
    effect: "Glyph Sacrifice totals for basic Glyphs are increased to 1e100",
    cost: 1.5e14,
    requirement: "Reach 1e1.500e11 antimatter in Effarig's Reality with at least 4 Cursed Glyphs equipped",
    strategy: "Hint: ||you'll need around e89 sac||\nSolution: ||ccccd||"
  }),
  "planarPurification": new ImaginaryUpgrade({
    id: 53,
    name: "Planar Purification",
    effect: "Increase free Dimboost count based on Tesseract count",
    cost: 6e14,
    formula: "`floor(0.25 * (tesseracts ^ 2))`",
    requirement: "Reach Glyph level 20,000 in Ra's Reality with at most 0 Glyphs equipped",
    strategy: "Hint: ||at most 0 Glyphs equipped...? What decreases the number of Glyphs equipped?||\nSolution: ||cyer (cursed is -3)||"
  }),
  "absoluteAnnulment": new ImaginaryUpgrade({
    id: 54,
    name: "Absolute Annulment",
    effect: "Increase free Dimboost strength based on Singularity count",
    cost: 6e14,
    formula: "`singularities ^ 300`",
    requirement: "Have 13,000 Antimatter Galaxies in Ra's Reality with a fully inverted Black Hole",
    strategy: "Hint: ||make sure to actually invert your black hole||\nSolution: ||epiii||"
  }),
  "omnipresentObliteration": new ImaginaryUpgrade({
    id: 55,
    name: "Omnipresent Obliteration",
    effect: "Unlock Pelle, Celestial of Antimatter",
    cost: 1.6e15,
    requirement: "Reach Reality in Lai'tela's Reality with all Dimensions disabled and at least 4 empty Glyph slots",
    strategy: "Hint: ||no way to get around the Glyphs equipped this time. What Glyph has given you progress in Lai'tela this whole time?||\nSolution: ||d, you'll need to wait for e4k EP (game speed increases as time goes by)||"
  })
};