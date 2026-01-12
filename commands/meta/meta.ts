import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  ComponentType,
  MessageComponentInteraction,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";
import { Command } from "@/types/Commands/Command";
import { isUserHelper } from "@/utils/utils_commands";
import { MetaCustomEmbed } from "@/types/Embeds/MetaCustomEmbed";

export default new Command({
  data: new SlashCommandBuilder().setName("meta").setDescription("Provides some information about the bot."),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const customEmbed = new MetaCustomEmbed({ interaction });
    const image = customEmbed.getAndSetThumbnail();

    const initialReply = await interaction.reply({
      embeds: [customEmbed.create()],
      files: [image],
      components: [customEmbed.buttons],
      flags: isUserHelper(interaction) ? undefined : MessageFlags.Ephemeral
    });

    const collector = initialReply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (i: MessageComponentInteraction) => customEmbed.filter(i),
      time: 60000
    });

    collector.on("collect", async (i: ButtonInteraction) => {
      const forward = i.customId.includes("next");

      const newEmbed = customEmbed.nextPage(forward);

      await i.update({
        files: [image],
        embeds: [newEmbed],
        components: [customEmbed.buttons]
      });
    });

    collector.on("end", async () => {
      await interaction.editReply({
        embeds: [customEmbed.create()],
        components: [customEmbed.buttons],
        files: [image]
      });
    });
  }
});
