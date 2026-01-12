import type { PERK_FAMILY, Perk as TPerk } from "@/types/game_data/Perks";
import { underline } from "discord.js";

interface PerkProps {
  id: string;
  name: string;
  effect: string;
  family: PERK_FAMILY;
  prerequisites?: Array<string>;
  ap?: number;
}

export default class Perk implements TPerk {
  id: string;
  name: string;
  effect: string;
  family: PERK_FAMILY;
  prerequisites: Array<string>;
  ap: number;

  constructor({ id, name, effect, family, prerequisites, ap }: PerkProps) {
    this.id = id;
    this.name = name;
    this.effect = effect;
    this.family = family;
    this.prerequisites = prerequisites ?? [];
    this.ap = ap ?? 0;
  }

  public get formattedPrerequisites(): string {
    return this.prerequisites ? this.prerequisites.join(` ${underline("or")} `) : "";
  }
}
