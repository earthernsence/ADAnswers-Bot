import type { CommandInteraction, EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { ImaginaryUpgrade } from "@/types/game_data/upgrades/ImaginaryUpgrade";
import { formatDecimal } from "@/utils/utils_formatting";
import { quantify } from "@/utils/utils_commands";

interface ImaginaryUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: ImaginaryUpgrade
}

export class ImaginaryUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: ImaginaryUpgrade;

  constructor({ interaction, upgrade }: ImaginaryUpgradeCustomEmbedProps) {
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
        value: `${quantify("Imaginary Machine", this.upgrade.cost)}\
${this.upgrade.increment ? `, increasing by a factor of ${formatDecimal(this.upgrade.increment)} on each purchase` : ""}`,
        inline: false
      }
    ];

    if (this.upgrade.requirement) fields.push({
      name: "Unlock requirement",
      value: this.upgrade.requirement,
      inline: false
    });

    if (this.upgrade.formula) fields.push({
      name: "Effect formula",
      value: this.upgrade.formula,
      inline: false
    });

    if (this.upgrade.strategy) fields.push({
      name: "Strategy",
      value: this.upgrade.strategy,
      inline: false
    });

    return fields;
  }
}