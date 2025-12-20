import type { AntimatterChallenges } from "@/types/game_data/challenges/AntimatterChallenges";

const base = ` It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
 If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`;

// It's not my preferred way of doing this, but to save bandwidth,
// we provide a direct link to a discord attachment to display the images,
// instead of trying to upload them every time someone requests a challenge message.
// There are likely better hosting solutions, but for now, I figure "if it ain't broke, don't fix it."
// See this section of the discord.js guide for more information:
// https://discordjs.guide/popular-topics/embeds.html#attaching-images

export const antimatterChallenges: AntimatterChallenges = {
  "c2": {
    number: 2,
    requirements: `Reach Infinity`,
    challenge: `Buying anything halts your production, gradually coming back over 3 minutes.`,
    strategy: `${base}\n After all, holding M is detrimental. Press it once you can get a few dimensions.`,
    reward: `Upgradeable 2nd Antimatter Dimension autobuyer`,
    goal: `Reach Infinity under these circumstances`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980907127730233425/C2.png`
  },
  "c3": {
    number: 3,
    requirements: `Reach Infinity`,
    challenge: `The 1st Antimatter Dimension is heavily weakened, but gets an exponentially increasing bonus that resets after DImension Boosts and Antimatter Galaxies.`,
    strategy: base,
    reward: `Upgradeable 3rd Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980907128040591410/C3.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c4": {
    number: 4,
    requirements: `Reach Infinity`,
    challenge: `Buying an Antimatter Dimension automatically erases all lower tier Antimatter Dimensions, like a sacrifice without the boost.`,
    strategy: base,
    reward: `Upgradeable 4th Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980907128254496858/C4.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c5": {
    number: 5,
    requirements: `Reach Infinity`,
    challenge: `The Tickspeed purchase multiplier starts at ×1.080 instead of ×1.125.`,
    strategy: base,
    reward: `Upgradeable 5th Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908583430533120/C5.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c6": {
    number: 6,
    requirements: `Reach Infinity`,
    challenge: `Each Antimatter Dimension costs the dimension 2 dimensions below it, instead of antimatter. Antimatter Dimension prices are modified.`,
    strategy: base,
    reward: `Upgradeable 6th Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908583623483452/C6.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c7": {
    number: 7,
    requirements: `Reach Infinity`,
    challenge: `The multiplier from buying 10 Antimatter Dimensions is reduced to ×1, but is increased by ×0.2 per Dimension Boost, up to a maximum of ×2.`,
    strategy: base,
    reward: `Upgradeable 7th Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908583841595422/C7.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c8": {
    number: 8,
    requirements: `Reach Infinity`,
    challenge: `Dimension Boosts provide no boost and Antimatter Galaxies cannot be bought, but Dimensional Sacrifice is significantly stronger and resets antimatter and all Antimatter Dimensions.`,
    strategy: `No strat or tips for this challenge. Just start it, get five dimboosts (four shifts and one boost on web) and hit sacrifice at ~10x.
      Make sure to do the antitable achievement in these runs, because this achievement is pretty easy for now. If you need a guide for it, feel free to call the bot with "/antitables prebreak".`,
    reward: `Upgradeable 8th Antimatter Dimension autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908584101609472/C8.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c9": {
    number: 9,
    requirements: `Reach Infinity`,
    challenge: `Whenever you buy Tickspeed upgrades, or 10 of an Antimatter Dimension, everything else of equal cost will increase to its next cost step.`,
    // eslint-disable-next-line @stylistic/max-len
    strategy: `I recommend having all Infinity upgrades (except the last 4 which don't work in challenges) and at least 100 unspent IP before attempting C9. Some players prefer attempting this challenge at higher IP values (10k+) where the challenge becomes trivial.\n
You can use this video guide: <https://youtu.be/6o-QKHLcimU> or you can use this strat: 
- Disable all autobuyers except 6th dim, 8th dim, dimboost, and galaxy autobuyers which should stay enabled.
- Keep repeatedly buying the highest dimension available.
- From time to time buy Tickspeed in singles, and make sure to keep the Tickspeed cost under the cost of dimensions.
- Make sure to not press M/Max or Buy max tickspeed.
For post 1e7 IP upgrade:
- Enable Auto Retry Challenges option
- Crunch autobuyer on at 0 IP
- DimBoost autobuyer on with "Galaxies required to always Dimboost" disabled and "Limit Dimension Boosts" enabled at 4
- Galaxy autobuyer off
- Hold M/Max for additional speed -- if this causes trouble, try tapping it instead of holding`,
    reward: `Upgradeable Tickspeed autobuyer`,
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908584332308490/C9.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c10": {
    number: 10,
    requirements: `Have 16 Infinities`,
    challenge: `There are only 6 Antimatter Dimensions, with Dimension Boost and Antimatter Galaxy costs modified.`,
    strategy: base,
    reward: "Dimension Boost autobuyer",
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908584546230292/C10.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c11": {
    number: 11,
    requirements: `Have 16 Infinities`,
    challenge: `There's normal matter which rises once you have at least 1 2nd Antimatter Dimension. If it exceeds your antimatter, it will Dimension Boost without giving the bonus.`,
    strategy: `${base}\n If you are on web, this challenge becomes a normal infinity run once you have the "Galaxies are twice as effective" upgrade. Just do it once you have that upgrade.`,
    reward: "Antimatter Galaxy autobuyer",
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908584919531541/C11.png`,
    goal: `Reach Infinity under these circumstances`,
  },
  "c12": {
    number: 12,
    requirements: `Have 16 Infinities`,
    challenge: `Each Antimatter Dimension produces the dimension 2 dimensions below it (1st Antimatter Dimensions still produce antimatter). The 2nd, 4th, and 6th Antimatter Dimensions are made stronger to compensate.`,
    strategy: `It is recommended to have at least the first 12 Infinity Upgrades and ~200 Infinities. Spare IP is not important for C12.
      If you want to get those 200 Infinities, you probably want to get upgrades 13 to 15 as well to speed things up. (Note: Those upgrades won't work inside challenges.)
      The exact number of infinities could be arugued, but 200 was relatively reasonable to Tables -- who completed C12 in 5 minutes with 200 Infinities and 0 Infinity Points.`,
    reward: "Big Crunches autobuyer",
    imagePath: `https://cdn.discordapp.com/attachments/824678601160917003/980908585162784778/C12.png`,
    goal: `Reach Infinity under these circumstances`,
  },
};

