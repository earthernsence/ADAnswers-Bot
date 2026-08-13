import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder
} from "discord.js";
import { type CollectorComponentInteraction, CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { buildCustomId } from "@/utils/utils_commands";
import { MetaCustomEmbed } from "@/types/Embeds/MetaCustomEmbed";
import { wrappingArrayNeighbor } from "@/utils/utils_component_navigation";

// oxlint-disable-next-line no-unused-vars
const PAGES: ReadonlyArray<number> = Array.from({ length: MetaCustomEmbed.MAX_PAGES }, (_value, index) => index + 1);

/** `/meta` - hard-coded, fixed-length pages about the bot itself. Previous/Next only, no lookup. */
class MetaCommand extends CollectorEmbedCommand<number> {
  constructor() {
    super({
      data: new SlashCommandBuilder().setName("meta").setDescription("Provides some information about the bot."),
      prefix: "meta"
    });
  }

  protected findInitial(): number | undefined {
    return PAGES[0];
  }

  protected notFoundText(): string {
    // Meta always has a first page; this only exists to satisfy the base class.
    return "There was an issue loading the meta page.";
  }

  protected encodeIdentifier(item: number): string {
    return String(item);
  }

  protected decodeIdentifier(encoded: string): number | undefined {
    const page = Number(encoded);
    return PAGES.includes(page) ? page : undefined;
  }

  protected buildEmbed(interaction: RepliableInteraction, item: number): MetaCustomEmbed {
    return new MetaCustomEmbed({ interaction, pageNumber: item });
  }

  protected buildComponents(item: number, userId: string): Array<ActionRowBuilder<ButtonBuilder>> {
    const encoded = this.encodeIdentifier(item);

    return [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(buildCustomId(this.prefix, "prev", userId, encoded))
          .setEmoji({ name: "◀️" })
          .setLabel("Previous page")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(buildCustomId(this.prefix, "next", userId, encoded))
          .setEmoji({ name: "▶️" })
          .setLabel("Next page")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("GitHub repository")
          .setURL("https://github.com/earthernsence/ADAnswers-Bot")
      )
    ];
  }

  protected async handleAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: number
  ): Promise<number | null> {
    if (action === "prev" || action === "next") {
      return wrappingArrayNeighbor(PAGES, item, action === "next");
    }

    await interaction.reply({ content: "That button doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
    return null;
  }
}

export default new MetaCommand();
