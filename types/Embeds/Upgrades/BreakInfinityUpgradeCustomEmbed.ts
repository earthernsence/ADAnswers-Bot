import type { CommandInteraction, EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { BreakInfinityUpgrade } from "@/types/game_data/upgrades/BreakInfinityUpgrade";
import { Colours } from "@/utils/utils_colours";
import { quantify } from "@/utils/utils_commands";

interface BreakInfinityUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: BreakInfinityUpgrade
}

export class BreakInfinityUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: BreakInfinityUpgrade;

  constructor({ interaction, upgrade }: BreakInfinityUpgradeCustomEmbedProps) {
    super({ interaction, upgrade, colour: Colours.Infinity });
  }

  protected getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [
      {
        name: "Effect",
        value: this.upgrade.effect,
        inline: false
      },
      {
        name: "Cost",
        value: `${quantify("Infinity Point", this.upgrade.cost)}\
${this.upgrade.increment ? `, increasing by a factor of ${this.upgrade.increment} on each purchase` : ""}`,
        inline: false
      },
    ];

    if (this.upgrade.formula) fields.push({
      name: "Effect formula",
      value: this.upgrade.formula,
      inline: false
    });

    return fields;
  }
}