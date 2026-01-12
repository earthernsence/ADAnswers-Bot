import { ApplicationCommandOptionType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import type { BreakInfinityUpgrade } from "@/types/game_data/upgrades/BreakInfinityUpgrade";
import { BreakInfinityUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/BreakInfinityUpgradeCustomEmbed";
import { BreakInfinityUpgrades } from "@/utils/game_data/upgrades/break_upgrades";
import type { ChargedInfinityUpgrade } from "@/types/game_data/upgrades/ChargedInfinityUpgrade";
import { ChargedInfinityUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/ChargedInfinityUpgradeCustomEmbed";
import type { DilationUpgrade } from "@/types/game_data/upgrades/DilationUpgrade";
import { DilationUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/DilationUpgradeCustomEmbed";
import { DilationUpgrades } from "@/utils/game_data/upgrades/dilation_upgrades";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import type { EternityUpgrade } from "@/types/game_data/upgrades/EternityUpgrade";
import { EternityUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/EternityUpgradeCustomEmbed";
import { EternityUpgrades } from "@/utils/game_data/upgrades/eternity_upgrades";
import { getUpgrade } from "@/utils/game_data/upgrades/upgrades";
import type { ImaginaryUpgrade } from "@/types/game_data/upgrades/ImaginaryUpgrade";
import { ImaginaryUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/ImaginaryUpgradeCustomEmbed";
import { ImaginaryUpgrades } from "@/utils/game_data/upgrades/imaginary_upgrades";
import type { InfinityUpgrade } from "@/types/game_data/upgrades/InfinityUpgrade";
import { InfinityUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/InfinityUpgradeCustomEmbed";
import { InfinityUpgrades } from "@/utils/game_data/upgrades/infinity_upgrades";
import type { RealityUpgrade } from "@/types/game_data/upgrades/RealityUpgrade";
import { RealityUpgradeCustomEmbed } from "@/types/Embeds/Upgrades/RealityUpgradeCustomEmbed";
import { RealityUpgrades } from "@/utils/game_data/upgrades/reality_upgrades";

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("upgrade")
    .setDescription("Provides information about a given upgrade.")
    .addSubcommand(subcommand =>
      subcommand
        .setName("infinity")
        .setDescription("View information about Infinity upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(InfinityUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
        .addBooleanOption(option =>
          option.setName("charged").setDescription("View information about the charged version?").setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("break")
        .setDescription("View information about Break Infinity upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(BreakInfinityUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("eternity")
        .setDescription("View information about Eternity upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(EternityUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("dilation")
        .setDescription("View information about Dilation upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(DilationUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("reality")
        .setDescription("View information about Reality upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(RealityUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("imaginary")
        .setDescription("View information about Imaginary upgrades")
        .addStringOption(option =>
          option
            .setName("upgrade")
            .setDescription("Which upgrade would you like information about?")
            .setChoices(
              Object.values(ImaginaryUpgrades).map(upgrade => ({
                name: upgrade.name,
                value: upgrade.name,
                type: ApplicationCommandOptionType.String
              }))
            )
            .setRequired(true)
        )
    ),
  embed: (interaction: ChatInputCommandInteraction) => {
    const isCharged = interaction.options.getBoolean("charged", false);

    const requestedUpgradeType = isCharged ? "charged" : interaction.options.getSubcommand(true);
    const requestedUpgrade = interaction.options.getString("upgrade", true);

    const upgrade = getUpgrade(requestedUpgradeType, requestedUpgrade);

    if (!upgrade) {
      return new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing your requested upgrade of type ${requestedUpgradeType} and upgrade ${requestedUpgrade}`
      });
    }

    switch (requestedUpgradeType) {
      case "infinity":
        return new InfinityUpgradeCustomEmbed({ interaction, upgrade: upgrade as InfinityUpgrade });
      case "charged":
        return new ChargedInfinityUpgradeCustomEmbed({ interaction, upgrade: upgrade as ChargedInfinityUpgrade });
      case "break":
        return new BreakInfinityUpgradeCustomEmbed({ interaction, upgrade: upgrade as BreakInfinityUpgrade });
      case "eternity":
        return new EternityUpgradeCustomEmbed({ interaction, upgrade: upgrade as EternityUpgrade });
      case "dilation":
        return new DilationUpgradeCustomEmbed({ interaction, upgrade: upgrade as DilationUpgrade });
      case "reality":
        return new RealityUpgradeCustomEmbed({ interaction, upgrade: upgrade as RealityUpgrade });
      case "imaginary":
        return new ImaginaryUpgradeCustomEmbed({ interaction, upgrade: upgrade as ImaginaryUpgrade });
      default:
        throw new Error(`Unknown upgrade type (type ${requestedUpgradeType}) in /upgrade!`);
    }
  }
});
