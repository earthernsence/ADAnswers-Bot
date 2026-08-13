import { type ChatInputCommandInteraction, EmbedBuilder, type EmbedField } from "discord.js";
import { BaseUpgradeCustomEmbed } from "./BaseUpgradeCustomEmbed";
import type { ChargedInfinityUpgrade } from "@/types/game_data/upgrades/ChargedInfinityUpgrade";
import { Colours } from "@/utils/utils_colours";

interface ChargedInfinityUpgradeCustomEmbedProps {
  interaction: ChatInputCommandInteraction;
  upgrade: ChargedInfinityUpgrade;
}

export class ChargedInfinityUpgradeCustomEmbed extends BaseUpgradeCustomEmbed {
  declare upgrade: ChargedInfinityUpgrade;

  constructor({ interaction, upgrade }: ChargedInfinityUpgradeCustomEmbedProps) {
    super({ interaction, upgrade, colour: Colours.Celestial });
  }

  public override create(): EmbedBuilder {
    return super.create().setTitle(`${this.upgrade.name} (Charged)`);
  }

  protected override getFields(): Array<EmbedField> {
    return [
      {
        name: "Effect",
        value: this.upgrade.charged.effect,
        inline: false
      },
      {
        name: "Formula",
        value: this.upgrade.charged.formula,
        inline: false
      }
    ];
  }
}
