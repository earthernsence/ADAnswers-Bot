import { type CacheType, Events, type Interaction, MessageFlags } from "discord.js";
import type { BaseEvent } from "@/types/BaseEvent";
import { CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { parseCustomId } from "@/utils/utils_commands";

// Handles clicks on buttons produced by any CollectorEmbedCommand. Kept separate from
// ChatInputCommand.ts since button dispatch is a different shape of problem (routing by custom ID
// prefix instead of command name) and we don't want the two error-handling paths to overlap.
export default <BaseEvent>{
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton()) return;

    const { prefix, action, userId, encoded } = parseCustomId(interaction.customId);
    const command = CollectorEmbedCommand.registry.get(prefix);

    if (!command) return;

    try {
      await command.handleButton(interaction, action, userId, encoded);
    } catch (error) {
      console.error(error);

      await interaction
        .reply({ content: `Error while handling this button.`, flags: MessageFlags.Ephemeral })
        .catch(() => console.log(`Error while handling button press.`));
    }
  }
};