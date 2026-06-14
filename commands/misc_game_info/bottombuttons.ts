import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("bottombuttons")
    .setDescription(`Explains each mobile "bottom button" (effectively hotkeys) and what they do`),
  text: `You can use bottom buttons in Android version to perform various actions quickly. By default, you can see only Max button, but you can show all buttons by changing option Bottom buttons to ALL.

E - ||\`E\`ternity||
C - ||Big \`C\`runch||
G - Antimatter \`G\`alaxy
D - \`D\`imension Boost
R - ||\`R\`eplicanti Galaxy||
M/Max - \`M\`ax all (1st ~ 8th Dim and Tickspeed)`
});
