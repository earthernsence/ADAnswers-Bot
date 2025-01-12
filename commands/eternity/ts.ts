import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "@/types/Commands/Command";

import studytree from "./studytree";

export default new Command({
  data: studytree.data.setName("ts"),
  execute: (interaction: ChatInputCommandInteraction) => studytree.execute(interaction),
});