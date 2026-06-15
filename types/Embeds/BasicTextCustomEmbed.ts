import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder, type EmbedField } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface BasicTextCustomEmbedProps {
  interaction: CommandInteraction;
  title: string;
  field: EmbedField;
  colour?: Colours;
  thumbnailPath?: string;
}

export class BasicTextCustomEmbed extends CustomEmbed {
  title: string;
  field: EmbedField;
  colour: Colours;
  thumbnailPath: string;

  constructor({ interaction, title, field, colour, thumbnailPath }: BasicTextCustomEmbedProps) {
    super({ interaction });
    this.title = title;
    this.field = field;
    this.colour = colour ?? Colours.Antimatter;
    this.thumbnailPath = thumbnailPath ?? "images/misc/help.png";
  }

  public create(): EmbedBuilder {
    this.setTitle(this.title).setColour(this.colour);

    this.addField(this.field);

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(this.thumbnailPath);
    this.embed.setThumbnail(`attachment://${this.thumbnailName}`);
    return image;
  }

  private get thumbnailName() {
    const pathParts = this.thumbnailPath.split("/");
    return pathParts[pathParts.length - 1];
  }
}
