import type { TeresaCelestial } from "@/types/game_data/celestials/teresa";

export default (<TeresaCelestial>{
  info: `Teresa, the first Celestial, is unlocked by obtaining all Reality Upgrades (Achievement 147). \
The main screen features a bar with a "Pour RM" button, allowing you to deposit RM into a container for a Reality Machine multiplier. \
Once poured, RM cannot be retrieved. Unlocking Teresa's Reality requires reaching 1e14 RM inside the container. \
Completing Teresa's Reality multiplies Glyph Sacrifice based on antimatter gained during the run. \
However, progress requires continuous pouring of RM. Reaching 1e21 RM in the container unlocks the next Celestial. \
Teresa's Reality can be repeated, with stronger rewards obtained by achieving higher antimatter amounts on subsequent runs.`,
  reality: {
    challenge: `Glyph Time Theorem generation is disabled. You gain less Infinity Points and Eternity Points (x^0.55). This Reality can be repeated for a stronger reward based on the antimatter gained within it.`,
    reward: "Improve Glyph Sacrifice power",
    formula: "x`max((log10(antimatter) / 1.5e8)^12, 1)`"
  },
  mechanic: {
    reward:
      "You can pour Reality Machines into a container for various unlocks, including Teresa's Reality, as well as a Reality Machine multiplier",
    formula: "x`max(250 * (poured / 1e24)^0.1, 1)`"
  },
  shop: [
    {
      name: "Glyph Level Increase",
      cost: 1,
      increment: 2,
      description: "Increase pre-Instability Glyph levels by 5%",
      cap: "11 purchases (20 with relevant Ra unlock)"
    },
    {
      name: "Reality Machine Increase",
      cost: 1,
      increment: 2,
      description: "Double Reality Machine gain",
      cap: "11 purchases (20 with relevant Ra unlock)"
    },
    {
      name: "Dilation Autobuyer Bulk",
      cost: 100,
      increment: 2,
      description: "Buy twice as many Dilation upgrades at once",
      cap: "4 purchases (14 with relevant Ra unlock)"
    },
    {
      name: "Autobuyer Speedup",
      cost: 1000,
      increment: 2,
      description: "Infinity Dimension, Time Dimension, Dilation, and Replicanti autobuyers are 2x faster",
      cap: "2 purchases (6 with relevant Ra unlock)"
    },
    {
      name: "Single Music Glyph",
      cost: 1,
      description: "Receive a Music Glyph of a random type that is 80% of your highest level. (Try clicking it!)",
      cap: "None"
    },
    {
      name: "Multiple Music Glyph",
      cost: 1,
      description:
        "Fill all empty slots in your inventory with Music Glyphs. 1 Perk Point per Glyph. Only unlocked with Ra's Perk Shop Improvement.",
      cap: "None"
    }
  ],
  unlocks: [
    {
      requirement: 1e6,
      reward: "You start Reality with all Eternity Upgrades unlocked"
    },
    {
      requirement: 1e10,
      reward: `Unlock "Undo" of equipping a Glyph`
    },
    {
      requirement: 1e14,
      reward: "Unlock Teresa's Reality"
    },
    {
      requirement: 1e18,
      reward: "Unlock passive Eternity Point generation"
    },
    {
      requirement: 1e21,
      reward: "Unlock Effarig, Celestial of Ancient Relics."
    },
    {
      requirement: 1e24,
      reward: "Unlock Teresa's Perk Point Shop."
    }
  ]
});
