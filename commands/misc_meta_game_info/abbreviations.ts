import { SlashCommandBuilder, bold, spoiler } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("abbreviations")
    .setDescription("sends an abbreviation guide, based on the one from the h2p"),
  text: `
${bold("AM")}: Antimatter
${bold("AD X")}: Antimatter Dimension X
${bold("AG")}: Antimatter Galaxy
${spoiler(`${bold("NC X")}: Normal Challenge X`)}
${spoiler(`${bold("IC X")}: Infinity Challenge X`)}
${spoiler(`${bold("ID X")}: Infinity Dimension X`)}
${spoiler(`${bold("RG")}: Replicanti Galaxy`)}
${spoiler(`${bold("EP")}: Eternity Point`)}
${spoiler(`${bold("TT")}: Time Theorem`)}
${spoiler(`${bold("TS X")}: Time Study X`)}
${spoiler(`${bold("TD X")}: Time Dimension X`)}
${spoiler(`${bold("EC X x Y")}: Eternity Challenge X completion Y`)}
${spoiler(`${bold("EU")}: Eternity Upgrade`)}
${spoiler(`${bold("TP")}: Tachyon Particle`)}
${spoiler(`${bold("DT")}: Dilated Time`)}
${spoiler(`${bold("TG")}: Tachyon Galaxy`)}
${spoiler(`${bold("RM")}: Reality Machine`)}
${spoiler(`${bold("PP")}: Perk Point`)}
${spoiler(`${bold("AP")}: Automator Point`)}
${spoiler(`${bold("BH")}: Black Hole`)}
${spoiler(`${bold("Cel X")}: Celestial X`)}
${spoiler(`${bold("iM")}: Imaginary Machine`)}
${spoiler(`${bold("DM")}: Dark Matter`)}
${spoiler(`${bold("DE")}: Dark Energy`)}
  `
});