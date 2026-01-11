import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, type CommandInteraction, type EmbedBuilder, type EmbedField, MessageComponentInteraction, time, TimestampStyles } from "discord.js";
import type { ADABClient } from "../ADABClient";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import { link } from "@/utils/utils_commands";
import ms from "ms";

interface MetaCustomEmbedProps {
  interaction: CommandInteraction,
}

export class MetaCustomEmbed extends CustomEmbed {
  pageNumber: number = 1;
  client: ADABClient;
  expirationTimestamp: number = Math.floor((Date.now() + 60000) / 1000);
  private MAX_PAGES: number = 2;

  constructor({ interaction }: MetaCustomEmbedProps) {
    super({ interaction });
    this.client = this.interaction.client as ADABClient;
  }

  get disabled(): boolean {
    return Math.floor(Date.now() / 1000) > this.expirationTimestamp;
  }

  public create(): EmbedBuilder {
    this.setTitle(`ADAB Meta (page ${this.pageNumber}/${this.MAX_PAGES})`)
      .setDescription(`Some various internal information about ADAB.
Expire${this.disabled ? "d" : "s"} ${time(this.expirationTimestamp, TimestampStyles.RelativeTime)} at ${time(this.expirationTimestamp, TimestampStyles.MediumTime)}`)
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
          .setCustomId(`meta_button_prev_${this.expirationTimestamp}`)
          .setEmoji({ name: "◀️" })
          .setLabel("Previous page")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(this.disabled),
        new ButtonBuilder()
          .setCustomId(`meta_button_next_${this.expirationTimestamp}`)
          .setEmoji({ name: "▶️" })
          .setLabel("Next page")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(this.disabled),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("GitHub repository")
          .setURL("https://github.com/earthernsence/ADAnswers-Bot")
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
    // Oxlint-disable-next-line no-unused-vars
    const possiblePages: Array<number> = Array(this.MAX_PAGES).fill(0).map((_value, index) => index + 1);
    let index = possiblePages.indexOf(this.pageNumber);

    if (forward) index++;
    else index--;

    index = (index + possiblePages.length) % possiblePages.length;

    this.pageNumber = possiblePages[index];

    return this.create();
  }

  private getFields(): Array<EmbedField> {
    if (this.pageNumber === 1) {
      return [
        {
          name: "Bot version",
          value: this.client.version,
          inline: true
        },
        {
          name: "Last restart",
          value: `${time(Math.floor(this.client.restartTime / 1000))} (uptime: ${ms(this.client.uptime ?? 0, { long: true })})`,
          inline: true
        },
        {
          name: "Status",
          value: `Running smoothly...\nPing: ${this.client.ws.ping}ms`,
          inline: true
        },
        {
          name: "Suggest",
          value: `Submit an issue on ${link("GitHub", "https://github.com/earthernsence/ADAnswers-Bot/issues")} to suggest more commands, or to report a bug with the bot!`,
          inline: true
        },
        {
          name: "Invite",
          value: `If, for whatever reason, you wish to invite me to your server, go to ${link("this link", "https://discord.com/oauth2/authorize?client_id=830197123378053172&permissions=2147560512&scope=applications.commands%20bot")}.`,
          inline: true
        },
        {
          name: "Contributing",
          value: `If you are interested in contributing to the bot, we're working on some guides for you! Check back later. You can visit the GitHub to get a sneak peek!`,
          inline: true
        }
      ];
    }

    // I'm leaving this set up for two pages -- I can't see meta ever needing more than that,
    // but the architecture is easy to set up.
    return [
      {
        name: "Total number of commands",
        value: `${this.client.commands.size}`,
        inline: true
      },
      {
        name: "Hello!",
        value: "We're still working on some things. Check back later to see if this has changed!",
        inline: true
      }
    ];
  }
}