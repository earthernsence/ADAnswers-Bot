import { ChatInputCommandInteraction, SlashCommandBuilder, inlineCode } from "discord.js";
import { ChallengeShorthandCommand } from "@/types/Commands/ChallengeShorthandCommand";
import { InfinityChallengeCustomEmbed } from "@/types/Embeds/InfinityChallengeCustomEmbed";
import { infinityChallenges } from "@/utils/game_data/challenges/infinity_challenges";

export default new ChallengeShorthandCommand({
  data: new SlashCommandBuilder()
    .setName("ic5")
    .setDescription(`shorthand for ${inlineCode("/challenge ic5")}`)
    .addUserOption(user =>
      user
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  embed: (interaction: ChatInputCommandInteraction) => new InfinityChallengeCustomEmbed({
    interaction,
    challenge: infinityChallenges.ic5
  })
});