import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  MessageFlags,
  type RepliableInteraction,
  SlashCommandBuilder
} from "discord.js";
import { type CollectorComponentInteraction, CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { AlchemyResource } from "@/utils/game_data/glyphs/AlchemyResource";
import { AlchemyResourceCustomEmbed } from "@/types/Embeds/Glyphs/AlchemyResourceCustomEmbed";
import { alchemyResources } from "@/utils/game_data/glyphs/alchemy";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { buildCustomId } from "@/utils/utils_commands";
import { capitalise } from "@/utils/utils_formatting";
import { Colours } from "@/utils/utils_colours";

const alchemyInfo: Record<string, string> = {
  /* eslint-disable @stylistic/max-len */
  unlock:
    "Glyph Alchemy is a mechanic unlocked by reaching Effarig level 2 in Ra. This unlocks the ability for the player to *refine* Glyphs, instead of sacrificing Glyphs. Visit the Sacrifice Type options in the Glyph tab to alter your filter's behaviour with incoming Glyphs. The unlock also unlocks a new subtab in the Reality tab, which you can visit for more information.",
  refinement:
    "The 6 basic Alchemic Resources (Power, Infinity, Replication, Time, Dilation, Effarig) are obtained by refining those Glyphs. The amount of those resources gained per Glyph is based on the cube of the Glyph's level, scaled so that level 10000 Glyphs correspond to 10000 Alchemy Resources (formula: `(level ^ 3) / 1e8`). The rarity of a given Glyph also contributes to the amount of resources gained per Glyph; a 50% rarity glyph only gives half of the resources an 100% rarity Glyph would. However, a single Glyph only gives 5% of this value when refined. The Alchemy Resource `Decoherence` gives a percentage of a refined Glyph's value to all other basic Alchemy Resources.",
  cap: `There is a cap for all resources which is based on the highest refinement value of all the Glyphs that you have refined. If the highest level Time Glyph you have ever refined is level 8000, you can never have more than 5120 Time Alchemy Resource until you refine a better Glyph.
The cap for compound resources is equal to the lowest cap amongst all of its reagents; for example, if your Power cap was 5000, but your Infinity cap was 10000, you would only be able to get 5000 Dimensionality.`,
  reactions:
    "Alchemy Resources can be combined together to create new, more powerful resources, which are unlocked at certain Effarig levels. You can use the `/alchemy resource` command to learn more about a specific resource, its unlock, and its reagents. Reactions occur once per Reality, and only occur if the current amount of all reagents is greater than the current amount of the produced resource. The Alchemy Resource `Synergism` increases the yield of these reactions from the base level of 30%. To activate a reaction, you can click the circle corresponding to the reaction's product. If a reaction can take place, moving lines will be shown from all reagents leading to the product; if it is a solid line, the reaction can't proceed due to a lack of reagents."
  /* eslint-enable @stylistic/max-len */
};

/**
 * `/alchemy resource`: view an Alchemy Resource, with buttons that jump straight to its
 * reagents.
 *
 * `/alchemy info` is a separate, static-content subcommand handled directly in `performExecute`
 * before falling through to the collector-embed flow. This is the same pattern as Eternity Challenge's
 * standalone `tree` option.
 */
class AlchemyCommand extends CollectorEmbedCommand<AlchemyResource> {
  constructor() {
    super({
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
                .setChoices(
                  Object.keys(alchemyInfo).map(choice => ({
                    name: choice,
                    value: choice,
                    type: ApplicationCommandOptionType.String
                  }))
                )
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
                .setChoices(
                  Object.entries(alchemyResources).map(resource => ({
                    name: resource[1].prettyName.replaceAll("**", ""),
                    value: resource[0],
                    type: ApplicationCommandOptionType.String
                  }))
                )
                .setRequired(true)
            )
        ),
      prefix: "alch"
    });
  }

  protected findInitial(interaction: ChatInputCommandInteraction): AlchemyResource | undefined {
    const requestedResource = interaction.options.getString("resource", true);
    return alchemyResources[requestedResource];
  }

  protected notFoundText(interaction: ChatInputCommandInteraction): string {
    const requestedResource = interaction.options.getString("resource", true);
    return `That Alchemy Resource doesn't exist!\nResource requested: ${requestedResource}`;
  }

  protected encodeIdentifier(item: AlchemyResource): string {
    return item.name.toLowerCase();
  }

  protected decodeIdentifier(encoded: string): AlchemyResource | undefined {
    return alchemyResources[encoded];
  }

  protected buildEmbed(interaction: RepliableInteraction, item: AlchemyResource): AlchemyResourceCustomEmbed {
    return new AlchemyResourceCustomEmbed({ interaction, resource: item });
  }

  protected buildComponents(item: AlchemyResource, userId: string): Array<ActionRowBuilder<ButtonBuilder>> {
    if (item.reagents.length === 0) return [];

    const buttons = item.reagents.map(([reagentName]) => {
      const reagent = alchemyResources[reagentName.toLowerCase()];

      return new ButtonBuilder()
        .setCustomId(buildCustomId(this.prefix, "goto", userId, this.encodeIdentifier(reagent)))
        .setLabel(`${reagent.symbol} ${reagent.name}`)
        .setStyle(ButtonStyle.Primary);
    });

    // Discord caps a row at 5 buttons. Only Reality has more than 5 reagents; split evenly across
    // two rows when that happens.
    if (buttons.length > 5) {
      const half = Math.ceil(buttons.length / 2);
      return [
        new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons.slice(0, half)),
        new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons.slice(half))
      ];
    }

    return [new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)];
  }

  protected async handleAction(
    interaction: CollectorComponentInteraction,
    action: string,
    item: AlchemyResource
  ): Promise<AlchemyResource | null> {
    // `item` here is already the destination reagent - decodeIdentifier resolved it directly,
    // there's no separate "current -> next" step the way Previous/Next commands have.
    if (action === "goto") return item;

    await interaction.reply({ content: "That button doesn't do anything (yet)!", flags: MessageFlags.Ephemeral });
    return null;
  }

  protected override async performExecute(interaction: ChatInputCommandInteraction): Promise<void> {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === "info") {
      const info = interaction.options.getString("info", true);
      const content = alchemyInfo[info];

      const embed = new BasicTextCustomEmbed({
        interaction,
        title: "Alchemy Info",
        field: { name: capitalise(info), value: content, inline: false },
        colour: Colours.Reality
      });

      const image = embed.getAndSetThumbnail();

      await interaction.reply({
        embeds: [embed.create()],
        flags: this.getFlags(interaction),
        files: [image]
      });

      return;
    }

    await super.performExecute(interaction);
  }
}

export default new AlchemyCommand();
