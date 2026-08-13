import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder,
  type SlashCommandSubcommandBuilder
} from "discord.js";
import { type CollectorComponentInteraction, CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { mobileSecretAchievementsList, webSecretAchievementsList } from "@/utils/game_data/secret_achievements";
import { buildCustomId } from "@/utils/utils_commands";
import type { DoublyLinkedList } from "@/types/DoublyLinkedList";
import type SecretAchievement from "@/utils/game_data/SecretAchievement";
import { SecretAchievementCustomEmbed } from "@/types/Embeds/SecretAchievementCustomEmbed";
import { wrappingListNeighbor } from "@/utils/utils_component_navigation";

type Platform = "mobile" | "web";

// We care about both the content & the platform, since it changes which list is in use
interface SecretAchievementView {
  achievement: SecretAchievement;
  platform: Platform;
}

function listForPlatform(platform: Platform): DoublyLinkedList<SecretAchievement> {
  return platform === "mobile" ? mobileSecretAchievementsList : webSecretAchievementsList;
}

class SecretAchievementsCommand extends CollectorEmbedCommand<SecretAchievementView> {
  constructor() {
    const achievementSubcommand = (name: string) => (subcommand: SlashCommandSubcommandBuilder) =>
      subcommand
        .setName(name)
        .setDescription(`View ${name} Secret Achievements`)
        .addIntegerOption(option =>
          option
            .setName("secret-achievement")
            .setDescription("Which Secret Achievement would you like information about?")
            .setRequired(true)
            .setMinValue(11)
            .setMaxValue(48)
        )
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("(Optional) Which user would you like to show the information to?")
            .setRequired(false)
        );

    super({
      data: new SlashCommandBuilder()
        .setName("secretachievements")
        .setDescription("Provides some information about a requested Secret Achievement.")
        .addSubcommand(achievementSubcommand("web"))
        .addSubcommand(achievementSubcommand("mobile")),
      prefix: "sach"
    });
  }

  protected findInitial(interaction: ChatInputCommandInteraction): SecretAchievementView | undefined {
    const platform: Platform = interaction.options.getSubcommand(true) === "web" ? "web" : "mobile";
    const achievementRequested = interaction.options.getInteger("secret-achievement", true);
    const achievement = listForPlatform(platform).search(value => value.id === achievementRequested)?.value;

    return achievement ? { achievement, platform } : undefined;
  }

  protected notFoundText(interaction: ChatInputCommandInteraction): string {
    const achievementRequested = interaction.options.getInteger("secret-achievement", true);
    return `That Secret Achievement doesn't exist!\nAchievement requested: ${achievementRequested}`;
  }

  protected encodeIdentifier(item: SecretAchievementView): string {
    return `${item.platform}:${item.achievement.id}`;
  }

  protected decodeIdentifier(encoded: string): SecretAchievementView | undefined {
    const [platform, idText] = encoded.split(":") as [Platform, string];
    const id = Number(idText);
    const achievement = listForPlatform(platform).search(value => value.id === id)?.value;

    return achievement ? { achievement, platform } : undefined;
  }

  protected buildEmbed(interaction: RepliableInteraction, item: SecretAchievementView): SecretAchievementCustomEmbed {
    return new SecretAchievementCustomEmbed({ interaction, achievement: item.achievement });
  }

  protected buildComponents(item: SecretAchievementView, userId: string): Array<ActionRowBuilder<ButtonBuilder>> {
    const list = listForPlatform(item.platform);
    const node = list.search(value => value.id === item.achievement.id);
    if (!node) return [];

    const previousAchievement = wrappingListNeighbor(list, node, false);
    const nextAchievement = wrappingListNeighbor(list, node, true);
    const encoded = this.encodeIdentifier(item);

    return [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId(buildCustomId(this.prefix, "prev", userId, encoded))
          .setEmoji({ name: "◀️" })
          .setLabel(`Previous Secret Achievement (${previousAchievement.id})`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(buildCustomId(this.prefix, "next", userId, encoded))
          .setEmoji({ name: "▶️" })
          .setLabel(`Next Secret Achievement (${nextAchievement.id})`)
          .setStyle(ButtonStyle.Primary)
      )
    ];
  }

  protected async handleAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: SecretAchievementView
  ): Promise<SecretAchievementView | null> {
    if (action === "prev" || action === "next") {
      const list = listForPlatform(item.platform);
      const node = list.search(value => value.id === item.achievement.id);
      if (!node) return null;

      const achievement = wrappingListNeighbor(list, node, action === "next");
      return { achievement, platform: item.platform };
    }

    await interaction.reply({ content: "That button doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
    return null;
  }
}

export default new SecretAchievementsCommand();
