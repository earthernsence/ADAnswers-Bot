import { VAchievementShardReductionType, type VCelestial } from "@/types/game_data/celestials/v";
import Decimal from "break_infinity.js";

export default (<VCelestial>{
  info: `V is a unique Celestial unlocked by completing Achievement 151. \
Once unlocked, V has additional requirements for full access. \
You must complete 10,000 Realities, have 1e60 unspent RM, and reach specific milestones in Eternities, \
Infinities, Dilated Time, and Replicanti, all within the same Reality. Upon meeting these requirements, \
you can enter V's Reality. V has six "achievements", each linked to progress within V's Reality. \
Completed V-Achievements unlock upgrades on the V tab and grant Space Theorems. \
Space Theorems allow the purchase of normally forbidden Time Studies, including multiple paths in the Pace Split and both Time Studies within a dark/light pair. \
They are replenished upon respeccing studies. \
  Reducing goals with 2 V-Achievements makes certain V-Achievement requirements easier by spending Perk Points. \
  The cost remains constant and applies to future tiers as well. Having 36 V-Achievements unlocks the next Celestial.`,
  reality: `All Dimension multipliers, Eternity Point gain, Infinity Point gain, and Dilated Time gain per second are square-rooted. \
The Replicanti interval is squared. \
The Exponential Glyph Alchemy effect is disabled. V does not have a direct reward from its Reality.`,
  achievements: {
    "glyph-knight": {
      name: "Glyph Knight",
      description: "Unlock Reality with at most x Glyphs equipped.",
      goals: {
        currency: "Glyphs equipped",
        values: [5, 4, 3, 2, 1, 0].map(value => new Decimal(value))
      }
    },
    antistellar: {
      name: "AntiStellar",
      description: "Have x total Galaxies from all types.",
      goals: {
        currency: "total Galaxies",
        values: [4000, 4300, 4600, 4900, 5200, 5500].map(value => new Decimal(value)),
        shardReduction: {
          amount: new Decimal(3),
          type: VAchievementShardReductionType.Subtract
        }
      }
    },
    "se7en-deadly-matters": {
      name: "Se7en deadly matters",
      description: "Get x Infinity Points in Eternity Challenge 7.",
      goals: {
        currency: "Infinity Points",
        values: [6e5, 7.2e5, 8.4e5, 9.6e5, 1.08e6, 1.2e6].map(Decimal.pow10),
        shardReduction: {
          amount: new Decimal("1e1200"),
          type: VAchievementShardReductionType.Divide
        }
      }
    },
    "young-boy": {
      name: "Young Boy",
      description: "Get x Antimatter in Eternity Challenge 12 without unlocking Time Dilation.",
      goals: {
        currency: "Antimatter",
        values: [4e8, 4.5e8, 5e8, 6e8, 7e8, 8e8].map(Decimal.pow10),
        shardReduction: {
          amount: new Decimal("1e500000"),
          type: VAchievementShardReductionType.Divide
        }
      }
    },
    "eternal-sunshine": {
      name: "Eternal Sunshine",
      description: "Get x Eternity Points.",
      goals: {
        currency: "Eternity Points",
        values: [7000, 7600, 8200, 8800, 9400, 10000].map(Decimal.pow10),
        shardReduction: {
          amount: new Decimal(1e6),
          type: VAchievementShardReductionType.Divide
        }
      }
    },
    matterception: {
      name: "Matterception",
      description: "Get x Dimension Boosts while Dilated and inside Eternity Challenge 5.",
      goals: {
        currency: "Dimension Boosts",
        values: [51, 52, 53, 54, 55, 56].map(value => new Decimal(value)),
        shardReduction: {
          amount: new Decimal(1),
          type: VAchievementShardReductionType.Subtract
        }
      }
    },
    "requiem-for-a-glyph": {
      name: "Requiem for a Glyph",
      description:
        "Unlock Reality with at most x Glyphs equipped for the entire Reality. Cursed Glyphs count as -3 Glyphs equipped.",
      goals: {
        currency: "Glyphs equipped",
        values: [1, 4, 7, 10, 13].map(value => new Decimal(-value))
      },
      hard: true
    },
    "post-destination": {
      name: "Post-destination",
      description: `Get 4e5 Time Theorems with a /x Black Hole or slower, without discharging or entering EC12.`,
      goals: {
        currency: "Inverted Black Hole speed",
        values: [100, 150, 200, 250, 300].map(Decimal.pow10),
        shardReduction: {
          amount: new Decimal(10),
          type: VAchievementShardReductionType.Divide
        }
      },
      hard: true
    },
    "shutter-glyph": {
      name: "Shutter Glyph",
      description: "Reach a Glyph of level x",
      goals: {
        currency: "Glyph Level",
        values: [6500, 7000, 8000, 9000, 10000].map(value => new Decimal(value)),
        shardReduction: {
          amount: new Decimal(5),
          type: VAchievementShardReductionType.Subtract
        }
      },
      hard: true
    }
  },
  unlocks: [
    {
      reward: "You can spend Perk Points to reduce the goal requirement of all tiers of each V-Achievement.",
      requirement: 2
    },
    {
      reward: "Antimatter Dimension power based on total Space Theorems",
      formula: "`1 + sqrt(space theorems) / 100`",
      requirement: 5
    },
    {
      reward: "Achievement multiplier reduces Auto-EC completion time",
      formula: "`60 * 20 / achievement multiplier` minutes for full completion",
      requirement: 10
    },
    {
      reward: "Unlock the ability to Automatically Purge Glyphs on Reality",
      requirement: 16
    },
    {
      reward: "Achievement multiplier affects Black Hole power",
      requirement: 30
    },
    {
      reward: "Reduce the Space Theorem cost of Time Studies by 2. Unlock Ra, Celestial of the Forgotten",
      requirement: 36
    }
  ]
});
