import { PERK_FAMILY } from "@/types/game_data/Perks";
import Perk from "./Perk";

export const perks: Record<string, Perk> = {
  // Achievement
  "ACH1": new Perk({
    id: "ACH1",
    name: "Achievement Timer Reduction 1",
    effect: "Reduce the Achievement timer to 20 minutes per Achievement (10 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["START"],
    ap: 5
  }),
  "ACH2": new Perk({
    id: "ACH2",
    name: "Achievement Timer Reduction 2",
    effect: "Reduce the Achievement timer to 12 minutes per Achievement (8 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH1"],
  }),
  "ACH3": new Perk({
    id: "ACH3",
    name: "Achievement Timer Reduction 3",
    effect: "Reduce the Achievement timer to 6 minutes per Achievement (6 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH2"],
  }),
  "ACH4": new Perk({
    id: "ACH4",
    name: "Achievement Timer Reduction 4",
    effect: "Reduce the Achievement timer to 2 minutes per Achievement (4 mintue decrease).",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH3"],
  }),
  "ACHNR": new Perk({
    id: "ACHNR",
    name: "Achievement No Reset",
    effect: "Reality no longer resets your Achievements.",
    family: PERK_FAMILY.ACHIEVEMENT,
    prerequisites: ["ACH4"],
    ap: 10
  }),
  // Antimatter
  "SAM": new Perk({
    id: "SAM",
    name: "Starting Antimatter",
    effect: "Start every reset with 5e130 antimatter.",
    family: PERK_FAMILY.ANTIMATTER,
    prerequisites: ["START"]
  }),
  "ANR": new Perk({
    id: "ANR",
    name: "Antimatter No Reset",
    effect: "Dimension Boosts and Antimatter Galaxies no longer reset Antimatter, Antimatter Dimensions, Tickspeed, or Dimensional Sacrifice.",
    family: PERK_FAMILY.ANTIMATTER,
    prerequisites: ["SAM"]
  }),
  // Automation
  "TTS": new Perk({
    id: "TTS",
    name: "Time Theorem Autobuyer (Single)",
    effect: "Unlock a Time Theorem Autobuyer which buys single Time Theorems every tick.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["ACT"],
    ap: 5
  }),
  "TTF": new Perk({
    id: "TTF",
    name: "Free Time Theorems",
    effect: "Purchasing Time Theorems no longer spends your Antimatter, Infinity Points, or Eternity Points.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["TTS"]
  }),
  "TTM": new Perk({
    id: "TTM",
    name: "Time Theorem Autobuyer (Max)",
    effect: "Upgrade the Time Theorem Autobuyer to buy max Time Theorems.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["ACT"],
    ap: 5
  }),
  "PEC1": new Perk({
    id: "PEC1",
    name: "Passive Eternity Challenges 1",
    effect: "Auto-complete one Eternity Challenge every 60 real-time minutes. ECs will be complete sequentially, requiring all previous ECs to be fully completed before progressing to the next EC.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["IDL"],
    ap: 5
  }),
  "PEC2": new Perk({
    id: "PEC2",
    name: "Passive Eternity Challenges 2",
    effect: "Auto-complete one Eternity Challenge every 40 real-time minutes.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["PEC1"]
  }),
  "PEC3": new Perk({
    id: "PEC3",
    name: "Passive Eternity Challenges 3",
    effect: "Auto-complete one Eternity Challenge every 20 real-time minutes.",
    family: PERK_FAMILY.AUTOMATION,
    prerequisites: ["PEC2"],
    ap: 10
  }),
  // Infinity
  // Eternity
  // Dilation
  // Reality
  "START": new Perk({
    id: "START",
    name: "Starting Perk",
    effect: "Remove the Achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.",
    family: PERK_FAMILY.REALITY
  })
};

export function perksFromFamily(family: PERK_FAMILY): Array<Perk> {
  return Object.values(perks).filter(perk => perk.family === family);
}