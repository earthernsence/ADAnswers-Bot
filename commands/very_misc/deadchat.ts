import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder().setName("deadchat").setDescription(`explains why saying "dead chat" is bad`),
  text: `If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`
});
