import type { CommandInteraction, EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { DilationUpgrade } from "@/types/game_data/upgrades/DilationUpgrade";
import { formatDecimal } from "@/utils/utils_formatting";

interface DilationUpgradeCustomEmbedProps {
  interaction: CommandInteraction;
  upgrade: DilationUpgrade;
}

export class DilationUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: DilationUpgrade;

  constructor({ interaction, upgrade }: DilationUpgradeCustomEmbedProps) {
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
        value: `${formatDecimal(this.upgrade.cost)} Dilated Time\
  ${this.upgrade.increment ? `, increasing by a factor of ${formatDecimal(this.upgrade.increment)} on each purchase` : ""}`,
        inline: false
      }
    ];

    if (this.upgrade.formula)
      fields.push({
        name: "Effect formula",
        value: this.upgrade.formula,
        inline: false
      });

    return fields;
  }
}
