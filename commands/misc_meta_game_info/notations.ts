import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { link } from "@/utils/utils_commands";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("notations")
    .setDescription("sends a link to the antimatter-dimensions/notations GitHub repository"),
  text: `Check out all notations in action ${link("here", "https://antimatter-dimensions.github.io/notations/")} (${link("GitHub repo", "https://github.com/antimatter-dimensions/notations")})`
});
