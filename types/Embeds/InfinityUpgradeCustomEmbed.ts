import { AttachmentBuilder, type CommandInteraction, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import type { EmbedBuilder } from "@discordjs/builders";
import type { InfinityUpgrade } from "../game_data/upgrades/InfinityUpgrade";
import { quantify } from "@/utils/utils_commands";

interface InfinityUpgradeCustomEmbedProps {
  interaction: CommandInteraction,
  upgrade: InfinityUpgrade
}

export class InfinityUpgradeCustomEmbed extends CustomEmbed {
  upgrade: InfinityUpgrade;

  constructor({ interaction, upgrade }: InfinityUpgradeCustomEmbedProps) {
    super({ interaction });
    this.upgrade = upgrade;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.upgrade.name)
      .setColour(Colours.Infinity);

    this.setFields(this.getFields());

    return this.finalise();
  }

  private getFields(): Array<EmbedField> {
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
      },
      {
        name: "Requirement",
        value: this.upgrade.requirement,
        inline: false
      }
    ];

    if (this.upgrade.formula) fields.push({
      name: "Effect formula",
      value: this.upgrade.formula,
      inline: false
    });

    return fields;
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/upgrades/infinity.png`);
    this.embed.setThumbnail("attachment://infinity.png");
    return image;
  }
}