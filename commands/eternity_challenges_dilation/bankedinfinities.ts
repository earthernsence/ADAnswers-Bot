/* eslint-disable @stylistic/max-len */
import { SlashCommandBuilder, inlineCode } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("bankedinfinities")
    .setDescription("describes banked infinities, what they do, and how to get them"),
  text: `
Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities, and then Eternity.
Method for obtaining: see ${inlineCode(`/infinitygrinding post`)}!`
});