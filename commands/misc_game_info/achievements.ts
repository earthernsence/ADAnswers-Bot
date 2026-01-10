import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, ComponentType, type InteractionReplyOptions, MessageComponentInteraction, MessageFlags, SlashCommandBuilder, italic, userMention } from "discord.js";
import Achievement from "@/utils/game_data/Achievement";
import { AchievementCustomEmbed } from "@/types/Embeds/AchievementCustomEmbed";
import { Command } from "@/types/Commands/Command";
import type { DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { achievementsList } from "@/utils/game_data/achievements";
import { isUserHelper } from "@/utils/utils_commands";

const getNext = (current: DoublyLinkedListNode<Achievement>, forward: boolean): DoublyLinkedListNode<Achievement> => {
  if (forward) {
    const newAch = current.next;
    if (!newAch) return achievementsList.getFirstValue() ?? current;
    return newAch;
  }

  const newAch = current.prev;
  if (!newAch) return achievementsList.getLastValue() ?? current;
  return newAch;
};

export default new Command({
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Provides some information about a requested Achievement.")
    .addIntegerOption(option =>
      option
        .setName("achievement")
        .setDescription("What Achivement would you like information about?")
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
  execute: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const achievementRequested = interaction.options.getInteger("achievement", true);

    const achievement = achievementsList.search(value => value.id === achievementRequested);

    if (!achievement) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `That achievement doesn't exist!\nAchievement requested: ${achievementRequested}`,
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      interaction.reply({
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
    const embed = new AchievementCustomEmbed({ interaction, achievement: achievement.value, expirationTimestamp });
    const picture = embed.getAndSetThumbnail();

    let currentAchievement = achievement;

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`ach_button_prev_${expirationTimestamp}`)
          .setEmoji({ name: "◀️" })
          .setLabel(`Previous Achievement (${currentAchievement.prev ? currentAchievement.prev.value.id : "188"})`)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
        new ButtonBuilder()
          .setCustomId(`ach_button_next_${expirationTimestamp}`)
          .setEmoji({ name: "▶️" })
          .setLabel(`Next Achievement (${currentAchievement.next ? currentAchievement.next.value.id : "11"})`)
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
      const nextAchievement = getNext(currentAchievement, forward);

      if (i.member?.user.id !== user.id) return;

      currentAchievement = nextAchievement;

      const newEmbed = new AchievementCustomEmbed({ interaction, achievement: currentAchievement.value, expirationTimestamp });
      const newImage = newEmbed.getAndSetThumbnail();

      await i.update({
        files: [newImage],
        embeds: [newEmbed.create()],
        components: [buttons(false)],
      });
    });

    collector.on("end", async() => {
      const finalEmbed = new AchievementCustomEmbed({ interaction, achievement: currentAchievement.value, expirationTimestamp });
      const finalImage = finalEmbed.getAndSetThumbnail();

      await sentReply.edit({
        files: [finalImage],
        embeds: [finalEmbed.create()],
        components: [buttons(true)],
      });
    });
  }
});