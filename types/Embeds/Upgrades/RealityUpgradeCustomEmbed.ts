import type { CommandInteraction, EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { RealityUpgrade } from "@/types/game_data/upgrades/RealityUpgrade";
import { quantify } from "@/utils/utils_commands";

interface RealityUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: RealityUpgrade
}

export class RealityUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: RealityUpgrade;

  constructor({ interaction, upgrade }: RealityUpgradeCustomEmbedProps) {
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
        value: `${quantify("Reality Machine", this.upgrade.cost)}\
${this.upgrade.increment ? `, increasing by a factor of ${this.upgrade.increment} on each purchase` : ""}`,
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

    return fields;
  }
}