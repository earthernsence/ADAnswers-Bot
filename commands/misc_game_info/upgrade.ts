import { ApplicationCommandOptionType, ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";
import { Command } from "@/types/Commands/Command";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { InfinityUpgrade } from "@/types/game_data/upgrades/InfinityUpgrade";
import { InfinityUpgradeCustomEmbed } from "@/types/Embeds/InfinityUpgradeCustomEmbed";
import { InfinityUpgrades } from "@/utils/game_data/upgrades/infinity_upgrades";
import { getUpgrade } from "@/utils/game_data/upgrades/upgrades";
import { isUserHelper } from "@/utils/utils_commands";

export default new Command({
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
            .setChoices(Object.values(InfinityUpgrades).map(upgrade => ({
              name: upgrade.name,
              value: upgrade.name,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
        .addBooleanOption(option =>
          option
            .setName("charged")
            .setDescription("View information about the charged version?")
            .setRequired(false)
        )
    ),
  execute: (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const isCharged = interaction.options.getBoolean("charged", false);

    const requestedUpgradeType = isCharged ? "charged" : interaction.options.getSubcommand(true);
    const requestedUpgrade = interaction.options.getString("upgrade", true);

    const upgrade = getUpgrade(requestedUpgradeType, requestedUpgrade);

    if (!upgrade) {
      const errorEmbed = new ErrorCustomEmbed({
        interaction,
        text: `There was a problem processing your requested upgrade of type ${requestedUpgradeType} and upgrade ${requestedUpgrade}`
      });

      const errorImage = errorEmbed.getAndSetThumbnail();

      interaction.reply({
        embeds: [errorEmbed.create()],
        files: [errorImage],
        flags: MessageFlags.Ephemeral
      });

      return;
    }

    let customEmbed;

    switch (requestedUpgradeType) {
      case "infinity":
        customEmbed = new InfinityUpgradeCustomEmbed({ interaction, upgrade: upgrade as InfinityUpgrade });
        break;
      default:
        throw new Error(`Unknown upgrade type (type ${requestedUpgradeType}) in /upgrade!`);
    }

    const image = customEmbed.getAndSetThumbnail();

    interaction.reply({
      embeds: [customEmbed.create()],
      files: [image],
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });
  }
});