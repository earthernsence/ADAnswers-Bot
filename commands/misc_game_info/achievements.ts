import { ChatInputCommandInteraction, type RepliableInteraction, SlashCommandBuilder } from "discord.js";
import type { DoublyLinkedList, DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import type Achievement from "@/utils/game_data/Achievement";
import { AchievementCustomEmbed } from "@/types/Embeds/AchievementCustomEmbed";
import { achievementsList } from "@/utils/game_data/achievements";
import { LinkedListCollectorEmbedCommand } from "@/types/Commands/LinkedListCollectorEmbedCommand";

class AchievementsCommand extends LinkedListCollectorEmbedCommand<Achievement> {
  constructor() {
    super({
      data: new SlashCommandBuilder()
        .setName("achievements")
        .setDescription("Provides some information about a requested Achievement.")
        .addIntegerOption(option =>
          option
            .setName("achievement")
            .setDescription("Which Achivement would you like information about?")
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
      prefix: "ach"
    });
  }

  protected findInitial(interaction: ChatInputCommandInteraction): Achievement | undefined {
    const achievementRequested = interaction.options.getInteger("achievement", true);
    return achievementsList.search(value => value.id === achievementRequested)?.value ?? undefined;
  }

  protected notFoundText(interaction: ChatInputCommandInteraction): string {
    const achievementRequested = interaction.options.getInteger("achievement", true);
    return `That achievement doesn't exist!\nAchievement requested: ${achievementRequested}`;
  }

  protected encodeIdentifier(item: Achievement): string {
    return String(item.id);
  }

  protected decodeIdentifier(encoded: string): Achievement | undefined {
    const id = Number(encoded);
    return achievementsList.search(value => value.id === id)?.value ?? undefined;
  }

  protected buildEmbed(interaction: RepliableInteraction, item: Achievement): AchievementCustomEmbed {
    return new AchievementCustomEmbed({ interaction, achievement: item });
  }

  protected resolveList(): DoublyLinkedList<Achievement> {
    return achievementsList;
  }

  protected findNode(item: Achievement): DoublyLinkedListNode<Achievement> | undefined {
    return achievementsList.search(value => value.id === item.id) ?? undefined;
  }

  protected getButtonLabel(item: Achievement): string {
    return String(item.id);
  }
}

export default new AchievementsCommand();
