import { ChatInputCommandInteraction, inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { InfinityChallengeCustomEmbed } from "@/types/Embeds/Challenges/InfinityChallengeCustomEmbed";
import { infinityChallenges } from "@/utils/game_data/challenges/infinity_challenges";

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("ic4")
    .setDescription(`shorthand for ${inlineCode("/challenge ic4")}`)
    .addUserOption(user =>
      user
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  embed: (interaction: ChatInputCommandInteraction) =>
    new InfinityChallengeCustomEmbed({
      interaction,
      challenge: infinityChallenges.ic4
    })
});
