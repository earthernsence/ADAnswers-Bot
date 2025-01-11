import { ChatInputCommandInteraction, SlashCommandBuilder, inlineCode } from "discord.js";
import { AntimatterChallengeCustomEmbed } from "@/types/Embeds/AntimatterChallengeCustomEmbed";
import { ChallengeShorthandCommand } from "@/types/Commands/ChallengeShorthandCommand";
import { antimatterChallenges } from "@/utils/game_data/challenges/antimatter_challenges";

export default new ChallengeShorthandCommand({
  data: new SlashCommandBuilder()
    .setName("c9")
    .setDescription(`shorthand for ${inlineCode("/challenge c9")}`)
    .addUserOption(user =>
      user
        .setName("target")
        .setDescription("(Optional) Which user would you like to show the information to?")
        .setRequired(false)
    ),
  embed: (interaction: ChatInputCommandInteraction) => new AntimatterChallengeCustomEmbed({
    interaction,
    challenge: antimatterChallenges.c9
  })
});