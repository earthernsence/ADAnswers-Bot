import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("stickybuttons")
    .setDescription("Explains how to use sticky buttons on PC and mobile"),
  text: `
On PC:
1. Hold a hotkey
2. Press H to open the How-to-Play modal, or click the ? in the top right
3. Let go of the hotkey(s) from step 1
4. Close the How-to-Play modal
The game will act as if that key is constantly being held. A key will become un-stuck if it's pressed again, or (not including R) if the game becomes unfocused in any way, such as clicking to another tab or window. There is no limit to how many keys you can stick at once.

On mobile, hold one of the bottom buttons for about half a second. The button being stuck will appear brighter and have a white outline. Unlike PC, sticky buttons are only available after reaching Infinity, and only one button can be stuck at a time (but you can hold another button manually simultaneously).`
});
