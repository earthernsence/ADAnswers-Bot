import { inlineCode, SlashCommandBuilder } from "discord.js";
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { link } from "@/utils/utils_commands";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("contributors")
    .setDescription("sends a list of contributors to ADAB. this bot would not be possible without them!"),
  text: `
Hellbach: basis for most of the commands, provided much of the information used in this bot,
Kajfik: Code contributions, notably in eternity challenges,
L4R5: EC database,
Ninjatsu: the EC spreadsheet used by many players, provided all of the information in the EC database,
Pez: commands.find() in commands.js,
MrKrutaman: many sprites used in several commands,
Mirai Sozo: Misc. Reality content
Gaunter: ${link("GlyphAPI", "https://github.com/lrobt97/glyphapi")} used in ${inlineCode("/glyph utils")}`
});