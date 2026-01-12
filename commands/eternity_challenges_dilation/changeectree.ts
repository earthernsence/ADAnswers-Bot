import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("changeectree")
    .setDescription("describes how to change your tree before doing an EC"),
  text: `
As long as you buy the EC before you respec and don't buy another, you won't need to complete the secondary requirement again. 
For example, with EC3:
- unlock EC3 with TD/Active
- respec and eternity
- Buy the recommended tree
- unlock EC3`
});
