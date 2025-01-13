import { ActionRowBuilder, ButtonBuilder, italic, userMention } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, ChatInputCommandInteraction, ComponentType, type InteractionReplyOptions, MessageComponentInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "@/types/Commands/Command";
import type { DoublyLinkedListNode } from "@/types/DoublyLinkedList";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import type EternityChallenge from "@/utils/game_data/challenges/EternityChallenge";
import { EternityChallengeCustomEmbed } from "@/types/Embeds/EternityChallengeCustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";
import { orderAsDoublyLinkedList } from "@/utils/game_data/challenges/eternity_challenges";

const getNext = (current: DoublyLinkedListNode<EternityChallenge>, forward: boolean): DoublyLinkedListNode<EternityChallenge> => {
  if (forward) {
    const newEC = current.next;
    // If we can't retrieve the head (for some reason), just default back to the current EC
    if (!newEC) return orderAsDoublyLinkedList.getFirstValue() ?? current;
    return newEC;
  }

  const newEC = current.prev;

  if (!newEC) return orderAsDoublyLinkedList.getLastValue() ?? current;

  return newEC;
};

// TODO: Add "tree" option for easier copying
// I really want there to be a super easy way to generalise this, but I haven't come across anything that
// would be easier than just writing it all in the execute method. I'm sorry for now.
export default new Command({
  data: new SlashCommandBuilder()
    .setName("eternitychallenge")
    .setDescription("generates an Eternity Challenge guide for the requested challenge.")
    .addIntegerOption(option =>
      option
        .setName("challenge")
        .setDescription("what Eternity Challenge would you like a guide for?")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(12)
    )
    .addIntegerOption(option =>
      option
        .setName("completion")
        .setDescription("what completion of that challenge would you like a guide for?")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    )
    .addUserOption(option =>
      option
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  execute: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const challengeRequested = interaction.options.getInteger("challenge", true);
    const completionRequested = interaction.options.getInteger("completion", true);
    const challenge = orderAsDoublyLinkedList.search(value => challengeRequested === value.challenge && completionRequested === value.completion);

    if (!challenge) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `That challenge doesn't exist!\nChallenge requested: ${challengeRequested}\nCompletion requested: ${completionRequested}`
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
    const embed = new EternityChallengeCustomEmbed({ interaction, challenge: challenge.value, expirationTimestamp });
    const picture = embed.getAndSetThumbnail();

    let currentChallenge = challenge;

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`ec_button_prev_${expirationTimestamp}`)
          .setEmoji({ name: "◀️" })
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
        new ButtonBuilder()
          .setCustomId(`ec_button_next_${expirationTimestamp}`)
          .setEmoji({ name: "▶️" })
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
      const forward = i.customId.startsWith("ec_button_next");
      const nextECToShow = getNext(currentChallenge, forward);

      // Prevent non-senders from using the buttons.
      if (i.member?.user.id !== user.id) return;

      currentChallenge = nextECToShow;

      const newEmbed = new EternityChallengeCustomEmbed({ interaction, challenge: nextECToShow.value, expirationTimestamp });
      const newImage = newEmbed.getAndSetThumbnail();

      await i.update({
        files: [newImage],
        embeds: [newEmbed.create()],
        components: [buttons(false)]
      });
    });

    collector.on("end", async() => {
      const finalEmbed = new EternityChallengeCustomEmbed({ interaction, challenge: currentChallenge.value, expirationTimestamp });

      const finalImage = finalEmbed.getAndSetThumbnail();

      await interaction.editReply({
        embeds: [finalEmbed.create()],
        components: [buttons(true)],
        files: [finalImage],
      });
    });
  },
  aliases: ["ec"]
});