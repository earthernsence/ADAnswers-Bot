import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, bold, inlineCode, underline } from "discord.js";
import { orderAsDoublyLinkedList, orderAsString } from "@/utils/game_data/challenges/eternity_challenges";
import { Command } from "@/types/Commands/Command";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("eternitychallengeorder")
    .setDescription(`provides an order for the Eternity Challenges. includes optional "most recent challenge" parameter`)
    .addStringOption(option =>
      option
        .setName("most-recent-challenge")
        .setDescription("your most recent challenge completed, in form XxY, where X is the challenge and Y is the completion")
        .setRequired(false)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const mostRecentChallengeRequested = interaction.options.getString("most-recent-challenge");

    if (!mostRecentChallengeRequested) {
      interaction.reply({
        content: orderAsString,
        flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
      });

      return;
    }

    const mostRecentChallenge = orderAsDoublyLinkedList.search(value => value.shortName === mostRecentChallengeRequested);

    if (!mostRecentChallenge) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing either your requested challenge of ${mostRecentChallengeRequested}`,
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const [_firstPart, secondPart] = orderAsDoublyLinkedList.partition(mostRecentChallenge);
    // Include the previous challenge, in case they missed it on accident
    const newOrder = [
      mostRecentChallenge.prev?.value,
      ...secondPart
    ];
    const newOrderAsShortNames = newOrder.filter(value => Boolean(value)).map(value => value?.shortName);
    const otherRecommendedCompletions = mostRecentChallenge.value.otherRecommendedCompletions;

    // Emphasise the most recent challenge
    newOrderAsShortNames[newOrderAsShortNames.indexOf(mostRecentChallenge.value.shortName)] = `${underline(bold(`${mostRecentChallenge.value.shortName}`))}`;

    interaction.reply({
      content: `
Order: ${newOrderAsShortNames.join(", ")}
Other recommended Eternity Challenge completions: ${inlineCode(otherRecommendedCompletions)}
For more information on beating this challenge, try using ${inlineCode(`/ec ${mostRecentChallenge.value.challenge} ${mostRecentChallenge.value.completion}`)}
Your next Eternity Challenge should be: ${inlineCode(mostRecentChallenge.value.nextRecommendedEternityChallenge)}
      `,
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
    });
  },
  aliases: ["eco"]
});