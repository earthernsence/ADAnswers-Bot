import { ApplicationCommandOptionType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { perks, perksFromFamily } from "@/utils/game_data/perks";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { Colours } from "@/utils/utils_colours";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { PERK_FAMILY } from "@/types/game_data/Perks";
import { PerkCustomEmbed } from "@/types/Embeds/PerkCustomEmbed";
import { capitalise } from "@/utils/utils_formatting";

const perkInfo: Record<string, string> = {
  /* eslint-disable @stylistic/max-len */
  "intro": `Welcome to Perks!

In the Reality Tab, under "Perks", you will find a sprawling tree with a number of nodes, called the "Perk Tree". Each of the nodes is called a "Perk". These Perks provide various Quality-of-life boosts to almost all parts of the game pre-Reality.

To purchase a perk, there are 2 requirements:
    1. You must have at least one "Perk Point". You will get exactly one Perk Point every time you make a new Reality.
    2. You must purchase all the perks that link that perk to the \`START\` perk. Luckily, many perks have multiple routes to reach them. For example, to purchase the perk \`SEP1\`, you can purchase \`START - SAM - SIP1\`, or \`START - SAM - ANR\`, or even loop all the way around starting with \`EU1\`.
    
If you have a Perk Point, then all immediately purchasable Perks will turn white. It is recommended to use all your Perk Points immediately, as they currently do not have any other uses.`,

  "types": `Each perk has a "type", a color, based on what part of the game it is most useful in. These types are:
    - Red: Automation
    - Orange: Infinity
    - Yellow: Achievements
    - Light Green: Dilation
    - Dull Green: Antimatter
    - Dark Green: Reality
    - Purple: Eternity
This bot groups perks by their type. Make sure to use the correct subcommand/type when searching up a perk.`,

  "strategy": `There is no "one-size-fits-all" strategy for choosing the optimal order for perks. The makers of this bot recommend that you choose whatever perk will minimize the part of the game that you dislike the most.`
  /* eslint-enable @stylistic/max-len */
};

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("perk")
    .setDescription("Provides information about either a specific Perk, or Perks in general.")
    .addSubcommand(subcommand =>
      subcommand
        .setName("info")
        .setDescription("View basic information about Perks")
        .addStringOption(option =>
          option
            .setName("info")
            .setDescription("What particular information would you like?")
            .setChoices(Object.keys(perkInfo).map(choice => ({
              name: choice,
              value: choice,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("achivement")
        .setDescription("View information about Achievement Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.ACHIEVEMENT).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("automation")
        .setDescription("View information about Automation Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.AUTOMATION).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("infinity")
        .setDescription("View information about Infinity Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.INFINITY).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("eternity")
        .setDescription("View information about Eternity Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.ETERNITY).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("dilation")
        .setDescription("View information about Dilation Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.DILATION).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("reality")
        .setDescription("View information about Reality Perks")
        .addStringOption(option =>
          option
            .setName("perk")
            .setDescription("Which Perk would you like information about?")
            .setChoices(perksFromFamily(PERK_FAMILY.REALITY).map(perk => ({
              name: `${perk.id} (${perk.name})`,
              value: perk.id,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    ),
  embed: (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === "info") {
      const requestedInfo = interaction.options.getString("info", true);
      return new BasicTextCustomEmbed({
        interaction,
        title: "Perk Information",
        field: {
          name: capitalise(requestedInfo),
          value: perkInfo[requestedInfo],
          inline: false
        },
        colour: Colours.Reality
      });
    }

    const requestedPerk = interaction.options.getString("perk", true);

    const perk = perks[requestedPerk];

    if (!perk) {
      return new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing your requested perk of type ${subcommand} and perk ${requestedPerk}.`
      });
    }

    return new PerkCustomEmbed({ interaction, perk });
  }
});