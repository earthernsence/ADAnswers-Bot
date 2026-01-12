import type { RaCelestial } from "@/types/game_data/celestials/ra";

export default <RaCelestial>{
  info: `Ra, the fifth Celestial, is unlocked by completing all of V's Achievements. \
Ra utilizes Memories to bring back enhanced positive effects from previous Celestials. \
Within Ra, you gradually unlock the previous four Celestials, each offering additional upgrades tied to their original themes. \
To level up the previous Celestials within Ra, you need to use memories generated passively \
over time from Memory Chunks. These chunks can only be obtained within Ra's Reality, where they are \
produced based on specific resource totals. Reaching a total of 20 levels across all Celestials unlocks \
Remembrance, allowing you to choose a Celestial to gain more chunks while inside Ra's Reality. \
Memories can be spent on increasing Memory Chunk gain, Memory gain, and leveling up the Celestial. \
Teresa is initially unlocked, and subsequent Celestials are unlocked by reaching level 8 with the previous one. \
Levels are capped at 25. Ra does not directly unlock the next Celestial.`,
  reality: `You only have 4 Dimension Boosts and cannot gain any more. The Tickspeed purchase multiplier is fixed at x1.125. Within Ra's Reality, Memory Chunks for Celestial Memories will be generated based on certain resource amounts. There is no direct reward for completing Ra's Reality.`,
  memories: {
    teresa: {
      name: "Teresa",
      chunkGain: {
        currency: "Eternity Points",
        formula: "`4 * (log(ep) / 1e4)^3`"
      },
      unlocks: [
        {
          level: 1,
          effect: "Tachyon Particles are given immediately when Time Dilation is active"
        },
        {
          level: 2,
          effect:
            "Unlock Charged Infinity Upgrades. You gain one more maximum Charged Infinity Upgrade every two levels. Visit the Infinity Upgrades tab to use them."
        },
        {
          level: 5,
          effect: "All Memory Chunks produce more Memories based on Reality Machines",
          formula: "`1 + sqrt(log(RM) / 100)"
        },
        {
          level: 8,
          effect: "Unlock Effarig's Memories"
        },
        {
          level: 10,
          effect: "Unlock Altered Glyphs, which grant new effects to Glyphs based on Glyph Sacrifice"
        },
        {
          level: 15,
          effect: "Purchase caps are raised in Teresa's Perk Point Shop"
        },
        {
          level: 25,
          effect:
            "In non-Celestial Realities, gain Tachyon Particles as if you reached the square root of your total antimatter in Dilation. Any multipliers to TP gain are applied retroactively, even outside Dilation."
        }
      ]
    },
    effarig: {
      name: "Effarig",
      chunkGain: {
        currency: "Relic Shards",
        formula: "`4 * shards ^ 0.1`"
      },
      unlocks: [
        {
          level: 1,
          effect:
            "Get 2x more Glyph choices and the bonus to Glyph rarity from Relic Shards is always its maximum value."
        },
        {
          level: 2,
          effect:
            "Unlock Glyph Alchemy, which adds alchemical resources you can increase by Refining Glyphs. You unlock more resources through Effarig levels. Access through a new Reality tab."
        },
        {
          level: 5,
          effect: "All Memory Chunks produce more Memories based on highest Glyph level",
          formula: "`1 + (best Glyph level / 7000)`"
        },
        {
          level: 8,
          effect: "Unlock Nameless' Memories"
        },
        {
          level: 10,
          effect: "Glyphs always have 4 effects, and Effarig Glyphs can now have up to 7"
        },
        {
          level: 15,
          effect: "Glyph level is increased based on Relic Shards gained",
          formula: "`100 * log(max(shards, 1)) ^ 2`"
        },
        {
          level: 25,
          effect:
            "Glyphs are always generated with 100% rarity and Glyph Sacrifice gain is raised to a power based on Relic Shards"
        }
      ]
    },
    nameless: {
      name: "Nameless",
      chunkGain: {
        currency: "Time Shards",
        formula: "`4 * (log(time shards) / 3e5) ^ 2`"
      },
      unlocks: [
        {
          level: 1,
          effect: "Unlock Black Hole power upgrade autobuyers"
        },
        {
          level: 2,
          effect: "Stored game time is amplified and you can store more real time, increasing with Nameless levels",
          formula: "Game time amplification: `20 ^ level` | Real time cap: `1000 * 3600 * level`"
        },
        {
          level: 5,
          effect: "All Memory Chunks produce more Memories based on total time played",
          formula: "`1 + log(time played) / 200`"
        },
        {
          level: 8,
          effect: "Unlock V's Memories"
        },
        {
          level: 10,
          effect:
            "Black Hole charging now only uses 99% of your game speed and you can automatically discharge 1% of your stored game time every 5 ticks"
        },
        {
          level: 15,
          effect: "Gain more Dilated Time based on peak game speed in each Reality",
          formula: "`max((log(peak speed) - 90) ^ 3, 1)`"
        },
        {
          level: 25,
          effect:
            "All basic Glyphs gain the increased game speed effect from Time Glyphs, and Time Glyphs gain an additional effect"
        }
      ]
    },
    v: {
      name: "V",
      chunkGain: {
        currency: "Infinity Power",
        formula: "`4 * (log(infinity power) / 1e7) ^ 1.5`"
      },
      unlocks: [
        {
          level: 1,
          effect: "Rebuyable Reality upgrades are bought automatically and Auto-Eternity Challenges happen instantly"
        },
        {
          level: 2,
          effect: "In non-Celestial Realities, Time Dilation is unlocked automatically for free at 12900 Time Theorems"
        },
        {
          level: 5,
          effect: "All Memory Chunks produce more Memories based on total Celestial levels",
          formula: "`1 + levels / 50`"
        },
        {
          level: 6,
          effect:
            "Unlock Hard V-Achievements and unlock a Triad Study every 6 levels. Triad Studies are located at the bottom of the Time Studies page"
        },
        {
          level: 10,
          effect: "Time Theorems boost all forms of continuous non-Dimension production",
          formula:
            "factor: `min(10, max(0, log(TT) - 350) / 50)` | TT generation: `10 ^ (5 * factor)` | Eternities: `10 ^ (2 * factor)` | Infinities: `10 ^ (15 * factor)` | Replicanti: `10 ^ (20 * factor)` | Memories: `1 + factor / 50` | Memory chunks: `1 + factor / 50` | IP/EP generation: `1 + 2.4 * factor`"
        },
        {
          level: 15,
          effect: "Achievement multiplier applies to Time Theorem generation"
        },
        {
          level: 25,
          effect: "Achievement multiplier is raised ^ 1.5"
        }
      ]
    }
  }
};
