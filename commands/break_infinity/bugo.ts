import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  MediaGalleryBuilder,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";
import { Command } from "@/types/Commands/Command";
import { isUserHelper } from "@/utils/utils_commands";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("bugo")
    .setDescription("Provides the recommended post- Break Infinity upgrade order."),
  execute: async (interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const bugoImage = new AttachmentBuilder("images/upgrades/bugo-v3.png");

    const image = new MediaGalleryBuilder().addItems(item =>
      item.setDescription("A full Break Infinity upgrade guide.").setURL("attachment://bugo-v3.png")
    );

    await interaction.reply({
      components: [image],
      files: [bugoImage],
      // For some reason or other, Typescript refuses to let me do this as an array
      // since one of the flags is conditional, so we have to do bitwise math here.
      // oxlint-disable-next-line no-bitwise
      flags: MessageFlags.IsComponentsV2 | (isUserHelper(interaction) ? 0 : MessageFlags.Ephemeral)
    });
  }
});
