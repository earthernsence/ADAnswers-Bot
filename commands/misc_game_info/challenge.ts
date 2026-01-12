import { type ApplicationCommandOptionChoiceData, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { AntimatterChallengeCustomEmbed } from "@/types/Embeds/Challenges/AntimatterChallengeCustomEmbed";
import { antimatterChallenges } from "@/utils/game_data/challenges/antimatter_challenges";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { InfinityChallengeCustomEmbed } from "@/types/Embeds/Challenges/InfinityChallengeCustomEmbed";
import { infinityChallenges } from "@/utils/game_data/challenges/infinity_challenges";

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
      value: challenge
    });
  }

  return choices;
}

export default new BasicEmbedCommand({
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
  embed: (interaction: ChatInputCommandInteraction) => {
    const requestedChallenge = interaction.options.getString("challenge");

    if (!requestedChallenge) {
      return new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing your requested challenge of ${requestedChallenge}`
      });
    }

    return requestedChallenge?.startsWith("c")
      ? new AntimatterChallengeCustomEmbed({
          interaction,
          challenge: antimatterChallenges[requestedChallenge],
          strategyOnly: false
        })
      : new InfinityChallengeCustomEmbed({
          interaction,
          challenge: infinityChallenges[requestedChallenge],
          strategyOnly: false
        });
  }
});
