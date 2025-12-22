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