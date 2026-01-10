import { AttachmentBuilder, type CommandInteraction, EmbedBuilder, type EmbedField, TimestampStyles, bold, time } from "discord.js";
import type { AlchemyResource } from "@/utils/game_data/glyphs/AlchemyResource";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "../CustomEmbed";
import { alchemyResources } from "@/utils/game_data/glyphs/alchemy";
import { enumerate } from "@/utils/utils_formatting";
import { quantify } from "@/utils/utils_commands";

interface AlchemyResourceCustomEmbedProps {
  interaction: CommandInteraction,
  resource: AlchemyResource,
  expirationTimestamp: number,
}

export class AlchemyResourceCustomEmbed extends CustomEmbed {
  resource: AlchemyResource;
  expirationTimestamp: number;

  constructor({ interaction, resource, expirationTimestamp }: AlchemyResourceCustomEmbedProps) {
    super({ interaction });
    this.resource = resource;
    this.expirationTimestamp = expirationTimestamp;
  }

  private get disabled(): boolean {
    return Math.floor(Date.now() / 1000) >= this.expirationTimestamp;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.resource.prettyName)
      .setDescription(`Expire${this.disabled ? "d" : "s"} ${time(this.expirationTimestamp, TimestampStyles.RelativeTime)} on ${time(this.expirationTimestamp, TimestampStyles.FullDateShortTime)}`)
      .setColour(Colours.Reality);

    this.setFields(this.getFields());

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/alchemy/${this.resource.name.toLowerCase()}.png`);
    this.embed.setThumbnail(`attachment://${this.resource.name.toLowerCase()}.png`);
    return image;
  }

  protected getFields(): Array<EmbedField> {
    const fields: Array<EmbedField> = [
      {
        name: "Unlocks at...",
        value: `Ra-Effarig Level ${bold(this.resource.unlocksAt.toString())}\nTier ${this.resource.tier} Alchemy Resource`,
        inline: false
      },
      {
        name: "Effect",
        value: this.resource.effect,
        inline: false
      },
      {
        name: "Effect formula",
        value: this.resource.formula,
        inline: false
      },
      {
        name: "Used for...",
        value: this.findUses(),
        inline: false
      }
    ];

    if (this.resource.reagents) {
      fields.push(
        {
          name: "Reaction for creation",
          value: this.resource.formatReaction(),
          inline: false
        },
        {
          name: "Reagent information",
          value: "You can use the buttons below to go to the respective reagent's information.",
          inline: false
        }
      );
    }

    return fields;
  }

  private findUses(): string {
    // Reality is the only resource that isn't used as a reagent anywhere, so I feel okay
    // about hardcoding this in.
    if (this.resource.name === "Reality") return `${this.resource.prettyName} is not used in any reactions as a reagent.`;

    const resources: Array<AlchemyResource> = [];

    for (const other of Object.values(alchemyResources)) {
      if (other.reagents.length === 0) continue;
      if (other.reagents.some(resource => resource[0] === this.resource.name)) resources.push(other);
    }

    const usedIn = enumerate(resources.map(res => res.prettyName));

    return `${this.resource.prettyName} is used in ${bold(quantify("reaction", resources.length))} as a reagent.\nUsed in ${usedIn}.`;
  }
}