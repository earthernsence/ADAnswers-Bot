/* eslint-disable @stylistic/max-len */
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { link } from "@/utils/utils_commands";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("savesharing")
    .setDescription("provides a brief explanation on how to share saves."),
  text: `
Due to the size of Antimatter Dimensions saves, you can not share them directly on Discord. \nInstead, you need to upload them to a site such as ${link("paste.ee", "https://paste.ee/")}. Pastebin will NOT work for this. \n\nTo do this, follow these steps: 
1.  Export your save from the "Options" tab in-game. You should get a pop-up saying your save was copied to your clipboard.
2.  Open up ${link("paste.ee", "https://paste.ee/")} in your browser of choice. 
3.  Paste your save data in the big box in the site. Save data begins with "AntimatterDimensionsSavefileFormat" or "AntimatterDimensionsAndroidSaveFormat" and ends with "EndOfSaveFile" on mobile. 
4.  Click "Submit" at the bottom of the page. You will be taken to a new page with your save data. 
5.  Copy the URL to the page. It should look like this: ${link("paste.ee", "https://paste.ee/")}
6.  Paste that link in the Discord. A helper can then copy and look at your save data and import it into their own game.`
});
