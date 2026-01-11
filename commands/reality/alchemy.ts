import { ApplicationCommandOptionType, ButtonInteraction, ChatInputCommandInteraction, ComponentType, type InteractionReplyOptions, MessageComponentInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { AlchemyResourceCustomEmbed } from "@/types/Embeds/Glyphs/AlchemyResourceCustomEmbed";
import { alchemyResources } from "@/utils/game_data/glyphs/alchemy";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { capitalise } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";
import { Command } from "@/types/Commands/Command";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { isUserHelper } from "@/utils/utils_commands";

const alchemyInfo: Record<string, string> = {
  /* eslint-disable @stylistic/max-len */
  "unlock": "Glyph Alchemy is a mechanic unlocked by reaching Effarig level 2 in Ra. This unlocks the ability for the player to *refine* Glyphs, instead of sacrificing Glyphs. Visit the Sacrifice Type options in the Glyph tab to alter your filter's behaviour with incoming Glyphs. The unlock also unlocks a new subtab in the Reality tab, which you can visit for more information.",
  "refinement": "The 6 basic Alchemic Resources (Power, Infinity, Replication, Time, Dilation, Effarig) are obtained by refining those Glyphs. The amount of those resources gained per Glyph is based on the cube of the Glyph's level, scaled so that level 10000 Glyphs correspond to 10000 Alchemy Resources (formula: `(level ^ 3) / 1e8`). The rarity of a given Glyph also contributes to the amount of resources gained per Glyph; a 50% rarity glyph only gives half of the resources an 100% rarity Glyph would. However, a single Glyph only gives 5% of this value when refined. The Alchemy Resource `Decoherence` gives a percentage of a refined Glyph's value to all other basic Alchemy Resources.",
  "cap": `There is a cap for all resources which is based on the highest refinement value of all the Glyphs that you have refined. If the highest level Time Glyph you have ever refined is level 8000, you can never have more than 5120 Time Alchemy Resource until you refine a better Glyph.
The cap for compound resources is equal to the lowest cap amongst all of its reagents; for example, if your Power cap was 5000, but your Infinity cap was 10000, you would only be able to get 5000 Dimensionality.`,
  "reactions": "Alchemy Resources can be combined together to create new, more powerful resources, which are unlocked at certain Effarig levels. You can use the `/alchemy resource` command to learn more about a specific resource, its unlock, and its reagents. Reactions occur once per Reality, and only occur if the current amount of all reagents is greater than the current amount of the produced resource. The Alchemy Resource `Synergism` increases the yield of these reactions from the base level of 30%. To activate a reaction, you can click the circle corresponding to the reaction's product. If a reaction can take place, moving lines will be shown from all reagents leading to the product; if it is a solid line, the reaction can't proceed due to a lack of reagents."
  /* eslint-enable @stylistic/max-len */
};

export default new Command({
  data: new SlashCommandBuilder()
    .setName("alchemy")
    .setDescription("Provides information about Glyph Alchemy & its effects")
    .addSubcommand(subcommand =>
      subcommand
        .setName("info")
        .setDescription("View basic information about Glyph Alchemy")
        .addStringOption(option =>
          option
            .setName("info")
            .setDescription("What particular information would you like?")
            .setChoices(Object.keys(alchemyInfo).map(choice => ({
              name: choice,
              value: choice,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("resource")
        .setDescription("View information about a specific Glyph Alchemy resource")
        .addStringOption(option =>
          option
            .setName("resource")
            .setDescription("Which resource would you like information about?")
            .setChoices(Object.entries(alchemyResources).map(resource => ({
              name: resource[1].prettyName.replaceAll("**", ""),
              value: resource[0],
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    ),
  execute: async(interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === "resource") {
      const requestedResource = interaction.options.getString("resource", true);
      const user = interaction.member === null ? interaction.user : interaction.member.user;

      if (!user) {
        const errorEmbed = new ErrorCustomEmbed({
          interaction,
          text: `There was an issue running this command.`
        });

        const errorImage = errorEmbed.getAndSetThumbnail();

        interaction.reply({
          embeds: [errorEmbed.create()],
          files: [errorImage],
          flags: MessageFlags.Ephemeral
        });

        return;
      }

      let resource = alchemyResources[requestedResource];
      const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
      const embed = new AlchemyResourceCustomEmbed({ interaction, resource, expirationTimestamp });
      const picture = embed.getAndSetThumbnail();

      const initialContent: InteractionReplyOptions = {
        embeds: [embed.create()],
        files: [picture],
        flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral,
        components: resource.createReagentButtons(expirationTimestamp)
      };

      const response = await interaction.reply(initialContent);

      // Don't bother making a collector if there's nothing that can be pressed.
      if (resource.reagents.length > 0) {
        const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
        const collector = response.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 60_000,
          filter
        });

        collector.on("collect", async(i: ButtonInteraction) => {
          if (i.member?.user.id !== user.id) return;

          // Hacky, but the idea is that without fail, the resource will always be the third
          // member of this array.
          const res = i.customId.split("_")[2].toLowerCase();

          resource = alchemyResources[res];

          const newEmbed = new AlchemyResourceCustomEmbed({ interaction, resource, expirationTimestamp });
          const newPicture = newEmbed.getAndSetThumbnail();

          await i.update({
            embeds: [newEmbed.create()],
            files: [newPicture],
            components: resource.createReagentButtons(expirationTimestamp)
          });
        });

        collector.on("end", async() => {
          const finalEmbed = new AlchemyResourceCustomEmbed({ interaction, resource, expirationTimestamp });
          const finalImage = finalEmbed.getAndSetThumbnail();

          await response.edit({
            embeds: [finalEmbed.create()],
            files: [finalImage],
            components: resource.createReagentButtons(expirationTimestamp)
          });
        });
      }

      return;
    }

    const info = interaction.options.getString("info", true);
    const content = alchemyInfo[info];

    const embed = new BasicTextCustomEmbed({
      interaction,
      title: "Alchemy Info",
      field: {
        name: capitalise(info),
        value: content,
        inline: false
      },
      colour: Colours.Reality
    });

    const image = embed.getAndSetThumbnail();

    await interaction.reply({
      embeds: [embed.create()],
      files: [image]
    });

    // Return new BasicTextCustomEmbed({
    //   interaction,
    //   title: "Alchemy Information",
    //   field: {
    //     name: capitalise(info),
    //     value: alchemyInfo[info],
    //     inline: false
    //   },
    //   colour: Colours.Reality
    // });
  }
});