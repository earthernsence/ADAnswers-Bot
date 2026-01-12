import {
  AttachmentBuilder,
  type ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
  type EmbedField,
  User
} from "discord.js";
import { authorTitle } from "@/utils/utils_commands";
import { NotImplementedError } from "../NotImplementedError";

const FOOTER_IMAGE_URL = `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png`;

interface CustomEmbedProps {
  interaction: CommandInteraction;
}

export class CustomEmbed {
  embed: EmbedBuilder;
  interaction: CommandInteraction;
  user: User;

  constructor({ interaction }: CustomEmbedProps) {
    this.embed = new EmbedBuilder();
    this.interaction = interaction;
    this.user = interaction.member === null ? interaction.user : (interaction.member.user as User);
  }

  public finalise(): EmbedBuilder {
    return this.embed
      .setAuthor({ name: authorTitle(this.interaction), iconURL: this.user.displayAvatarURL() })
      .setTimestamp()
      .setFooter({ text: this.getFooterText(), iconURL: FOOTER_IMAGE_URL });
  }

  public setFields(fields: Array<EmbedField>): CustomEmbed {
    this.embed.setFields(fields);
    return this;
  }

  public addField(field: EmbedField): CustomEmbed {
    this.embed.addFields(field);
    return this;
  }

  public setTitle(title: string): CustomEmbed {
    this.embed.setTitle(title);
    return this;
  }

  public setColour(colour: ColorResolvable): CustomEmbed {
    this.embed.setColor(colour);
    return this;
  }

  public setDescription(value: string): CustomEmbed {
    this.embed.setDescription(value);
    return this;
  }

  public setImage(imageURL: string): CustomEmbed {
    this.embed.setImage(imageURL);
    return this;
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    throw new NotImplementedError();
  }

  // eslint-disable-next-line no-unused-vars
  public create(_strategyOnly: boolean = false): EmbedBuilder {
    throw new NotImplementedError();
  }

  private getFooterText(): string {
    return Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by @mrkrutaman`;
  }
}
