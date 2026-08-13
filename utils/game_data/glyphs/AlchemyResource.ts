import { bold } from "discord.js";
import { Symbols } from "@/utils/utils_symbols";
import type { AlchemyResource as TAlchemyResource } from "@/types/game_data/glyphs/AlchemyResource";

interface AlchemyResourceProps {
  name: string;
  unlocksAt: number;
  effect: string;
  formula: string;
  tier: number;
  reagents?: Array<[string, number]>;
}

export class AlchemyResource implements TAlchemyResource {
  name: string;
  unlocksAt: number;
  effect: string;
  formula: string;
  tier: number;
  reagents: Array<[string, number]>;

  constructor({ name, unlocksAt, effect, formula, tier, reagents }: AlchemyResourceProps) {
    this.name = name;
    this.unlocksAt = unlocksAt;
    this.effect = effect;
    this.formula = formula;
    this.tier = tier;
    this.reagents = reagents ?? [];
  }

  get symbol(): string {
    return Symbols[this.name as keyof typeof Symbols];
  }

  get prettyName(): string {
    return `${bold(`${this.symbol} ${this.name}`)}`;
  }

  public formatReaction(): string {
    if (this.reagents.length === 0) return "No reaction to create this resource; refine Glyphs to obtain resource.";
    const formattedReagents = this.reagents.map(value => `${value[1]} ${value[0]}`);
    return `${formattedReagents.join(" + ")} ➜ 1 ${this.name}`;
  }
}
