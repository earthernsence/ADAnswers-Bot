import { ButtonInteraction, ChatInputCommandInteraction, ComponentType, MessageComponentInteraction, MessageFlags, SlashCommandBuilder, StringSelectMenuInteraction } from "discord.js";
import { Command } from "@/types/Commands/Command";
import { HelpCustomEmbed } from "@/types/Embeds/HelpCustomEmbed";

export default new Command({
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("displays a help embed with all possible commands"),
  execute: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    const customEmbed = new HelpCustomEmbed({ interaction });
    const image = customEmbed.getAndSetThumbnail();

    const initialReply = await interaction.reply({
      embeds: [customEmbed.create()],
      files: [image],
      components: [customEmbed.buttons, customEmbed.selectMenu],
      flags: MessageFlags.Ephemeral
    });

    const buttonCollector = initialReply.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (i: MessageComponentInteraction) => customEmbed.filter(i),
      time: 60000
    });

    const selectMenuCollector = initialReply.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i: MessageComponentInteraction) => customEmbed.filter(i),
      time: 60000
    });

    buttonCollector.on("collect", async(i: ButtonInteraction) => {
      const forward = i.customId.startsWith("help_button_next");

      const newEmbed = customEmbed.nextPage(forward);

      await i.update({
        files: [image],
        embeds: [newEmbed],
        components: [customEmbed.buttons, customEmbed.selectMenu],
      });
    });

    selectMenuCollector.on("collect", async(i: StringSelectMenuInteraction) => {
      const selected = i.values[0];
      await i.update({
        files: [image],
        embeds: [customEmbed.selectPage(selected)],
        components: [customEmbed.buttons, customEmbed.selectMenu]
      });
    });
  }
});