import {
  AttachmentBuilder,
  type EmbedBuilder,
  type EmbedField,
  type RepliableInteraction,
  time,
  TimestampStyles
} from "discord.js";
import type { ADABClient } from "../ADABClient";
import { Colours } from "@/utils/utils_colours";
import { CustomEmbed } from "./CustomEmbed";
import { link } from "@/utils/utils_commands";
import ms from "ms";

interface MetaCustomEmbedProps {
  interaction: RepliableInteraction;
  pageNumber: number;
}

export class MetaCustomEmbed extends CustomEmbed {
  static readonly MAX_PAGES = 2;

  pageNumber: number;
  client: ADABClient;

  constructor({ interaction, pageNumber }: MetaCustomEmbedProps) {
    super({ interaction });
    this.client = this.interaction.client as ADABClient;
    this.pageNumber = pageNumber;
  }

  public override create(): EmbedBuilder {
    this.setTitle(`ADAB Meta (page ${this.pageNumber}/${MetaCustomEmbed.MAX_PAGES})`)
      .setDescription(
        `Some various internal information about ADAB.\nUpdated \
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
          value: `If, for whatever reason, you wish to invite me to your server, go to ${link("this link", "https://discord.com/oauth2/authorize?client_id=830197123378053172&permissions=277294140416&integration_type=0&scope=bot+applications.commands")}.`,
          inline: true
        },
        {
          name: "Contributing",
          value: `If you are interested in contributing to the bot, check out ${link("this full-length contributing guide", "https://github.com/earthernsence/ADAnswers-Bot/blob/main/contributing.md")} on GitHub!`,
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
