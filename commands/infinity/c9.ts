import { ChatInputCommandInteraction, SlashCommandBuilder, inlineCode } from "discord.js";
import { AntimatterChallengeCustomEmbed } from "@/types/Embeds/Challenges/AntimatterChallengeCustomEmbed";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { antimatterChallenges } from "@/utils/game_data/challenges/antimatter_challenges";

export default new BasicEmbedCommand({
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