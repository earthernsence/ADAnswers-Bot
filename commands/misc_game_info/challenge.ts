import { type ApplicationCommandOptionChoiceData, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { AntimatterChallengeCustomEmbed } from "@/types/Embeds/Challenges/AntimatterChallengeCustomEmbed";
import { antimatterChallenges } from "@/utils/game_data/challenges/antimatter_challenges";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { InfinityChallengeCustomEmbed } from "@/types/Embeds/Challenges/InfinityChallengeCustomEmbed";
import { infinityChallenges } from "@/utils/game_data/challenges/infinity_challenges";

function getChallengeChoices(): Array<ApplicationCommandOptionChoiceData<string>> {
  const choices: Array<ApplicationCommandOptionChoiceData<string>> = [];

  // Sooooooo hacky but it does work
  for (const challenge in antimatterChallenges) {
    choices.push({
      name: `Normal Challenge ${challenge.split("c")[1]} (${challenge.toUpperCase()})`,
      value: challenge
    });
  }

  for (const challenge in infinityChallenges) {
    choices.push({
      name: `Infinity Challenge ${challenge.split("c")[1]} (${challenge.toUpperCase()})`,
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
    const requestedChallenge = interaction.options.getString("challenge", true);

    return requestedChallenge.startsWith("c")
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
