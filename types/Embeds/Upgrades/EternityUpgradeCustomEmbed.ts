import type { CommandInteraction, EmbedBuilder, EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { EternityUpgrade } from "@/types/game_data/upgrades/EternityUpgrade";
import { quantify } from "@/utils/utils_commands";

interface EternityUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: EternityUpgrade
}

export class EternityUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: EternityUpgrade;

  constructor({ interaction, upgrade }: EternityUpgradeCustomEmbedProps) {
    super({ interaction, upgrade });
  }

  public create(): EmbedBuilder {
    return super.create().setTitle(`${this.upgrade.name} (EU${this.upgrade.id})`);
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
        value: `${quantify("Eternity Point", this.upgrade.cost)}`,
        inline: false
      },
    ];

    if (this.upgrade.formula) fields.push({
      name: "Effect formula",
      value: this.upgrade.formula,
      inline: false
    });

    if (this.upgrade.graph) {
      fields.push({
        name: "Effect formula graph",
        value: " ",
        inline: false
      });

      this.setImage(this.upgrade.graph);
    }

    return fields;
  }
}