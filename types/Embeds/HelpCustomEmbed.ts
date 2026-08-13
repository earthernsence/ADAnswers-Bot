import {
  AttachmentBuilder,
  type EmbedBuilder,
  type EmbedField,
  inlineCode,
  type RepliableInteraction,
  time,
  TimestampStyles,
  underline
} from "discord.js";
import type { ADABClient } from "../ADABClient";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface HelpCustomEmbedProps {
  interaction: RepliableInteraction;
  pageTitle: string;
}

export class HelpCustomEmbed extends CustomEmbed {
  static readonly possiblePages: ReadonlyArray<string> = [
    "infinity",
    "break_infinity",
    "eternity",
    "eternity_challenges_dilation",
    "reality",
    "misc_game_info",
    "misc_meta_game_info",
    "misc_bot_server_info",
    "misc_misc_info",
    // Secret page with secret commands
    "very_misc"
  ];

  pageTitle: string;
  client: ADABClient;

  constructor({ interaction, pageTitle }: HelpCustomEmbedProps) {
    super({ interaction });
    this.client = this.interaction.client as ADABClient;
    this.pageTitle = pageTitle;
  }

  get pageNumber(): number {
    return HelpCustomEmbed.possiblePages.indexOf(this.pageTitle) + 1;
  }

  public override create(): EmbedBuilder {
    const commands = this.client.commands.size;

    this.setTitle(`ADAB Help (page ${this.pageNumber}/${HelpCustomEmbed.possiblePages.length - 1})`)
      .setDescription(
        `A comprehensive list of ADAB's ${commands} commands!\nUpdated \
        ${time(Math.floor(Date.now() / 1000), TimestampStyles.RelativeTime)}`
      )
      .setColour(Colours.Companion);

    this.setFields(this.getFields());

    return this.finalise().setFooter({
      text: `This superfluous bot was created by @earth1337_\nBot version: ${this.client.version}`,
      iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png`
    });
  }

  public override getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/misc/help.png`);
    this.embed.setThumbnail("attachment://help.png");
    return image;
  }

  private getFields(): Array<EmbedField> {
    return (
      this.client.commandsByPage.get(this.pageTitle)?.map(command => {
        const commandOptions = command.data.options
          .map(option => option.toJSON())
          .map(option => `${inlineCode(option.name)} - ${option.description}`)
          .join("\n");

        const commandAliases = command.aliases.map(alias => inlineCode(alias)).join(", ");

        return {
          name: command.data.name,
          value: `${command.data.description}${command.aliases.length > 0 ? `\n${underline("Aliases")}: ${commandAliases}` : ""}${command.data.options.length > 0 ? `\n${underline("Options")}:\n${commandOptions}` : ""}`,
          inline: false
        };
      }) ?? []
    );
  }
}
