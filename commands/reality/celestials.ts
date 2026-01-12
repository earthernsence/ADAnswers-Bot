import { ApplicationCommandOptionType, ChatInputCommandInteraction, inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { Colours } from "@/utils/utils_colours";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import ra from "@/utils/game_data/celestials/ra";
import { RaCelestialMemoriesCustomEmbed } from "@/types/Embeds/Celestials/ra/RaCelestialMemoriesCustomEmbed";
import teresa from "@/utils/game_data/celestials/teresa";
import { TeresaPerkShopCustomEmbed } from "@/types/Embeds/Celestials/teresa/TeresaPerkShopCustomEmbed";
import { TeresaRealityCustomEmbed } from "@/types/Embeds/Celestials/teresa/TeresaRealityCustomEmbed";
import { TeresaUnlocksCustomEmbed } from "@/types/Embeds/Celestials/teresa/TeresaUnlocksCustomEmbed";
import v from "@/utils/game_data/celestials/v";
import { VAchievementCustomEmbed } from "@/types/Embeds/Celestials/v/VAchievementCustomEmbed";
import { VUnlocksCustomEmbed } from "@/types/Embeds/Celestials/v/VUnlocksCustomEmbed";

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("celestials")
    .setDescription("Provides some general information about Celestials")
    .addSubcommandGroup(group =>
      group
        .setName("teresa")
        .setDescription("View information about Teresa, Celestial of Reality")
        .addSubcommand(subcommand =>
          subcommand.setName("basic-information").setDescription("Provides some basic information on Teresa.")
        )
        .addSubcommand(subcommand =>
          subcommand.setName("reality").setDescription("Information about Teresa's Reality.")
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName("unlocks")
            .setDescription("View some information about Teresa's Reality Machine container's unlocks")
        )
        .addSubcommand(subcommand =>
          subcommand.setName("perk-shop").setDescription("Provides some basic information on Teresa's Perk Shop.")
        )
    )
    .addSubcommandGroup(group =>
      group
        .setName("v")
        .setDescription("View information about V, Celestial of Achievements")
        .addSubcommand(subcommand =>
          subcommand.setName("basic-information").setDescription("Provides some basic information about V.")
        )
        .addSubcommand(subcommand => subcommand.setName("reality").setDescription("Information about V's Reality."))
        .addSubcommand(subcommand =>
          subcommand.setName("unlocks").setDescription("View some information about V's V-Achievement unlocks.")
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName("achievements")
            .setDescription("Check out some information about V-Achievements.")
            .addStringOption(option =>
              option
                .setName("achievement")
                .setDescription("The V-Achievement you wish to view.")
                .setRequired(true)
                .setChoices(
                  Object.entries(v.achievements).map(achievement => ({
                    name: `${achievement[1].name}${achievement[1].hard ? " (Hard V)" : ""}`,
                    value: achievement[0],
                    type: ApplicationCommandOptionType.String
                  }))
                )
            )
        )
    )
    .addSubcommandGroup(group =>
      group
        .setName("ra")
        .setDescription("View information about Ra, Celestial of the Forgotten")
        .addSubcommand(subcommand =>
          subcommand.setName("basic-information").setDescription("Provides some basic information about Ra.")
        )
        .addSubcommand(subcommand => subcommand.setName("reality").setDescription("Information about Ra's Reality."))
        .addSubcommand(subcommand =>
          subcommand
            .setName("celestial-memories")
            .setDescription("Select a Celestial and investigate its memories.")
            .addStringOption(option =>
              option
                .setName("celestial")
                .setDescription("The Celestial you wish to view.")
                .setRequired(true)
                .setChoices(
                  Object.keys(ra.memories).map(celestial => ({
                    name: celestial,
                    value: celestial,
                    type: ApplicationCommandOptionType.String
                  }))
                )
            )
        )
    ),
  embed: (interaction: ChatInputCommandInteraction) => {
    const celestial = interaction.options.getSubcommandGroup(true);
    const subcommand = interaction.options.getSubcommand(true);

    if (celestial === "teresa") {
      switch (subcommand) {
        case "basic-information":
          return new BasicTextCustomEmbed({
            interaction,
            title: "Teresa, Celestial of Reality",
            field: {
              name: "Basic Information",
              value: teresa.info,
              inline: false
            },
            colour: Colours.Teresa
          });
        case "reality":
          return new TeresaRealityCustomEmbed({ interaction });
        case "unlocks":
          return new TeresaUnlocksCustomEmbed({ interaction });
        case "perk-shop":
          return new TeresaPerkShopCustomEmbed({ interaction });
        default:
          throw new Error(`Unknown subcommand in celestials-teresa! Subcommand: ${subcommand}`);
      }
    }

    if (celestial === "v") {
      switch (subcommand) {
        case "basic-information":
          return new BasicTextCustomEmbed({
            interaction,
            title: "V, Celestial of Achievements",
            field: {
              name: "Basic Information",
              value: v.info,
              inline: false
            },
            colour: Colours.V
          });
        case "reality":
          return new BasicTextCustomEmbed({
            interaction,
            title: "V, Celestial of Achievements",
            field: {
              name: "V's Reality",
              value: v.reality,
              inline: false
            },
            colour: Colours.V
          });
        case "unlocks":
          return new VUnlocksCustomEmbed({ interaction });
        case "achievements":
          return new VAchievementCustomEmbed({
            interaction,
            achievement: interaction.options.getString("achievement", true)
          });
      }
    }

    if (celestial === "ra") {
      switch (subcommand) {
        case "basic-information":
          return new BasicTextCustomEmbed({
            interaction,
            title: "Ra, Celestial of the Forgotten",
            field: {
              name: "Basic Information",
              value: ra.info,
              inline: false
            },
            colour: Colours.Ra
          });
        case "reality":
          return new BasicTextCustomEmbed({
            interaction,
            title: "Ra, Celestial of the Forgotten",
            field: {
              name: "Ra's Reality",
              value: ra.reality,
              inline: false
            },
            colour: Colours.Ra
          });
        case "celestial-memories":
          return new RaCelestialMemoriesCustomEmbed({
            interaction,
            celestial: interaction.options.getString("celestial", true)
          });
      }
    }

    return new ErrorCustomEmbed({
      interaction,
      text: `Something has gone terribly wrong. Unknown Celestial in ${inlineCode("/celestials")} (${inlineCode(celestial)})`
    });
  }
});
