import { ApplicationCommandOptionType, ChatInputCommandInteraction, inlineCode, SlashCommandBuilder } from "discord.js";
import { effectProbability, rarityProbability, threshold } from "@/utils/game_data/glyphs/glyph_utils";
import { GlyphEmotes, Symbols } from "@/utils/utils_symbols";
import { BasicEmbedCommand } from "@/types/Commands/BasicEmbedCommand";
import { BasicTextCustomEmbed } from "@/types/Embeds/BasicTextCustomEmbed";
import { capitalise } from "@/utils/utils_formatting";
import { Channels } from "@/utils/utils_channels";
import { Colours } from "@/utils/utils_colours";
import { ErrorCustomEmbed } from "@/types/Embeds/ErrorCustomEmbed";
import { GlyphEffectCustomEmbed } from "@/types/Embeds/Glyphs/GlyphEffectCustomEmbed";
import { glyphs } from "@/utils/game_data/glyphs/glyphs";
import { GlyphSacrificeCustomEmbed } from "@/types/Embeds/Glyphs/GlyphSacrificeCustomEmbed";

// eslint-disable-next-line no-unused-vars
const glyphInfo: Record<string, (isADServer: boolean) => string> = {
  /* eslint-disable @stylistic/max-len */
  intro(isADServer: boolean): string {
    return `Welcome to Reality!

Whenever you create a new Reality, you will choose (or be given) a new Glyph. These Glyphs provide powerful bonuses, but only while they are equipped.

These glyphs appear in the Glyph tab, in a massive grid called the Glyph Inventory. At the top of the Glyph tab is a series of 3-5 circles, which represent your equipped glyphs. 

On your first Reality, you are guaranteed to receive a ${isADServer ? GlyphEmotes.Power : Symbols.Power} Power Glyph that raises all Antimatter Dimensions to a small power. It is recommended that you equip it immediately.`;
  },
  // eslint-disable-next-line no-unused-vars
  equipping(_isADServer: boolean): string {
    return `To equip a Glyph, you must do one of two things:

    a) Double click the glyph in your inventory. Your glyph inventory is in the lower right corner of the Glyph tab. Go there, find a glyph (such as the power glyph you got from your first Reality), and double click it. 
    
    b) Click and drag the glyph to a slot. At the top of the screen will be 3-5 slots (depending on Reality Upgrades) that you can fill with glyphs. Click on a glyph, hold down the mouse button, and drag it up to one of the empty slots. Attempting to place a glyph in a filled slot will require you to reset the Reality. 
    
To unequip a glyph, you have to click on the "Unequip Glyphs on Reality" button below the equipped glyphs. Then, you have to either complete your reality, or reset it using the "Start this Reality over" button. 

Glyphs that are not equipped have no effect.`;
  },
  types(isADServer: boolean): string {
    return `Each Glyph's type is based on its name, and the symbol located within that glyph. Each Glyph type has its own unique effects, based on the area of the game it represents. 

Before you encounter any Celestials, you will have access to 5 effective glyph types:

    - ${isADServer ? GlyphEmotes.Power : Symbols.Power} Power
    - ${isADServer ? GlyphEmotes.Infinity : Symbols.Infinity} Infinity
    - ${isADServer ? GlyphEmotes.Replication : Symbols.Replication} Replication
    - ${isADServer ? GlyphEmotes.Time : Symbols.Time} Time
    - ${isADServer ? GlyphEmotes.Dilation : Symbols.Dilation} Dilation`;
  },
  // eslint-disable-next-line no-unused-vars
  rarity(_isADServer: boolean): string {
    return `Rarity is one of the two values determining the strength of a glyph's effects, the other being Level.
    
The rarity of a glyph is given as a percentage, ranging from 0% to 100%. At first, this value will be determined solely by RNGesus. Later on, there will be ways to improve your odds; the first improvement comes as a result of the achievement "Perks of Living", which increases the rarity of all future Glyphs by 1%. 

This rarity is wholly independent from level, and is determined from the moment that you create a new Reality, so you can't savescum them. Your first ever glyph has a rarity of 20%. 

At certain rarity thresholds, the color of your glyph will change. These colors are as follows:

    - Common: 0 - 20%, White
    - Uncommon: 20 - 40%, Green
    - Rare: 40 - 60%, Light Blue
    - Epic: 60 - 70%, Purple
    - Legendary, 70 - 80%, Orange
    - Mythical, 80 - 90%, Red
    - Transcendent, 90 - 99.9%, Cyan
    - Celestial, 100%, Celestial Blue`;
  },
  // eslint-disable-next-line no-unused-vars
  level(_isADServer: boolean): string {
    return `Level is one of the two values determining the strength of a glyph's effects, the other being Rarity.
    
The level of a glyph is calculuated based on 3 (or 4) resources you collect during a Reality. These resources are Eternity Points, Replicanti, and Dilated Time. When you purchase the Reality Upgrade "Measure of Forever", Eternities also become a part of the equation. Only the highest amount reached in a Reality is considered.

Initially, these factors are as follows: 
Eternity Points: \`0.016 * log(EP)^0.5\`
Replicanti: \`0.025 * log(Rep)^0.4\`
Dilated Time: \`0.025 * log(DT)^1.3\`
Eternities: \`0.450 * log(Eternities)^0.5\` (if unlocked)

All of the above factors are then multiplied together. Finally, other bonuses (Such as the number of Reality Upgrade rows you have completed, or achievements such as Royal Flush) are added, and that value, rounded down, is your final Glyph level. 

All this information can be found under "Glyph Level Factors" in the Glyph tab. `;
  },
  // eslint-disable-next-line no-unused-vars
  sacrifice(_isADServer: boolean): string {
    return `Glyph Sacrifice is a mechanic that you unlock from the Reality Upgrade "Scour to Empower", once you have at least 30 glyphs in your inventory. **"Sacrificing" Glyphs will give you no benefit until you unlock it!**

Glyph Sacrifice allows you to get rid of glyphs that you no longer need, in exchange for a permanent boost based on the glyph's type. Each glyph has a "sacrifice score", based on its level and rarity; when you destroy a glyph, this sacrifice score is added to your total glyph sacrifice for that type.`;
  },
  companion(isADServer: boolean): string {
    return `Oh, I forgot to mention! After you complete your first Reality, you will receive a ${isADServer ? GlyphEmotes.Companion : Symbols.Companion} Companion Glyph. 
    
This is a unique, one-of-a-kind glyph that simply exists to bring you joy. 

It also records the amount of Eternity Points you gained on your first Reality. It allows some of the older AD players to flex a little.

You wouldn't incinerate your Companion, would you?`;
  },
  // eslint-disable-next-line no-unused-vars
  nextgl(_isADServer: boolean): string {
    return `
The X% to next shows how close you are to your Glyph level on reality increasing. You can see the exact breakdown of how this is calculated on the Glyphs screen under "Glyph Level Factors". Once it reaches 100% the Glyph level on Reality will increase by 1.

Basically what the % is showing really is the decimal in the Glyph level formula. Say your Glyph level factors are 1.3x from EP, 1.2x from Replicanti and 1.4x from DT, and +1 from a row of upgrades. Overall that's equal to (1.3 x 1.2 x 1.4) + 1 = 3.184. So you would have a Glyph level of 3, and are 18.4% to next Glyph level.`;
  }
  /* eslint-enable @stylistic/max-len */
};

