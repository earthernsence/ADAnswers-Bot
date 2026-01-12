import { type CacheType, Events, type Interaction } from "discord.js";
import type { ADABClient } from "@/types/ADABClient";
import type { BaseEvent } from "@/types/BaseEvent";

export default (<BaseEvent>{
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isMessageContextMenuCommand()) return;

    const ctxCommand = (interaction.client as ADABClient).contextCommands.get(interaction.commandName);

    if (!ctxCommand) {
      console.log(`No matching command for context command ${interaction.commandName}`);
      return;
    }

    try {
      await ctxCommand.execute(interaction);
    } catch (error) {
      console.error(error);
    }
  }
});
