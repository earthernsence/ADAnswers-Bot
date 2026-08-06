import { ChatInputCommandInteraction, type RepliableInteraction, SlashCommandBuilder } from "discord.js";
import type Achievement from "@/utils/game_data/Achievement";
import { AchievementCustomEmbed } from "@/types/Embeds/AchievementCustomEmbed";
import { achievementsList } from "@/utils/game_data/achievements";
import { CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import type { DoublyLinkedListNode } from "@/types/DoublyLinkedList";

/**
 * `/achievements` - look up an Achievement by ID and page through the full list with buttons.
 *
 * All the lookup/button/embed plumbing lives in {@link CollectorEmbedCommand}; this class only
 * supplies the achievement-specific bits.
 */
class AchievementsCommand extends CollectorEmbedCommand<Achievement> {
  constructor() {
    super({
      data: new SlashCommandBuilder()
        .setName("achievements")
        .setDescription("Provides some information about a requested Achievement.")
        .addIntegerOption(option =>
          option
            .setName("achievement")
            .setDescription("Which Achievement would you like information about?")
            .setRequired(true)
            .setMinValue(11)
            .setMaxValue(188)
        )
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("(Optional) Which user would you like to show the information to?")
            .setRequired(false)
        ),
      prefix: "ach",
      list: achievementsList
    });
  }

  protected findInitial(interaction: ChatInputCommandInteraction): DoublyLinkedListNode<Achievement> | undefined {
    const achievementRequested = interaction.options.getInteger("achievement", true);
    return this.list.search(value => value.id === achievementRequested) ?? undefined;
  }

  protected notFoundText(interaction: ChatInputCommandInteraction): string {
    const achievementRequested = interaction.options.getInteger("achievement", true);
    return `That achievement doesn't exist!\nAchievement requested: ${achievementRequested}`;
  }

  protected encodeIdentifier(item: Achievement): string {
    return String(item.id);
  }

  protected decodeIdentifier(encoded: string): DoublyLinkedListNode<Achievement> | undefined {
    const id = Number(encoded);
    return this.list.search(value => value.id === id) ?? undefined;
  }

  protected buildEmbed(interaction: RepliableInteraction, item: Achievement): AchievementCustomEmbed {
    return new AchievementCustomEmbed({ interaction, achievement: item });
  }

  protected getButtonLabel(item: Achievement): string {
    return String(item.id);
  }
}

export default new AchievementsCommand();