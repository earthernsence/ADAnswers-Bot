import Perk from "./Perk";
import { PERK_FAMILY } from "@/types/game_data/Perks";

export const perks: Record<string, Perk> = {
  // Achievement
  ACH1: new Perk({
    id: "ACH1",
    name: "Achievement Timer Reduction 1",
    effect: "Reduce the Achievement timer to 20 minutes per Achievement (10 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["START"],
    ap: 5
  }),
  ACH2: new Perk({
    id: "ACH2",
    name: "Achievement Timer Reduction 2",
    effect: "Reduce the Achievement timer to 12 minutes per Achievement (8 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH1"]
  }),
  ACH3: new Perk({
    id: "ACH3",
    name: "Achievement Timer Reduction 3",
    effect: "Reduce the Achievement timer to 6 minutes per Achievement (6 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH2"]
  }),
  ACH4: new Perk({
    id: "ACH4",
    name: "Achievement Timer Reduction 4",
    effect: "Reduce the Achievement timer to 2 minutes per Achievement (4 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH3"]
  }),
  ACHNR: new Perk({
    id: "ACHNR",
    name: "Achievement No Reset",
    effect: "Reality no longer resets your Achievements.",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH4"],
    ap: 10
  }),
  // Antimatter
  SAM: new Perk({
    id: "SAM",
    name: "Starting Antimatter",
    effect: "Start every reset with 5e130 antimatter.",
    family: PERK_FAMILY.ANTIMATTER,
    prerequisites: ["START"]
  }),
  ANR: new Perk({
    id: "ANR",
    name: "Antimatter No Reset",
    effect:
      "Dimension Boosts and Antimatter Galaxies no longer reset Antimatter, Antimatter Dimensions, Tickspeed, or Dimensional Sacrifice.",
    family: PERK_FAMILY.ANTIMATTER,
    prerequisites: ["SAM", "SEP1"]
  }),
  // Automation
  TTS: new Perk({
    id: "TTS",
    name: "Time Theorem Autobuyer (Single)",
    effect: "Unlock a Time Theorem Autobuyer which buys single Time Theorems every tick.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["ACT"],
    ap: 5
  }),
  TTF: new Perk({
    id: "TTF",
    name: "Free Time Theorems",
    effect: "Purchasing Time Theorems no longer spends your Antimatter, Infinity Points, or Eternity Points.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["TTS"]
  }),
  TTM: new Perk({
    id: "TTM",
    name: "Time Theorem Autobuyer (Max)",
    effect: "Upgrade the Time Theorem Autobuyer to buy max Time Theorems.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["ACT"],
    ap: 5
  }),
  PEC1: new Perk({
    id: "PEC1",
    name: "Passive Eternity Challenges 1",
    effect:
      "Auto-complete one Eternity Challenge every 60 real-time minutes. ECs will be complete sequentially, requiring all previous ECs to be fully completed before progressing to the next EC.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["IDL"],
    ap: 5
  }),
  PEC2: new Perk({
    id: "PEC2",
    name: "Passive Eternity Challenges 2",
    effect: "Auto-complete one Eternity Challenge every 40 real-time minutes.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["PEC1"]
  }),
  PEC3: new Perk({
    id: "PEC3",
    name: "Passive Eternity Challenges 3",
    effect: "Auto-complete one Eternity Challenge every 20 real-time minutes.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["PEC2"],
    ap: 10
  }),
  IDAS: new Perk({
    id: "IDAS",
    name: "Infinity Dimension Autobuyer Speed",
    effect: "Infinity Dimension autobuyers work x3 faster.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["SIP1"],
    ap: 5
  }),
  REPAS: new Perk({
    id: "REPAS",
    name: "Replicanti Autobuyer Speed",
    effect: "Replicanti autobuyers work x3 faster.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["SIP2"],
    ap: 5
  }),
  DAU: new Perk({
    id: "DAU",
    name: "DIlation Autobuyers for Upgrades",
    effect: "Unlock autobuyers for the repeatable Dilation Upgrades",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["EU2", "TGR"],
    ap: 5
  }),
  DAS: new Perk({
    id: "DAS",
    name: "Dilation Autobuyer Speed",
    effect: "Dilation Upgrade autobuyers work x3 faster.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["ATT"],
    ap: 5
  }),
  // Infinity
  SIP1: new Perk({
    id: "SIP1",
    name: "Starting Infinity Points 1",
    effect: "Start every Eternity and Reality with 5e15 Infinity Points",
    family: PERK_FAMILY.INFINITY,
    prerequisites: ["SAM", "SEP1"]
  }),
  SIP2: new Perk({
    id: "SIP2",
    name: "Starting Infinity Points 2",
    effect: "Start every Eternity and Reality with 5e130 Infinity Points",
    family: PERK_FAMILY.INFINITY,
    prerequisites: ["SIP1"]
  }),
  IDR: new Perk({
    id: "IDR",
    name: "Infinity Dimension Requirement Removal",
    effect: "Infinity Dimensions no longer have Antimatter requirements.",
    family: PERK_FAMILY.INFINITY,
    prerequisites: ["SIP2"]
  }),
  // Eternity
  EC5R: new Perk({
    id: "EC5R",
    name: "Eternity Challenge 5 Requirement Removal",
    effect: "Remove the Eternity Challenge 5 requirement from Time Study 62.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["START"]
  }),
  ACT: new Perk({
    id: "ACT",
    name: "Active Path Buff",
    effect: "Active path multipliers are always maximized.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["EC5R"]
  }),
  IDL: new Perk({
    id: "IDL",
    name: "Idle Path Buff",
    effect: "Idle path multipliers start as if you have spent 15 minutes in this Infinity/Eternity.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["EC5R"]
  }),
  PASS: new Perk({
    id: "PASS",
    name: "Passive Path Buff",
    effect:
      "Improve Time Study 122 to x50 Eternity Points and Time Study 142 to x1e50 Infinity Points. In addition, Time Study 132 also makes Replicanti 3 times faster.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["EC5R"]
  }),
  EC1R: new Perk({
    id: "EC1R",
    name: "Eternity Challenge 1 Requirement Removal",
    effect: "Remove the Eternity Challenge 1 requirement from Time Study 181.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["PASS", "EC2R", "EC3R"]
  }),
  EC2R: new Perk({
    id: "EC2R",
    name: "Eternity Challenge 2 Requirement Removal",
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["ACT", "EC1R"]
  }),
  EC3R: new Perk({
    id: "EC3R",
    name: "Eternity Challenge 3 Requirement Removal",
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["IDL", "EC1R"]
  }),
  ECR: new Perk({
    id: "ECR",
    name: "Eternity Challenge Requirements Removal",
    effect: "Remove non-Time Theorem requirements for unlocking Eternity Challenges.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["EC1R"],
    ap: 10
  }),
  ECB: new Perk({
    id: "ECB",
    name: "Eternity Challenge Bulk Completion",
    effect:
      "You can complete multiple tiers of Eternity Challenges at once if you reach the goal for a higher completion of that challenge.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["ECR"],
    ap: 15
  }),
  SEP1: new Perk({
    id: "SEP1",
    name: "Starting Eternity Points 1",
    effect: "Start every Reality with 10 Eternity Points",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["ANR", "SIP1", "STP"],
    ap: 5
  }),
  SEP2: new Perk({
    id: "SEP2",
    name: "Starting Eternity Points 2",
    effect: "Start every Reality with 5e3 Eternity Points",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["SEP1"]
  }),
  SEP3: new Perk({
    id: "SEP3",
    name: "Starting Eternity Points 3",
    effect: "Start every Reality with 5e9 Eternity Points",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["SEP2"],
    ap: 10
  }),
  EU1: new Perk({
    id: "EU1",
    name: "Eternity Upgrades 1",
    effect: "Automatically unlock the first row of Eternity Upgrades for free once you have Eternities.",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["START"]
  }),
  EU2: new Perk({
    id: "EU2",
    name: "Eternity Upgrades 2",
    effect:
      "The second row of Eternity Upgrades is automatically purchased at x1e10 times less than their original price",
    family: PERK_FAMILY.ETERNITY,
    prerequisites: ["EU1", "DAU"]
  }),
  // Dilation
  STP: new Perk({
    id: "STP",
    name: "Starting Tachyon Particles",
    effect: "After unlocking Dilation, gain 10 Tachyon Particles.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["SEP1", "TP1"],
    ap: 5
  }),
  DILR: new Perk({
    id: "DILR",
    name: "Dilation Requirement Removal",
    effect:
      "Remove the Eternity Challenge 11, Eternity Challenge 12, and total Time Theorem requirements from Time Dilation unlock.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["DAU"],
    ap: 5
  }),
  TGR: new Perk({
    id: "TGR",
    name: "Tachyon Galaxy No Reset",
    effect: "The 2nd rebuyable Dilation Upgrade no longer resets your Dilated Time.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["TP1", "DAU"]
  }),
  TP1: new Perk({
    id: "TP1",
    name: "Retroactive Tachyon Particles 1",
    effect:
      'When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 1.5.',
    family: PERK_FAMILY.DILATION,
    prerequisites: ["STP", "TGR"]
  }),
  TP2: new Perk({
    id: "TP2",
    name: "Retroactive Tachyon Particles 2",
    effect:
      'When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.',
    family: PERK_FAMILY.DILATION,
    prerequisites: ["TP1"]
  }),
  TP3: new Perk({
    id: "TP3",
    name: "Retroactive Tachyon Particles 3",
    effect:
      'When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.5.',
    family: PERK_FAMILY.DILATION,
    prerequisites: ["TP2"]
  }),
  TP4: new Perk({
    id: "TP4",
    name: "Retroactive Tachyon Particles 4",
    effect:
      'When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 3.',
    family: PERK_FAMILY.DILATION,
    prerequisites: ["TP3"],
    ap: 10
  }),
  DU1: new Perk({
    id: "DU1",
    name: "Dilation Upgrades 1",
    effect: "After unlocking Dilation, automatically unlock the second row of Dilation Upgrades for free.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["DAU"]
  }),
  DU2: new Perk({
    id: "DU2",
    name: "Dilation Upgrades 2",
    effect: "After unlocking Dilation, automatically unlock the third row of Dilation Upgrades for free.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["DU1"]
  }),
  ATT: new Perk({
    id: "ATT",
    name: '"Automatic Time Theorems" Automation',
    effect: "Automatically purchase the passive Time Theorem generation Dilation Upgrade once you can afford it.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["DU2"],
    ap: 5
  }),
  ATD: new Perk({
    id: "ATD",
    name: "Automatic Time Dimensions Unlock",
    effect: "Auto-unlock Time Dimensions 5-8 once you can afford them.",
    family: PERK_FAMILY.DILATION,
    prerequisites: ["ATT"],
    ap: 5
  }),
  // Reality
  START: new Perk({
    id: "START",
    name: "Starting Perk",
    effect:
      "Remove the Achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.",
    family: PERK_FAMILY.REALITY
  }),
  REAL: new Perk({
    id: "REAL",
    name: "Automatic Reality Study Purchasing",
    effect: "Auto-unlocks Reality once you have 1e4000 Eternity Points and have unlocked Time Dimension 8",
    family: PERK_FAMILY.REALITY,
    prerequisites: ["ATD"],
    ap: 10
  })
};

export function perksFromFamily(family: PERK_FAMILY): Array<Perk> {
  return Object.values(perks).filter(perk => perk.family === family);
}
