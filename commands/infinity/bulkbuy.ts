import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("bulkbuy")
    .setDescription("describes bulk buy"),
  text: `
This allows you to buy more than one set (ONLY on buy 10s) in one interval. This helps speed up runs overall when using autobuyers. At 512 bulk for all autobuyers bulk buy is maximised.
Another explanation, courtesy of the mobile how to play: Once the interval of a Dimension Autobuyer is maxed, all future upgrades will double the amount the autobuyer purchases per tick. This can be disabled.`
});