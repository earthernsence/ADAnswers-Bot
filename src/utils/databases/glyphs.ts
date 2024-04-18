import { EmbedBuilder, EmbedField } from "discord.js";
import { GlyphEffect, GlyphInfo } from "../types";
import { Colour } from "../colours";
import { Symbols } from "../symbols";
import { capitalize } from "../extensions";
import { footerText } from "../../functions/Misc";

interface GlyphData {
  [key: string]: GlyphInfo
}

// I don't know why ESLint gets mad at enums, but here we are
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
enum ALTERATION_TYPE {
  ADDITION = 1,
  EMPOWER = 2,
  BOOST = 3
}
/* eslint-enable no-unused-vars */

export const basicGlyphs: GlyphData = {
  power: {
    name: "power",
    colour: Colour.antimatter,
    emote: "<:glyph_power:586607087744843776>",
    altText: Symbols.power,
    effects: {
      "Bottom Left": {
        name: "Antimatter Dimensions Power",
        primary: true,
        effect: "Raise Antimatter Dimensions to a power. (^1.XX)",
        effectFormula: "1.015 + (Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 75",
        stacking: "Additive, based on fraction after 1.",
        altered: {
          name: `Antimatter Galaxy Cost Decrease`,
          effect: "Decrease the cost of Antimatter Galaxies by a multiplier, in addition to the normal effect.",
          effectFormula: "2 / ((1.015 + (Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 75) + 1)",
          type: ALTERATION_TYPE.ADDITION
        }
      },
      "Top Left": {
        name: "Antimatter Dimensions Multiplier",
        effect: "Multiply Antimatter Dimensions by a static multiplier.",
        effectFormula: "(Level * (1 + 2.5*Rarity)) ^ (Level * (1 + 2.5*Rarity))",
        stacking: "Multiplicative.",
        altered: {
          name: "Empowered Antimatter Dimensions Multiplier",
          effect: "Multiply Antimatter Dimnsions by a static multiplier with an empowered formula.",
          effectFormula: "1e11111 ^ (level * 220)",
          type: ALTERATION_TYPE.EMPOWER
        }
      },
      "Top Right": {
        name: "Dimension Boost Multiplier",
        effect: "Multiply the effect of Dimension Boosts by a static multiplier.",
        effectFormula: "sqrt(Level * (1 + 2.5*Rarity))",
        stacking: "Multiplicative",
        altered: {
          name: "Boosted Dimension Boost Multiplier",
          effect: "Multiply the effect of Dimension Boosts by a static multiplier, with a boosted formula based on Power Glyph Sacrifice.",
          effectFormula: "sqrt(Level * (1 + 2.5*Rarity)) * ((1 + log10(max(min(power sacrifice, 1e100) / 1e60, 1)) / 2) ^ 3)",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Bottom Right": {
        name: "Buy 10 Multiplier",
        effect: "Multiply the multiplier from buying 10 Antimatter Dimensions.",
        effectFormula: "1 + Level * (1 + 2.5*Rarity) / 12",
        stacking: "Additive with itself, based on the fraction after 1; multiplicative with other boosts",
      }
    },
    sacrifice: {
      effectFormula: "`floor(750 * (log10(sac + 1) / 100)^1.2)`",
      effect: "Distanty Galaxy scaling starts later. Caps at 750 Galaxies later."
    }
  },
  infinity: {
    name: "infinity",
    colour: Colour.infinity,
    emote: "<:glyph_infinity:586607119856304129>",
    altText: Symbols.infinity,
    effects: {
      "Bottom Left": {
        name: "Infinity Dimension Power",
        primary: true,
        effect: "Raise Infinity Dimensions to a power. (^1.XX)",
        effectFormula: "1.007 + (Level)^0.21 * (1 + 2.5*Rarity)^0.4 / 75",
        stacking: "Additive, based on fraction after 1.",
        altered: {
          name: "Boosted Infinity Dimension Power",
          effect: "Raise Infinity Dimensions to a power, with a boosted formula based on Infinity Glyph Sacrifice.",
          effectFormula: "1.007 + (Level)^0.21 * (1 + 2.5*Rarity)^0.4 / 75 + (log10(max(min(infinity sacrifice, 1e100) / 1e60, 1)) / 2) / 50",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Top Left": {
        name: "Infinity Power Conversion Exponent increase",
        effect: "Increase the Exponent used to convert Infinity Power into a multiplier on Antimatter Dimensions. (^7.00 -> ^7.XX)",
        effectFormula: "(Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 25",
        stacking: "Additive",
      },
      "Top Right": {
        name: "Infinity Point Multiplier",
        effect: "Multiply Infinity Point gain by a static multipier.",
        effectFormula: "1.00e4 * (Level * (2 + 2.5*Rarity))^6",
        stacking: "Multiplicative",
        altered: {
          name: "Infinity Point Gain Power",
          effect: "Raise Infinity Point gain to a power, in addition to the normal effect.",
          effectFormula: "1 + log10(1.00e4 * (Level * (2 + 2.5*Rarity))^6) / 1800",
          type: ALTERATION_TYPE.ADDITION
        }
      },
      "Bottom Right": {
        name: "Infinity Multiplier",
        effect: "Multiply Infinities by a static multiplier.",
        effectFormula: "2 * (Level * (1 + 2.5*Rarity))^1.5",
        stacking: "Multiplicative",
        altered: {
          name: "Empowered Infinity Multiplier",
          effect: "Multiply Infinities by a static multiplier, with an empowered formula.",
          effectFormula: "1.02 ^ level",
          type: ALTERATION_TYPE.EMPOWER
        }
      }
    },
    sacrifice: {
      effectFormula: "`1 + log10(1 + (sac ^ 0.2) / 100)`",
      effect: "Larger multiplier per-purchase when buying the 8th Infinity Dimension. Caps at x19."
    }
  },
  replication: {
    name: "replication",
    colour: Colour.replication,
    emote: "<:glyph_replication:586607179432460298>",
    altText: Symbols.replication,
    effects: {
      "Bottom Left": {
        name: "Replicanti Replication Speed",
        effect: "Multiply the speed of Replication (or, divide the Replicanti interval).",
        effectFormula: "3 * (Level * (1 + 2.5*Rarity)",
        stacking: "Multiplicative",
        altered: {
          name: "Empowered Replicanti Replication Speed",
          effect: "Multiply the speed of Replication (or, divide the Replicanti interval), with an empowered formula.",
          effectFormula: "(1.006 ^ level) * 3",
          type: ALTERATION_TYPE.EMPOWER
        }
      },
      "Top Left": {
        name: "Replicanti Effect Power",
        effect: "Raise the effect of Replicanti on Infinity (and Time) Dimensions to a power. (^1.XX)",
        effectFormula: "1.1 + sqrt(Level) * (1 + 2.5*Rarity) / 25",
        stacking: "Additive, based on fraction after 1",
        altered: {
          name: "Boosted Replicanti Effect Power",
          effect: "Raise the effect of Replicanti on Infinity (and Time) Dimensions to a power, with a boosted formula based on Replication Glyph Sacrifice.",
          effectFormula: "1.1 + sqrt(Level) * (1 + 2.5*Rarity) / 25 + log10(max(min(replication sacrifice, 1e100) / 1e60, 1)) / 2 * 3",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Top Right": {
        name: "Dilated Time Multiplier based on Replicanti",
        effect: `Multiply Dilated Time gain based on current Replicanti amount.`,
        effectFormula: "3.00e-4 * (Level)^0.3 * (1 + 2.5 * Rarity)^0.65",
        stacking: `"Multiplicative"; this effect is multiplied by 1.00e4 on all glyphs with it, which are then multiplied together, and then divided by 1.00e4 at the end.
This makes the glyph stack reasonably while still providing a boost if you use very low level/rarity glyphs.`,
        altered: {
          name: "Replicanti Speed Multiplier based on Replicanti",
          effect: "Multiply Replicanti gain based on current Replicanti amount, in addition to the normal effect.",
          effectFormula: "3.00e-4 * (Level)^0.3 * (1 + 2.5 * Rarity)^0.65",
          type: ALTERATION_TYPE.ADDITION
        }
      },
      "Bottom Right": {
        name: "Replication Glyph Level Effect",
        effect: "Increase the exponent in the Replicanti Glyph Level Factor (log(rep)^0.400 -> log(rep)^0.4XX)",
        effectFormula: "sqrt((Level)^0.25 * (1 + 2.5*Rarity)^0.4) / 50",
        stacking: "Additive; softcaps after total effect reaches + ^0.080"
      }
    },
    sacrifice: {
      effectFormula: "`floor(1500 * (log10(sac + 1) / 100)^1.2)`",
      effect: "Replicanti Galaxy scaling starts later. Caps at 1500 Galaxies later."
    }
  },
  time: {
    name: "time",
    colour: Colour.eternity,
    emote: "<:glyph_time:586607148985876501>",
    altText: Symbols.time,
    effects: {
      "Bottom Left": {
        name: "Time Dimension Power",
        primary: true,
        effect: "Raise Time Dimensions to a power. (^1.XX)",
        effectFormula: "1.01 + (Level)^0.32 * (1 + 2.5*Rarity)^0.45 / 75",
        stacking: "Additive, based on fraction after 1",
      },
      "Top Left": {
        name: "Game Speed Multiplier",
        effect: "Multiply Game speed, and effectively everything affected by it. See `/gamevsrealtime` for more information.",
        effectFormula: "1 + (Level)^0.3 * (1 + 2.5*Rarity)^0.65 / 20",
        stacking: "Multiplicative",
        altered: {
          name: "Empowered Game Speed Multiplier",
          effect: "Multiply Game speed, and effectively everything affected by it, with an empowered formula.",
          effectFormula: "1 + (level ^ 0.35)",
          type: ALTERATION_TYPE.EMPOWER
        }
      },
      "Top Right": {
        name: "Eternity Multiplier",
        effect: "Multiply Eternities by a static multiplier.",
        effectFormula: "((Level + 3) * (1 + 2.5*Rarity))^0.9",
        stacking: "Multiplicative",
        altered: {
          name: "Boosted Eternity Multiplier",
          effect: "Multiply Eternities by a static multiplier with a boosted formula based on Time Glyph Sacrifice.",
          effectFormula: "((Level + 3) * (1 + 2.5*Rarity))^0.9 * (3 * log10(max(min(time sacrifice, 1e100) / 1e60, 1)) / 2)",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Bottom Right": {
        name: "Eternity Point Multiplier",
        effect: "Multiply Eternity Point gain by a static Multiplier.",
        effectFormula: "100 * (Level * (1 + 2.5Rarity))^3",
        stacking: "Multiplicative",
        altered: {
          name: "Eternity Point Power",
          effect: "Raise Eternity Point gain to a power, in addition to the normal effect.",
          effectFormula: "1 + log10(100 * (Level * (1 + 2.5Rarity))^3) / 1000",
          type: ALTERATION_TYPE.ADDITION
        }
      },
    },
    sacrifice: {
      effectFormula: "`(1 + (sac)^0.2 / 100) ^ 2`",
      effect: "Larger multiplier per-purchase when buying the 8th Time Dimension. Caps at x1e36."
    }
  },
  dilation: {
    name: "dilation",
    colour: Colour.dilation,
    emote: "<:glyph_dilation:586607200626278421>",
    altText: Symbols.dilation,
    effects: {
      "Bottom Left": {
        name: "Dilated Time Multiplier",
        effect: "Multiply Dilated Time by a static multiplier",
        effectFormula: "2 * (Level * (1 + 2.5*Rarity))^1.5",
        stacking: "Multiplicative",
        altered: {
          name: "Empowered Dilated Time Multiplier",
          effect: "Multiply Dilated Time by a static multiplier, with an empowered formula.",
          effectFormula: "(1.005 ^ level) * 15",
          type: ALTERATION_TYPE.EMPOWER
        }
      },
      "Top Left": {
        name: "Tachyon Galaxy Threshold Multiplier",
        effect: `"Multiply" (Divide) the threshold scaling for Tachyon Galaxies. Only affects the fraction after 1.`,
        effectFormula: "1 - ((Level)^0.17 * (1 + 2.5*Rarity)^0.35) / 100",
        stacking: "Multiplicative; this value is always less than 1.",
        altered: {
          name: "Boosted Tachyon Galaxy Threshold Multiplier",
          effect: `"Multiply" (Divide) the threshold scaling for Tachyon Galaxies, with a boosted formula based on Dilation Glyph Sacrifice.`,
          effectFormula: "1 - ((Level)^0.17 * (1 + 2.5*Rarity)^0.35) / 100 - log10(max(min(dilation sacrifice, 1e100) / 1e60, 1)) / 2 / 50",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Top Right": {
        name: "Time Theorem Generation",
        effect: "Passively Generate Time Theorems, even without the relevant Dilation Upgrade.",
        effectFormula: "sqrt(Level * (1 + 2.5*Rarity)) / 1.00e4",
        stacking: "Additive",
        altered: {
          name: "Time Theorem Generation Multiplier",
          effect: "Multiply passive Time Theorem generation from all sources, in addition to the normal effect.",
          effectFormula: "max((10000 * sqrt(Level * (1 + 2.5*Rarity)) / 1.00e4) ^ 1.6, 1)",
          type: ALTERATION_TYPE.ADDITION
        }
      },
      "Bottom Right": {
        name: "Dilated Antimatter Dimension Power",
        effect: "Raise all Antimatter Dimensions to a power, but only while in Time Dilation",
        effectFormula: "1.1 + (Level * (1 + 2.5*Rarity))^0.7 / 25",
        stacking: "Additive, based on fraction after 1."
      }
    },
    sacrifice: {
      effectFormula: "power = `0.32 * (log10(sac + 1) / 100)^0.1`\neffect = `max(sac, 1) ^ power`",
      effect: "Multiply Tachyon Particle gain. Caps at x1e32."
    }
  },
};

export const specialGlyphs: GlyphData = {
  effarig: {
    name: "effarig",
    colour: Colour.effarig,
    // AD doesn't have emotes for Effarig, Cursed, or Reality, so they get the text
    emote: Symbols.effarig,
    altText: Symbols.effarig,
    effects: {
      "Southwest": {
        name: "Reality Machine Multiplier",
        effect: "Multiply Reality Machine gain.",
        effectFormula: "level ^ 0.6 * (1 + 2.5 * Rarity)",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!",
        altered: {
          name: "Empowered Reality Machine Multiplier",
          effect: "Multiply Reality Machine gain by a multiplier with an empowered formula.",
          effectFormula: "level ^ 1.5",
          type: ALTERATION_TYPE.EMPOWER
        }
      },
      "West": {
        name: "Instability Delay",
        effect: "Increase Glyph Instability starting level",
        effectFormula: "floor(10 * sqrt(level * (1 + 2.5 * rarity))",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!"
      },
      "Northwest": {
        name: "Game Speed Power",
        effect: "Raise game speed to a power.",
        effectFormula: "1 + (level ^ .25) * ((1 + 2.5 * Rarity) ^ 0.4) / 75",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!"
      },
      "North": {
        name: "Achievement Multiplier Power",
        effect: "Raise Achievement multiplier to a power.",
        effectFormula: "1 + (level ^ 0.4) * ((1 + 2.5 * rarity) ^ 0.6) / 60",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!",
        altered: {
          name: "Boosted Achievement Multiplier Power",
          effect: "Raise Achievement multiplier to a power with a formula boosted based on Effarig Glyph Sacrifice.",
          effectFormula: "(1 + (level ^ 0.4) * ((1 + 2.5 * rarity) ^ 0.6) / 60) + log10(max(min(effarig sacrifice, 1e100) / 1e60, 1)) / 2 / 10",
          type: ALTERATION_TYPE.BOOST
        }
      },
      "Northeast": {
        name: "Buy 10 Multiplier Power",
        effect: "Raise the Buy 10 Dimensions multiplier to a power.",
        effectFormula: "1 + 2 * (level ^ 0.25) * ((1 + 2.5 * rarity) ^ 0.4)",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!",
        altered: {
          name: "Dimension Boost Multiplier Power",
          effect: "Raise the effect of Dimension Boosts to a power, in addition to the normal effect.",
          effectFormula: "(1 + 2 * (level ^ 0.25) * ((1 + 2.5 * rarity) ^ 0.4)) ^ 0.4",
          type: ALTERATION_TYPE.ADDITION
        }
      },
      "East": {
        name: "Dimension Power",
        effect: "Raise all dimension multipliers to a power",
        effectFormula: "1 + (level ^ 0.25) * ((1 + 2.5 * rarity) ^ 0.4) / 500",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!"
      },
      "Southeast": {
        name: "Antimatter Production Power",
        effect: "Raise antimatter production to a power",
        effectFormula: "1 + (level ^ 0.25) * ((1 + 2.5 * rarity) ^ 0.4) / 5000",
        stacking: "More than one Effarig Glyph cannot be equipped simultaneously, dummy!"
      }
    },
    sacrifice: {
      effectFormula: "`2 * log10((min(sac, 1e70) / 1e20) + 1)`",
      effect: "Additional Glyph rarity. Caps at 100%"
    }
  },
  cursed: {
    name: "cursed",
    colour: "#000000",
    emote: Symbols.cursed,
    altText: Symbols.cursed,
    effects: {
      "Bottom Left": {
        name: "Cursed Galaxies",
        effect: "Reduce the effectiveness of all Galaxies.",
        effectFormula: "level ^ -0.03",
        stacking: "Multiplicative"
      },
      "Top Left": {
        name: "Cursed Tickspeed",
        effect: "The threshold for Tickspeed Upgrades from Time Dimensions is increased.",
        effectFormula: "max(log(level), 1)",
        stacking: "Additive"
      },
      "Top Right": {
        name: "Cursed Dimensions",
        effect: "Reduce all Dimension multipliers.",
        effectFormula: "level ^ -0.035",
        stacking: "Multiplicative"
      },
      "Bottom Right": {
        name: "Cursed EP",
        effect: "Divide EP gain.",
        effectFormula: "10 ^ (-level / 10)",
        stacking: "Multiplicative"
      }
    }
  },
  reality: {
    name: "reality",
    colour: Colour.reality,
    emote: Symbols.reality,
    altText: Symbols.reality,
    effects: {
      "Bottom Left": {
        name: "Equipped Glyph Level Increase",
        effect: "Increase the effective level of equipped basic Glyphs",
        effectFormula: "floor(sqrt(level * 90))",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Top Left": {
        name: "Galaxy Strength Increase",
        effect: "Increase the strength of all Galaxies",
        effectFormula: "1 + sqrt(level / 100000)",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Top Right": {
        name: "Reality Amplifier Amplifier",
        effect: "Multipliers from Reality Upgrade Amplifiers are increased",
        effectFormula: "1 + level / 125000",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Bottom Right": {
        name: "Dilation Glyph Level Effect",
        effect: "Dilated Time factor for Glyph level is increased",
        effectFormula: "0.1",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      }
    },
    sacrifice: {
      effectFormula: "`min(1 + sqrt(sac) / 15, 100)`",
      effect: "Multiply Memory Chunk gain. Caps at x100."
    }
  },
  companion: {
    name: "companion",
    colour: Colour.companion,
    emote: "<:glyph_companion:1053705550644391946>",
    altText: Symbols.companion,
    effects: {
      "Bottom Left": {
        name: "Love",
        effect: "...plot the demise of all who stand against you...",
        effectFormula: "+100%"
      },
      "Top Left": {
        name: "Joy",
        effect: "...whisper into your dreams politely...",
        effectFormula: "log10(your love for the Companion Glyph)"
      },
      "Top Right": {
        name: "Happiness",
        effect: "...nothing but sit there and cutely smile at you...",
        effectFormula: "N/A"
      },
      "Bottom Right": {
        name: "Loyalty",
        effect: "...will never leave you...",
        effectFormula: "10x loyalty"
      }
    }
  }
};

interface GlyphEffects {
  [key: string]: GlyphEffect
}

function FieldsGetter(glyphInfo: GlyphInfo, altered: boolean, isSacrifice: boolean): EmbedField[] {
  const fields: EmbedField[] = [];
  if (isSacrifice && glyphInfo.sacrifice !== undefined) {
    fields.push(
      {
        name: `${capitalize(glyphInfo.name)} Sacrifice effect`,
        value: `${glyphInfo.sacrifice.effect}`,
        inline: false
      },
      {
        name: `${capitalize(glyphInfo.name)} Sacrifice effect formula`,
        value: `${glyphInfo.sacrifice.effectFormula}`,
        inline: false
      });
    return fields;
  }
  if (isSacrifice) {
    if (glyphInfo.name === "companion") fields.push({ name: "You monster!", value: "You wouldn't incinerate your Companion, would you?", inline: false });
    else fields.push({ name: "Whoops!", value: `You can't sacrifice ${capitalize(glyphInfo.name)} Glyphs, dummy!`, inline: false });
    return fields;
  }

  // Basically, just turn our actual list of effects into a list with ONLY the effects that get altered. Somehow
  const alteredGlyphEffects: GlyphEffects = {};
  Object.entries(glyphInfo.effects).filter(effect => effect[1].altered !== undefined).map(effect => Object.assign(alteredGlyphEffects, { [effect[0]]: effect[1] }));

  const effects = altered ? alteredGlyphEffects : glyphInfo.effects;

  if (Object.keys(effects).length === 0) {
    fields.push({
      name: "Whoops!",
      value: `${capitalize(glyphInfo.name)} Glyphs don't have altered effects, dummy!`,
      inline: false
    });
    return fields;
  }

  for (const location in effects) {
    fields.push({
      name: `${location}: ${altered ? effects[location].altered?.name : effects[location].name}`,
      value: `${altered ? effects[location].altered?.effect as string : effects[location].effect}\n**Formula:** \`${altered ? effects[location].altered?.effectFormula as string : effects[location].effectFormula}\``,
      inline: false
    });
  }
  return fields;
}

function SymbolGetter(glyphInfo: GlyphInfo, isADServer: boolean) {
  if (isADServer) return glyphInfo.emote;
  return glyphInfo.altText;
}

// eslint-disable-next-line max-params
export const GlyphEmbedGetter = (glyphInfo: GlyphInfo, isADServer: boolean, altered: boolean, isSacrifice: boolean) => new EmbedBuilder()
  .setTitle(`**${SymbolGetter(glyphInfo, isADServer)}** ${capitalize(glyphInfo.name)}`)
  .setColor(glyphInfo.colour)
  .addFields(FieldsGetter(glyphInfo, altered, isSacrifice))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });
