import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface BasicTextCustomEmbedProps {
  interaction: CommandInteraction,
  title: string,
  field: EmbedField,
  colour?: Colours
}

export class BasicTextCustomEmbed extends CustomEmbed {
  title: string;
  field: EmbedField;
  colour: Colours;

  constructor({ interaction, title, field, colour }: BasicTextCustomEmbedProps) {
    super({ interaction });
    this.title = title;
    this.field = field;
    this.colour = colour ?? Colours.Antimatter;
  }

  public create(): EmbedBuilder {
    this.setTitle(this.title)
      .setColour(this.colour);

    this.addField(this.field);

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/misc/help.png");
    this.embed.setThumbnail(`attachment://help.png`);
    return image;
  }
}