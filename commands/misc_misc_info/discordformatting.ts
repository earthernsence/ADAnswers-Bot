import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { link } from "@/utils/utils_commands";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("discordformatting")
    .setDescription("links to a helpful guide on discord formatting"),
  text: `Learn discord formatting ${link("here", "https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51")}`
});
