import { type CacheType, Events, type Interaction, MessageFlags } from "discord.js";
import type { BaseEvent } from "@/types/BaseEvent";
import { CollectorEmbedCommand } from "@/types/Commands/CollectorEmbedCommand";
import { parseCustomId } from "@/utils/utils_commands";

// Handles clicks on buttons & select menus produced by any CollectorEmbedCommand. Kept separate from
// ChatInputCommand.ts since this dispatch is a different problem (routing by custom ID
// prefix instead of command name) and we don't want the two error-handling paths to overlap.
export default <BaseEvent>{
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    const { prefix, action, userId, encoded } = parseCustomId(interaction.customId);
    const command = CollectorEmbedCommand.registry.get(prefix);

    if (!command) return;

    try {
      await command.handleComponent(interaction, action, userId, encoded);
    } catch (error) {
      console.error(error);

      await interaction
        .reply({ content: `Error while handling this interaction.`, flags: MessageFlags.Ephemeral })
        .catch(() => console.log(`Error while handling an interaction.`));
    }
  }
};
