import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  ComponentType,
  type InteractionReplyOptions,
  MessageComponentInteraction,
  MessageFlags,
  SlashCommandBuilder,
  italic,
  userMention } from "discord.js";
import { mobileSecretAchievementsList, webSecretAchievementsList } from "@/utils/game_data/secret_achievements";
import { Command } from "@/types/Commands/Command";
import type { DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import type SecretAchievement from "@/utils/game_data/SecretAchievement";
import { SecretAchievementCustomEmbed } from "@/types/Embeds/SecretAchievementCustomEmbed";
import { SecretAchievementType } from "@/types/game_data/SecretAchievements";
import { isUserHelper } from "@/utils/utils_commands";

const getNext = (current: DoublyLinkedListNode<SecretAchievement>, forward: boolean, type: SecretAchievementType): DoublyLinkedListNode<SecretAchievement> => {
  if (forward) {
    const newAch = current.next;
    if (!newAch) {
      // The user will select a subcommand (either mobile or web), and we can interpret this
      // as which list we want to traverse here.
      switch (type) {
        case SecretAchievementType.Mobile:
          return mobileSecretAchievementsList.getFirstValue() ?? current;
        case SecretAchievementType.Web:
          return webSecretAchievementsList.getFirstValue() ?? current;
        default:
          throw new Error(`Unknown type ${type} in getNext().`);
      }
    }
    return newAch;
  }

  const newAch = current.prev;
  if (!newAch) {
    switch (type) {
      case SecretAchievementType.Mobile:
        return mobileSecretAchievementsList.getLastValue() ?? current;
      case SecretAchievementType.Web:
        return webSecretAchievementsList.getLastValue() ?? current;
      default:
        throw new Error(`Unknown type ${type} in getNext().`);
    }
  }
  return newAch;
};

export default new Command({
  data: new SlashCommandBuilder()
    .setName("secretachievements")
    .setDescription("Provides some information about a requested Secret Achievement.")
    .addSubcommand(subcommand =>
      subcommand
        .setName("web")
        .setDescription("View web Secret Achievements")
        .addIntegerOption(option =>
          option
            .setName("secret-achievement")
            .setDescription("What Secret Achievement would you like information about?")
            .setRequired(true)
            .setMinValue(11)
            .setMaxValue(48)
        )
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("(Optional) Which user would you like to show the information to?")
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("mobile")
        .setDescription("View mobile Secret Achievements")
        .addIntegerOption(option =>
          option
            .setName("secret-achievement")
            .setDescription("What Secret Achievement would you like information about?")
            .setRequired(true)
            .setMinValue(11)
            .setMaxValue(48)
        )
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("(Optional) Which user would you like to show the information to?")
            .setRequired(false)
        )
    ),
  execute: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const version = interaction.options.getSubcommand(true);
    const achievementRequested = interaction.options.getInteger("secret-achievement", true);
    const type = version === "web" ? SecretAchievementType.Web : SecretAchievementType.Mobile;

    let achievement: DoublyLinkedListNode<SecretAchievement> | null;

    if (version === "web") achievement = webSecretAchievementsList.search(value => value.id === achievementRequested);
    else achievement = mobileSecretAchievementsList.search(value => value.id === achievementRequested);

    if (!achievement) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `That Secret Achievement doesn't exist!\nAchievement requested: ${achievementRequested}`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      await interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    const targetUser = interaction.options.getUser("target") ?? undefined;
    const user = interaction.member === null ? interaction.user : interaction.member.user;

    if (!user) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `There was an issue running this command.`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
    const embed = new SecretAchievementCustomEmbed({ interaction, achievement: achievement.value, expirationTimestamp });
    const picture = embed.getAndSetThumbnail();

    let currentAchievement = achievement;

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`secret_ach_button_prev_${expirationTimestamp}`)
          .setEmoji({ name: "◀️" })
          .setLabel(`Previous Secret Achievement (${currentAchievement.prev ? currentAchievement.prev.value.id : "48"})`)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
        new ButtonBuilder()
          .setCustomId(`secret_ach_button_next_${expirationTimestamp}`)
          .setEmoji({ name: "▶️" })
          .setLabel(`Next Secret Achievement (${currentAchievement.next ? currentAchievement.next.value.id : "11"})`)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled)
      );

    const initialContent: InteractionReplyOptions = {
      content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}\n` : undefined,
      embeds: [embed.create()],
      files: [picture],
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
      components: [buttons(false)]
    };

    const sentReply = await interaction.reply(initialContent);

    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const collector = sentReply.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

    collector.on("collect", async(i: ButtonInteraction) => {
      const forward = i.customId.includes("next");
      const nextAchievement = getNext(currentAchievement, forward, type);

      if (i.member?.user.id !== user.id) return;

      currentAchievement = nextAchievement;

      const newEmbed = new SecretAchievementCustomEmbed({ interaction, achievement: currentAchievement.value, expirationTimestamp });
      const newImage = newEmbed.getAndSetThumbnail();

      await i.update({
        files: [newImage],
        embeds: [newEmbed.create()],
        components: [buttons(false)],
      });
    });

    collector.on("end", async() => {
      const finalEmbed = new SecretAchievementCustomEmbed({ interaction, achievement: currentAchievement.value, expirationTimestamp });
      const finalImage = finalEmbed.getAndSetThumbnail();

      await sentReply.edit({
        files: [finalImage],
        embeds: [finalEmbed.create()],
        components: [buttons(true)],
      });
    });
  }
});