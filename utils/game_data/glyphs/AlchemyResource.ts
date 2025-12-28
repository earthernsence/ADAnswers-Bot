import { ActionRowBuilder, ButtonBuilder, ButtonStyle, bold } from "discord.js";
import { Symbols } from "@/utils/utils_symbols";
import type { AlchemyResource as TAlchemyResource } from "@/types/game_data/glyphs/AlchemyResource";

interface AlchemyResourceProps {
  name: string,
  unlocksAt: number,
  effect: string,
  formula: string,
  tier: number,
  reagents?: Array<[string, number]>
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

  public createReagentButtons(expirationTimestamp: number): Array<ActionRowBuilder<ButtonBuilder>> {
    if (this.reagents.length === 0) return [];

    if (this.reagents.length > 5) {
      const half = Math.ceil(this.reagents.length / 2);
      const firstRow = this.reagents.slice(0, half);
      const secondRow = this.reagents.slice(half);

      const firstRowButtons = new ActionRowBuilder<ButtonBuilder>();
      const secondRowButtons = new ActionRowBuilder<ButtonBuilder>();

      for (const [resource] of firstRow) {
        firstRowButtons.addComponents(this.makeButton(resource, expirationTimestamp));
      }

      for (const [resource] of secondRow) {
        secondRowButtons.addComponents(this.makeButton(resource, expirationTimestamp));
      }

      return [firstRowButtons, secondRowButtons];
    }

    const buttons = new ActionRowBuilder<ButtonBuilder>();

    for (const [resource] of this.reagents) {
      buttons.addComponents(this.makeButton(resource, expirationTimestamp));
    }

    return [buttons];
  }

  private makeButton(resource: string, expirationTimestamp: number): ButtonBuilder {
    const disabled = Math.floor(Date.now() / 1000) >= expirationTimestamp;
    return new ButtonBuilder()
      .setLabel(`${Symbols[resource as keyof typeof Symbols]} ${resource}`)
      .setCustomId(`alchemy_button_${resource}_${expirationTimestamp}`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(disabled);
  }
}