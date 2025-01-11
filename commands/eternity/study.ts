import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { TimeStudyCustomEmbed } from "@/types/Embeds/TimeStudyCustomEmbed";
import { timeStudies } from "@/utils/game_data/time_studies";

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("study")
    .setDescription("takes in a study ID and returns information about the study")
    .addIntegerOption(option =>
      option
        .setName("study")
        .setDescription("the study you want to get information about")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(304)
    ),
  embed: (interaction: ChatInputCommandInteraction) => {
    const studyID = interaction.options.getInteger("study");

    const studyRequested = timeStudies[`${studyID}`];

    if (!studyRequested) {
      return new ErrorCustomEmbed({
        interaction,
        text: `The Time Study you provided (TS${studyID}) does not exist!`,
      });
    }

    return new TimeStudyCustomEmbed({
      interaction,
      study: studyRequested
    });
  }
});