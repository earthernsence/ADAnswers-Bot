import { type ApplicationCommandOptionChoiceData, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, italic, userMention } from "discord.js";
import { AntimatterChallengeCustomEmbed } from "@/types/Embeds/AntimatterChallengeCustomEmbed";
import { Command } from "@/types/Commands/Command";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { InfinityChallengeCustomEmbed } from "@/types/Embeds/InfinityChallengeCustomEmbed";
import { antimatterChallenges } from "@/utils/game_data/challenges/antimatter_challenges";
import { infinityChallenges } from "@/utils/game_data/challenges/infinity_challenges";
import { isUserHelper } from "@/utils/utils_commands";

function getChallengeChoices(): Array<ApplicationCommandOptionChoiceData<string>> {
  const choices: Array<ApplicationCommandOptionChoiceData<string>> = [];

  for (const challenge in antimatterChallenges) {
    choices.push({
      name: challenge,
      value: challenge
    });
  }

  for (const challenge in infinityChallenges) {
    choices.push({
      name: challenge,
      value: challenge,
    });
  }

  return choices;
}

export default new Command({
  data: new SlashCommandBuilder()
    .setName("challenge")
    .setDescription("Takes in a normal/Infinity challenge and returns a guide. for ECs, use /ec")
    .addStringOption(option =>
      option
        .setName("challenge")
        .setDescription("Which challenge do you want to see a guide for?")
        .setRequired(true)
        .setChoices(getChallengeChoices())
    )
    .addUserOption(user =>
      user
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const requestedChallenge = interaction.options.getString("challenge");
    const targetUser = interaction.options.getUser("target");

    if (!requestedChallenge) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing your requested challenge of ${requestedChallenge}`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    const customEmbed = requestedChallenge?.startsWith("c")
      ? new AntimatterChallengeCustomEmbed({ interaction, challenge: antimatterChallenges[requestedChallenge] })
      : new InfinityChallengeCustomEmbed({ interaction, challenge: infinityChallenges[requestedChallenge] });

    const image = customEmbed.getAndSetThumbnail();

    interaction.reply({
      content: targetUser ? `${italic(`Suggested for ${userMention(targetUser.id)}`)}` : undefined,
      embeds: [customEmbed.create()],
      files: [image],
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  }
});