/* eslint-disable @stylistic/max-len */
import { BasicTextCommand } from "@/types/Commands/BasicTextCommand";
import { link } from "@/utils/utils_commands";
import { SlashCommandBuilder } from "discord.js";

export default new BasicTextCommand({
  data: new SlashCommandBuilder()
    .setName("offlineticks")
    .setDescription("explains how the offline ticks and progression system works"),
  text: `
If you would like to have better offline progress and don't mind longer loading times you can increase the „Max offline ticks“ option up to 1m which represents 14 hours of accurate offline progress. Pressing the „speed up“ button calculates the rest of the offline ticks as if you had set the limit to 1k.
More info ${link("here", "https://www.reddit.com/r/AntimatterDimensions/comments/esiji2/mobile_offline_ip_generation_is_significantly/ffa98qt")}.
Another explanation, courtesy of Tables:
It's how many ticks of progress you can get at maximum when the game isn't active
Normally 1 second = 20 ticks, so if your max offline ticks is less than that amount (e.g. 1 hour = 3600 seconds = 72,000 ticks) that's simply how much you get. If your max offline ticks are lower than that, your ticks get spaced out so they represent more time each. For instance in the above, if you have a max of 25K, each offline tick would need to be about 130ms long or so.
You still get the same amount of time of progress, but if your ticks get spaced out to be too long it can affect autobuyers and the like. For instance in the above case, your autobuyers would only be able to activate every 130ms instead of every 50ms, meaning it might impact progress a little
The downside of max offline ticks is the time it takes when loading the game. Since the game has to calculate it all when you load it back up, it can easily take several minutes to re-calculate your progress, especially if you set it to a really high value and are AFK for several hours.`
});
