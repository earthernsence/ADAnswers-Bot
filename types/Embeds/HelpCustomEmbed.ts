import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  type CommandInteraction,
  type EmbedBuilder,
  type EmbedField,
  MessageComponentInteraction,
  StringSelectMenuBuilder,
  inlineCode,
  underline,
} from "discord.js";
import type { ADABClient } from "../ADABClient";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";

interface HelpCustomEmbedProps {
  interaction: CommandInteraction,
}

export class HelpCustomEmbed extends CustomEmbed {
  pageNumber: number = 1;
  pageTitle: string = "infinity";
  client: ADABClient;
  expirationTimestamp: number = Math.floor((Date.now() + 60000) / 1000);
  possiblePages: Array<string> = [
    "infinity",
    "break_infinity",
    "eternity",
    "eternity_challenges_dilation",
    "reality",
    "misc_game_info",
    "misc_meta_game_info",
    "misc_bot_server_info",
    "misc_misc_info",
    "very_misc"
  ];

  constructor({ interaction }: HelpCustomEmbedProps) {
    super({ interaction });
    this.client = this.interaction.client as ADABClient;
  }

  public create(): EmbedBuilder {
    const commands = this.client.commands.size;

    this.setTitle(`ADAB Help (page ${this.pageNumber}/${this.possiblePages.length - 1})`)
      .setDescription(`A comprehensive list of ADAB's ${commands} commands!`)
      .setColour(Colours.Companion);

    this.setFields(this.getFields());

    return this.finalise().setFooter({
      text: `This superfluous bot was created by @earth1337_\nBot version: ${this.client.version}`,
      iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png`
    });
  }

  public get buttons(): ActionRowBuilder<ButtonBuilder> {
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`help_button_prev_${this.expirationTimestamp}`)
          .setEmoji({ name: "◀️" })
          .setLabel("Previous page")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`help_button_next_${this.expirationTimestamp}`)
          .setEmoji({ name: "▶️" })
          .setLabel("Next page")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("GitHub repository")
          .setURL("https://github.com/earthernsence/ADAnswers-Bot")
      );
  }

  public get selectMenu(): ActionRowBuilder<StringSelectMenuBuilder> {
    return new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`help_select_menu_${this.expirationTimestamp}`)
          .setOptions([
            {
              label: "Page 1: Pre-Break Infinity",
              value: "infinity",
              description: "Pre-Break Infinity commands"
            },
            {
              label: "Page 2: Post-Break Infinity Era",
              value: "break_infinity",
              description: "Post-Break Infinity Era commands"
            },
            {
              label: "Page 3: Eternity Era",
              value: "eternity",
              description: "Eternity Era commands"
            },
            {
              label: "Page 4: ECs and Dilation",
              value: "eternity_challenges_dilation",
              description: "ECs and Dilation commands"
            },
            {
              label: "Page 5: Reality Era",
              value: "reality",
              description: "Reality Era commands"
            },
            {
              label: "Page 6: Miscellaneous game commands",
              value: "misc_game_info",
              description: "Miscellaneous game commands"
            },
            {
              label: "Page 7: Miscellaneous meta-game commands",
              value: "misc_meta_game_info",
              description: "Miscellaneous meta-game commands"
            },
            {
              label: "Page 8: Miscellaneous bot/server commands",
              value: "misc_bot_server_info",
              description: "Miscellaneous game commands"
            },
            {
              label: "Page 9: Miscellaneous miscellaneous commands",
              value: "misc_misc_info",
              description: "Miscellaneous miscellaneous commands"
            },
          ])
      );
  }

  public filter(i: MessageComponentInteraction): boolean {
    return i.customId.endsWith(String(this.expirationTimestamp));
  }

  public getAndSetThumbnail(): AttachmentBuilder {
    const image: AttachmentBuilder = new AttachmentBuilder(`images/misc/help.png`);
    this.embed.setThumbnail("attachment://help.png");
    return image;
  }

  public nextPage(forward: boolean): EmbedBuilder {
    let index: number = this.possiblePages.indexOf(this.pageTitle);

    if (forward) index++;
    else index--;

    index = (index + this.possiblePages.length) % this.possiblePages.length;

    this.pageNumber = index + 1;
    this.pageTitle = this.possiblePages[index];

    return this.create();
  }

  public selectPage(value: string): EmbedBuilder {
    this.pageTitle = value;
    this.pageNumber = this.possiblePages.indexOf(this.pageTitle) + 1;

    return this.create();
  }

  private getFields(): Array<EmbedField> {
    return this.client.commandsByPage.get(this.pageTitle)?.map(command => {
      const commandOptions = command.data.options
        .map(option => option.toJSON())
        .map(option => `${inlineCode(option.name)} - ${option.description}`)
        .join("\n");

      const commandAliases = command.aliases
        .map(alias => inlineCode(alias))
        .join(", ");

      return {
        name: command.data.name,
        value: `${command.data.description}${command.aliases.length > 0 ? `\n${underline("Aliases")}: ${commandAliases}` : ""}${command.data.options.length > 0 ? `\n${underline("Options")}:\n${commandOptions}` : ""}`,
        inline: false,
      };
    }) ?? [];
  }
}