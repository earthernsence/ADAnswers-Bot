import { Glyph } from "./Glyph";
import { GlyphEffect } from "./GlyphEffect";

export const glyphs: Record<string, Glyph> = {
  power: new Glyph({
    name: "Power",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Antimatter Dimensions Power",
        primary: true,
        effect: "Raise Antimatter Dimensions to a power.",
        formula: "`1.015 + (Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 75`",
        altered: {
          name: "Antimatter Galaxy Cost Decrease",
          effect: "Decrease the cost of Antimatter Galaxies by a multiplier, in addition to the normal effect.",
          formula: "`2 / ((1.015 + (Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 75) + 1)`"
        }
      }),
      "Top Left": new GlyphEffect({
        name: "Antimatter Dimensions Multiplier",
        effect: "Multiply Antimatter Dimensions by a static multiplier.",
        formula: "x`(level * (1 + 2.5 * rarity)) ^ (level * (1 + 2.5 * rarity))`",
        altered: {
          name: "Empowered Antimatter Dimensions Multiplier",
          effect: "Multiply Antimatter Dimensions by a static multiplier with an empowered formula.",
          formula: "`1e11111 ^ (level * 220)`"
        }
      })
    },
    sacrifice: {
      effect: "Distant Galaxy scaling starts X Galaxies later. Caps at 750 Galaxies.",
      formula: "`floor(750 * ((log(sacrifice + 1) / 100) ^ 1.2))`"
    }
  })
};