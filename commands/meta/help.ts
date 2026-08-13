import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type MessageActionRowComponentBuilder,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder,
  StringSelectMenuBuilder
} from "discord.js";
import { type CollectorComponentInteraction, CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { buildCustomId } from "@/utils/utils_commands";
import { HelpCustomEmbed } from "@/types/Embeds/HelpCustomEmbed";
import { wrappingArrayNeighbor } from "@/utils/utils_component_navigation";

const SELECT_OPTIONS = [
  { label: "Page 1: Pre-Break Infinity", value: "infinity", description: "Pre-Break Infinity commands" },
  {
    label: "Page 2: Post-Break Infinity Era",
    value: "break_infinity",
    description: "Post-Break Infinity Era commands"
  },
  { label: "Page 3: Eternity Era", value: "eternity", description: "Eternity Era commands" },
  {
    label: "Page 4: ECs and Dilation",
    value: "eternity_challenges_dilation",
    description: "ECs and Dilation commands"
  },
  { label: "Page 5: Reality Era", value: "reality", description: "Reality Era commands" },
  { label: "Page 6: Miscellaneous game commands", value: "misc_game_info", description: "Miscellaneous game commands" },
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
  }
];

/** `/help` - a comprehensive, dynamically-built list of every registered command, paged by era. */
class HelpCommand extends CollectorEmbedCommand<string> {
  constructor() {
    super({
      data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays a help embed with all possible commands"),
      prefix: "help"
    });
  }

  protected findInitial(): string | undefined {
    return HelpCustomEmbed.possiblePages[0];
  }

  protected notFoundText(): string {
    // Help always has a first page; this only exists to satisfy the base class.
    return "There was an issue loading the help page.";
  }

  protected encodeIdentifier(item: string): string {
    return item;
  }

  protected decodeIdentifier(encoded: string): string | undefined {
    return HelpCustomEmbed.possiblePages.includes(encoded) ? encoded : undefined;
  }

  protected buildEmbed(interaction: RepliableInteraction, item: string): HelpCustomEmbed {
    return new HelpCustomEmbed({ interaction, pageTitle: item });
  }

  protected buildComponents(item: string, userId: string): Array<ActionRowBuilder<MessageActionRowComponentBuilder>> {
    const encoded = this.encodeIdentifier(item);

    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
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
    );

    const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(buildCustomId(this.prefix, "select", userId, encoded))
        .setOptions(SELECT_OPTIONS)
    );

    return [buttonRow, selectRow];
  }

  protected async handleAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: string
  ): Promise<string | null> {
    if (action === "prev" || action === "next") {
      return wrappingArrayNeighbor(HelpCustomEmbed.possiblePages, item, action === "next");
    }

    if (action === "select" && interaction.isStringSelectMenu()) {
      const selected = interaction.values[0];
      return HelpCustomEmbed.possiblePages.includes(selected) ? selected : null;
    }

    await interaction.reply({ content: "That component doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
    return null;
  }
}

export default new HelpCommand();
