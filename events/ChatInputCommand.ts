import { type CacheType, Events, type Interaction, MessageFlags } from "discord.js";
import type { ADABClient } from "@/types/ADABClient";
import type { BaseEvent } from "@/types/BaseEvent";

export default <BaseEvent>{
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const client: ADABClient = interaction.client as ADABClient;
    const requests = await client.commandsDB.get("totalRequests");

    if (requests) {
      client.commandsDB.set("totalRequests", requests + 1);
    } else {
      console.log("Failed to fetch totalRequests from DB.");
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.log(`No matching command for command ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);

      const successes = await client.commandsDB.get("totalSuccesses");
      if (successes) {
        client.commandsDB.set("totalSuccesses", successes + 1);
      } else {
        console.log("Failed to fetch totalSuccesses from DB.");
      }

      const commandUsages = await client.commandsDB.get(interaction.commandName);
      if (commandUsages) {
        client.commandsDB.set(interaction.commandName, commandUsages + 1);
      } else {
        client.commandsDB.set(interaction.commandName, 1);
      }

      const user = await client.usersDB.get(interaction.user.id);
      if (user) {
        client.usersDB.set(interaction.user.id, user + 1);
      } else {
        client.usersDB.set(interaction.user.id, 1);
      }
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
};
