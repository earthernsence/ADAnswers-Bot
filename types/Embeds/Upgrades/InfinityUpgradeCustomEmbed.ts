import { type CommandInteraction, type EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { InfinityUpgrade } from "../../game_data/upgrades/InfinityUpgrade";
import { quantify } from "@/utils/utils_commands";

interface InfinityUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: InfinityUpgrade
}

export class InfinityUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: InfinityUpgrade;

  constructor({ interaction, upgrade }: InfinityUpgradeCustomEmbedProps) {
    super({ interaction, upgrade });
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
        value: `${quantify("Infinity Point", this.upgrade.cost)}`,
        inline: false
      }
    ];

    if (this.upgrade.requirement) fields.push({
      name: "Purchase requirement",
      value: this.upgrade.requirement,
      inline: false
    });

    if (this.upgrade.formula) fields.push({
      name: "Effect formula",
      value: this.upgrade.formula,
      inline: false
    });

    return fields;
  }
}