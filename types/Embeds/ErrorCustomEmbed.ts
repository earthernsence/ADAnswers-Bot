import { AttachmentBuilder, type CommandInteraction, type EmbedBuilder } from "discord.js";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface ErrorCustomEmbedProps {
  interaction: CommandInteraction;
  text: string;
}

export class ErrorCustomEmbed extends CustomEmbed {
  text: string;

  constructor({ interaction, text }: ErrorCustomEmbedProps) {
    super({ interaction });
    this.text = text;
  }

  public create(): EmbedBuilder {
    this.setTitle("Error!").setColour(Colours.Forbidden);

    this.embed.setDescription("Please try again!");

    this.setFields([{ name: "Issue", value: this.text, inline: false }]);

    return this.finalise();
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder("images/misc/help.png");
    this.embed.setThumbnail(`attachment://help.png`);
    return image;
  }
}
