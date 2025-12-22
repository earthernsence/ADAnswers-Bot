import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField, bold } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import type Perk from "@/utils/game_data/Perk";
import { capitalise } from "@/utils/utils_formatting";
import { pluralise } from "@/utils/utils_commands";

interface PerkCustomEmbedProps {
  interaction: CommandInteraction,
  perk: Perk
}

export class PerkCustomEmbed extends CustomEmbed {
  perk: Perk;

  constructor({ interaction, perk }: PerkCustomEmbedProps) {
    super({ interaction });
    this.perk = perk;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.perk.name)
      .setColour(Colours[capitalise(this.perk.family) as keyof typeof Colours]);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const file = `${this.perk.family}${this.perk.ap ? "_ap" : ""}`;
    const image: AttachmentBuilder = new AttachmentBuilder(`images/perks/${file}.png`);
    this.embed.setThumbnail(`attachment://${file}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [
      {
        name: "Effect",
        value: this.perk.effect,
        inline: false
      }
    ];

    if (this.perk.prerequisites.length > 0) fields.push({
      name: pluralise("Prerequisite", this.perk.prerequisites.length),
      value: this.perk.formattedPrerequisites,
      inline: false
    });

    if (this.perk.ap > 0) fields.push({
      name: "Automator Points",
      value: `This Perk grants ${bold(`${this.perk.ap} Automator Points`)} on purchase.\n(Reminder: AP are used to unlock the Automator; after the Automator is unlocked, they are useless.)`,
      inline: false
    });

    return fields;
  }
}