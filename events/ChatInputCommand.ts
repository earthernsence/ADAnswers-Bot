import { type CacheType, Events, type Interaction, MessageFlags } from "discord.js";
import type { ADABClient } from "@/types/ADABClient";
import type { BaseEvent } from "@/types/BaseEvent";

export default (<BaseEvent>{
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction.client as ADABClient).commands.get(interaction.commandName);

    if (!command) {
      console.log(`No matching command for command ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: `Error while executing command ${interaction.commandName}`,
          flags: MessageFlags.Ephemeral
        });
      } else {
        await interaction.reply({
          content: `Error while executing command ${interaction.commandName}`,
          flags: MessageFlags.Ephemeral
        });
      }
    }
  }
});