export default new BasicEmbedCommand({
  data: new SlashCommandBuilder()
    .setName("glyph")
    .setDescription("Provides general information, or information about a specified Glyph type")
    .addSubcommand(subcommand =>
      subcommand
        .setName("effect")
        .setDescription("View information about Glyph effects, including Altered Glyphs")
        .addStringOption(option =>
          option
            .setName("type")
            .setDescription("Which Glyph type would you like information about?")
            .setChoices(Object.keys(glyphs).map(type => ({
              name: type,
              value: type,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
        .addBooleanOption(option =>
          option
            .setName("altered")
            .setDescription("View information about the charged effects?")
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("sacrifice")
        .setDescription("View information about Glyph Sacrifice effects")
        .addStringOption(option =>
          option
            .setName("type")
            .setDescription("Which Glyph type would you like information about?")
            .setChoices(Object.keys(glyphs).map(type => ({
              name: type,
              value: type,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("info")
        .setDescription("View basic information about Glyphs")
        .addStringOption(option =>
          option
            .setName("info")
            .setDescription("What particular information would you like?")
            .setChoices(Object.keys(glyphInfo).map(choice => ({
              name: choice,
              value: choice,
              type: ApplicationCommandOptionType.String
            })))
            .setRequired(true)
        )
    )
    .addSubcommandGroup(group =>
      group
        .setName("utils")
        .setDescription("Access some additional calculations for Glyphs")
        .addSubcommand(subcommand =>
          subcommand
            .setName("threshold")
            .setDescription("Returns the minimum level above which 3 or 4 effect Glyphs start to appear")
            .addNumberOption(option =>
              option
                .setName("rarity")
                .setDescription("The percentage rarity of the given Glyph, between 0 and 100")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName("rarity-probability")
            .setDescription("Returns the probability of seeing a Glyph with the specified rarity, or greater")
            .addNumberOption(option =>
              option
                .setName("rarity")
                .setDescription("The percentage rarity of the given Glyph, between 0 and 100")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
            )
            .addBooleanOption(option =>
              option
                .setName("has-ru16")
                .setDescription("Has Reality Upgrade 16 (Disparity of Rarity) been purchased? default: false")
                .setRequired(false)
            )
            .addNumberOption(option =>
              option
                .setName("bonus-rarity")
                .setDescription("The total percentage rarity added as a bonus in-game (see Glyph Level Factors). default: 0")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(false)
            )
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName("effect-count-probability")
            .setDescription("Returns the probability of seeing a specified number of effects on a Glyph")
            .addIntegerOption(option =>
              option
                .setName("effects")
                .setDescription("The number of effects on the Glyph")
                .setMinValue(0)
                .setMaxValue(7)
                .setRequired(true)
            )
            .addIntegerOption(option =>
              option
                .setName("level")
                .setDescription("The level of the Glyph")
                .setMinValue(0)
                .setMaxValue(50_000)
                .setRequired(true)
            )
            .addNumberOption(option =>
              option
                .setName("rarity")
                .setDescription("The percentage rarity of the given Glyph, between 0 and 100")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
            )
            .addBooleanOption(option =>
              option
                .setName("has-ru17")
                .setDescription("Has Reality Upgrade 17 (Duplicity of Potency) been purchased? default: false")
                .setRequired(false)
            )
            .addBooleanOption(option =>
              option
                .setName("is-effarig-glyph")
                .setDescription("Is the Glyph an Effarig Glyph? default: false")
                .setRequired(false)
            )
        )
    ),
  embed: (interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand(true);

    if (subcommand === "effect") {
      const type = interaction.options.getString("type", true);
      const isAltered = interaction.options.getBoolean("altered", false) ?? false;

      const glyph = glyphs[type];

      return new GlyphEffectCustomEmbed({
        interaction,
        glyph,
        isAltered
      });
    }

    if (subcommand === "sacrifice") {
      const type = interaction.options.getString("type", true);

      const glyph = glyphs[type];

      return new GlyphSacrificeCustomEmbed({
        interaction,
        glyph
      });
    }

    if (subcommand === "info") {
      const requestedInfo = interaction.options.getString("info", true);

      return new BasicTextCustomEmbed({
        interaction,
        title: "Glyph Information",
        field: {
          name: capitalise(requestedInfo),
          value: glyphInfo[requestedInfo](interaction.guildId === Channels.AntimatterDimensionsServer),
          inline: false
        },
        colour: Colours.Reality
      });
    }

    if (subcommand === "threshold") {
      const rarity = interaction.options.getNumber("rarity", true);

      return new BasicTextCustomEmbed({
        interaction,
        title: "Glyph Information",
        field: {
          name: "Glyph Effect Threshold Calculator",
          value: threshold(rarity),
          inline: false
        },
        colour: Colours.Reality
      });
    }

    if (subcommand === "rarity-probability") {
      const rarity = interaction.options.getNumber("rarity", true);
      const ru16 = interaction.options.getBoolean("has-ru16", false) ?? false;
      const bonus = interaction.options.getNumber("bonus-rarity", false) ?? 0;

      return new BasicTextCustomEmbed({
        interaction,
        title: "Glyph Information",
        field: {
          name: "Rarity Probability Calculator",
          value: rarityProbability({ rarity, ru16, bonus }),
          inline: false
        },
        colour: Colours.Reality
      });
    }

    if (subcommand === "effect-count-probability") {
      const effects = interaction.options.getInteger("effects", true);
      const level = interaction.options.getInteger("level", true);
      const rarity = interaction.options.getNumber("rarity", true);
      const ru17 = interaction.options.getBoolean("has-ru17", false) ?? false;
      const effarig = interaction.options.getBoolean("is-effarig-glyph", false) ?? false;

      return new BasicTextCustomEmbed({
        interaction,
        title: "Glyph Information",
        field: {
          name: "Effect Count Probability Calculator",
          value: effectProbability({ effects, level, rarity, ru17, effarig }),
          inline: false
        },
        colour: Colours.Reality
      });
    }

    return new ErrorCustomEmbed({
      interaction,
      text: `Something has gone terribly wrong. Unknown subcommand in ${inlineCode("/glyph")} (${inlineCode(subcommand)}).`
    });
  }
});