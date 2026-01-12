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
        formula: "`1.015 + (Level)^0.2 * (1 + 2.5 * Rarity)^0.4 / 75`",
        altered: {
          name: "Antimatter Galaxy Cost Decrease",
          effect: "Decrease the cost of Antimatter Galaxies by a multiplier, in addition to the normal effect.",
          formula: "`2 / ((1.015 + (Level)^0.2 * (1 + 2.5 * Rarity)^0.4 / 75) + 1)`"
        }
      }),
      "Top Left": new GlyphEffect({
        name: "Antimatter Dimensions Multiplier",
        effect: "Multiply Antimatter Dimensions by a static multiplier.",
        formula: "`(Level * (1 + 2.5 * Rarity)) ^ (Level * (1 + 2.5 * Rarity))`",
        altered: {
          name: "Empowered Antimatter Dimensions Multiplier",
          effect: "Multiply Antimatter Dimensions by a static multiplier with an empowered formula.",
          formula: "`1e11111 ^ (Level * 220)`"
        }
      }),
      "Top Right": new GlyphEffect({
        name: "Dimension Boost Multiplier",
        effect: "Multiply the effect of Dimension Boosts by a static multiplier.",
        formula: "`sqrt(Level * (1 + 2.5 * Rarity))`",
        altered: {
          name: "Boosted Dimension Boost Multiplier",
          effect:
            "Multiply the effect of Dimension Boosts by a static multiplier, with a boosted formula based on Power Glyph Sacrifice.",
          formula: "`sqrt(Level * (1 + 2.5 * Rarity)) * ((1 + log(max(min(sacrifice, 1e100) / 1e60, 1)) / 2) ^ 3)`"
        }
      }),
      "Bottom Right": new GlyphEffect({
        name: "Buy 10 Multiplier",
        effect: "Multiply the multiplier from buying 10 Antimatter Dimensions.",
        formula: "`1 + Level * (1 + 2.5 * Rarity) / 12`"
      })
    },
    sacrifice: {
      effect: "Distant Galaxy scaling starts X Galaxies later. Caps at 750 Galaxies.",
      formula: "`floor(750 * ((log(sacrifice + 1) / 100) ^ 1.2))`"
    }
  }),
  infinity: new Glyph({
    name: "Infinity",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Infinity Dimension Power",
        primary: true,
        effect: "Raise Infinity Dimensions to a power.",
        formula: "`1.007 + (Level)^0.21 * (1 + 2.5 * Rarity)^0.4 / 75`",
        altered: {
          name: "Boosted Infinity Dimension Power",
          effect: "Raise Infinity Dimensions to a power, with a boosted formula based on Infinity Glyph Sacrifice.",
          formula:
            "`1.007 + (Level)^0.21 * (1 + 2.5 * Rarity)^0.4 / 75 + (log(max(min(infinity sacrifice, 1e100) / 1e60, 1)) / 2) / 50)`"
        }
      }),
      "Top Left": new GlyphEffect({
        name: "Infinity Power Conversion Exponent increase",
        effect: "Increase the Exponent used to convert Infinity Power into a multiplier on Antimatter Dimensions.",
        formula: "`(Level)^0.2 * (1 + 2.5 * Rarity)^0.4 / 25`"
      }),
      "Top Right": new GlyphEffect({
        name: "Infinity Point Multiplier",
        effect: "Multiply Infinity Point gain by a static multiplier.",
        formula: "`1.00e4 * (Level * (2 + 2.5 * Rarity))^6`",
        altered: {
          name: "Infinity Point Gain Power",
          effect: "Raise Infinity Point gain to a power, in addition to the normal effect.",
          formula: "`1 + log(1.00e4 * (Level * (2 + 2.5 * Rarity))^6) / 1800`"
        }
      }),
      "Bottom Right": new GlyphEffect({
        name: "Infinity Multiplier",
        effect: "Multiply Infinities by a static multiplier.",
        formula: "`2 * (Level * (1 + 2.5 * Rarity))^1.5`",
        altered: {
          name: "Empowered Infinity Multiplier",
          effect: "Multiply Infinities by a static multiplier, with an empowered formula.",
          formula: "`1.02 ^ Level`"
        }
      })
    },
    sacrifice: {
      effect: "Larger multiplier per-purchase when buying the 8th Infinity Dimension. Caps at x19.",
      formula: "`1 + log(1 + (sacrifice ^ 0.2) / 100)`"
    }
  }),
  replication: new Glyph({
    name: "Replication",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Replicanti Replication Speed",
        effect: "Multiply the speed of Replication (or, divide the Replicanti interval).",
        formula: "`3 * (Level * (1 + 2.5 * Rarity))`",
        altered: {
          name: "Empowered Replicanti Replication Speed",
          effect: "Multiply the speed of Replication (or, divide the Replicanti interval), with an empowered formula.",
          formula: "`(1.006 ^ Level) * 3`"
        }
      }),
      "Top Left": new GlyphEffect({
        name: "Replicanti Effect Power",
        effect: "Raise the effect of Replicanti on Infinity (and Time) Dimensions to a power.",
        formula: "`1.1 + sqrt(Level) * (1 + 2.5 * Rarity) / 25`",
        altered: {
          name: "Boosted Replicanti Effect Power",
          effect:
            "Raise the effect of Replicanti on Infinity (and Time) Dimensions to a power, with a boosted formula based on Replication Glyph Sacrifice.",
          formula:
            "`1.1 + sqrt(Level) * (1 + 2.5 * Rarity) / 25 + log(max(min(replication sacrifice, 1e100) / 1e60, 1)) / 2 * 3`"
        }
      }),
      "Top Right": new GlyphEffect({
        name: "Dilated Time Multiplier based on Replicanti",
        effect: "Multiply Dilated Time gain based on current Replicanti amount.",
        formula: "`3.00e-4 * (Level)^0.3 * (1 + 2.5 * Rarity)^0.65`",
        altered: {
          name: "Replicanti Speed Multiplier based on Replicanti",
          effect: "Multiply Replicanti gain based on current Replicanti amount, in addition to the normal effect.",
          formula: "`3.00e-4 * (Level)^0.3 * (1 + 2.5 * Rarity)^0.65`"
        }
      }),
      "Bottom Right": new GlyphEffect({
        name: "Replication Glyph Level Effect",
        effect: "Increase the exponent in the Replicanti Glyph Level Factor (log(rep)^0.400 -> log(rep)^0.4XX)",
        formula: "`sqrt((Level)^0.25 * (1 + 2.5 * Rarity)^0.4) / 50`"
      })
    },
    sacrifice: {
      effect: "Replicanti Galaxy scaling starts later. Caps at 1500 Galaxies later.",
      formula: "`floor(1500 * (log(sacrifice + 1) / 100)^1.2)`"
    }
  }),
  time: new Glyph({
    name: "Time",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Time Dimension Power",
        primary: true,
        effect: "Raise Time Dimensions to a power.",
        formula: "`1.01 + (Level)^0.32 * (1 + 2.5 * Rarity)^0.45 / 75`"
      }),
      "Top Left": new GlyphEffect({
        name: "Game Speed Multiplier",
        effect: "Multiply Game speed, and effectively everything affected by it.",
        formula: "`1 + (Level)^0.3 * (1 + 2.5 * Rarity)^0.65 / 20`",
        altered: {
          name: "Empowered Game Speed Multiplier",
          effect: "Multiply Game speed, and effectively everything affected by it, with an empowered formula.",
          formula: "`1 + (Level ^ 0.35)`"
        }
      }),
      "Top Right": new GlyphEffect({
        name: "Eternity Multiplier",
        effect: "Multiply Eternities by a static multiplier.",
        formula: "`((Level + 3) * (1 + 2.5 * Rarity))^0.9`",
        altered: {
          name: "Boosted Eternity Multiplier",
          effect: "Multiply Eternities by a static multiplier with a boosted formula based on Time Glyph Sacrifice.",
          formula: "`((Level + 3) * (1 + 2.5 * Rarity))^0.9 * (3 * log(max(min(time sacrifice, 1e100) / 1e60, 1)) / 2)`"
        }
      }),
      "Bottom Right": new GlyphEffect({
        name: "Eternity Point Multiplier",
        effect: "Multiply Eternity Point gain by a static Multiplier.",
        formula: "`100 * (Level * (1 + 2.5 * Rarity))^3`",
        altered: {
          name: "Eternity Point Power",
          effect: "Raise Eternity Point gain to a power, in addition to the normal effect.",
          formula: "`1 + log(100 * (Level * (1 + 2.5 * Rarity))^3) / 1000`"
        }
      })
    },
    sacrifice: {
      effect: "Larger multiplier per-purchase when buying the 8th Time Dimension. Caps at x1e36.",
      formula: "`(1 + (sacrifice)^0.2 / 100) ^ 2`"
    }
  }),
  dilation: new Glyph({
    name: "Dilation",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Dilated Time Multiplier",
        effect: "Multiply Dilated Time by a static multiplier",
        formula: "`2 * (Level * (1 + 2.5 * Rarity))^1.5`",
        altered: {
          name: "Empowered Dilated Time Multiplier",
          effect: "Multiply Dilated Time by a static multiplier, with an empowered formula.",
          formula: "`(1.005 ^ Level) * 15`"
        }
      }),
      "Top Left": new GlyphEffect({
        name: "Tachyon Galaxy Threshold Multiplier",
        effect: `"Multiply" (Divide) the threshold scaling for Tachyon Galaxies. Only affects the fraction after 1.`,
        formula: "`1 - ((Level)^0.17 * (1 + 2.5 * Rarity)^0.35) / 100`",
        altered: {
          name: "Boosted Tachyon Galaxy Threshold Multiplier",
          effect:
            `"Multiply" (Divide) the threshold scaling for Tachyon Galaxies, with a boosted formula based on Dilation Glyph Sacrifice.`,
          formula:
            "`1 - ((Level)^0.17 * (1 + 2.5 * Rarity)^0.35) / 100 - log(max(min(dilation sacrifice, 1e100) / 1e60, 1)) / 2 / 50`"
        }
      }),
      "Top Right": new GlyphEffect({
        name: "Time Theorem Generation",
        effect: "Passively Generate Time Theorems, even without the relevant Dilation Upgrade.",
        formula: "`sqrt(Level * (1 + 2.5 * Rarity)) / 1.00e4`",
        altered: {
          name: "Time Theorem Generation Multiplier",
          effect: "Multiply passive Time Theorem generation from all sources, in addition to the normal effect.",
          formula: "`max((10000 * sqrt(Level * (1 + 2.5 * Rarity)) / 1.00e4) ^ 1.6, 1)`"
        }
      }),
      "Bottom Right": new GlyphEffect({
        name: "Dilated Antimatter Dimension Power",
        effect: "Raise all Antimatter Dimensions to a power, but only while in Time Dilation",
        formula: "`1.1 + (Level * (1 + 2.5 * Rarity))^0.7 / 25`"
      })
    },
    sacrifice: {
      effect: "Multiply Tachyon Particle gain. Caps at x1e32.",
      formula: "`power = 0.32 * (log(sacrifice + 1) / 100)^0.1; effect = max(sacrifice, 1) ^ power`"
    }
  }),
  effarig: new Glyph({
    name: "Effarig",
    effects: {
      Southwest: new GlyphEffect({
        name: "Reality Machine Multiplier",
        effect: "Multiply Reality Machine gain.",
        formula: "`Level ^ 0.6 * (1 + 2.5 * Rarity)`",
        altered: {
          name: "Empowered Reality Machine Multiplier",
          effect: "Multiply Reality Machine gain by a multiplier with an empowered formula.",
          formula: "`Level ^ 1.5`"
        }
      }),
      West: new GlyphEffect({
        name: "Instability Delay",
        effect: "Increase Glyph Instability starting level",
        formula: "`floor(10 * sqrt(Level * (1 + 2.5 * Rarity)))`"
      }),
      Northwest: new GlyphEffect({
        name: "Game Speed Power",
        effect: "Raise game speed to a power.",
        formula: "`1 + (Level ^ 0.25) * ((1 + 2.5 * Rarity) ^ 0.4) / 75`"
      }),
      North: new GlyphEffect({
        name: "Achievement Multiplier Power",
        effect: "Raise Achievement multiplier to a power.",
        formula: "`1 + (Level ^ 0.4) * ((1 + 2.5 * Rarity) ^ 0.6) / 60`",
        altered: {
          name: "Boosted Achievement Multiplier Power",
          effect: "Raise Achievement multiplier to a power with a formula boosted based on Effarig Glyph Sacrifice.",
          formula:
            "`(1 + (Level ^ 0.4) * ((1 + 2.5 * Rarity) ^ 0.6) / 60) + log(max(min(effarig sacrifice, 1e100) / 1e60, 1)) / 2 / 10`"
        }
      }),
      Northeast: new GlyphEffect({
        name: "Buy 10 Multiplier Power",
        effect: "Raise the Buy 10 Dimensions multiplier to a power.",
        formula: "`1 + 2 * (Level ^ 0.25) * ((1 + 2.5 * Rarity) ^ 0.4)`",
        altered: {
          name: "Dimension Boost Multiplier Power",
          effect: "Raise the effect of Dimension Boosts to a power, in addition to the normal effect.",
          formula: "`(1 + 2 * (Level ^ 0.25) * ((1 + 2.5 * Rarity) ^ 0.4)) ^ 0.4`"
        }
      }),
      East: new GlyphEffect({
        name: "Dimension Power",
        effect: "Raise all dimension multipliers to a power",
        formula: "`1 + (Level ^ 0.25) * ((1 + 2.5 * Rarity) ^ 0.4) / 500`"
      }),
      Southeast: new GlyphEffect({
        name: "Antimatter Production Power",
        effect: "Raise antimatter production to a power",
        formula: "`1 + (Level ^ 0.25) * ((1 + 2.5 * Rarity) ^ 0.4) / 5000`"
      })
    },
    sacrifice: {
      effect: "Additional Glyph rarity. Caps at 100%",
      formula: "`2 * log((min(sacrifice, 1e70) / 1e20) + 1)`"
    }
  }),
  cursed: new Glyph({
    name: "Cursed",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Cursed Galaxies",
        effect: "Reduce the effectiveness of all Galaxies.",
        formula: "`Level ^ -0.03`"
      }),
      "Top Left": new GlyphEffect({
        name: "Cursed Tickspeed",
        effect: "The threshold for Tickspeed Upgrades from Time Dimensions is increased.",
        formula: "`max(log(Level), 1)`"
      }),
      "Top Right": new GlyphEffect({
        name: "Cursed Dimensions",
        effect: "Reduce all Dimension multipliers.",
        formula: "`Level ^ -0.035`"
      }),
      "Bottom Right": new GlyphEffect({
        name: "Cursed EP",
        effect: "Divide EP gain.",
        formula: "`10 ^ (-Level / 10)`"
      })
    }
  }),
  reality: new Glyph({
    name: "Reality",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Equipped Glyph Level Increase",
        effect: "Increase the effective level of equipped basic Glyphs",
        formula: "`floor(sqrt(Level * 90))`"
      }),
      "Top Left": new GlyphEffect({
        name: "Galaxy Strength Increase",
        effect: "Increase the strength of all Galaxies",
        formula: "`1 + sqrt(Level / 100000)`"
      }),
      "Top Right": new GlyphEffect({
        name: "Reality Amplifier Amplifier",
        effect: "Multipliers from Reality Upgrade Amplifiers are increased",
        formula: "`1 + Level / 125000`"
      }),
      "Bottom Right": new GlyphEffect({
        name: "Dilation Glyph Level Effect",
        effect: "Dilated Time factor for Glyph level is increased",
        formula: "`0.1`"
      })
    },
    sacrifice: {
      effect: "Multiply Memory Chunk gain. Caps at x100.",
      formula: "`min(1 + sqrt(sacrifice) / 15, 100)`"
    }
  }),
  companion: new Glyph({
    name: "Companion",
    effects: {
      "Bottom Left": new GlyphEffect({
        name: "Love",
        effect: "...plot the demise of all who stand against you...",
        formula: "`+100%`"
      }),
      "Top Left": new GlyphEffect({
        name: "Joy",
        effect: "...whisper into your dreams politely...",
        formula: "`log(your love for the Companion Glyph)`"
      }),
      "Top Right": new GlyphEffect({
        name: "Happiness",
        effect: "...nothing but sit there and cutely smile at you...",
        formula: "`N/A`"
      }),
      "Bottom Right": new GlyphEffect({
        name: "Loyalty",
        effect: "...will never leave you...",
        formula: "`10x loyalty`"
      })
    }
  })
};
